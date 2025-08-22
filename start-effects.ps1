# 网站特效启动脚本 (PowerShell版本)
# 设置控制台编码为UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   🎉 网站特效启动脚本 🎉" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "正在启动Jekyll服务器..." -ForegroundColor Green
Write-Host ""

# 检查是否安装了Jekyll
try {
    $jekyllVersion = jekyll --version 2>$null
    if ($jekyllVersion) {
        Write-Host "✅ Jekyll已安装，版本信息:" -ForegroundColor Green
        Write-Host $jekyllVersion -ForegroundColor White
        Write-Host ""
    } else {
        throw "Jekyll not found"
    }
} catch {
    Write-Host "❌ 错误: 未检测到Jekyll，请先安装Jekyll" -ForegroundColor Red
    Write-Host ""
    Write-Host "安装方法:" -ForegroundColor Yellow
    Write-Host "1. 安装Ruby: https://rubyinstaller.org/" -ForegroundColor White
    Write-Host "2. 安装Jekyll: gem install jekyll bundler" -ForegroundColor White
    Write-Host "3. 安装依赖: bundle install" -ForegroundColor White
    Write-Host ""
    Read-Host "按回车键退出"
    exit 1
}

# 检查Gemfile是否存在
if (-not (Test-Path "Gemfile")) {
    Write-Host "❌ 错误: 未找到Gemfile文件" -ForegroundColor Red
    Write-Host "请确保在正确的目录中运行此脚本" -ForegroundColor Yellow
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "🔍 检查依赖包..." -ForegroundColor Green
try {
    bundle install
    if ($LASTEXITCODE -ne 0) {
        throw "Bundle install failed"
    }
} catch {
    Write-Host "❌ 错误: 依赖包安装失败" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host ""
Write-Host "🚀 启动Jekyll服务器..." -ForegroundColor Green
Write-Host ""
Write-Host "📍 本地访问地址: http://localhost:4000" -ForegroundColor Cyan
Write-Host "📍 特效测试页面: http://localhost:4000/test/effects-test.html" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 提示:" -ForegroundColor Yellow
Write-Host "- 雪花特效会自动在所有页面显示" -ForegroundColor White
Write-Host "- 动态背景线条会在页面背景中显示" -ForegroundColor White
Write-Host "- 按 Ctrl+C 停止服务器" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 启动Jekyll服务器
try {
    bundle exec jekyll serve --livereload
} catch {
    Write-Host ""
    Write-Host "服务器已停止" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "按回车键退出" 