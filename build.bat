@echo off
setlocal enabledelayedexpansion

rem Change to the directory of this script
cd /d %~dp0

echo Checking Node.js and npm...
where node >nul 2>&1 || (
  echo Node.js is not installed or not on PATH. Please install from https://nodejs.org/
  exit /b 1
)
where npm >nul 2>&1 || (
  echo npm is not installed or not on PATH. Please install Node.js which includes npm.
  exit /b 1
)

echo Ensuring dependencies are installed...
if not exist node_modules (
  if exist package-lock.json (
    echo Running npm ci...
    npm ci || exit /b 1
  ) else (
    echo Running npm install...
    npm install || exit /b 1
  )
) else (
  echo Dependencies already installed.
)

if not defined PORT set PORT=3000
set URL=http://localhost:%PORT%

echo Building the project...
npm run build || exit /b 1

echo Starting production server on %URL% ...
start "Open Browser (Prod)" cmd /c "timeout /t 8 >nul && explorer %URL%"
set PORT=%PORT%
npm run start

endlocal
exit /b %errorlevel%
