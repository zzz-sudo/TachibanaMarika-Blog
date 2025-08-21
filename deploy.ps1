# GitHub Pages 部署脚本
# 使用方法: .\deploy.ps1

Write-Host "🚀 开始部署到GitHub Pages..." -ForegroundColor Green

# 检查Git状态
Write-Host "📋 检查Git状态..." -ForegroundColor Yellow
git status

# 添加所有文件
Write-Host "📁 添加所有文件到Git..." -ForegroundColor Yellow
git add .

# 提交更改
$commitMessage = Read-Host "请输入提交信息 (默认: Update for GitHub Pages deployment)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update for GitHub Pages deployment"
}

Write-Host "💾 提交更改: $commitMessage" -ForegroundColor Yellow
git commit -m $commitMessage

# 推送到远程仓库
Write-Host "📤 推送到GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "🌐 你的博客将在几分钟后通过GitHub Actions自动部署" -ForegroundColor Cyan
Write-Host "📖 请确保在GitHub仓库设置中启用了GitHub Pages和GitHub Actions" -ForegroundColor Cyan 