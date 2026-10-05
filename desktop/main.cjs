const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const { spawn } = require('node:child_process');
const path = require('node:path');
let child, window, baseUrl;
let quitting = false;
app.setName('GodsEyeView-TW');
// API-key saves and GPU caches need a writable installation directory.
const root = path.resolve(__dirname, '..');
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => { if (window) { if (window.isMinimized()) window.restore(); window.focus(); } });
  app.whenReady().then(start).catch(fail);
}
function fail(error) {
  dialog.showErrorBox('上帝之眼：啟動失敗', '請將整個資料夾解壓縮至可寫入的位置（例如「下載」或「文件」），再重新啟動。\n\n' + String(error.message || error).slice(0, 1500));
  app.quit();
}
async function start() {
  window = new BrowserWindow({
    width: 1440, height: 960, minWidth: 900, minHeight: 640,
    title: '上帝之眼 · 視界', backgroundColor: '#061416', show: false,
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true, webSecurity: true },
  });
  const runtime = process.env.GEV_TEST_NODE || path.join(root, 'runtime', 'node.exe');
  const upstream = process.env.GEV_TEST_UPSTREAM || path.join(root, 'upstream');
  child = spawn(runtime, [path.join(__dirname, 'server.mjs'), upstream], {
    cwd: upstream, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, HOST: '127.0.0.1' },
  });
  baseUrl = await new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(new Error('啟動超過 90 秒，請重新啟動 App。')), 90000);
    const cleanup = () => { clearTimeout(timer); child.stdout.off('data', onData); };
    function onData(data) {
      output += data.toString();
      const match = output.match(/GEV_DESKTOP_READY (.+)\r?\n/);
      if (match) {
        cleanup();
        try { resolve(JSON.parse(match[1]).url); } catch (error) { reject(error); }
      }
      if (output.length > 64000) output = output.slice(-32000);
    }
    child.stdout.on('data', onData);
    // Drain stderr without persisting provider responses or credentials.
    child.stderr.on('data', () => {});
    child.once('error', error => { cleanup(); reject(error); });
    child.once('exit', code => {
      cleanup();
      if (!baseUrl) reject(new Error(`本機服務已結束（代碼 ${code}）。`));
      else if (!quitting) fail(new Error('本機服務已停止，請重新開啟 App。'));
    });
  });
  const health = await fetch(baseUrl + '/__gev_desktop_health', { signal: AbortSignal.timeout(10000) }).then(r => r.json());
  if (health.app !== 'gods-eye-view-zh-tw' || health.pid !== child.pid) throw new Error('本機服務驗證失敗。');
  const local = url => { try { return new URL(url).origin === baseUrl; } catch { return false; } };
  const external = url => { try { if (new URL(url).protocol === 'https:') shell.openExternal(url); } catch {} };
  window.webContents.setWindowOpenHandler(({ url }) => { external(url); return { action: 'deny' }; });
  window.webContents.on('will-navigate', (event, url) => { if (!local(url)) { event.preventDefault(); external(url); } });
  window.webContents.session.setPermissionRequestHandler((_webContents, permission, callback, details) => {
    if (!local(details.requestingUrl || '')) return callback(false);
    if (!['media', 'geolocation'].includes(permission)) return callback(false);
    dialog.showMessageBox(window, {
      type: 'question', title: '權限請求', message: permission === 'media' ? '允許上帝之眼使用麥克風進行語音控制？' : '允許上帝之眼取得你的所在位置？',
      buttons: ['拒絕', '允許'], defaultId: 0, cancelId: 0,
    }).then(result => callback(result.response === 1));
  });
  function setLanguage(lang) {
    window.webContents.executeJavaScript(`document.dispatchEvent(new CustomEvent('gev:set-language', {detail: ${JSON.stringify(lang)}}))`);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: '應用程式', submenu: [
      { label: '重新載入', role: 'reload' }, { label: '結束', role: 'quit' },
    ] },
    { label: '編輯', submenu: [
      { label: '複製', role: 'copy' }, { label: '貼上', role: 'paste' }, { label: '全選', role: 'selectAll' },
    ] },
    { label: '語言', submenu: [
      { label: '繁體中文', click: () => setLanguage('zh-TW') }, { label: 'English', click: () => setLanguage('en') },
    ] },
    { label: '檢視', submenu: [
      { label: '全螢幕', role: 'togglefullscreen' }, { label: '開發者工具', role: 'toggleDevTools' },
    ] },
    { label: '說明', submenu: [
      { label: '專案網站', click: () => external('https://github.com/bilawalsidhu/gods-eye-view') },
      { label: '使用說明', click: () => shell.openPath(path.join(root, '使用說明.txt')) },
    ] },
  ]));
  await window.loadURL(baseUrl);
  window.show();
}
app.on('window-all-closed', () => app.quit());
app.on('before-quit', event => {
  if (quitting || !child || child.exitCode !== null) return;
  event.preventDefault();
  quitting = true;
  if (process.platform === 'win32') {
    const killer = spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true });
    killer.once('exit', () => app.quit());
    killer.once('error', () => { child.kill(); app.quit(); });
  } else {
    child.kill('SIGTERM');
    child.once('exit', () => app.quit());
  }
  setTimeout(() => app.quit(), 5000).unref();
});
