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

console.log('🔧 路径修复器 - 检测到基础路径:', getBasePath());

// 修复图片路径
function fixImagePath(relativePath) {
  return getBasePath() + relativePath;
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
    console.log('🔧 开始修复头像图片路径...');
    
    // 查找所有头像相关的图片元素
    const avatarImages = document.querySelectorAll('img[src*="touxiang.jpg"], img[src*="avatar"]');
    console.log('🔍 找到头像图片元素数量:', avatarImages.length);
    
    avatarImages.forEach((img, index) => {
      const oldSrc = img.getAttribute('src');
      if (oldSrc) {
        console.log(`🔍 检查头像图片 ${index + 1}:`, oldSrc);
        
        let newSrc = oldSrc;
        let fixed = false;
        
        // 检查是否路径重复（多种情况）
        if (oldSrc.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
          newSrc = oldSrc.replace('/TachibanaMarika-Blog/TachibanaMarika-Blog/', '/TachibanaMarika-Blog/');
          fixed = true;
          console.log('🖼️ 头像图片路径重复已修复:', oldSrc, '->', newSrc);
        }
        // 检查是否有多重重复
        else if (oldSrc.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
          newSrc = oldSrc.replace('/TachibanaMarika-Blog/TachibanaMarika-Blog/TachibanaMarika-Blog/', '/TachibanaMarika-Blog/');
          fixed = true;
          console.log('🖼️ 头像图片多重路径重复已修复:', oldSrc, '->', newSrc);
        }
        // 检查是否缺少基础路径
        else if (oldSrc.startsWith('/assets/') && !oldSrc.startsWith('/TachibanaMarika-Blog/')) {
          newSrc = fixImagePath(oldSrc);
          fixed = true;
          console.log('🖼️ 头像图片路径已修复:', oldSrc, '->', newSrc);
        }
        // 检查是否为空或无效路径
        else if (!oldSrc || oldSrc === '') {
          newSrc = fixImagePath('/assets/images/touxiang.jpg');
          fixed = true;
          console.log('🖼️ 头像图片空路径已修复: ->', newSrc);
        }
        // 检查是否是相对路径
        else if (oldSrc.startsWith('assets/') || oldSrc.startsWith('./assets/')) {
          newSrc = fixImagePath('/' + oldSrc.replace('./', ''));
          fixed = true;
          console.log('🖼️ 头像图片相对路径已修复:', oldSrc, '->', newSrc);
        }
        
        if (fixed) {
          img.setAttribute('src', newSrc);
          // 添加时间戳强制刷新
          setTimeout(() => {
            const timestamp = new Date().getTime();
            const refreshSrc = newSrc + (newSrc.includes('?') ? '&' : '?') + '_t=' + timestamp;
            img.setAttribute('src', refreshSrc);
            console.log(`🔄 头像图片 ${index + 1} 已强制刷新:`, refreshSrc);
          }, 100);
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
                let newBgImage = bgImage;
                let cssFixed = false;
                
                // 修复CSS中的路径重复
                if (bgImage.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
                  newBgImage = bgImage.replace('/TachibanaMarika-Blog/TachibanaMarika-Blog/', '/TachibanaMarika-Blog/');
                  cssFixed = true;
                }
                if (bgImage.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
                  newBgImage = bgImage.replace('/TachibanaMarika-Blog/TachibanaMarika-Blog/TachibanaMarika-Blog/', '/TachibanaMarika-Blog/');
                  cssFixed = true;
                }
                
                if (cssFixed) {
                  rule.style.backgroundImage = newBgImage;
                  console.log('🎨 CSS头像背景图片路径已修复');
                }
              }
            }
          }
        }
      } catch (e) {
        // 跨域样式表可能无法访问
        console.log('⚠️ 无法访问样式表:', e);
      }
    }
    
    // 修复内联样式中的头像图片路径
    const elementsWithInlineStyle = document.querySelectorAll('[style*="touxiang.jpg"]');
    elementsWithInlineStyle.forEach(element => {
      const style = element.getAttribute('style');
      if (style) {
        let newStyle = style;
        let inlineFixed = false;
        
        if (style.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
          newStyle = style.replace('/TachibanaMarika-Blog/TachibanaMarika-Blog/', '/TachibanaMarika-Blog/');
          inlineFixed = true;
        }
        if (style.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
          newStyle = style.replace('/TachibanaMarika-Blog/TachibanaMarika-Blog/TachibanaMarika-Blog/', '/TachibanaMarika-Blog/');
          inlineFixed = true;
        }
        
        if (inlineFixed) {
          element.setAttribute('style', newStyle);
          console.log('🎨 内联样式头像图片路径已修复');
        }
      }
    });
    
    console.log('✅ 头像图片路径修复完成');
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

// 自动检测并修复头像路径问题
function autoFixAvatarPaths() {
  try {
    console.log('🔍 开始自动检测头像路径问题...');
    
    // 延迟执行，确保页面完全加载
    setTimeout(() => {
      // 查找所有可能的头像元素
      const allImages = document.querySelectorAll('img');
      const avatarCandidates = [];
      
      allImages.forEach(img => {
        const src = img.getAttribute('src');
        if (src && (src.includes('touxiang.jpg') || src.includes('avatar') || src.includes('TachibanaMarika'))) {
          avatarCandidates.push(img);
        }
      });
      
      console.log('🔍 找到可能的头像元素数量:', avatarCandidates.length);
      
      // 检查并修复路径问题
      avatarCandidates.forEach((img, index) => {
        const src = img.getAttribute('src');
        if (src && src.includes('/TachibanaMarika-Blog/TachibanaMarika-Blog/')) {
          console.log(`🔧 发现头像路径重复问题 ${index + 1}:`, src);
          // 立即修复
          fixAvatarImage();
          return;
        }
      });
      
      // 如果没有发现路径重复，也尝试修复
      if (avatarCandidates.length > 0) {
        console.log('🔧 尝试预防性头像路径修复...');
        fixAvatarImage();
      }
      
    }, 2000); // 2秒后执行
    
  } catch (error) {
    console.error('❌ 自动头像路径检测失败:', error);
  }
}

// 页面加载完成后执行修复
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    fixAllImagePaths();
    autoFixAvatarPaths();
  });
} else {
  fixAllImagePaths();
  autoFixAvatarPaths();
}

// 暴露函数供其他脚本使用
window.PathFixer = {
  getBasePath,
  fixImagePath,
  fixFavicon,
  fixAvatarImage,
  fixAllImagePaths,
  autoFixAvatarPaths
};

console.log('🔧 路径修复器已加载完成'); 