// 正确的Live2D配置 - 简化版本
console.log('🎭 启动简化的Live2D配置');

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

// 简化的配置
const config = {
    waifuPath: live2dBasePath + '/yumi/waifu-tips.json',
    cdnPath: live2dBasePath + '/yumi/',
    logLevel: 'info',
    drag: true
};

// 简化的Live2D初始化
async function initSimpleLive2D() {
    console.log('🎯 开始初始化简化的Live2D...');
    
    try {
        // 创建Live2D容器
        createLive2DContainer();
        
        // 加载模型
        await loadSimpleModel();
        
        console.log('✅ 简化Live2D初始化完成');
    } catch (error) {
        console.error('❌ 简化Live2D初始化失败:', error);
        showFallbackMessage('简化Live2D初始化失败: ' + error.message);
    }
}

// 创建Live2D容器
function createLive2DContainer() {
    // 检查是否已存在
    if (document.getElementById('waifu')) {
        console.log('✅ Live2D容器已存在');
        return;
    }
    
    // 创建容器
    const container = document.createElement('div');
    container.id = 'waifu';
    container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        width: 280px;
        height: 250px;
        pointer-events: auto;
    `;
    
    // 创建Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'live2d';
    canvas.width = 280;
    canvas.height = 250;
    canvas.style.cssText = `
        width: 100%;
        height: 100%;
        border: 2px solid #ddd;
        border-radius: 10px;
        background: linear-gradient(145deg, #ff9a9e, #fecfef);
        cursor: pointer;
    `;
    
    // 创建提示区域
    const tips = document.createElement('div');
    tips.id = 'waifu-tips';
    tips.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 8px;
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
        pointer-events: none;
    `;
    tips.textContent = '🎭 yumi看板娘';
    
    // 创建工具区域
    const tools = document.createElement('div');
    tools.id = 'waifu-tool';
    tools.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        gap: 5px;
    `;
    
    // 添加工具按钮
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        background: rgba(255,0,0,0.8);
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 12px;
    `;
    closeBtn.onclick = () => {
        container.style.display = 'none';
        // 显示切换按钮
        showToggleButton();
    };
    
    tools.appendChild(closeBtn);
    
    // 组装容器
    container.appendChild(canvas);
    container.appendChild(tips);
    container.appendChild(tools);
    
    // 添加到页面
    document.body.appendChild(container);
    
    console.log('✅ Live2D容器创建成功');
    
    // 添加拖拽功能
    addDragFunctionality(container);
    
    // 添加交互功能
    addInteractionFunctionality(canvas, tips);
}

// 加载简化模型
async function loadSimpleModel() {
    try {
        // 尝试加载模型配置
        const modelResponse = await fetch(config.waifuPath);
        if (!modelResponse.ok) {
            throw new Error(`模型配置加载失败: ${modelResponse.status}`);
        }
        
        const modelConfig = await modelResponse.json();
        console.log('✅ 模型配置加载成功:', modelConfig);
        
        // 显示欢迎消息
        showWelcomeMessage(modelConfig);
        
        // 尝试加载模型文件
        const modelPath = live2dBasePath + '/yumi/yumi.model3.json';
        const modelFileResponse = await fetch(modelPath);
        if (!modelFileResponse.ok) {
            throw new Error(`模型文件加载失败: ${modelFileResponse.status}`);
        }
        
        const modelData = await modelFileResponse.json();
        console.log('✅ 模型文件加载成功:', modelData);
        
        // 显示模型信息
        showModelInfo(modelData);
        
    } catch (error) {
        console.error('❌ 模型加载失败:', error);
        showFallbackContent();
    }
}

// 显示欢迎消息
function showWelcomeMessage(config) {
    const tips = document.getElementById('waifu-tips');
    if (tips && config.messages && config.messages.yumi) {
        tips.textContent = config.messages.yumi;
        
        // 3秒后恢复默认文本
        setTimeout(() => {
            tips.textContent = '🎭 yumi看板娘';
        }, 3000);
    }
}

// 显示模型信息
function showModelInfo(modelData) {
    const tips = document.getElementById('waifu-tips');
    if (tips && modelData.Version) {
        tips.textContent = `🎭 yumi (v${modelData.Version})`;
        
        // 2秒后恢复默认文本
        setTimeout(() => {
            tips.textContent = '🎭 yumi看板娘';
        }, 2000);
    }
}

// 显示备用内容
function showFallbackContent() {
    const canvas = document.getElementById('live2d');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#ff9a9e');
    gradient.addColorStop(1, '#fecfef');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制可爱的图案
    ctx.fillStyle = '#ff6b9d';
    drawHeart(ctx, canvas.width/2, canvas.height/2 + 30, 8);
    
    ctx.fillStyle = '#ffd700';
    drawStar(ctx, canvas.width/2 - 40, canvas.height/2 - 40, 5);
    drawStar(ctx, canvas.width/2 + 40, canvas.height/2 - 40, 5);
    
    // 绘制文字
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🎭', canvas.width/2, canvas.height/2 - 20);
    ctx.fillText('yumi', canvas.width/2, canvas.height/2 + 10);
    
    console.log('🔄 显示备用内容');
}

// 绘制心形
function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size);
    ctx.bezierCurveTo(x, y, x - size, y, x - size, y + size);
    ctx.bezierCurveTo(x - size, y + size * 2, x, y + size * 3, x, y + size * 3);
    ctx.bezierCurveTo(x, y + size * 3, x + size, y + size * 2, x + size, y + size);
    ctx.bezierCurveTo(x + size, y, x, y, x, y + size);
    ctx.fill();
}

