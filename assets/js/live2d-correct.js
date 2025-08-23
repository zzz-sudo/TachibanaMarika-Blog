// 正确的Live2D配置 - 使用stevenjoezhang/live2d-widget框架
console.log('🎭 启动正确的Live2D配置');

// 配置
const config = {
    waifuPath: '/yumi/waifu-tips.json',
    cdnPath: '/yumi/',
    cubism2Path: '/assets/live2d-framework/live2d.min.js',
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
    logLevel: 'warn',
    drag: true
};
    
    // 创建waifu-tips.json配置
    function createWaifuTipsConfig() {
        const waifuConfig = {
            "models": ["yumi"],
            "messages": {
                "yumi": "欢迎来到我的博客！我是yumi看板娘~",
                "default": [
                    "欢迎来到我的博客！",
                    "今天也要加油哦！",
                    "有什么可以帮助你的吗？"
                ]
            },
            "time": [
                {
                    "hour": "0-6",
                    "text": "夜深了，要注意休息哦~"
                },
                {
                    "hour": "6-12", 
                    "text": "早上好！新的一天开始了！"
                },
                {
                    "hour": "12-18",
                    "text": "下午好！工作辛苦了！"
                },
                {
                    "hour": "18-24",
                    "text": "晚上好！今天过得怎么样？"
                }
            ],
            "mouseover": [
                {
                    "selector": "a",
                    "text": "要点击这个链接吗？"
                }
            ],
            "click": [
                {
                    "selector": "a",
                    "text": "你点击了链接：{text}"
                }
            ],
            "seasons": [
                {
                    "date": "1/1",
                    "text": "新年快乐！{year}年开始了！"
                }
            ],
            "message": {
                "welcome": "欢迎来到我的博客！",
                "referrer": "来自 {text} 的访问",
                "console": "欢迎来到控制台！",
                "copy": "复制成功！",
                "visibilitychange": "欢迎回来！",
                "hoverBody": "你在摸我吗？",
                "tapBody": "你戳了我一下！",
                "hitokoto": "一言：{text}",
                "changeSuccess": "换装成功！",
                "changeFail": "换装失败...",
                "photo": "拍照成功！",
                "goodbye": "再见！"
            }
        };
        
        return waifuConfig;
    }
    
    // 创建model_list.json配置
    function createModelListConfig() {
        const modelConfig = {
            "models": [
                {
                    "name": "yumi",
                    "model": "yumi.model3.json",
                    "textures": [
                        "yumi.8192/texture_00.png"
                    ],
                    "motions": [
                        "wave.motion3.json",
                        "tear.motion3.json"
                    ],
                    "expressions": [
                        "星星眼.exp3.json",
                        "爱心眼.exp3.json",
                        "泪汪汪.exp3.json",
                        "歪嘴.exp3.json",
                        "猫猫嘴.exp3.json",
                        "眼罩.exp3.json",
                        "短发1.exp3.json",
                        "短发2.exp3.json",
                        "舌头伸出.exp3.json",
                        "蚊香眼.exp3.json",
                        "黑脸.exp3.json",
                        "俯身按键.exp3.json",
                        "抬手右.exp3.json",
                        "抬手左.exp3.json",
                        "拿话筒.exp3.json",
                        "漂浮小狗.exp3.json",
                        "眼泪.exp3.json"
                    ]
                }
            ]
        };
        
        return modelConfig;
    }
    
    // 创建yumi的index.json配置
    function createYumiIndexConfig() {
        const indexConfig = {
            "Version": 3,
            "FileReferences": {
                "Moc": "yumi.moc3",
                "Textures": [
                    "yumi.8192/texture_00.png"
                ],
                "Physics": "yumi.physics3.json",
                "Motions": {
                    "Idle": [
                        {
                            "File": "wave.motion3.json",
                            "Sound": ""
                        }
                    ],
                    "Tap": [
                        {
                            "File": "tear.motion3.json",
                            "Sound": ""
                        }
                    ]
                },
                "Expressions": [
                    {
                        "Name": "星星眼",
                        "File": "星星眼.exp3.json"
                    },
                    {
                        "Name": "爱心眼", 
                        "File": "爱心眼.exp3.json"
                    },
                    {
                        "Name": "泪汪汪",
                        "File": "泪汪汪.exp3.json"
                    },
                    {
                        "Name": "歪嘴",
                        "File": "歪嘴.exp3.json"
                    },
                    {
                        "Name": "猫猫嘴",
                        "File": "猫猫嘴.exp3.json"
                    },
                    {
                        "Name": "眼罩",
                        "File": "眼罩.exp3.json"
                    },
                    {
                        "Name": "短发1",
                        "File": "短发1.exp3.json"
                    },
                    {
                        "Name": "短发2",
                        "File": "短发2.exp3.json"
                    },
                    {
                        "Name": "舌头伸出",
                        "File": "舌头伸出.exp3.json"
                    },
                    {
                        "Name": "蚊香眼",
                        "File": "蚊香眼.exp3.json"
                    },
                    {
                        "Name": "黑脸",
                        "File": "黑脸.exp3.json"
                    },
                    {
                        "Name": "俯身按键",
                        "File": "俯身按键.exp3.json"
                    },
                    {
                        "Name": "抬手右",
                        "File": "抬手右.exp3.json"
                    },
                    {
                        "Name": "抬手左",
                        "File": "抬手左.exp3.json"
                    },
                    {
                        "Name": "拿话筒",
                        "File": "拿话筒.exp3.json"
                    },
                    {
                        "Name": "漂浮小狗",
                        "File": "漂浮小狗.exp3.json"
                    },
                    {
                        "Name": "眼泪",
                        "File": "眼泪.exp3.json"
                    }
                ]
            },
            "Groups": [
                {
                    "Target": "Parameter",
                    "Name": "LipSync",
                    "Ids": ["ParamMouthOpenY"]
                },
                {
                    "Target": "Parameter", 
                    "Name": "EyeBlink",
                    "Ids": ["ParamEyeLOpen", "ParamEyeROpen"]
                }
            ],
            "HitAreas": [
                {
                    "Name": "Head",
                    "Id": "D_HitArea_Head"
                },
                {
                    "Name": "Body",
                    "Id": "D_HitArea_Body"
                }
            ]
        };
        
        return indexConfig;
    }
    
    // 初始化Live2D
    async function initLive2D() {
        // 创建必要的配置文件
        const waifuConfig = createWaifuTipsConfig();
        const modelConfig = createModelListConfig();
        const indexConfig = createYumiIndexConfig();
        
        // 将配置写入localStorage以便后续使用
        localStorage.setItem('waifu-tips-config', JSON.stringify(waifuConfig));
        localStorage.setItem('model-list-config', JSON.stringify(indexConfig));
        localStorage.setItem('yumi-index-config', JSON.stringify(indexConfig));
        
        console.log('✅ Live2D配置文件创建完成');
        
        // 加载Live2D框架
        await loadLive2DFramework();
    }
    
    // 加载Live2D框架
    async function loadLive2DFramework() {
        console.log('🔄 开始加载本地Live2D框架...');
        
        // 加载CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/assets/live2d-framework/waifu.css';
        document.head.appendChild(link);
        
        try {
            // 使用ES6模块导入
            const { default: live2dModule } = await import('/assets/live2d-framework/waifu-tips.js');
            console.log('✅ Live2D框架加载完成');
            
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
            <div style="font-size: 14px;">请检查文件路径或刷新页面重试</div>
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
        document.addEventListener('DOMContentLoaded', initLive2D);
    } else {
        initLive2D();
    }
    
    // 暴露配置到全局
    window.Live2DConfig = config; 