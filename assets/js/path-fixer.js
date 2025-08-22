/*!
 * 路径修复器 - 自动修复GitHub Pages和本地开发的路径问题
 * 兼容本地开发和GitHub Pages部署
 */

// 动态路径检测 - 兼容本地开发和GitHub Pages
function getBasePath() {
  // 检查是否在GitHub Pages上
  if (window.location.hostname === 'zzz-sudo.github.io') {
    return '/TachibanaMarika-Blog';
  }
  // 本地开发
  return '';
}

const basePath = getBasePath();
console.log('🔧 路径修复器 - 检测到基础路径:', basePath);

// 修复图片路径
function fixImagePath(relativePath) {
  return basePath + relativePath;
}

// 修复头像图标路径
function fixFavicon() {
  try {
    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.type = 'image/jpeg';
    newFavicon.href = fixImagePath('/assets/images/touxiang.jpg');
    
    // 替换图标
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }
    document.head.appendChild(newFavicon);
    
    console.log('✅ 头像图标路径已修复:', newFavicon.href);
  } catch (error) {
    console.error('❌ 修复头像图标失败:', error);
  }
}

// 修复CSS中的背景图片路径
function fixCSSBackgroundPaths() {
  try {
    // 查找所有使用背景图片的元素
    const elementsWithBg = document.querySelectorAll('[style*="background"]');
    elementsWithBg.forEach(element => {
      const style = element.getAttribute('style');
      if (style && style.includes('/assets/images/background.jpg')) {
        const newStyle = style.replace(
          /\/assets\/images\/background\.jpg/g, 
          fixImagePath('/assets/images/background.jpg')
        );
        element.setAttribute('style', newStyle);
      }
    });
    
    console.log('✅ CSS背景图片路径已修复');
  } catch (error) {
    console.error('❌ 修复CSS背景图片路径失败:', error);
  }
}

// 修复所有图片路径
function fixAllImagePaths() {
  try {
    // 修复头像图标
    fixFavicon();
    
    // 修复CSS背景图片
    fixCSSBackgroundPaths();
    
    // 修复其他可能的图片路径
    const images = document.querySelectorAll('img[src^="/assets/"]');
    images.forEach(img => {
      const oldSrc = img.getAttribute('src');
      if (oldSrc && oldSrc.startsWith('/assets/')) {
        const newSrc = fixImagePath(oldSrc);
        img.setAttribute('src', newSrc);
        console.log('🖼️ 图片路径已修复:', oldSrc, '->', newSrc);
      }
    });
    
    console.log('🎉 所有图片路径修复完成！');
  } catch (error) {
    console.error('❌ 修复图片路径时发生错误:', error);
  }
}

// 页面加载完成后执行修复
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fixAllImagePaths);
} else {
  fixAllImagePaths();
}

// 暴露函数供其他脚本使用
window.PathFixer = {
  getBasePath,
  fixImagePath,
  fixFavicon,
  fixAllImagePaths
};

console.log('🔧 路径修复器已加载完成'); 