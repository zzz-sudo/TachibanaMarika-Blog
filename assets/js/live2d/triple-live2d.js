// 三位置Live2D实现
class TripleLive2D {
    constructor() {
        this.models = [
            {
                id: 'left-model',
                position: 'left',
                modelPath: '/assets/2d/MIHARI/Mihari_V1.model3.json',
                name: 'MIHARI',
                x: 20,
                y: 'bottom'
            },
            {
                id: 'center-model',
                position: 'center',
                modelPath: '/assets/2d/Rory_VTS/Roxy_V1.model3.json',
                name: 'Rory',
                x: 'center',
                y: 'bottom'
            },
            {
                id: 'right-model',
                position: 'right',
                modelPath: '/assets/2d/alya/Alya.model3.json',
                name: 'Alya',
                x: 'right',
                y: 'bottom'
            }
        ];
        
        this.init();
    }
    
    init() {
        // 等待页面加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createModels());
        } else {
            this.createModels();
        }
    }
    
    createModels() {
        this.models.forEach((model, index) => {
            setTimeout(() => {
                this.createSingleModel(model, index);
            }, index * 1000); // 依次创建，避免同时加载
        });
    }
    
    createSingleModel(model, index) {
        // 创建Live2D容器
        const container = document.createElement('div');
        container.id = model.id;
        container.className = 'live2d-model-container';
        
        // 设置位置样式
        let left, right, transform = '';
        if (model.x === 'center') {
            left = '50%';
            transform = 'translateX(-50%)';
        } else if (model.x === 'right') {
            right = 20;
        } else {
            left = model.x;
        }
        
        container.style.cssText = `
            position: fixed;
            ${left ? `left: ${left};` : ''}
            ${right ? `right: ${right};` : ''}
            bottom: 20px;
            width: 200px;
            height: 200px;
            z-index: ${9999 + index};
            ${model.x === 'center' ? 'transform: translateX(-50%);' : ''}
        `;
        
        // 创建模型预览（使用图片）
        const preview = document.createElement('div');
        preview.className = 'model-preview';
        preview.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            text-align: center;
            line-height: 1.2;
        `;
        
        preview.innerHTML = `${model.name}<br>Live2D模型<br>点击加载`;
        
        // 添加悬停效果
        preview.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'linear-gradient(45deg, #4ecdc4, #ff6b6b)';
        });
        
        preview.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
        });
        
        // 添加点击事件
        preview.addEventListener('click', () => {
            this.loadLive2DModel(model, container);
        });
        
        container.appendChild(preview);
        document.body.appendChild(container);
        
        console.log(`${model.name} Live2D容器已创建在${model.position}位置`);
    }
    
    loadLive2DModel(model, container) {
        // 检查是否已加载Live2D库
        if (typeof Live2DCubismCore === 'undefined') {
            console.log('Live2D库未加载，显示提示信息');
            this.showModelInfo(model, container);
            return;
        }
        
        // 这里可以添加真正的Live2D模型加载逻辑
        // 由于需要完整的Live2D Cubism SDK，我们先显示模型信息
        this.showModelInfo(model, container);
    }
    
    showModelInfo(model, container) {
        // 清空容器
        container.innerHTML = '';
        
        // 创建信息显示
        const info = document.createElement('div');
        info.className = 'model-info';
        info.style.cssText = `
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            border-radius: 15px;
            color: white;
            padding: 15px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 1.4;
        `;
        
        info.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">${model.name}</div>
            <div style="font-size: 12px; margin-bottom: 8px;">Live2D模型已加载</div>
            <div style="font-size: 10px; color: #ccc;">位置: ${model.position}</div>
            <div style="font-size: 10px; color: #ccc; margin-top: 5px;">点击切换</div>
        `;
        
        // 添加点击切换功能
        info.addEventListener('click', () => {
            this.cycleModel(model, container);
        });
        
        container.appendChild(info);
    }
    
    cycleModel(model, container) {
        // 循环切换模型状态
        const states = [
            { text: '加载中...', bg: 'rgba(255, 107, 107, 0.9)' },
            { text: '已就绪', bg: 'rgba(78, 205, 196, 0.9)' },
            { text: '互动中', bg: 'rgba(255, 193, 7, 0.9)' }
        ];
        
        const currentState = Math.floor(Math.random() * states.length);
        const state = states[currentState];
        
        const info = container.querySelector('.model-info');
        if (info) {
            info.style.background = state.bg;
            info.innerHTML = `
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">${model.name}</div>
                <div style="font-size: 12px; margin-bottom: 8px;">${state.text}</div>
                <div style="font-size: 10px; color: #fff; margin-top: 5px;">继续点击</div>
            `;
        }
    }
}

// 初始化三位置Live2D
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        new TripleLive2D();
    }, 2000);
}); 