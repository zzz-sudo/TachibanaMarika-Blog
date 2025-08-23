# 📁 文件上传指南

本指南将帮助您了解如何在博客中添加新文件，以及如何让它们在网站上正确显示。

## 🚀 快速上传流程

### 1. 添加新文件
```bash
# 将文件复制到项目目录
# 然后添加到Git
git add filename
git commit -m "添加新文件: filename"
git push origin main
```

### 2. 等待自动部署
- GitHub Actions 会自动构建和部署
- 通常需要 2-5 分钟
- 可以在 Actions 标签页查看进度

## 📂 文件类型和位置

### 图片文件
```
assets/images/          # 推荐位置
├── posts/             # 文章相关图片
├── gallery/           # 图库图片
└── icons/             # 图标文件
```

**支持的格式**: PNG, JPG, JPEG, GIF, SVG, WebP

**使用方法**:
```markdown
![图片描述]({{ site.baseurl }}/assets/images/posts/image.jpg)
```

### 文档文件
```
_posts/                # 博客文章
├── YYYY-MM-DD-title.md
└── drafts/            # 草稿文章
```

**文章模板**:
```markdown
---
layout: single
title: "文章标题"
date: 2024-01-01
categories: [分类1, 分类2]
tags: [标签1, 标签2]
---

文章内容...
```

### 样式文件
```
_sass/                 # SCSS源文件
assets/css/            # 编译后的CSS
```

**自定义样式**:
```scss
// _sass/minimal-mistakes/_custom.scss
.custom-class {
    color: #007bff;
    font-weight: bold;
}
```

### JavaScript文件
```
assets/js/             # JavaScript文件
├── custom.js         # 自定义脚本
└── plugins/          # 插件脚本
```

**使用方法**:
```html
<script src="{{ site.baseurl }}/assets/js/custom.js"></script>
```

## 🔧 高级配置

### 1. 图片优化
- 使用 WebP 格式获得更好的压缩
- 压缩图片大小（建议 < 500KB）
- 使用适当的尺寸（避免过大）

### 2. 文件命名规范
- 使用小写字母和连字符
- 避免空格和特殊字符
- 使用描述性名称

**好的命名**:
```
my-blog-post.md
profile-photo.jpg
custom-styles.scss
```

**避免的命名**:
```
My Blog Post.md
profile photo.jpg
custom styles.scss
```

### 3. 文件大小限制
- **图片**: 建议 < 500KB
- **文档**: 建议 < 1MB
- **脚本**: 建议 < 100KB

## 📝 常见用例

### 添加新博客文章
1. 在 `_posts/` 目录创建 `.md` 文件
2. 添加 YAML front matter
3. 编写文章内容
4. 提交并推送

### 添加图片到文章
1. 将图片放入 `assets/images/posts/`
2. 在文章中使用 Markdown 语法引用
3. 确保图片路径正确

### 自定义样式
1. 在 `_sass/` 目录创建或修改文件
2. 在 `_config.yml` 中引用
3. 重新构建网站

### 添加新页面
1. 在根目录创建 `.html` 或 `.md` 文件
2. 添加适当的 front matter
3. 在导航中引用

## 🚨 注意事项

### 1. 文件路径
- 始终使用相对路径
- 测试本地和在线环境
- 检查文件是否存在

### 2. 文件权限
- 确保文件可读
- 检查文件大小限制
- 验证文件格式支持

### 3. 缓存问题
- 浏览器可能缓存旧版本
- 使用版本号或时间戳
- 强制刷新页面

## 🔍 故障排除

### 文件不显示
1. 检查文件路径是否正确
2. 确认文件已提交到Git
3. 等待GitHub Actions完成
4. 清除浏览器缓存

### 图片加载失败
1. 验证图片文件存在
2. 检查图片格式是否支持
3. 确认文件大小在限制内
4. 检查网络连接

### 样式不生效
1. 确认CSS文件已正确引用
2. 检查语法错误
3. 重新构建网站
4. 清除浏览器缓存

## 📚 相关资源

- [Jekyll 官方文档](https://jekyllrb.com/)
- [GitHub Pages 帮助](https://help.github.com/categories/github-pages-basics/)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [图片优化工具](https://squoosh.app/)

## 💡 最佳实践

1. **定期备份**: 重要文件定期推送到Git
2. **版本控制**: 使用有意义的提交信息
3. **文件组织**: 保持目录结构清晰
4. **性能优化**: 压缩图片和文件
5. **测试验证**: 本地测试后再部署

---

**提示**: 如果遇到问题，请先检查本文档，然后查看GitHub Issues或联系维护者。 