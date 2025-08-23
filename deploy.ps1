# TachibanaMarika 博客部署脚本 (PowerShell)

Write-Host "🚀 开始部署博客..." -ForegroundColor Green

# 检查是否有未提交的更改
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  发现未提交的更改，请先提交或暂存更改" -ForegroundColor Yellow
    git status
    Read-Host "按回车键退出"
    exit 1
}

# 拉取最新代码
Write-Host "📥 拉取最新代码..." -ForegroundColor Blue
git pull origin main

# 添加所有更改
Write-Host "📝 添加更改到暂存区..." -ForegroundColor Blue
git add .

# 提交更改
Write-Host "💾 提交更改..." -ForegroundColor Blue
$commitMessage = Read-Host "请输入提交信息"
git commit -m $commitMessage

# 推送到远程仓库
Write-Host "🚀 推送到远程仓库..." -ForegroundColor Blue
git push origin main

Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "🌐 网站将在几分钟后更新: https://zzz-sudo.github.io/TachibanaMarika-Blog/" -ForegroundColor Cyan
Write-Host "📊 查看部署状态: https://github.com/zzz-sudo/TachibanaMarika-Blog/actions" -ForegroundColor Cyan

Read-Host "按回车键退出" 