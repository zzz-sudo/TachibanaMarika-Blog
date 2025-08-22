/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

// Recommended to use absolute path for live2d_path parameter
// live2d_path 参数建议使用绝对路径
// const live2d_path = 'https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.6/dist/';
const live2d_path = '/assets/js/live2d/';

// Method to encapsulate asynchronous resource loading
// 封装异步加载资源的方法
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
      tag.type = 'module';
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
    "paths": ["/assets/2d/alya/Alya.model3.json"]
  },
  {
    "id": 2,
    "name": "mihari", 
    "message": "MIHARI - 温柔的女孩",
    "paths": ["/assets/2d/MIHARI/Mihari_V1.model3.json"]
  },
  {
    "id": 3,
    "name": "rory",
    "message": "Rory - 活泼的少女", 
    "paths": ["/assets/2d/Rory_VTS/Roxy_V1.model3.json"]
  }
];

(async () => {
  // If you are concerned about display issues on mobile devices, you can use screen.width to determine whether to load
  // 如果担心手机上显示效果不佳，可以根据屏幕宽度来判断是否加载
  // if (screen.width < 768) return;

  // Avoid cross-origin issues with image resources
  // 避免图片资源跨域问题
  const OriginalImage = window.Image;
  window.Image = function(...args) {
    const img = new OriginalImage(...args);
    img.crossOrigin = "anonymous";
    return img;
  };
  window.Image.prototype = OriginalImage.prototype;
  
  // Load waifu.css and waifu-tips.js
  // 加载 waifu.css 和 waifu-tips.js
  await Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
  ]);
  
  // For detailed usage of configuration options, see README.en.md
  // 配置选项的具体用法见 README.md
  initWidget({
    waifuPath: live2d_path + 'waifu-tips.json',
    cubism2Path: live2d_path + 'live2d.min.js',
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
    logLevel: 'info',
    drag: true,
  }, localModels);
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');

/*
く__,.ヘヽ.        /  ,ー､ 〉
         ＼ ', !-─‐-i  /  /´
         ／｀ｰ'       L/／｀ヽ､
       /   ／,   /|   ,   ,       ',
     ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
      ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
        !,/7 '0'     ´0iソ|    |
        |.从"    _     ,,,, / |./    |
        ﾚ'| i＞.､,,__  _,.イ /   .i   |
          ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
            | |/i 〈|/   i  ,.ﾍ |  i  |
           .|/ /  ｉ：    ﾍ!    ＼  |
            kヽ>､ﾊ    _,.ﾍ､    /､!
            !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
            ﾚ'ヽL__|___i,___,ンﾚ|ノ
                ﾄ-,/  |___./
                'ｰ'    !_,.:
*/
