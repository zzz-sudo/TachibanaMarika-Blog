/*!
 * Live2D Widget - 简化版本
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

// 本地模型配置
const localModels = [
  {
    "id": 1,
    "name": "alya",
    "message": "Alya - 可爱的毛妹",
    "paths": [getBasePath() + '/assets/2d/alya/Alya.model3.json']
  },
  {
    "id": 2,
    "name": "mihari", 
    "message": "MIHARI - 温柔的女孩",
    "paths": [getBasePath() + '/assets/2d/MIHARI/Mihari_V1.model3.json']
  },
  {
    "id": 3,
    "name": "rory",
    "message": "Rory - 活泼的少女", 
    "paths": [getBasePath() + '/assets/2d/Rory_VTS/Roxy_V1.model3.json']
  }
];

// 简化的初始化函数
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
    
    // 初始化模型
    await initModels();
    
    console.log('🎉 Live2D看板娘系统初始化完成！');
    
  } catch (error) {
    console.error('❌ Live2D初始化失败:', error);
  }
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
      <canvas id="live2d" width="800" height="800"></canvas>
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

// 初始化模型
async function initModels() {
  try {
    // 这里可以添加模型加载逻辑
    console.log('📝 模型配置:', localModels);
    
    // 显示欢迎消息
    const tips = document.getElementById('waifu-tips');
    if (tips) {
      tips.innerHTML = '🎭 欢迎使用Live2D看板娘系统！';
      tips.classList.add('waifu-tips-active');
      
      setTimeout(() => {
        tips.classList.remove('waifu-tips-active');
      }, 3000);
    }
    
  } catch (error) {
    console.error('❌ 模型初始化失败:', error);
  }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLive2D);
} else {
  initLive2D();
}

console.log('🎭 Live2D看板娘系统脚本加载完成');
