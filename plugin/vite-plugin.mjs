import { readFileSync } from 'node:fs';
const files = {
  'icons.woff2': ['font/woff2', readFileSync(new URL('./icons.woff2', import.meta.url))],
  'client.mjs': ['text/javascript; charset=utf-8', readFileSync(new URL('./client.mjs', import.meta.url))],
  'dictionary.mjs': ['text/javascript; charset=utf-8', readFileSync(new URL('./dictionary.mjs', import.meta.url))],
  'style.css': ['text/css; charset=utf-8', readFileSync(new URL('./style.css', import.meta.url))],
};
export function traditionalChinesePlugin() {
  return {
    name: 'gev-traditional-chinese',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = req.url?.split('?')[0].replace('/__gev_zh_tw/', '');
        if (!req.url?.startsWith('/__gev_zh_tw/') || !Object.hasOwn(files, name)) return next();
        res.setHeader('Content-Type', files[name][0]);
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(files[name][1]);
      });
    },
    transformIndexHtml: {
      order: 'post',
      handler: () => [
        { tag: 'link', attrs: { rel: 'stylesheet', href: '/__gev_zh_tw/style.css' }, injectTo: 'head' },
        { tag: 'script', attrs: { type: 'module', src: '/__gev_zh_tw/client.mjs' }, injectTo: 'body' },
      ],
    },
  };
}
