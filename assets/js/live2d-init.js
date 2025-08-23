// Live2D Widget 本地模型初始化
(function() {
    'use strict';
    
    // 配置
    const config = {
        modelPath: '/yumi/yumi.model3.json',
        modelListPath: '/yumi/model_list.json',
        cdnPath: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/dist/',
        waifuPath: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/dist/waifu-tips.json'
    };
    
    // 检查Live2D支持
    function checkLive2DSupport() {
        if (typeof Live2DModel === 'undefined') {
            console.error('Live2D not supported');
            return false;
        }
        return true;
    }
    
    // 加载模型
    function loadModel() {
        if (!checkLive2DSupport()) return;
        
        try {
            // 使用Live2D Widget加载模型
            if (typeof Live2DWidget !== 'undefined') {
                Live2DWidget.init({
                    model: {
                        jsonPath: config.modelPath,
                        scale: 1.0
                    },
                    display: {
                        position: 'right',
                        width: 280,
                        height: 250,
                        hOffset: 0,
                        vOffset: 0
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
        } catch (error) {
            console.error('Failed to load Live2D model:', error);
        }
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadModel);
    } else {
        loadModel();
    }
    
    // 暴露配置给全局
    window.Live2DConfig = config;
})(); 