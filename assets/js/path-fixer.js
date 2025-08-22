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
      if (style && style.includes('background.jpg')) {
        const newStyle = style.replace(
          /url\(['"]?([^'"]*background\.jpg)['"]?\)/g, 
          (match, url) => {
            // 如果是相对路径，转换为绝对路径
            if (url.startsWith('../') || url.startsWith('./') || !url.startsWith('/')) {
              return `url('${fixImagePath('/assets/images/background.jpg')}')`;
            }
            // 如果已经是绝对路径，确保使用正确的基础路径
            if (url.startsWith('/assets/')) {
              return `url('${fixImagePath(url)}')`;
            }
            return match;
          }
        );
        element.setAttribute('style', newStyle);
      }
    });
    
    // 修复CSS样式表中的背景图片路径
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const rules = styleSheets[i].cssRules || styleSheets[i].rules;
        if (rules) {
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            if (rule.style && rule.style.backgroundImage) {
              const bgImage = rule.style.backgroundImage;
              if (bgImage.includes('background.jpg')) {
                const newBgImage = bgImage.replace(
                  /url\(['"]?([^'"]*background\.jpg)['"]?\)/g,
                  (match, url) => {
                    if (url.startsWith('../') || url.startsWith('./') || !url.startsWith('/')) {
                      return `url('${fixImagePath('/assets/images/background.jpg')}')`;
                    }
                    if (url.startsWith('/assets/')) {
                      return `url('${fixImagePath(url)}')`;
                    }
                    return match;
                  }
                );
                rule.style.backgroundImage = newBgImage;
              }
            }
          }
        }
      } catch (e) {
        // 跨域样式表可能无法访问
        console.log('⚠️ 无法访问样式表:', e);
      }
    }
    
    console.log('✅ CSS背景图片路径已修复');
  } catch (error) {
    console.error('❌ 修复CSS背景图片路径失败:', error);
  }
}

// 修复头像图片路径
function fixAvatarImage() {
  try {
    // 查找所有头像相关的图片元素
    const avatarImages = document.querySelectorAll('img[src*="touxiang.jpg"], img[src*="avatar"]');
    avatarImages.forEach(img => {
      const oldSrc = img.getAttribute('src');
      if (oldSrc) {
        // 检查是否路径重复
        if (oldSrc.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
          const newSrc = oldSrc.replace('/TachibanaMarika-Blog/TachibanaMarika-Blog/', '/TachibanaMarika-Blog/');
          img.setAttribute('src', newSrc);
          console.log('🖼️ 头像图片路径已修复:', oldSrc, '->', newSrc);
        }
        // 检查是否缺少基础路径
        else if (oldSrc.startsWith('/assets/') && !oldSrc.startsWith('/TachibanaMarika-Blog/')) {
          const newSrc = fixImagePath(oldSrc);
          img.setAttribute('src', newSrc);
          console.log('🖼️ 头像图片路径已修复:', oldSrc, '->', newSrc);
        }
      }
    });
    
    // 修复CSS中的头像图片路径
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const rules = styleSheets[i].cssRules || styleSheets[i].rules;
        if (rules) {
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            if (rule.style && rule.style.backgroundImage) {
              const bgImage = rule.style.backgroundImage;
              if (bgImage.includes('touxiang.jpg')) {
                const newBgImage = bgImage.replace(
                  /url\(['"]?([^'"]*touxiang\.jpg)['"]?\)/g,
                  (match, url) => {
                    if (url.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
                      return `url('${url.replace('/TachibanaMarika-Blog/TachibanaMarika-Blog/', '/TachibanaMarika-Blog/')}')`;
                    }
                    if (url.startsWith('/assets/') && !url.startsWith('/TachibanaMarika-Blog/')) {
                      return `url('${fixImagePath(url)}')`;
                    }
                    return match;
                  }
                );
                rule.style.backgroundImage = newBgImage;
              }
            }
          }
        }
      } catch (e) {
        // 跨域样式表可能无法访问
        console.log('⚠️ 无法访问样式表:', e);
      }
    }
    
    console.log('✅ 头像图片路径已修复');
  } catch (error) {
    console.error('❌ 修复头像图片路径失败:', error);
  }
}

// 修复所有图片路径
function fixAllImagePaths() {
  try {
    // 修复头像图标
    fixFavicon();
    
    // 修复CSS背景图片
    fixCSSBackgroundPaths();

    // 修复头像图片
    fixAvatarImage();
    
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
  fixAvatarImage,
  fixAllImagePaths
};

console.log('🔧 路径修复器已加载完成'); 