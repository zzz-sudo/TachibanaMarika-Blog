@echo off
chcp 65001 >nul
echo 🚀 开始部署博客...

REM 检查是否有未提交的更改
git status --porcelain >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  发现未提交的更改，请先提交或暂存更改
    git status
    pause
    exit /b 1
)

REM 拉取最新代码
echo 📥 拉取最新代码...
git pull origin main

REM 添加所有更改
echo 📝 添加更改到暂存区...
git add .

REM 提交更改
echo 💾 提交更改...
set /p commit_message="请输入提交信息: "
git commit -m "%commit_message%"

REM 推送到远程仓库
echo 🚀 推送到远程仓库...
git push origin main

echo ✅ 部署完成！
echo 🌐 网站将在几分钟后更新: https://zzz-sudo.github.io/TachibanaMarika-Blog/
echo 📊 查看部署状态: https://github.com/zzz-sudo/TachibanaMarika-Blog/actions
pause 