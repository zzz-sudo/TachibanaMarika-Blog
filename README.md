# Minimal Mistakes Jekyll Theme

这是一个基于Jekyll的Minimal Mistakes主题博客网站。

## 🚀 部署到GitHub Pages

### 1. 准备工作

1. 在GitHub上创建一个新的仓库，命名为 `minimal-mistakes`（或者你喜欢的名字）
2. 将代码推送到该仓库

### 2. 配置设置

在 `_config.yml` 文件中，请修改以下配置项：

```yaml
url: "https://YOUR_USERNAME.github.io"  # 替换为你的GitHub用户名
baseurl: "/minimal-mistakes"            # 替换为你的仓库名
repository: "YOUR_USERNAME/minimal-mistakes"  # 替换为你的GitHub用户名和仓库名
name: "你的名字"                        # 替换为你的名字
title: "你的博客标题"                   # 替换为你的博客标题
subtitle: "你的博客副标题"              # 替换为你的博客副标题
```

### 3. 启用GitHub Pages

1. 进入你的GitHub仓库
2. 点击 `Settings` 标签
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `GitHub Actions`
5. 保存设置

### 4. 推送代码

   ```bash
git add .
git commit -m "Initial commit for GitHub Pages deployment"
git push origin main
```

### 5. 自动部署

推送代码后，GitHub Actions会自动构建和部署你的博客。你可以在 `Actions` 标签页查看构建进度。

部署完成后，你的博客将可以通过 `https://YOUR_USERNAME.github.io/minimal-mistakes` 访问。

## 🛠️ 本地开发

### 安装依赖

```bash
# 安装Ruby依赖
bundle install

# 安装Node.js依赖
npm install
```

### 启动本地服务器

   ```bash
bundle exec jekyll serve
```

访问 `http://localhost:4000` 查看你的博客。

## 📝 添加新文章

在 `_posts` 目录下创建新的Markdown文件，文件名格式为：`YYYY-MM-DD-文章标题.md`

文章头部需要包含YAML front matter：

```yaml
---
layout: single
title: "文章标题"
date: 2024-01-01
categories: [技术, 生活]
tags: [jekyll, github-pages]
---
```

## 🎨 自定义主题

- 修改 `_sass/minimal-mistakes/_variables.scss` 来调整颜色和字体
- 修改 `_sass/minimal-mistakes/skins/` 下的皮肤文件来更换主题
- 在 `_includes/` 目录下自定义页面组件

## 📚 更多信息

- [Jekyll官方文档](https://jekyllrb.com/)
- [Minimal Mistakes主题文档](https://mmistakes.github.io/minimal-mistakes/)
- [GitHub Pages文档](https://pages.github.com/)

## 📄 许可证

本项目基于MIT许可证开源。
