// Live2D Widget Configuration
window.Live2DConfig = {
    // 模型配置
    model: {
        path: '/yumi/yumi.model3.json',
        scale: 1.0,
        position: { x: 0, y: 0 }
    },
    
    // 显示设置
    display: {
        width: 280,
        height: 250,
        position: 'right', // left, right
        offset: { x: 0, y: 0 }
    },
    
    // 交互设置
    interaction: {
        enable: true,
        hover: true,
        click: true,
        drag: true
    },
    
    // 动画设置
    animation: {
        idle: true,
        blink: true,
        physics: true
    }
};

// 初始化Live2D
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Live2DWidget !== 'undefined') {
        Live2DWidget.init({
            model: {
                jsonPath: window.Live2DConfig.model.path,
                scale: window.Live2DConfig.model.scale
            },
            display: {
                position: window.Live2DConfig.display.position,
                width: window.Live2DConfig.display.width,
                height: window.Live2DConfig.display.height,
                hOffset: window.Live2DConfig.display.offset.x,
                vOffset: window.Live2DConfig.display.offset.y
            },
            dialog: {
                enable: true,
                script: {
                    'every page load': '欢迎来到我的博客！',
                    'click': '你点击了我！',
                    'hover': '你在看我吗？'
                }
            },
            l2d: {
                enable: true,
                logLevel: 'warn'
            }
        });
    }
}); 