@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    🎉 网站特效启动脚本 🎉
echo ========================================
echo.
echo 正在启动Jekyll服务器...
echo.

REM 检查是否安装了Jekyll
jekyll --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未检测到Jekyll，请先安装Jekyll
    echo.
    echo 安装方法:
    echo 1. 安装Ruby: https://rubyinstaller.org/
    echo 2. 安装Jekyll: gem install jekyll bundler
    echo 3. 安装依赖: bundle install
    echo.
    pause
    exit /b 1
)

echo ✅ Jekyll已安装，版本信息:
jekyll --version
echo.

REM 检查Gemfile是否存在
if not exist "Gemfile" (
    echo ❌ 错误: 未找到Gemfile文件
    echo 请确保在正确的目录中运行此脚本
    pause
    exit /b 1
)

echo 🔍 检查依赖包...
bundle install
if %errorlevel% neq 0 (
    echo ❌ 错误: 依赖包安装失败
    pause
    exit /b 1
)

echo.
echo 🚀 启动Jekyll服务器...
echo.
echo 📍 本地访问地址: http://localhost:4000
echo 📍 特效测试页面: http://localhost:4000/test/effects-test.html
echo.
echo 💡 提示:
echo - 雪花特效会自动在所有页面显示
echo - 动态背景线条会在页面背景中显示
echo - 按 Ctrl+C 停止服务器
echo.
echo ========================================
echo.

REM 启动Jekyll服务器
bundle exec jekyll serve --livereload

echo.
echo 服务器已停止
pause 