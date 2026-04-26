@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: 自动检测 OneDrive 路径（优先使用 OneDrive 注册的环境变量）
if defined OneDrive (
    set ONEDRIVE=%OneDrive%
) else if defined OneDriveCommercial (
    set ONEDRIVE=%OneDriveCommercial%
) else (
    set ONEDRIVE=%USERPROFILE%\OneDrive
)
set SCRIPT_DIR=%~dp0
:: 工作区根目录 = MyFirstApp 的上一级
for %%i in ("%SCRIPT_DIR%.") do set WORKSPACE_DIR=%%~dpi

echo ========================================
echo  Claude 同步链接设置工具
echo ========================================
echo.
echo 目标:
echo   %ONEDRIVE%\claude\
echo     ├── project-claude\   →  %WORKSPACE_DIR%.claude\
echo     └── memory\           →  %USERPROFILE%\.claude\projects\C--claude-workspace\memory\
echo.

:: 检查 OneDrive 目录是否存在
if not exist "%ONEDRIVE%\claude\project-claude" (
    echo [错误] 未找到 %ONEDRIVE%\claude\project-claude\
    echo 请先在 OneDrive 上确认同步完成后再运行本脚本。
    pause
    exit /b 1
)

:: ========== 链接 1: 项目 .claude ==========
echo [1/2] 设置项目 .claude 链接...
if exist "%WORKSPACE_DIR%.claude" (
    dir "%WORKSPACE_DIR%.claude" | find "<JUNCTION>" >nul 2>nul
    if !errorlevel! equ 0 (
        rmdir "%WORKSPACE_DIR%.claude"
    ) else (
        echo [警告] .claude 是真实目录，跳过（不覆盖已有数据）
        goto :link2
    )
)
mklink /J "%WORKSPACE_DIR%.claude" "%ONEDRIVE%\claude\project-claude"
echo   完成

:link2
:: ========== 链接 2: 全局记忆 ==========
echo [2/2] 设置 Claude 记忆链接...
if not exist "%USERPROFILE%\.claude\projects\C--claude-workspace" (
    mkdir "%USERPROFILE%\.claude\projects\C--claude-workspace"
)
if exist "%USERPROFILE%\.claude\projects\C--claude-workspace\memory" (
    dir "%USERPROFILE%\.claude\projects\C--claude-workspace\memory" | find "<JUNCTION>" >nul 2>nul
    if !errorlevel! equ 0 (
        rmdir "%USERPROFILE%\.claude\projects\C--claude-workspace\memory"
    ) else (
        echo [警告] memory 是真实目录，跳过
        goto :end
    )
)
mklink /J "%USERPROFILE%\.claude\projects\C--claude-workspace\memory" "%ONEDRIVE%\claude\memory"
echo   完成

:end
echo.
echo 全部完成！请按任意键退出...
pause >nul
