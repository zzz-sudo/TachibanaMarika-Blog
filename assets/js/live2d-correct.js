// 正确的Live2D配置
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
    waifuPath: live2dBasePath + '/yumi/waifu-tips.json',
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
        // 创建Live2D配置文件
        createLive2DConfig();
        
        // 加载Live2D框架
        await loadLive2DFramework();
        
    } catch (error) {
        console.error('❌ Live2D初始化失败:', error);
        showFallbackMessage('Live2D初始化失败: ' + error.message);
    }
}

// 创建Live2D配置文件
function createLive2DConfig() {
    console.log('🎯 创建Live2D配置文件...');
    
    // 检查是否已存在配置
    if (localStorage.getItem('live2d-config')) {
        console.log('✅ Live2D配置文件已存在');
        return;
    }
    
    // 创建默认配置
    const defaultConfig = {
        models: config.models,
        messages: {
            yumi: "欢迎来到我的博客！我是yumi看板娘~",
            default: [
                "欢迎来到我的博客！",
                "今天也要加油哦！",
                "有什么可以帮助你的吗？",
                "我是yumi，很高兴认识你！",
                "今天天气真不错呢~",
                "学习新知识真有趣！",
                "累了就休息一下吧~",
                "记得多喝水哦！",
                "今天也要开开心心的！",
                "你看起来有点累呢，要不要休息一下？",
                "我一直在你身边哦，不会离开的！",
                "有什么烦恼可以和我聊聊~",
                "你是我最好的朋友！",
                "我会一直陪着你学习的！",
                "今天也要保持好心情哦~",
                "你真的很棒呢！",
                "有什么问题都可以问我哦~",
                "我会一直在这里等你的！",
                "你不在的时候我会想你的~",
                "我们永远都是好朋友！"
            ]
        },
        time: [
            { hour: "0-6", text: "夜深了，要注意休息哦~" },
            { hour: "6-9", text: "早上好！新的一天开始了！" },
            { hour: "9-12", text: "上午好！工作学习加油！" },
            { hour: "12-14", text: "中午好！记得吃午饭哦~" },
            { hour: "14-18", text: "下午好！工作辛苦了！" },
            { hour: "18-21", text: "晚上好！今天过得怎么样？" },
            { hour: "21-24", text: "夜深了，早点休息吧~" }
        ],
        mouseover: [
            { selector: "a", text: "要点击这个链接吗？" },
            { selector: "h1", text: "这个标题看起来很有趣呢~" },
            { selector: "p", text: "你在看这篇文章吗？" },
            { selector: "img", text: "这张图片真好看！" },
            { selector: "code", text: "代码看起来好复杂呢~" }
        ],
        click: [
            { selector: "a", text: "你点击了链接！" },
            { selector: "button", text: "你点击了按钮！" }
        ],
        tapBody: [
            "你戳了我一下！不要这样啦~",
            "哎呀，你戳疼我了！",
            "你是在和我玩吗？",
            "不要戳我啦，我会生气的！",
            "你戳我，我也要戳你！",
            "好痒啊，不要戳了~",
            "你是在测试我的反应吗？",
            "戳戳戳，就知道戳我！",
            "你再戳我，我就哭给你看！",
            "戳我干嘛？想和我聊天吗？"
        ]
    };
    
    // 保存到本地存储
    localStorage.setItem('live2d-config', JSON.stringify(defaultConfig));
    console.log('✅ Live2D配置文件创建完成');
}

// 加载Live2D框架
async function loadLive2DFramework() {
    console.log('🔄 开始加载本地Live2D框架...');
    
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
        
        // 加载主要的JavaScript文件
        const jsPath = live2dBasePath + '/assets/live2d-framework/waifu-tips.js';
        console.log('🔧 尝试加载JS文件:', jsPath);
        
        // 创建script标签加载JS文件
        const script = document.createElement('script');
        script.src = jsPath;
        script.type = 'text/javascript';
        
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
        console.error('❌ 本地Live2D框架加载失败:', error);
        showFallbackMessage('本地Live2D框架加载失败: ' + error.message);
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