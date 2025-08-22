# 侧边栏控制器测试页面启动脚本
Write-Host "🚀 启动侧边栏控制器测试页面..." -ForegroundColor Green
Write-Host ""

# 显示当前目录
Write-Host "📁 当前目录: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# 检查Python是否可用
$pythonAvailable = $false
try {
    $pythonVersion = python --version 2>&1
    if ($pythonVersion -match "Python") {
        $pythonAvailable = $true
        Write-Host "🐍 检测到Python: $pythonVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  未检测到Python" -ForegroundColor Yellow
}

# 检查Node.js是否可用
$nodeAvailable = $false
try {
    $nodeVersion = node --version 2>&1
    if ($nodeVersion -match "v") {
        $nodeAvailable = $true
        Write-Host "📦 检测到Node.js: $nodeVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  未检测到Node.js" -ForegroundColor Yellow
}

Write-Host ""

# 启动服务器
if ($pythonAvailable) {
    Write-Host "🌐 使用Python启动本地服务器..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📖 请访问以下地址测试功能:" -ForegroundColor White
    Write-Host "   http://localhost:8000/sidebar-test.html" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔧 功能说明:" -ForegroundColor White
    Write-Host "   ✅ 左侧边栏左移功能" -ForegroundColor Green
    Write-Host "   ✅ 移除'最新文章'部分" -ForegroundColor Green
    Write-Host "   ✅ 右侧滚动条优化" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 测试步骤:" -ForegroundColor White
    Write-Host "   1. 打开页面后查看Telegram链接旁的'左移'提示" -ForegroundColor Cyan
    Write-Host "   2. 点击蓝色按钮测试侧边栏左移" -ForegroundColor Cyan
    Write-Host "   3. 查看'最新文章'标题上的'移除'提示" -ForegroundColor Cyan
    Write-Host "   4. 滚动页面测试右侧滚动条" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚪 按Ctrl+C停止服务器" -ForegroundColor Red
    Write-Host ""
    
    try {
        python -m http.server 8000
    } catch {
        Write-Host "❌ 启动Python服务器失败: $_" -ForegroundColor Red
    }
} elseif ($nodeAvailable) {
    Write-Host "🌐 使用Node.js启动本地服务器..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📖 请访问以下地址测试功能:" -ForegroundColor White
    Write-Host "   http://localhost:3000/sidebar-test.html" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔧 功能说明:" -ForegroundColor White
    Write-Host "   ✅ 左侧边栏左移功能" -ForegroundColor Green
    Write-Host "   ✅ 移除'最新文章'部分" -ForegroundColor Green
    Write-Host "   ✅ 右侧滚动条优化" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 测试步骤:" -ForegroundColor White
    Write-Host "   1. 打开页面后查看Telegram链接旁的'左移'提示" -ForegroundColor Cyan
    Write-Host "   2. 点击蓝色按钮测试侧边栏左移" -ForegroundColor Cyan
    Write-Host "   3. 查看'最新文章'标题上的'移除'提示" -ForegroundColor Cyan
    Write-Host "   4. 滚动页面测试右侧滚动条" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚪 按Ctrl+C停止服务器" -ForegroundColor Red
    Write-Host ""
    
    try {
        npx http-server -p 3000
    } catch {
        Write-Host "❌ 启动Node.js服务器失败: $_" -ForegroundColor Red
    }
} else {
    Write-Host "❌ 未检测到可用的服务器环境" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 建议安装以下任一环境:" -ForegroundColor Yellow
    Write-Host "   - Python 3.x" -ForegroundColor Cyan
    Write-Host "   - Node.js" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚪 按任意键退出..." -ForegroundColor White
    Read-Host
} 