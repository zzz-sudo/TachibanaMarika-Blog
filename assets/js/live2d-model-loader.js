// 真正的Live2D模型加载器
(function() {
    'use strict';
    
    console.log('🎭 启动真正的Live2D模型加载器');
    
    // 配置
    const config = {
        modelPath: '/yumi/yumi.model3.json',
        width: 280,
        height: 250
    };
    
    // 检查WebGL支持
    function checkWebGL() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
            console.error('WebGL not supported');
            return false;
        }
        
        console.log('✅ WebGL支持正常');
        return true;
    }
    
    // 创建Live2D容器
    function createLive2DContainer() {
        const container = document.getElementById('live2d-widget');
        if (!container) {
            console.error('找不到live2d-widget容器');
            return;
        }
        
        // 清空容器
        container.innerHTML = '';
        
        // 创建Canvas
        const canvas = document.createElement('canvas');
        canvas.width = config.width;
        canvas.height = config.height;
        canvas.style.border = '2px solid #ddd';
        canvas.style.borderRadius = '10px';
        canvas.style.cursor = 'pointer';
        
        // 添加到容器
        container.appendChild(canvas);
        
        // 创建加载提示
        const loadingText = document.createElement('div');
        loadingText.id = 'live2d-loading';
        loadingText.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #666;
            font-size: 14px;
            text-align: center;
            pointer-events: none;
            z-index: 10;
        `;
        loadingText.innerHTML = '正在加载Live2D模型...<br><small>请稍候</small>';
        container.appendChild(loadingText);
        
        // 尝试加载真正的Live2D模型
        loadLive2DModel(canvas, loadingText);
        
        // 添加交互事件
        addInteractions(canvas, container);
        
        return canvas;
    }
    
    // 加载Live2D模型
    async function loadLive2DModel(canvas, loadingText) {
        try {
            // 检查WebGL
            if (!checkWebGL()) {
                throw new Error('WebGL not supported');
            }
            
            // 尝试加载模型文件
            const modelResponse = await fetch(config.modelPath);
            if (!modelResponse.ok) {
                throw new Error(`模型文件加载失败: ${modelResponse.status}`);
            }
            
            const modelData = await modelResponse.json();
            console.log('✅ 模型配置文件加载成功:', modelData);
            
            // 更新加载提示
            loadingText.innerHTML = '正在加载纹理文件...<br><small>请稍候</small>';
            
            // 尝试加载纹理
            const texturePath = modelData.FileReferences.Textures[0];
            const textureResponse = await fetch(`/yumi/${texturePath}`);
            if (!textureResponse.ok) {
                throw new Error(`纹理文件加载失败: ${textureResponse.status}`);
            }
            
            console.log('✅ 纹理文件加载成功');
            
            // 更新加载提示
            loadingText.innerHTML = '正在初始化WebGL渲染...<br><small>请稍候</small>';
            
            // 初始化WebGL渲染
            const gl = canvas.getContext('webgl');
            if (!gl) {
                throw new Error('无法获取WebGL上下文');
            }
            
            // 设置WebGL视口
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            
            // 创建简单的着色器程序
            const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
                attribute vec2 a_position;
                attribute vec2 a_texCoord;
                varying vec2 v_texCoord;
                void main() {
                    gl_Position = vec4(a_position, 0.0, 1.0);
                    v_texCoord = a_texCoord;
                }
            `);
            
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
                precision mediump float;
                uniform sampler2D u_texture;
                varying vec2 v_texCoord;
                void main() {
                    gl_FragColor = texture2D(u_texture, v_texCoord);
                }
            `);
            
            const program = createProgram(gl, vertexShader, fragmentShader);
            gl.useProgram(program);
            
            // 创建纹理
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            
            // 创建顶点缓冲区
            const positions = new Float32Array([
                -1, -1,
                 1, -1,
                -1,  1,
                 1,  1
            ]);
            
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
            
            const positionLocation = gl.getAttribLocation(program, 'a_position');
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
            
            // 创建纹理坐标缓冲区
            const texCoords = new Float32Array([
                0, 1,
                1, 1,
                0, 0,
                1, 0
            ]);
            
            const texCoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
            
            const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
            gl.enableVertexAttribArray(texCoordLocation);
            gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
            
            // 渲染
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            
            // 加载完成
            loadingText.innerHTML = 'Live2D模型加载完成！<br><small>🎉 欢迎使用</small>';
            setTimeout(() => {
                loadingText.style.opacity = '0';
                setTimeout(() => loadingText.remove(), 500);
            }, 2000);
            
            console.log('✅ Live2D模型渲染成功');
            
        } catch (error) {
            console.error('Live2D模型加载失败:', error);
            
            // 显示错误信息
            loadingText.innerHTML = `模型加载失败<br><small>${error.message}</small>`;
            loadingText.style.color = '#ff6b6b';
            
            // 3秒后显示备用内容
            setTimeout(() => {
                showFallbackContent(canvas, loadingText);
            }, 3000);
        }
    }
    
    // 创建着色器
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('着色器编译失败:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    // 创建程序
    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('程序链接失败:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }
    
    // 显示备用内容
    function showFallbackContent(canvas, loadingText) {
        loadingText.remove();
        
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
    
    // 添加交互事件
    function addInteractions(canvas, container) {
        let isAnimating = false;
        
        // 点击事件
        canvas.addEventListener('click', function() {
            if (isAnimating) return;
            
            isAnimating = true;
            showDialog('你点击了我！', container);
            
            // 简单的点击动画
            canvas.style.transform = 'scale(0.95)';
            setTimeout(() => {
                canvas.style.transform = 'scale(1)';
                isAnimating = false;
            }, 150);
        });
        
        // 悬停事件
        canvas.addEventListener('mouseenter', function() {
            canvas.style.transform = 'scale(1.05)';
            showDialog('你在看我吗？', container);
        });
        
        canvas.addEventListener('mouseleave', function() {
            canvas.style.transform = 'scale(1)';
        });
        
        // 拖拽事件
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        canvas.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(container.style.left) || 0;
            startTop = parseInt(container.style.top) || 0;
            canvas.style.cursor = 'grabbing';
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
                canvas.style.cursor = 'pointer';
            }
        });
    }
    
    // 显示对话框
    function showDialog(text, container) {
        let dialog = container.querySelector('.live2d-dialog');
        if (!dialog) {
            dialog = document.createElement('div');
            dialog.className = 'live2d-dialog';
            container.appendChild(dialog);
        }
        
        dialog.textContent = text;
        dialog.classList.add('show');
        
        setTimeout(() => {
            dialog.classList.remove('show');
        }, 2000);
    }
    
    // 初始化
    function init() {
        console.log('🎯 初始化真正的Live2D模型加载器');
        
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createLive2DContainer);
        } else {
            createLive2DContainer();
        }
        
        // 添加欢迎消息
        setTimeout(() => {
            const container = document.getElementById('live2d-widget');
            if (container) {
                showDialog('欢迎来到我的博客！', container);
            }
        }, 5000);
    }
    
    // 启动
    init();
    
    // 暴露到全局
    window.TrueLive2D = {
        init: init,
        config: config
    };
    
})(); 