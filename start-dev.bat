@echo off
REM RK Foundation - Development Server Starter for Windows
REM This script starts both the Flask API and Next.js dev server

echo.
echo ============================================
echo  RK Foundation Development Environment
echo ============================================
echo.

REM Check if Flask is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo [INFO] Python found: 
python --version

echo [INFO] Node found:
node --version

echo.
echo ============================================
echo Starting Servers...
echo ============================================
echo.

REM Start Flask API
echo [INFO] Starting Flask API on port 5000...
start cmd /k "python flask_api.py"

REM Wait a moment for Flask to start
timeout /t 2 /nobreak

REM Start Next.js
echo [INFO] Starting Next.js on port 3000...
start cmd /k "npm run dev"

echo.
echo ============================================
echo [SUCCESS] All servers started!
echo ============================================
echo.
echo Access the application:
echo   - Frontend: http://localhost:3000
echo   - API Health: http://localhost:5000/health
echo.
echo Two new command windows will open showing:
echo   - Flask API logs (port 5000)
echo   - Next.js dev server logs (port 3000)
echo.
echo Close the command windows to stop the servers.
echo.
pause
