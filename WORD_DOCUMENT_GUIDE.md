# 📄 Word文档上传指南

## 🚀 如何上传Word文档

### 1. 准备Word文档
- 确保文档内容完整
- 检查格式是否正确
- 建议文件大小 < 10MB

### 2. 上传到项目
由于Git仓库主要存储代码和文本文件，Word文档建议：

**方案A: 转换为Markdown**
- 将Word内容复制到Markdown文件
- 保持格式和结构
- 添加适当的front matter

**方案B: 存储为PDF**
- 将Word转换为PDF
- 上传到 `assets/documents/` 目录
- 在Markdown中提供下载链接

**方案C: 使用外部存储**
- 上传到Google Drive或OneDrive
- 在Markdown中提供分享链接
- 设置适当的访问权限

## 📁 推荐的文件结构

```
assets/
├── documents/          # 文档文件
│   ├── reports/       # 报告文档
│   ├── tutorials/     # 教程文档
│   └── presentations/ # 演示文稿
└── images/
    └── posts/         # 文章图片
```

## 🔧 实际操作示例

### 创建文档目录
```bash
mkdir -p assets/documents/tutorials
mkdir -p assets/documents/reports
```

### 上传Word文档
```bash
# 将Word文档复制到相应目录
cp "深度学习教程.docx" assets/documents/tutorials/

# 添加到Git
git add assets/documents/tutorials/深度学习教程.docx

# 提交更改
git commit -m "添加深度学习教程Word文档"

# 推送到远程仓库
git push origin main
```

### 在Markdown中引用
```markdown
## 📚 相关文档

- [深度学习教程Word版本]({{ site.baseurl }}/assets/documents/tutorials/深度学习教程.docx)
- [项目报告PDF版本]({{ site.baseurl }}/assets/documents/reports/项目报告.pdf)
```

## ⚠️ 注意事项

1. **文件大小**: Git仓库不适合存储大文件
2. **版本控制**: Word文档的版本控制不如文本文件
3. **协作性**: 团队成员需要Word软件才能编辑
4. **兼容性**: 不同版本的Word可能有格式差异

## 💡 最佳实践建议

1. **优先使用Markdown**: 更好的版本控制和协作
2. **Word作为补充**: 用于需要复杂格式的文档
3. **定期同步**: 保持Markdown和Word版本的一致性
4. **文档说明**: 在README中说明文档的用途和更新方式

## 📋 文档管理清单

- [ ] 创建适当的目录结构
- [ ] 设置文件命名规范
- [ ] 添加文档说明
- [ ] 更新README文件
- [ ] 设置访问权限
- [ ] 建立更新流程

---

**提示**: 对于技术博客，建议主要使用Markdown格式，Word文档作为补充材料。 