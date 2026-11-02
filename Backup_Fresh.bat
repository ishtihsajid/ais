@echo off
cd /d "%~dp0"
echo ===================================================
echo Fresh Ceramics - Backup Utility
echo Backing up SQLite database and media files...
echo ===================================================

call npm run backup
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ---------------------------------------------------
    echo Backup encountered an issue.
    echo Please make sure BACKUP_DIR is valid in .env or the backup drive is connected.
    echo ---------------------------------------------------
    pause
) else (
    echo.
    echo Backup completed successfully!
    pause
)
