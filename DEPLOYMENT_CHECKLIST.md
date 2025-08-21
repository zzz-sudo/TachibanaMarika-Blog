# 🚀 GitHub Pages 部署检查清单

## 📋 部署前检查

### 1. GitHub 仓库设置
- [ ] 在GitHub上创建了新的仓库
- [ ] 仓库名称设置为 `minimal-mistakes`（或你喜欢的名字）
- [ ] 仓库设置为公开（Public）

### 2. 配置文件修改
- [ ] 修改 `_config.yml` 中的以下配置：
  - [ ] `url`: 设置为 `https://YOUR_USERNAME.github.io`
  - [ ] `baseurl`: 设置为 `/YOUR_REPO_NAME`
  - [ ] `repository`: 设置为 `YOUR_USERNAME/YOUR_REPO_NAME`
  - [ ] `name`: 设置为你的名字
  - [ ] `title`: 设置为你的博客标题
  - [ ] `subtitle`: 设置为你的博客副标题

### 3. 本地Git设置
- [ ] 初始化Git仓库（如果还没有）
- [ ] 添加远程仓库：`git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
- [ ] 确保在 `main` 分支上

## 🔧 部署步骤

### 1. 推送代码
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit for GitHub Pages deployment"

# 推送到GitHub
git push origin main
```

### 2. 启用GitHub Pages
1. 进入你的GitHub仓库
2. 点击 `Settings` 标签
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `GitHub Actions`
5. 保存设置

### 3. 检查GitHub Actions
1. 点击 `Actions` 标签
2. 查看构建进度
3. 确保构建成功（绿色勾号）

## 🌐 访问你的博客

部署成功后，你的博客将可以通过以下地址访问：
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
```

## 🛠️ 故障排除

### 常见问题
1. **构建失败**: 检查 `_config.yml` 配置是否正确
2. **页面404**: 确保 `baseurl` 设置正确
3. **样式丢失**: 检查GitHub Actions构建日志

### 重新部署
如果遇到问题，可以：
1. 修改代码后重新推送
2. 在GitHub Actions中手动触发构建
3. 检查构建日志中的错误信息

## 📞 需要帮助？

- 查看 [GitHub Pages 文档](https://pages.github.com/)
- 查看 [Jekyll 文档](https://jekyllrb.com/)
- 查看 [Minimal Mistakes 主题文档](https://mmistakes.github.io/minimal-mistakes/)

---

**注意**: 首次部署可能需要几分钟时间，请耐心等待。 