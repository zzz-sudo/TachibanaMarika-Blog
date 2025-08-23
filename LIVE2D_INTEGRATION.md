# Live2D 集成说明

本项目已成功集成了 Live2D 看板娘功能，使用 `yumi` 模型。

## 模型信息

- **模型名称**: yumi
- **格式**: Live2D Cubism 3
- **文件位置**: `/yumi/` 目录
- **支持功能**: 表情、动作、物理效果

## 文件结构

```
yumi/
├── yumi.model3.json          # 模型配置文件
├── yumi.moc3                 # 模型数据文件
├── yumi.cdi3.json            # 参数定义文件
├── yumi.physics3.json        # 物理效果文件
├── yumi.8192/
│   └── texture_00.png        # 纹理文件
├── *.exp3.json               # 表情文件
├── *.motion3.json            # 动作文件
└── model_list.json           # 模型列表配置
```

## 集成文件

- `_includes/live2d-widget.html` - Live2D HTML模板
- `assets/css/live2d.css` - Live2D样式文件
- `assets/js/live2d-config.js` - Live2D配置
- `assets/js/live2d-init.js` - Live2D初始化脚本

## 功能特性

### 基本功能
- ✅ 模型显示和渲染
- ✅ 自动眨眼动画
- ✅ 物理效果（呼吸、重力等）
- ✅ 鼠标交互（点击、悬停）
- ✅ 拖拽移动

### 控制功能
- 👁 显示/隐藏看板娘
- ⚙ 设置（开发中）
- ✕ 关闭看板娘

### 响应式设计
- 支持移动端适配
- 深色模式支持
- 自动缩放

## 使用方法

1. **自动加载**: 页面加载时自动显示看板娘
2. **交互**: 点击看板娘触发动作
3. **控制**: 使用右上角控制按钮
4. **个性化**: 修改 `live2d-config.js` 中的配置

## 配置选项

```javascript
window.Live2DConfig = {
    model: {
        path: '/yumi/yumi.model3.json',
        scale: 1.0
    },
    display: {
        width: 280,
        height: 250,
        position: 'right'
    },
    interaction: {
        enable: true,
        hover: true,
        click: true,
        drag: true
    }
};
```

## 故障排除

### 模型不显示
1. 检查文件路径是否正确
2. 确认模型文件完整性
3. 查看浏览器控制台错误信息

### 性能问题
1. 降低模型分辨率
2. 减少物理效果复杂度
3. 优化纹理文件大小

## 技术说明

- 使用 [live2d-widget](https://github.com/stevenjoezhang/live2d-widget) 作为基础框架
- 支持 Cubism 2 和 Cubism 3 模型
- 基于 WebGL 渲染
- 支持现代浏览器

## 更新日志

- 2025-01-20: 完成 Live2D 集成
- 支持 yumi 模型
- 添加控制界面
- 实现响应式设计

## 许可证

Live2D 相关代码遵循 [GPL-3.0](https://github.com/stevenjoezhang/live2d-widget/blob/master/LICENSE) 协议。

模型文件版权归原作者所有，仅供学习研究使用。 