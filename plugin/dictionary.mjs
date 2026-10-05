// Exact UI phrases only. Data identifiers, provider names and icon ligatures stay intact.
const pairs = `
Saturation|飽和度
Edge Thickness|描邊粗細
Pixelation|像素化
Distortion|扭曲
Instability|不穩定度
Contrast|對比
Grain|顆粒
Vignette|暗角
Gain|增益
Scanlines|掃描線
Sensitivity|靈敏度
WHOT/BHOT|白熱／黑熱
Ironbow|彩色熱影像
DENSE|密集
SPARSE|稀疏
MEDIUM|中等
DEGRADED|效能降低
STALE|資料過期
PARTIAL|部分資料
FALLBACK|備援資料
UNAVAILABLE|無法使用
Live Vessels|即時船舶
Bike Share|共享自行車
Mapped ALPR Cameras|已標記車牌辨識攝影機
Mapped Military Installations|已標記軍事設施
Military Installations|軍事設施
Radar|雷達
Satellite Clouds|衛星雲圖
Lightning|閃電
Cyclone Advisories|熱帶氣旋公告
Wind Forecast|風場預報
Weather Radar|天氣雷達
Weather Satellite|氣象衛星
Weather Lightning|閃電觀測

Movement|移動目標
Infrastructure|基礎設施
Events|事件
Utilities|工具
Military Flights|軍用航班
Civil Flights|民航航班
Earthquakes (24h)|地震（24 小時）
Active Fires|活躍火災
Wildfire Perimeters|野火範圍
Datacenters & Compute|資料中心與算力
Submarine cables|海底電纜
Cyclone advisories|熱帶氣旋公告
Directions|路線規劃
ALPR|車牌辨識攝影機
Wind|風場
Cyclones|熱帶氣旋
AI AGENT|AI 助理
VOICE STANDBY|語音待命
ON/OFF|開啟／關閉
STD|標準
MINI|精簡
SUMMARY|摘要
Data attribution|資料來源標示
LOADING|載入中
Settings|設定
Close|關閉
Layer settings|圖層設定
LIVE|即時
FETCHING|取得中
KEY REQUIRED|需要金鑰
KEYLESS|免金鑰
No key needed|不需要金鑰
KEYS|金鑰
ACTIVE|啟用中
INACTIVE|未啟用
FLIGHTS|航班
MILITARY|軍用飛機
SHIPS|船舶
SATELLITES|衛星
EARTHQUAKES|地震
Show all|顯示全部
OFFLINE|離線
LIVE DATA|即時資料
MORE|更多

MISSION CONTROL · FIRST LAUNCH|任務控制中心 · 首次啟動
Choose your first view|選擇你的第一個視角
It feels like a forbidden cockpit—then you realize the sources are public and the data is real.|宛如走進神祕的駕駛艙——眼前的資料其實來自公開來源，呈現真實世界。
LIVE CONTACTS|即時目標
Aircraft, vessels and nearby intelligence|飛機、船舶與周邊情報
SPACE MISSIONS|太空任務
Launches, spacecraft and orbital context|火箭發射、太空船與軌道資訊
ENVIRONMENTAL|環境監測
ENVIRONMENT|環境監測
Live earthquakes and active fires, from USGS and NASA|USGS 與 NASA 提供的即時地震與火災資訊
EXPLORE MANUALLY|自由探索
Begin with a clean globe|從純淨的地球視圖開始
Don't show this again|不再顯示
ESC to dismiss|按 Esc 關閉
ESC to close|按 Esc 關閉
Tip: the GEV MIC button in the dock lets you talk to the map.|提示：工具列的麥克風按鈕可讓你用語音操作地圖。
DATA LAYERS|資料圖層
DISPLAY|顯示設定
VISUAL PRESETS|視覺風格
MAP SOURCE|地圖來源
ACTIVE STYLE|目前風格
LOCATION|位置
Location|位置
Style|風格
NORMAL|原始
Normal|原始
CRT|映像管
NVG|夜視
FLIR|熱影像
Anime|動漫
ANIME|動漫
Noir|黑色電影
NOIR|黑色電影
Snow|雪景
SNOW|雪景
Search any location...|搜尋地點或座標…
Search any location|搜尋地點
Search location by name or coordinates|以名稱或座標搜尋地點
Expand LOCATION|展開位置面板
Expand Visual Presets|展開視覺風格
Keep visual presets open|保持視覺風格面板開啟
Keep location tray open|保持位置面板開啟
Pin visual presets|固定視覺風格面板
Pin location tray|固定位置面板
Map source|地圖來源
Collapse panel|收合面板
Expand panel|展開面板
Copy share link|複製分享連結
Clear selected data layers|清除所選資料圖層
Turn off all selected data layers|關閉所有已選圖層
Reset to full globe view|返回完整地球視圖
Reset camera and return to full globe view|重設鏡頭並返回地球全景
Reset map to north up|將地圖朝向正北
Reset map bearing to north|重設地圖方向為正北
Tilt map to oblique view|切換為傾斜視角
Toggle straight-down and tilted map views|切換俯視與傾斜視角
Globe actions|地球操作
Visible map targets|可見地圖目標
Navigation, voice, and visual preset controls|導覽、語音與視覺風格控制
NO PLACE LEFT BEHIND|看見世界的每個角落
GOD'S EYE|上帝之眼
VIEW|視界
POWER UP|啟用進階功能
POWERED UP|進階功能已啟用
GROUND STATION · PROVIDER SETTINGS|地面站 · 服務供應商設定
Power up the globe|啟用更多地球資訊
Close key setup|關閉金鑰設定
SAVE KEYS|儲存金鑰
The Google Maps key buys the photorealistic planet — everything else stacks on top.|Google Maps 金鑰可啟用擬真 3D 地球；其他金鑰則增添不同資訊。
The globe already flies keyless. Every key below switches on another real feed — paste one and it's saved into this app's local configuration, then the server restarts itself. Server-side keys stay on this machine; Google Maps and Cesium ion run in the browser and must be provider-restricted. Keys you configured elsewhere are shown but never touched.|不需要金鑰也能探索地球。下方金鑰可啟用更多即時資訊；貼上並儲存後，伺服器會自動重新啟動。金鑰存放在本機；Google Maps 與 Cesium ion 的瀏覽器金鑰須在供應商端設定使用限制。已於其他地方設定的金鑰僅供顯示，不會被修改。
The photorealistic 3D planet + place search|擬真 3D 地球與地點搜尋
Voice control — talk to the planet|語音控制：用說話探索地球
Live ships, worldwide|全球即時船舶
Live active-fire detections|即時火災偵測
Real live traffic (keyless runs a simulation)|即時交通路況（無金鑰時使用模擬）
Bing imagery map stacks + world terrain|Bing 影像地圖與全球地形
More flight-polling credits (anonymous works without)|增加航班查詢額度（匿名模式不需金鑰）
Higher space-missions request allowance|提高太空任務查詢額度
GET KEY|取得金鑰
Get key|取得金鑰
FREE|免費
METERED|按用量計費
Configured externally|已由外部設定
configured externally|已由外部設定
Configured|已設定
Not configured|尚未設定
SAVE|儲存
CANCEL|取消
CCTV|監視攝影機
CCTV OFF|攝影機關閉
CCTV ON|攝影機開啟
CCTV camera|監視攝影機
CCTV feed frame|攝影機影像
Enable CCTV to load camera intersections|啟用攝影機以載入路口影像
Enable CCTV to start camera-linked intelligence summaries.|啟用攝影機以查看相關情報摘要。
NEAREST|最近
PREV|上一個
NEXT|下一個
FOCUS|聚焦
COVERAGE OFF|覆蓋範圍關閉
COVERAGE ON|覆蓋範圍開啟
AUTO HOP OFF|自動切換關閉
AUTO HOP ON|自動切換開啟
PROJECTION ON|影像投射開啟
PROJECTION OFF|影像投射關閉
CALIBRATION|校正
ADJUST|調整
SAVE CAL|儲存校正
RESET CAL|重設校正
SCENE SUMMARY|場景摘要
SOURCE · UNKNOWN|來源 · 未知
SCENES|場景
Scene recipe|場景設定
NEW|新增
DEL|刪除
CAPTURE SHOT|擷取鏡頭
UPDATE SHOT|更新鏡頭
START|開始
STOP|停止
EXPORT PRESETS|匯出預設
IMPORT|匯入
RUN LOG|執行記錄
Ready|就緒
READY|就緒
LOADING LIVE DATA|正在載入即時資料
Initializing photorealistic world...|正在初始化地球…
syncing road network|正在同步道路網路
loading frames|正在載入影像
Layout|版面
HUD layout|抬頭顯示器版面
HUD|抬頭顯示器
Tactical|戰術
Operator|操作員
Minimal|簡約
Cyber|科技
Sonar|聲納
Rings|環數
Range|範圍
Power|強度
Opacity|不透明度
Sector|扇形
DETECT|目標偵測
Density|密度
Allocation|分配
Elastic|彈性
Weighted|加權
Fade|淡出
Outside|外圍
PARAMETERS|參數
Models|模型
Proximity|鄰近
All|全部
Scope|瞄準鏡
Feather|邊緣柔化
Draw|繪製
Shape|形狀
Line|線段
Area|區域
Pin|標記
Label (optional)|標籤（選填）
Clear|清除
Green|綠色
Cyan|青色
Red|紅色
Amber|琥珀色
Primary|主要
Bloom|輝光
Bloom / Glow|輝光
Sharpen|銳化
Sharpening|銳化
Celestial|天球
Clean UI|簡潔介面
EXIT CLEAN VIEW|離開簡潔視圖
Return UI controls|恢復介面控制
Hide UI chrome|隱藏介面
COCKPIT|駕駛艙
EXIT COCKPIT|離開駕駛艙
FIRST PERSON|第一人稱
Aircraft cockpit view|飛機駕駛艙視角
Exit cockpit view|離開駕駛艙
Exit cockpit and return to full globe view|離開駕駛艙並返回地球全景
CONTACTS|目標
CONTACT|目標
CONTACTS · 250 KM|目標 · 250 公里
CONTEXT|情境資訊
CONTEXT ONLY|僅情境資訊
SELECT CONTEXT|選擇情境
SELECT CONTACTS TO LOAD OBSERVED / MAPPED PROXIMITY|選擇目標以載入周邊觀測與地圖資訊
CONTACTS CONTEXT OFF|目標情境關閉
CONTACTS CONTEXT ON|目標情境開啟
CONTACTS — nearest planes · vessels · sites|目標 — 附近飛機、船舶與地點
SPACE MISSIONS — launches & orbital assets|太空任務 — 發射與軌道物件
AVAILABLE MISSIONS|可用任務
Available Space Missions|可用太空任務
LOADING 30-DAY MISSION INDEX|正在載入 30 天任務索引
SELECT A MISSION TO INSPECT|選擇要查看的任務
AIRCRAFT|飛機
ALTITUDE|高度
ALTITUDE · FT|高度 · 英尺
GROUND SPEED|地速
GROUND SPEED · KTS|地速 · 節
CURRENT|目前
FROM|起點
TO|終點
ESTIMATED FLIGHT PLAN|推估飛行計畫
ROUTE DATA UNAVAILABLE|無航線資料
LIVE TRACK · COURSE ALIGNED|即時追蹤 · 航向對齊
VISOR LOCK · ACTIVE|視角鎖定 · 啟用中
LIVE SIGNALS|即時訊號
NEWS|新聞
LOCAL|本地資訊
ACQUIRING REGIONAL NEWS|正在取得區域新聞
RESOLVING REGION|正在辨識區域
NEAREST OBSERVED / MAPPED|最近觀測／地圖目標
OBSERVED / MAPPED PINGS|觀測／地圖訊號
SOURCE-BACKED EVENTS · NO SYNTHETIC NEWS|基於來源的事件 · 無合成新聞
NO AVAILABLE EXAMPLE|無可用範例
AVAILABLE INPUTS ONLY · NOT AN ALL-CLEAR|僅顯示可用資料 · 不代表已排除風險
SEARCH NEARBY SITES|搜尋鄰近地點
RADIO|廣播
Radio off|廣播已關閉
RADIO READY|廣播就緒
NO STATION SELECTED|尚未選擇電台
ENABLE|啟用
PLAY|播放
Play|播放
VOLUME|音量
DIRECTORY: RADIO BROWSER|目錄：Radio Browser
STATION SITE|電台網站
STATION TAG|電台標籤
LOCAL RTL-SDR|本機 RTL-SDR
CONNECT|連線
CHANGE DEVICE|更換裝置
GAIN|增益
AUTO|自動
TUNE|調諧
Connect an RTL-SDR to begin.|連接 RTL-SDR 接收器即可開始。
Enable Radio, then choose a globe marker or use next.|啟用廣播後，選擇地球上的標記或按「下一個」。
Audio connects directly to the broadcaster after you press play. Your IP is visible to that broadcaster.|按播放後會直接連線至電台，電台可看見你的 IP 位址。
WEATHER|天氣
WIND|風速
TEMP|溫度
PRECIP|降水
RECENT IMAGERY|近期影像
RESET|重設
ON|開啟
OFF|關閉
UNKNOWN|未知
Flights|航班
Military|軍用飛機
Satellites|衛星
Earthquakes|地震
Vessels|船舶
Ships|船舶
Fires|火災
Traffic|交通
Cameras|攝影機
Radio|廣播
Launches|火箭發射
Space Missions|太空任務
Weather|天氣
Installations|設施
Mapped Installations|已標記設施
ALPR Cameras|車牌辨識攝影機
Dams|水壩
Datacenters|資料中心
Data Centers|資料中心
Submarine Cables|海底電纜
Transit|公共運輸
Bikeshare|共享自行車
Recent Imagery|近期影像
Perimeters|邊界
GEV MIC|語音控制
Show the globe without a visual filter.|不使用視覺濾鏡，顯示原始地球。
Emulate a green phosphor CRT with scanlines and screen curvature.|模擬綠色映像管、掃描線與螢幕曲面。
Simulate night-vision goggles with green intensification and a tube vignette.|模擬綠色夜視增強與鏡筒暗角。
Simulate FLIR-style thermal contrast. Turn up Ironbow for color.|模擬熱影像對比，可提高 Ironbow 參數以顯示彩色。
Apply bright cel-shaded color and illustrated outlines.|套用明亮的卡通色彩與描邊。
Apply high-contrast monochrome film-noir grading.|套用高對比的黑白電影風格。
Add a cold, snowy whiteout treatment to the scene.|為場景加入冰冷雪景效果。
Intelligence HUD (H)|情報抬頭顯示器（H）
Detection Overlay (D)|目標偵測疊圖（D）
Detection overlay|目標偵測疊圖
3D aircraft — flat icons zoomed out, 3D models up close|3D 飛機：遠景顯示圖示，近景顯示模型
3D model coverage|3D 模型顯示範圍
Scope — the circular viewport mask|瞄準鏡：圓形視窗遮罩
Draw on the world — click vertices, double-click or Enter to finish, Esc to cancel|在地圖繪製：點選頂點，雙擊或 Enter 完成，Esc 取消
Remove every mark from the board|清除所有標記
`;
export const dictionary = Object.freeze(Object.fromEntries(pairs.trim().split('\n').filter(Boolean).flatMap(line => { const [en, zh] = line.split('|'); return [[en, zh], [en.toUpperCase(), zh]]; })));
const prefixes = [
  ['📍 Location: ', '📍 位置：'], ['Landmark: ', '地標：'],
  ['Current style: ', '目前風格：'], ['Current cockpit vision style: ', '目前駕駛艙風格：'],
  ['Expand ', '展開'], ['Collapse ', '收合'], ['Loading ', '正在載入 '],
];
export function translate(text) {
  const pending = text.match(/^POWER UP · (\d+) KEYS? WAITING$/);
  if (pending) return `啟用進階功能 · ${pending[1]} 項金鑰待設定`;
  const view = text.match(/^Current (cockpit vision )?style: (.+?)(?: — click for next|\. Activate for next style\.)$/i);
  if (view) return `目前${view[1] ? '駕駛艙' : ''}風格：${dictionary[view[2]] || view[2]}（點選切換）`;

  if (Object.hasOwn(dictionary, text)) return dictionary[text];
  for (const [from, to] of prefixes) {
    if (text.startsWith(from)) return to + text.slice(from.length);
  }
  return text;
}
