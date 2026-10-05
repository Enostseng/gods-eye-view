# God's Eye View 繁體中文 Windows 可攜版

本儲存庫提供基於 [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) 的繁體中文介面外掛及 Windows 桌面封裝。

## 下載與啟動

請由 [Releases](https://github.com/Enostseng/gods-eye-view/releases) 下載 `GodsEyeView-TW-Windows-x64.zip`。

1. 適用於 Windows 10／11 64 位元（x64）。
2. 完整解壓縮至可寫入的資料夾，例如「文件」或「下載」。
3. 雙擊 `GodsEyeView.exe`。不必另裝 Node.js 或 Git。
4. 可執行 `建立桌面捷徑.cmd` 建立桌面捷徑。請保留整個資料夾，不要只複製 exe。

App 預設使用繁體中文，左下角或上方語言選單可切換英文。主要控制介面已翻譯；地名、識別碼、外部新聞與部分專業讀數保持原文。地圖及即時資料需要網路，部分圖層需自行設定供應商金鑰。

另可下載獨立的 `GodsEyeView-Traditional-Chinese-Plugin.zip`。壓縮包內含外掛來源、使用說明與 MIT 授權。

## 版本與驗證

- 上游：0.2.1，提交 `b74a0233d9b94bd48329e60009d3877532e04ab2`。
- 執行環境：Node.js 24.19.0、Electron 44.5.1。
- 已通過上游建置、5,633 個 Node 測試（一項略過）、Chromium 介面操作、桌面控制器啟動／關閉與 ZIP 完整性檢查。
- 封裝是在 Linux 製作；尚未在 Windows 實機執行。發布時未驗證外部即時資料。
- 此封裝沒有商用程式碼簽章。下載包不含 API 金鑰，隨附 SHA256 校驗檔。

## 授權與來源

原專案依 MIT 授權提供，中文外掛與封裝程式採 MIT 授權。
上游、Electron／Chromium、Node.js、圖示字型的授權檔均包含在安裝包內。
資料另受上游 `DATA_SOURCES.md` 所列條款約束；不包含上游 `docs/media` 宣傳素材。
本儲存庫並非上游官方發行版本。
