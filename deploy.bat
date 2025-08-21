@echo off
chcp 65001 >nul
echo 🚀 开始部署到GitHub Pages...

echo 📋 检查Git状态...
git status

echo 📁 添加所有文件到Git...
git add .

echo 💾 提交更改...
git commit -m "Update for GitHub Pages deployment"

echo 📤 推送到GitHub...
git push origin main

echo ✅ 部署完成！
echo 🌐 你的博客将在几分钟后通过GitHub Actions自动部署
echo 📖 请确保在GitHub仓库设置中启用了GitHub Pages和GitHub Actions
pause 