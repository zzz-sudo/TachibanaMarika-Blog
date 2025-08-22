// 简化的Live2D实现
function createSimpleLive2D() {
    // 创建Live2D容器
    const live2dContainer = document.createElement('div');
    live2dContainer.id = 'simple-live2d';
    live2dContainer.style.cssText = `
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 200px;
        height: 200px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    live2dContainer.innerHTML = '看板娘<br>点击互动';
    
    // 添加悬停效果
    live2dContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'linear-gradient(45deg, #4ecdc4, #ff6b6b)';
    });
    
    live2dContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
    });
    
    // 添加点击事件
    live2dContainer.addEventListener('click', function() {
        const messages = [
            '你好！我是看板娘~',
            '今天也要加油哦！',
            '有什么想和我说的吗？',
            '今天天气真不错呢~',
            '工作辛苦了！',
            '要记得休息哦~'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // 显示消息
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            position: absolute;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10000;
        `;
        messageBox.textContent = randomMessage;
        
        live2dContainer.appendChild(messageBox);
        
        // 3秒后移除消息
        setTimeout(() => {
            if (messageBox.parentNode) {
                messageBox.remove();
            }
        }, 3000);
    });
    
    // 添加到页面
    document.body.appendChild(live2dContainer);
    
    console.log('简化Live2D看板娘已创建');
}

// 页面加载完成后创建
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createSimpleLive2D, 2000);
}); 