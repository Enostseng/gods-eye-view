# God's Eye View 繁體中文外掛與 Windows App

上游來源與安裝版本見 [使用說明.txt](使用說明.txt)。上游來源保持不變，翻譯以 Vite 外掛注入。

## 在既有安裝使用外掛

需要上游依賴已安裝、Node.js 24.14+（24.x）或 26.x。

```sh
node /path/to/gods-eye-view-zh-tw/desktop/server.mjs /path/to/gods-eye-view
```

服務預設只監聽 127.0.0.1:4173，若連接埠被占用會自動選擇下一個。
控制台的 GEV_DESKTOP_READY 包含實際 URL。瀏覽器開啟該 URL 即可。
Ctrl+C 停止服務。外掛不修改上游來源、套件宣告或鎖定檔。

## 結構

- plugin/dictionary.mjs：可擴充的繁體中文詞彙表。
- plugin/client.mjs：增量翻譯、語言切換與偏好儲存。
- plugin/vite-plugin.mjs：同源注入，保留上游 CSP。
- desktop/server.mjs：使用完整上游 Vite 服務與 API。
- desktop/main.cjs：Electron 桌面視窗及伺服器生命週期。
- 建立桌面捷徑.cmd：Windows 桌面捷徑。

語言切換不改變圖層 ID、表單值或圖示字串。供應商標示、識別碼及未知外部文字保持原文。
Windows 包使用 Node 與 Electron 官方 ZIP，對照官方 SHASUMS256 校驗；
Windows 原生依賴由 npm ci --ignore-scripts --os=win32 --cpu=x64 從原鎖定檔安裝。
未執行安裝腳本；Vite 所需的 Windows esbuild 與 Rollup 二進位檔已包含。
Windows 包不需要開發用 Puppeteer 的額外 Chromium 下載。

目前雲端為 Linux，Windows GUI 本機驗證仍需 Windows 電腦。未修改上游 Git 儲存庫。
