// 备用Live2D实现 - 本地版本
(function() {
    'use strict';
    
    console.log('🎭 开始初始化本地备用Live2D系统...');
    
    // 创建简化的Live2D画布
    function createBackupLive2D() {
        const backupContainer = document.getElementById('backup-live2d');
        if (!backupContainer) return;
        
        // 清空容器
        backupContainer.innerHTML = '';
        
        // 创建画布
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 500;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.borderRadius = '20px';
        canvas.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
        canvas.style.border = '2px solid rgba(255,255,255,0.2)';
        canvas.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        
        backupContainer.appendChild(canvas);
        
        // 创建控制面板
        const controls = document.createElement('div');
        controls.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            display: flex;
            gap: 8px;
            z-index: 100000;
        `;
        
        // 添加控制按钮
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '←';
        prevBtn.style.cssText = `
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
            color: #333;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '→';
        nextBtn.style.cssText = prevBtn.style.cssText;
        
        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        backupContainer.appendChild(controls);
        
        // 添加角色信息
        const info = document.createElement('div');
        info.innerHTML = '备用Live2D';
        info.style.cssText = `
            position: absolute;
            top: 15px;
            left: 15px;
            background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6));
            color: white;
            padding: 8px 15px;
            border-radius: 15px;
            font-size: 13px;
            font-weight: 600;
            opacity: 0.9;
            z-index: 100000;
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
        `;
        backupContainer.appendChild(info);
        
        // 开始动画
        startAnimation(canvas, prevBtn, nextBtn, info);
        
        console.log('✅ 本地备用Live2D创建成功');
    }
    
    // 角色配置
    const characters = [
        { name: 'Shizuku', color: '#ff6b6b', eyeColor: '#ff4757' },
        { name: 'Hiyori', color: '#74b9ff', eyeColor: '#0984e3' },
        { name: 'Koharu', color: '#a29bfe', eyeColor: '#6c5ce7' }
    ];
    
    let currentCharIndex = 0;
    let animationId;
    
    // 开始动画
    function startAnimation(canvas, prevBtn, nextBtn, info) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        function animate(time) {
            if (!canvas) return;
            
            // 清空画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const char = characters[currentCharIndex];
            const t = time * 0.001;
            
            // 绘制背景
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(255,255,255,0.1)');
            gradient.addColorStop(1, 'rgba(255,255,255,0.05)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 动画参数
            const bounce = Math.sin(t * 2) * 8;
            const scale = 1 + Math.sin(t * 3) * 0.05;
            const blink = Math.sin(t * 4) > 0.8 ? 0 : 1;
            
            // 绘制角色
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2 + bounce);
            ctx.scale(scale, scale);
            
            // 身体
            ctx.fillStyle = char.color;
            ctx.beginPath();
            ctx.arc(0, 0, 60, 0, 2 * Math.PI);
            ctx.fill();
            
            // 眼睛
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(-25, -20, 12, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(25, -20, 12, 0, 2 * Math.PI);
            ctx.fill();
            
            // 瞳孔
            ctx.fillStyle = char.eyeColor;
            ctx.beginPath();
            ctx.arc(-25, -20, 6 * blink, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(25, -20, 6 * blink, 0, 2 * Math.PI);
            ctx.fill();
            
            // 嘴巴
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 10, 20, 0.2 * Math.PI, 0.8 * Math.PI);
            ctx.stroke();
            
            ctx.restore();
            
            // 角色名称
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(char.name, canvas.width/2, canvas.height/2 + 100);
            
            // 继续动画
            animationId = requestAnimationFrame(animate);
        }
        
        // 启动动画
        animationId = requestAnimationFrame(animate);
        
        // 按钮事件
        prevBtn.addEventListener('click', () => {
            currentCharIndex = (currentCharIndex - 1 + characters.length) % characters.length;
            info.innerHTML = characters[currentCharIndex].name;
        });
        
        nextBtn.addEventListener('click', () => {
            currentCharIndex = (currentCharIndex + 1) % characters.length;
            info.innerHTML = characters[currentCharIndex].name;
        });
        
        // 悬停效果
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            });
        });
    }
    
    // 暴露函数到全局
    window.BackupLive2D = {
        create: createBackupLive2D
    };
    
    console.log('🎭 本地备用Live2D系统加载完成');
    
})(); 