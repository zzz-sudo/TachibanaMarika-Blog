/*!
 * Live2D Widget - 修复版本
 * 基于 stevenjoezhang/live2d-widget 项目
 */

// 自动检测路径 - 兼容本地开发和GitHub Pages
function getBasePath() {
  // 检查是否在GitHub Pages上
  if (window.location.hostname === 'zzz-sudo.github.io') {
    return '/TachibanaMarika-Blog';
  }
  // 本地开发
  return '';
}

// 获取Live2D路径
function getLive2DPath() {
  return getBasePath() + '/assets/js/live2d/';
}

console.log('🎭 检测到基础路径:', getBasePath());
console.log('🎭 Live2D路径:', getLive2DPath());

// 简化的资源加载函数
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;

    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    }
    else if (type === 'js') {
      tag = document.createElement('script');
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

// 只保留Alya模型配置
const alyaModel = {
  "id": 1,
  "name": "alya",
  "message": "Alya - 可爱的毛妹",
  "modelPath": getBasePath() + '/assets/2d/alya/Alya.model3.json',
  "basePath": getBasePath() + '/assets/2d/alya/'
};

// 修复后的初始化函数
async function initLive2D() {
  try {
    console.log('🎭 开始初始化Live2D看板娘系统...');
    
    // 加载CSS样式
    await loadExternalResource(getLive2DPath() + 'waifu.css', 'css');
    console.log('✅ CSS样式加载完成');
    
    // 创建看板娘容器
    createWaifuContainer();
    
    // 加载Live2D引擎
    await loadExternalResource(getLive2DPath() + 'live2d.min.js', 'js');
    console.log('✅ Live2D引擎加载完成');
    
    // 等待Live2D引擎完全加载
    await waitForLive2D();
    
    // 初始化模型
    await initAlyaModel();
    
    console.log('🎉 Live2D看板娘系统初始化完成！');
    
  } catch (error) {
    console.error('❌ Live2D初始化失败:', error);
  }
}

// 等待Live2D引擎加载完成
function waitForLive2D() {
  return new Promise((resolve) => {
    const checkLive2D = () => {
      if (window.Live2DCubismCore && window.Live2DCubismFramework) {
        console.log('✅ Live2D引擎加载完成');
        resolve();
      } else {
        setTimeout(checkLive2D, 100);
      }
    };
    checkLive2D();
  });
}

// 创建看板娘容器
function createWaifuContainer() {
  // 创建切换按钮
  const toggle = document.createElement('div');
  toggle.id = 'waifu-toggle';
  toggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path d="M96 64a64 64 0 1 1 128 0A64 64 0 1 1 96 64zm48 320l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-192.2L59.1 321c-9.4 15-29.2 19.4-44.1 10S-4.5 301.9 4.9 287l39.9-63.3C69.7 184 113.2 160 160 160s90.3 24 115.2 63.6L315.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L240 287.8 240 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-32 0z"/>
    </svg>
  `;
  
  // 创建看板娘主体
  const waifu = document.createElement('div');
  waifu.id = 'waifu';
  waifu.innerHTML = `
    <div id="waifu-tips"></div>
    <div id="waifu-canvas">
      <canvas id="live2d" width="300" height="300"></canvas>
    </div>
    <div id="waifu-tool"></div>
  `;
  
  // 添加到页面
  document.body.appendChild(toggle);
  document.body.appendChild(waifu);
  
  // 绑定切换事件
  toggle.addEventListener('click', () => {
    waifu.classList.toggle('waifu-active');
    toggle.classList.toggle('waifu-toggle-active');
  });
  
  console.log('✅ 看板娘容器创建完成');
}

// 初始化Alya模型
async function initAlyaModel() {
  try {
    console.log('🎭 开始加载Alya模型...');
    
    const canvas = document.getElementById('live2d');
    if (!canvas) {
      throw new Error('找不到canvas元素');
    }
    
    // 获取WebGL上下文
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      throw new Error('WebGL不可用');
    }
    
    // 设置画布尺寸
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = 300 * pixelRatio;
    canvas.height = 300 * pixelRatio;
    canvas.style.width = '300px';
    canvas.style.height = '300px';
    
    // 加载模型文件
    const modelResponse = await fetch(alyaModel.modelPath);
    const modelData = await modelResponse.json();
    
    console.log('✅ 模型配置加载完成:', modelData);
    
    // 显示欢迎消息
    showWelcomeMessage();
    
    // 这里可以添加更多的模型渲染逻辑
    // 由于Live2D Cubism SDK的复杂性，这里先显示一个占位符
    drawPlaceholder(gl);
    
  } catch (error) {
    console.error('❌ Alya模型加载失败:', error);
    showErrorMessage();
  }
}

// 绘制占位符（临时解决方案）
function drawPlaceholder(gl) {
  gl.clearColor(0.9, 0.9, 0.9, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // 绘制一个简单的矩形作为占位符
  const vertices = new Float32Array([
    -0.5, -0.5,
     0.5, -0.5,
     0.5,  0.5,
    -0.5,  0.5
  ]);
  
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `);
  gl.compileShader(vertexShader);
  
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(0.2, 0.6, 1.0, 1.0);
    }
  `);
  gl.compileShader(fragmentShader);
  
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  
  console.log('✅ 占位符绘制完成');
}

// 显示欢迎消息
function showWelcomeMessage() {
  const tips = document.getElementById('waifu-tips');
  if (tips) {
    tips.innerHTML = '🎭 Alya: 欢迎来到我的博客！';
    tips.classList.add('waifu-tips-active');
    
    setTimeout(() => {
      tips.classList.remove('waifu-tips-active');
    }, 3000);
  }
}

// 显示错误消息
function showErrorMessage() {
  const tips = document.getElementById('waifu-tips');
  if (tips) {
    tips.innerHTML = '❌ 模型加载失败，请检查控制台';
    tips.classList.add('waifu-tips-active');
    
    setTimeout(() => {
      tips.classList.remove('waifu-tips-active');
    }, 5000);
  }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLive2D);
} else {
  initLive2D();
}

console.log('🎭 Live2D看板娘系统脚本加载完成');
