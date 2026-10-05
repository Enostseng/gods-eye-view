import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { traditionalChinesePlugin } from '../plugin/vite-plugin.mjs';
const root = resolve(process.argv[2] || fileURLToPath(new URL('../upstream', import.meta.url)));
process.chdir(root);
process.env.HOST = '127.0.0.1';
const { createServer } = await import(pathToFileURL(resolve(root, 'node_modules/vite/dist/node/index.js')));
const { default: upstreamConfig } = await import(pathToFileURL(resolve(root, 'vite.config.js')));
const config = typeof upstreamConfig === 'function' ? await upstreamConfig({ command: 'serve', mode: 'development' }) : upstreamConfig;
config.root = root;
config.configFile = false;
config.server.host = '127.0.0.1';
config.server.port = process.env.GEV_DESKTOP_PORT === undefined ? 4173 : Number(process.env.GEV_DESKTOP_PORT);
config.server.strictPort = false;
config.plugins.push(traditionalChinesePlugin());
config.plugins.push({
  name: 'gev-desktop-readiness',
  configureServer(server) {
    server.middlewares.use('/__gev_desktop_health', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ app: 'gods-eye-view-zh-tw', pid: process.pid, version: '1.0.0' }));
    });
  },
});
const server = await createServer(config);
await server.listen();
// Provider Settings restarts Vite in this process. Retain the selected port.
const port = server.httpServer.address().port;
server.config.server.port = port;
console.log('GEV_DESKTOP_READY ' + JSON.stringify({ url: `http://127.0.0.1:${port}`, pid: process.pid }));
let closing = false;
async function shutdown() {
  if (closing) return;
  closing = true;
  await server.close();
  process.exit(0);
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
