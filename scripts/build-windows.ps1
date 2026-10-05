$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location $root
$temp = Join-Path $root 'build-temp'
$output = Join-Path $root 'output'
New-Item -ItemType Directory -Force $temp, $output | Out-Null
function Download-Verified([string]$url, [string]$sumsUrl, [string]$name) {
  $dest = Join-Path $temp $name
  Invoke-WebRequest -Uri $url -OutFile $dest
  $sumsFile = Join-Path $temp ($name + '.sha256.txt')
  Invoke-WebRequest -Uri $sumsUrl -OutFile $sumsFile
  $sums = Get-Content $sumsFile -Raw
  $line = ($sums -split "`n" | Where-Object { ($_ -split '\s+')[-1].TrimStart('*') -eq $name })
  if (-not $line) { throw "Checksum missing for $name" }
  $expected = ($line.Trim() -split '\s+')[0]
  $actual = (Get-FileHash $dest -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($actual -ne $expected) { throw "Checksum mismatch for $name" }
  Write-Host "Verified $name"
  return $dest
}
$electron = Download-Verified 'https://github.com/electron/electron/releases/download/v44.5.1/electron-v44.5.1-win32-x64.zip' 'https://github.com/electron/electron/releases/download/v44.5.1/SHASUMS256.txt' 'electron-v44.5.1-win32-x64.zip'
$node = Download-Verified 'https://nodejs.org/dist/v24.19.0/node-v24.19.0-win-x64.zip' 'https://nodejs.org/dist/v24.19.0/SHASUMS256.txt' 'node-v24.19.0-win-x64.zip'
$bundle = Join-Path $temp 'GodsEyeView-TW'
Expand-Archive $electron $bundle
Rename-Item (Join-Path $bundle 'electron.exe') 'GodsEyeView.exe'
$app = Join-Path $bundle 'resources/app'
New-Item -ItemType Directory -Force (Join-Path $app 'runtime') | Out-Null
Expand-Archive $node (Join-Path $temp 'node')
Copy-Item (Join-Path $temp 'node/node-v24.19.0-win-x64/node.exe') (Join-Path $app 'runtime/node.exe')
Copy-Item (Join-Path $temp 'node/node-v24.19.0-win-x64/LICENSE') (Join-Path $app 'runtime/LICENSE')
Copy-Item (Join-Path $root 'desktop') $app -Recurse
Copy-Item (Join-Path $root 'plugin') $app -Recurse
'{"name":"gods-eye-view-zh-tw","version":"1.0.0","main":"desktop/main.cjs","private":true,"license":"MIT"}' | Set-Content (Join-Path $app 'package.json') -Encoding utf8
foreach ($file in @('ADDON-LICENSE.txt','使用說明.txt','測試結果.txt')) { Copy-Item (Join-Path $root $file) $app }
Copy-Item (Join-Path $root 'PLUGIN-README.md') (Join-Path $app 'README.md')
Copy-Item (Join-Path $root '使用說明.txt') $bundle
$upstream = Join-Path $app 'upstream'
git clone https://github.com/bilawalsidhu/gods-eye-view.git $upstream
if ($LASTEXITCODE -ne 0) { throw 'Upstream clone failed' }
Set-Location $upstream
git checkout b74a0233d9b94bd48329e60009d3877532e04ab2
if ($LASTEXITCODE -ne 0) { throw 'Pinned checkout failed' }
npm ci
if ($LASTEXITCODE -ne 0) { throw 'Locked dependency install failed' }
npm run doctor
if ($LASTEXITCODE -ne 0) { throw 'Setup doctor failed' }
Copy-Item (Join-Path $upstream 'LICENSE') (Join-Path $app 'UPSTREAM-LICENSE.txt')
# Only the redistribution copy loses Git metadata and promotional media.
Remove-Item (Join-Path $upstream '.git') -Recurse -Force
if (Test-Path (Join-Path $upstream 'docs/media')) { Remove-Item (Join-Path $upstream 'docs/media') -Recurse -Force }
Set-Location $root
$shortcut = @'
@echo off
setlocal
set "GEV_APP_DIR=%~dp0"
powershell.exe -NoProfile -Command "$ErrorActionPreference='Stop'; $root=$env:GEV_APP_DIR; $shell=New-Object -ComObject WScript.Shell; $link=$shell.CreateShortcut((Join-Path ([Environment]::GetFolderPath('Desktop')) 'Gods Eye View TW.lnk')); $link.TargetPath=Join-Path $root 'GodsEyeView.exe'; $link.WorkingDirectory=$root; $link.Save()"
pause
'@
$shortcut | Set-Content (Join-Path $bundle '建立桌面捷徑.cmd') -Encoding ascii
# Exercise the packaged Node, Windows native dependencies and full API server.
$script = Join-Path $app 'desktop/server.mjs'
$nodeExe = Join-Path $app 'runtime/node.exe'
$stdout = Join-Path $temp 'server-stdout.log'
$stderr = Join-Path $temp 'server-stderr.log'
$process = Start-Process $nodeExe -ArgumentList @("`"$script`"", "`"$upstream`"") -WorkingDirectory $upstream -PassThru -RedirectStandardOutput $stdout -RedirectStandardError $stderr
try {
  $ready = $null
  for ($i = 0; $i -lt 60; $i++) {
    if ($process.HasExited) { Get-Content $stdout, $stderr; throw 'Packaged Windows server exited' }
    if (Test-Path $stdout) {
      $line = Get-Content $stdout | Where-Object { $_ -match '^GEV_DESKTOP_READY ' } | Select-Object -First 1
      if ($line) { $ready = ($line -replace '^GEV_DESKTOP_READY ', '') | ConvertFrom-Json; break }
    }
    Start-Sleep -Seconds 1
  }
  if (-not $ready) { throw 'Packaged Windows server startup timed out' }
  $health = Invoke-RestMethod "$($ready.url)/__gev_desktop_health"
  if ($health.app -ne 'gods-eye-view-zh-tw' -or $health.pid -ne $process.Id) { throw 'Health check failed' }
  $registry = Invoke-RestMethod "$($ready.url)/api/setup/status"
  if (-not $registry.keys) { throw 'Provider registry missing' }
  $html = (Invoke-WebRequest $ready.url).Content
  if ($html -notmatch '/__gev_zh_tw/client.mjs') { throw 'Chinese plugin injection missing' }
  Write-Host 'PASS: packaged Windows Node, native Vite dependencies, health, provider API and Chinese HTML injection'
} finally {
  taskkill /pid $process.Id /T /F | Out-Null
}
# Cold-launch the actual Electron executable and verify its backend comes up.
$gui = Start-Process (Join-Path $bundle 'GodsEyeView.exe') -WorkingDirectory $bundle -PassThru
try {
  $alive = $false
  for ($i = 0; $i -lt 90; $i++) {
    if ($gui.HasExited) { throw "Windows desktop executable exited: $($gui.ExitCode)" }
    try {
      $health = Invoke-RestMethod 'http://127.0.0.1:4173/__gev_desktop_health' -TimeoutSec 2
      if ($health.app -eq 'gods-eye-view-zh-tw') { $alive = $true; break }
    } catch { }
    Start-Sleep -Seconds 1
  }
  if (-not $alive) { throw 'Windows desktop backend startup timed out' }
  Write-Host 'PASS: Windows Electron executable launched and started its packaged backend'
} finally {
  if (-not $gui.HasExited) { taskkill /pid $gui.Id /T /F | Out-Null }
}
# Clear generated dependency caches from the distribution.
Get-ChildItem (Join-Path $upstream 'node_modules') -Force -Filter '.vite*' | Remove-Item -Recurse -Force
$testNote = "Windows runner: packaged Node/native dependencies, provider API, Chinese injection and Electron cold startup passed.`r`nInteractive Windows UI and external live data not verified."
$testNote | Add-Content (Join-Path $app '測試結果.txt') -Encoding utf8
$readme = Get-Content (Join-Path $bundle '使用說明.txt') -Raw
$readme = $readme.Replace('Windows exe 尚未在真實 Windows 電腦執行。', 'Windows exe 已在 GitHub Windows runner 驗證冷啟動與本機 API；尚未驗證一般桌面互動。')
$readme | Set-Content (Join-Path $bundle '使用說明.txt') -Encoding utf8
$readme | Set-Content (Join-Path $app '使用說明.txt') -Encoding utf8
$zip = Join-Path $output 'GodsEyeView-TW-Windows-x64.zip'
Compress-Archive $bundle $zip -CompressionLevel Optimal
$hash = (Get-FileHash $zip -Algorithm SHA256).Hash.ToLowerInvariant()
"$hash  GodsEyeView-TW-Windows-x64.zip" | Set-Content (Join-Path $output 'GodsEyeView-TW-Windows-x64.sha256') -Encoding ascii
$pluginRoot = Join-Path $temp 'gods-eye-view-zh-tw'
New-Item -ItemType Directory $pluginRoot | Out-Null
Copy-Item (Join-Path $root 'plugin'), (Join-Path $root 'desktop') $pluginRoot -Recurse
Copy-Item (Join-Path $root 'PLUGIN-README.md') (Join-Path $pluginRoot 'README.md')
Copy-Item (Join-Path $root 'ADDON-LICENSE.txt'), (Join-Path $app '使用說明.txt'), (Join-Path $app '測試結果.txt') $pluginRoot
Compress-Archive $pluginRoot (Join-Path $output 'GodsEyeView-Traditional-Chinese-Plugin.zip') -CompressionLevel Optimal
Write-Host "Windows ZIP SHA256: $hash"