// 绘制星星
function drawStar(ctx, x, y, size) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5;
        const x1 = x + size * Math.cos(angle);
        const y1 = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
    }
    ctx.closePath();
    ctx.fill();
}

// 添加拖拽功能
function addDragFunctionality(container) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    container.addEventListener('mousedown', function(e) {
        if (e.target.id === 'live2d') {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(container.style.left) || 0;
            startTop = parseInt(container.style.top) || 0;
            container.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        container.style.left = (startLeft + deltaX) + 'px';
        container.style.top = (startTop + deltaY) + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = 'pointer';
        }
    });
}

// 添加交互功能
function addInteractionFunctionality(canvas, tips) {
    let clickCount = 0;
    
    canvas.addEventListener('click', function() {
        clickCount++;
        
        // 显示点击消息
        const messages = [
            '你点击了我！',
            '不要戳我啦~',
            '好痒啊！',
            '你是在和我玩吗？',
            '再戳我就生气了！'
        ];
        
        const message = messages[clickCount % messages.length];
        tips.textContent = message;
        
        // 添加点击动画
        canvas.style.transform = 'scale(0.95)';
        setTimeout(() => {
            canvas.style.transform = 'scale(1)';
        }, 150);
        
        // 3秒后恢复默认文本
        setTimeout(() => {
            tips.textContent = '🎭 yumi看板娘';
        }, 3000);
    });
    
    canvas.addEventListener('mouseenter', function() {
        canvas.style.transform = 'scale(1.05)';
        tips.textContent = '你在看我吗？';
    });
    
    canvas.addEventListener('mouseleave', function() {
        canvas.style.transform = 'scale(1)';
        tips.textContent = '🎭 yumi看板娘';
    });
}

// 显示切换按钮
function showToggleButton() {
    // 检查是否已存在切换按钮
    if (document.getElementById('waifu-toggle')) return;
    
    const toggle = document.createElement('div');
    toggle.id = 'waifu-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        width: 60px;
        height: 60px;
        background: rgba(0,0,0,0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        font-size: 24px;
    `;
    toggle.innerHTML = '🎭';
    toggle.title = '显示看板娘';
    
    toggle.onclick = function() {
        const container = document.getElementById('waifu');
        if (container) {
            container.style.display = 'block';
            this.remove();
        }
    };
    
    document.body.appendChild(toggle);
}

// 显示备用消息
function showFallbackMessage(message = 'Live2D加载失败') {
    console.log('🔄 显示备用消息:', message);
    
    // 创建一个简单的提示
    const fallback = document.createElement('div');
    fallback.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px;
        border-radius: 10px;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    fallback.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px;">🎭 ${message}</div>
        <div style="font-size: 14px;">使用简化版本显示</div>
    `;
    document.body.appendChild(fallback);
    
    // 5秒后自动隐藏
    setTimeout(() => {
        fallback.style.opacity = '0';
        fallback.style.transition = 'opacity 0.5s';
        setTimeout(() => fallback.remove(), 500);
    }, 5000);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimpleLive2D);
} else {
    initSimpleLive2D();
}

// 暴露配置到全局
window.Live2DConfig = config; 