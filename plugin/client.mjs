import { translate } from './dictionary.mjs';
const key = 'gev.zh-tw.language';
const originals = new WeakMap();
const attrs = ['title', 'aria-label', 'placeholder', 'alt'];
const excluded = 'script,style,textarea,canvas,[contenteditable],.material-symbols-outlined,.cesium-widget-credits,#gev-language-toggle';
let language;
try { language = localStorage.getItem(key) === 'en' ? 'en' : 'zh-TW'; } catch { language = 'zh-TW'; }
function syncValue(node, field, current, write) {
  let record = originals.get(node);
  if (!record) { record = {}; originals.set(node, record); }
  let state = record[field];
  if (!state || current !== state.rendered) state = { source: current };
  const source = state.source;
  const trimmed = source.trim();
  const rendered = language === 'zh-TW' ? source.replace(trimmed, translate(trimmed)) : source;
  record[field] = { source, rendered };
  if (current !== rendered) write(rendered);
}
function visit(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.parentElement?.closest(excluded)) syncValue(node, 'text', node.data, value => { node.data = value; });
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE || node.closest(excluded)) return;
  for (const attr of attrs) {
    if (node.hasAttribute(attr)) syncValue(node, attr, node.getAttribute(attr), value => node.setAttribute(attr, value));
  }
  for (const child of node.childNodes) visit(child);
}
const observer = new MutationObserver(records => {
  observer.disconnect();
  for (const record of records) {
    if (record.type === 'childList') record.addedNodes.forEach(visit);
    else visit(record.target);
  }
  observe();
});
function observe() {
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attrs });
}
const toggle = document.createElement('button');
toggle.id = 'gev-language-toggle';
toggle.type = 'button';
toggle.addEventListener('click', () => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW'));
document.body.append(toggle);
function setLanguage(value) {
  language = value === 'en' ? 'en' : 'zh-TW';
  try { localStorage.setItem(key, language); } catch { /* Private profiles can refuse storage. */ }
  observer.disconnect();
  document.documentElement.lang = language;
  document.documentElement.classList.toggle('gev-zh-tw', language === 'zh-TW');
  document.title = language === 'zh-TW' ? '上帝之眼 · 視界' : "God's Eye View";
  visit(document.body);
  toggle.textContent = language === 'zh-TW' ? '繁體中文｜English' : 'English｜繁體中文';
  toggle.title = language === 'zh-TW' ? '切換為英文介面' : 'Switch to Traditional Chinese';
  observe();
}
document.addEventListener('gev:set-language', event => setLanguage(event.detail));
setLanguage(language);
