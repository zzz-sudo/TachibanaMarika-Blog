// 正确的Live2D配置 - 使用官方live2d-widget
console.log('🎭 启动Live2D配置');

// 动态获取基础路径
function getLive2DBasePath() {
    // 检测是否在GitHub Pages上
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    if (hostname.includes('github.io')) {
        // GitHub Pages环境，提取仓库名作为基础路径
        const pathParts = pathname.split('/').filter(part => part);
        if (pathParts.length > 0) {
            return '/' + pathParts[0];
        }
    }
    
    // 本地开发环境或其他环境
    return '';
}

const live2dBasePath = getLive2DBasePath();
console.log('🔧 检测到Live2D基础路径:', live2dBasePath);

// 配置
const config = {
    waifuPath: live2dBasePath + '/assets/live2d-framework/waifu-tips.json',
    cdnPath: live2dBasePath + '/yumi/',
    cubism2Path: live2dBasePath + '/assets/live2d-framework/live2d.min.js',
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
    logLevel: 'info',
    drag: true,
    models: [{
        name: "yumi",
        paths: [live2dBasePath + '/yumi/yumi.model3.json'],
        message: "欢迎来到我的博客！我是yumi看板娘~"
    }]
};

// 初始化Live2D
async function initLive2D() {
    console.log('🎯 开始初始化Live2D...');
    
    try {
        // 加载Live2D框架
        await loadLive2DFramework();
        
    } catch (error) {
        console.error('❌ Live2D初始化失败:', error);
        showFallbackMessage('Live2D初始化失败: ' + error.message);
    }
}

// 加载Live2D框架
async function loadLive2DFramework() {
    console.log('🔄 开始加载Live2D框架...');
    
    try {
        // 加载CSS
        const cssPath = live2dBasePath + '/assets/live2d-framework/waifu.css';
        console.log('🔧 尝试加载CSS文件:', cssPath);
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
        
        // 等待CSS加载完成
        await new Promise((resolve) => {
            link.onload = resolve;
            link.onerror = resolve; // 即使CSS加载失败也继续
        });
        
        // 加载主要的JavaScript文件 - 使用ES6模块方式
        const jsPath = live2dBasePath + '/assets/live2d-framework/waifu-tips.js';
        console.log('🔧 尝试加载JS文件:', jsPath);
        
        // 创建script标签加载JS文件，使用ES6模块
        const script = document.createElement('script');
        script.src = jsPath;
        script.type = 'module';
        
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
        
        console.log('✅ Live2D框架加载完成');
        
        // 等待一下确保initWidget函数可用
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // 检查是否有initWidget函数
        if (typeof window.initWidget !== 'undefined') {
            console.log('🎯 调用initWidget，配置:', config);
            window.initWidget(config);
        } else {
            console.error('❌ initWidget函数未找到');
            showFallbackMessage('initWidget函数未找到');
        }
        
    } catch (error) {
        console.error('❌ Live2D框架加载失败:', error);
        showFallbackMessage('Live2D框架加载失败: ' + error.message);
    }
}

// 显示备用消息
function showFallbackMessage(message) {
    console.log('🔄 显示备用消息:', message);
    
    // 创建备用容器
    const fallback = document.createElement('div');
    fallback.id = 'waifu-fallback';
    fallback.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        width: 280px;
        height: 250px;
        background: linear-gradient(145deg, #ff9a9e, #fecfef);
        border: 2px solid #ddd;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #333;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    `;
    
    fallback.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 10px;">🎭</div>
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">Live2D 看板娘</div>
        <div style="font-size: 12px; color: #666;">${message}</div>
        <div style="font-size: 12px; color: #999; margin-top: 10px;">正在尝试修复...</div>
    `;
    
    document.body.appendChild(fallback);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (fallback.parentNode) {
            fallback.parentNode.removeChild(fallback);
        }
    }, 3000);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLive2D);
} else {
    initLive2D();
} 