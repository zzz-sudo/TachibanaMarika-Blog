# Live2D 看板娘系统集成说明

## 概述

本项目已成功集成了基于 [stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget) 的Live2D看板娘系统，替换了之前的简化版本，提供了更美观和功能丰富的看板娘体验。

## 🎯 主要特性

### ✨ 视觉升级
- **现代化UI设计**：采用最新的设计语言，界面更加美观
- **响应式布局**：支持各种屏幕尺寸，移动端友好
- **流畅动画**：平滑的过渡效果和交互反馈

### 🎮 功能增强
- **多模型支持**：支持多个Live2D角色模型
- **丰富交互**：一言、小游戏、拍照、换装等功能
- **拖拽移动**：可以自由拖拽看板娘到任意位置
- **智能对话**：根据页面内容提供相关提示

### 🔧 技术改进
- **双引擎支持**：同时支持Cubism 2和Cubism 3模型
- **自动检测**：智能识别模型版本并加载对应引擎
- **本地化部署**：所有资源本地化，无需外部依赖

## 📁 文件结构

```
assets/js/live2d/
├── autoload.js          # 主要加载脚本
├── waifu.css            # 看板娘样式文件
├── waifu-tips.js        # 交互逻辑脚本
├── waifu-tips.json      # 对话和提示配置
├── live2d.min.js        # Live2D核心引擎
├── models.json          # 本地模型配置
└── model_list.json      # 模型列表配置
```

## 🎭 可用模型

### 1. Alya - 可爱的毛妹
- **路径**：`/assets/2d/alya/Alya.model3.json`
- **类型**：Cubism 3模型
- **特色**：可爱的毛妹角色，支持多种表情

### 2. MIHARI - 温柔的女孩
- **路径**：`/assets/2d/MIHARI/Mihari_V1.model3.json`
- **类型**：Cubism 3模型
- **特色**：温柔可爱的女孩形象

### 3. Rory - 活泼的少女
- **路径**：`/assets/2d/Rory_VTS/Roxy_V1.model3.json`
- **类型**：Cubism 3模型
- **特色**：活泼开朗的少女角色

## 🚀 使用方法

### 基本集成

在你的Jekyll页面中，只需要在`_includes/after-content.html`中添加：

```html
<!-- Live2D 看板娘系统 -->
<script src="{{ '/assets/js/live2d/autoload.js' | relative_url }}"></script>
```

### 功能按钮说明

看板娘右侧工具栏包含以下功能：

- **💬 一言**：获取随机一言
- **🚀 小游戏**：玩小游戏放松一下
- **👤 切换模型**：切换到下一个角色
- **👗 换装**：切换不同的服装
- **📸 拍照**：给看板娘拍照
- **ℹ️ 信息**：查看项目信息
- **❌ 退出**：隐藏看板娘

### 交互功能

- **鼠标悬停**：在页面元素上悬停会触发相关提示
- **点击事件**：点击特定元素会获得看板娘的回应
- **拖拽移动**：可以拖拽看板娘到任意位置
- **自动对话**：根据时间和页面内容自动显示相关消息

## ⚙️ 配置选项

### 主要配置参数

```javascript
initWidget({
  waifuPath: '/assets/js/live2d/waifu-tips.json',  // 提示配置文件
  cubism2Path: '/assets/js/live2d/live2d.min.js',   // Cubism 2引擎
  cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js', // Cubism 5引擎
  tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'], // 工具按钮
  logLevel: 'info',  // 日志级别
  drag: true,        // 启用拖拽
});
```

### 自定义配置

你可以通过修改以下文件来自定义系统：

1. **waifu-tips.json**：修改对话内容和触发条件
2. **waifu.css**：自定义看板娘的样式
3. **models.json**：添加或修改模型配置

## 🧪 测试

创建了 `test-live2d.html` 测试页面，你可以：

1. 在浏览器中打开测试页面
2. 检查看板娘是否正常显示
3. 测试各种交互功能
4. 验证模型切换是否正常

## 🔧 故障排除

### 常见问题

1. **看板娘不显示**
   - 检查浏览器控制台是否有错误信息
   - 确认所有文件路径正确
   - 检查模型文件是否完整

2. **模型加载失败**
   - 确认模型文件路径正确
   - 检查模型文件格式是否支持
   - 查看控制台错误信息

3. **样式显示异常**
   - 检查CSS文件是否正确加载
   - 确认浏览器兼容性

### 调试模式

设置 `logLevel: 'info'` 可以查看详细的加载信息，帮助诊断问题。

## 📚 参考资源

- [Live2D官方网站](https://www.live2d.com/)
- [stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)
- [Live2D Cubism SDK](https://www.live2d.com/download/cubism-sdk/)

## 🎉 更新日志

### v2.0.0 (当前版本)
- ✅ 集成新的Live2D看板娘系统
- ✅ 支持多个Cubism 3模型
- ✅ 添加丰富的交互功能
- ✅ 改进UI设计和用户体验
- ✅ 支持拖拽移动功能

### v1.0.0 (之前版本)
- 简化的二次元角色动画系统
- 基本的角色切换功能
- Canvas绘制的简单角色

---

**注意**：本系统基于开源项目，请遵守相关许可证要求。所有模型文件版权归原作者所有，仅供学习研究使用。 