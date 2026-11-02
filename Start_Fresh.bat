@echo off
cd /d "%~dp0"
echo ===================================================
echo Starting Fresh Ceramics Website ^& Admin Panel...
echo Opening http://localhost:3100 in your browser...
echo Admin panel will be available at http://localhost:3100/admin
echo Press Ctrl+C in this window anytime to stop the server.
echo ===================================================

start http://localhost:3100

call npm run dev
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ---------------------------------------------------
    echo The server stopped with an error.
    echo Please check the error message above. If dependencies are missing, run 'npm install'.
    echo ---------------------------------------------------
    pause
)
