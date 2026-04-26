#!/bin/bash
# Claude 同步链接设置工具 (Bash 版本，适用于 Git Bash)

# 自动检测 OneDrive 路径
if [ -n "$OneDrive" ]; then
  ONEDRIVE="$OneDrive"
elif [ -n "$OneDriveCommercial" ]; then
  ONEDRIVE="$OneDriveCommercial"
else
  ONEDRIVE="$USERPROFILE/OneDrive"
fi
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "========================================"
echo " Claude 同步链接设置工具 (Bash)"
echo "========================================"
echo ""

# 检查 OneDrive 目录
if [ ! -d "$ONEDRIVE/claude/project-claude" ]; then
  echo "[错误] 未找到 $ONEDRIVE/claude/project-claude/"
  echo "请先在 OneDrive 上确认同步完成后再运行本脚本。"
  exit 1
fi

# ========== 链接 1: 项目 .claude ==========
echo "[1/2] 设置项目 .claude 链接..."
CLAUDE_DIR="$PROJECT_DIR/.claude"
if [ -L "$CLAUDE_DIR" ] || [ -d "$CLAUDE_DIR" ]; then
  rm -rf "$CLAUDE_DIR"
fi
powershell.exe -Command "New-Item -ItemType Junction -Path '$CLAUDE_DIR' -Target \"$ONEDRIVE/claude/project-claude\" -Force" > /dev/null
echo "  完成"

# ========== 链接 2: 全局记忆 ==========
echo "[2/2] 设置 Claude 记忆链接..."
MEMORY_PARENT="$USERPROFILE/.claude/projects/C--claude-workspace"
MEMORY_DIR="$MEMORY_PARENT/memory"
mkdir -p "$MEMORY_PARENT"
if [ -L "$MEMORY_DIR" ] || [ -d "$MEMORY_DIR" ]; then
  rm -rf "$MEMORY_DIR"
fi
powershell.exe -Command "New-Item -ItemType Junction -Path '$MEMORY_DIR' -Target \"$ONEDRIVE/claude/memory\" -Force" > /dev/null
echo "  完成"

echo ""
echo "全部完成！"
