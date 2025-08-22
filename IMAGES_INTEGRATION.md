# 🖼️ 图片资源整合说明

## 📁 图片资源目录结构

```
assets/images/
├── README.md              # 图片资源使用说明
├── background.jpg         # 网站背景图片 (330KB)
├── touxiang.jpg          # 网站头像/图标 (648KB)
└── cursors/              # 鼠标光标资源目录
    ├── 1.ico
    ├── 2.ico
    ├── admin.gif
    └── ...
```

## 🎯 整合完成的功能

### 1. 🖼️ 背景图片 (background.jpg)
- **功能**: 网站背景图片，支持透明度调整
- **位置**: `assets/images/background.jpg`
- **透明度**: 默认30%，可在CSS中调整
- **响应式**: 自动适应不同屏幕尺寸
- **格式**: JPG，建议尺寸1920x1080或更高

### 2. 👤 头像图片 (touxiang.jpg)
- **功能**: 网站地址栏图标（favicon）
- **位置**: `assets/images/touxiang.jpg`
- **自动替换**: 无需手动配置，JavaScript自动处理
- **格式**: JPG，建议尺寸32x32或64x64像素
- **显示位置**: 浏览器地址栏、书签、标签页

### 3. 🖱️ 鼠标光标资源
- **功能**: 自定义鼠标光标样式
- **位置**: `assets/images/cursors/`
- **支持格式**: ICO、GIF等
- **应用场景**: Live2D模型交互、特殊按钮等

## 🔧 技术实现

### 背景图片
```css
/* 在 assets/css/effects.css 中 */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/assets/images/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0.3; /* 30%透明度 */
    z-index: -2;
    pointer-events: none;
}
```

### 头像图标
```javascript
// 在 _includes/scripts.html 中
const newFavicon = document.createElement('link');
newFavicon.rel = 'icon';
newFavicon.type = 'image/jpeg';
newFavicon.href = '/assets/images/touxiang.jpg';
```

## 📱 响应式支持

- **桌面端**: 完整显示，固定位置
- **移动端**: 自动缩放，保持比例
- **平板端**: 居中显示，覆盖整个屏幕
- **高分辨率**: 支持Retina和4K显示器

## 🎨 自定义配置

### 背景透明度调整
在 `assets/css/effects.css` 中修改：
```css
opacity: 0.3; /* 调整透明度值 */
```

### 透明度建议值
- `0.1` = 10% 不透明度 (非常透明)
- `0.3` = 30% 不透明度 (推荐，半透明)
- `0.5` = 50% 不透明度 (中等透明)
- `0.7` = 70% 不透明度 (较不透明)
- `1.0` = 100% 不透明度 (完全不透明)

## 💡 使用建议

### 背景图片
- 使用高质量图片，建议分辨率1920x1080或更高
- 文件大小控制在2MB以内
- 选择不会影响文字阅读的图片
- 考虑使用WebP格式获得更好的压缩比

### 头像图标
- 使用清晰的图标，建议尺寸32x32或64x64像素
- 文件大小控制在100KB以内
- 选择与网站主题相符的图标
- 支持透明背景的PNG格式

## 🚀 部署说明

1. **图片文件**: 已整合到 `assets/images/` 目录
2. **CSS样式**: 背景图片样式在 `assets/css/effects.css`
3. **JavaScript**: 头像替换功能在 `_includes/scripts.html`
4. **文档**: 详细说明在 `assets/images/README.md`

## 🔍 文件大小统计

- `background.jpg`: 330KB (背景图片)
- `touxiang.jpg`: 648KB (头像图标)
- **总计**: 约978KB

## 📋 检查清单

- [x] 背景图片已放置在 `assets/images/background.jpg`
- [x] 头像图片已放置在 `assets/images/touxiang.jpg`
- [x] CSS路径已更新为正确的图片路径
- [x] JavaScript路径已更新为正确的图片路径
- [x] 文档已更新，包含所有图片的说明
- [x] 图片资源已整合到统一目录

---

**注意**: 所有图片资源现在都集中在 `assets/images/` 目录中，便于管理和维护。 