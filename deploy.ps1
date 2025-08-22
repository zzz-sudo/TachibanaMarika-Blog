# PowerShell 部署脚本 - 修复图片路径问题
# 使用方法: 在PowerShell中运行 .\deploy.ps1

Write-Host "🚀 开始部署到GitHub Pages..." -ForegroundColor Green

# 检查Git状态
Write-Host "📊 检查Git状态..." -ForegroundColor Yellow
git status

# 添加所有更改
Write-Host "📁 添加所有更改..." -ForegroundColor Yellow
git add .

# 提交更改
$commitMessage = "🔧 修复图片路径问题: 解决头像和背景图片404错误，修复basePath变量重复声明"
Write-Host "💾 提交更改: $commitMessage" -ForegroundColor Yellow
git commit -m $commitMessage

# 推送到远程仓库
Write-Host "📤 推送到GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "🌐 您的网站将在几分钟内在 https://zzz-sudo.github.io/TachibanaMarika-Blog/ 上更新" -ForegroundColor Cyan

Write-Host "`n📋 本次修复内容:" -ForegroundColor Magenta
Write-Host "• 修复了头像图片路径重复问题" -ForegroundColor White
Write-Host "• 修复了背景图片路径问题" -ForegroundColor White
Write-Host "• 解决了basePath变量重复声明错误" -ForegroundColor White
Write-Host "• 改进了路径修复器的CSS处理逻辑" -ForegroundColor White
Write-Host "• 添加了图片路径测试功能" -ForegroundColor White

Write-Host "`n🔍 测试建议:" -ForegroundColor Magenta
Write-Host "1. 访问 https://zzz-sudo.github.io/TachibanaMarika-Blog/simple-test.html" -ForegroundColor White
Write-Host "2. 检查浏览器控制台是否有错误" -ForegroundColor White
Write-Host "3. 验证头像和背景图片是否正常显示" -ForegroundColor White
Write-Host "4. 测试Live2D看板娘功能" -ForegroundColor White 