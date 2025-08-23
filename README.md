# TachibanaMarika 博客项目

基于 Jekyll 和 Minimal Mistakes 主题的个人博客网站。

## 🚀 快速开始

### 本地开发
1. 确保安装了 Ruby 和 Jekyll
2. 运行 `bundle install` 安装依赖
3. 运行 `bundle exec jekyll serve` 启动本地服务器
4. 访问 `http://localhost:4000` 查看网站

### 在线访问
- **GitHub Pages**: https://zzz-sudo.github.io/TachibanaMarika-Blog/
- **本地开发**: http://localhost:4000

## 📚 Git 操作指南

### 基本操作

#### 1. 查看状态
```bash
git status
```

#### 2. 添加文件到暂存区
```bash
# 添加单个文件
git add filename

# 添加所有修改的文件
git add .

# 添加特定目录
git add assets/
```

#### 3. 提交更改
```bash
git commit -m "提交说明"
```

#### 4. 推送到远程仓库
```bash
git push origin main
```

#### 5. 拉取最新代码
```bash
git pull origin main
```

### 高级操作

#### 1. 查看提交历史
```bash
# 查看简洁历史
git log --oneline

# 查看详细历史
git log

# 查看图形化历史
git log --graph --oneline --all
```

#### 2. 查看文件差异
```bash
# 查看工作区与暂存区的差异
git diff

# 查看暂存区与最新提交的差异
git diff --cached

# 查看两个提交之间的差异
git diff commit1 commit2
```

#### 3. 分支操作
```bash
# 创建新分支
git branch branch-name

# 切换分支
git checkout branch-name

# 创建并切换分支
git checkout -b branch-name

# 删除分支
git branch -d branch-name
```

## 🔄 版本回退操作

### 1. 查看提交记录
```bash
git log --oneline
```

### 2. 回到上一个提交点
```bash
# 软回退（保留修改）
git reset --soft HEAD~1

# 混合回退（默认，保留工作区修改）
git reset HEAD~1

# 硬回退（完全回退，删除所有修改）
git reset --hard HEAD~1
```

### 3. 回到特定提交点
```bash
# 查看提交哈希
git log --oneline

# 回到特定提交
git reset --hard commit-hash
```

### 4. 撤销最后一次提交
```bash
# 撤销提交但保留修改
git reset --soft HEAD~1

# 撤销提交并删除修改
git reset --hard HEAD~1
```

### 5. 恢复误删的提交
```bash
# 查看操作历史
git reflog

# 恢复误删的提交
git reset --hard commit-hash
```

## 🌐 GitHub Pages 部署

### 自动部署
1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建和部署
3. 等待几分钟后访问网站

### 手动部署
```bash
# 构建网站
bundle exec jekyll build

# 推送到 gh-pages 分支
git subtree push --prefix _site origin gh-pages
```

### 部署检查清单
- [ ] 代码已推送到 `main` 分支
- [ ] 没有构建错误
- [ ] 配置文件正确
- [ ] 依赖文件完整

## 📁 文件管理

### 项目结构
```
minimal-mistakes/
├── _config.yml          # Jekyll 配置文件
├── _data/               # 数据文件
├── _includes/           # 包含文件
├── _layouts/            # 布局模板
├── _posts/              # 博客文章
├── _sass/               # SCSS 样式文件
├── assets/              # 静态资源
│   ├── css/            # CSS 文件
│   ├── js/             # JavaScript 文件
│   └── images/         # 图片文件
├── docs/                # 文档
└── README.md            # 项目说明
```

### 添加新文件
1. 在相应目录创建文件
2. 使用 `git add` 添加到暂存区
3. 使用 `git commit` 提交更改
4. 使用 `git push` 推送到远程仓库

### 删除文件
```bash
# 删除文件
git rm filename

# 删除目录
git rm -r directory-name

# 提交删除操作
git commit -m "删除文件说明"
```

## 🔧 常见问题解决

### 1. 推送失败
```bash
# 拉取最新代码
git pull origin main

# 解决冲突后重新推送
git push origin main
```

### 2. 构建失败
- 检查 Ruby 和 Jekyll 版本
- 检查 `_config.yml` 配置
- 查看构建日志

### 3. 网站不更新
- 等待 GitHub Actions 完成
- 检查部署状态
- 清除浏览器缓存

### 4. 本地与远程不同步
```bash
# 强制拉取远程代码
git fetch origin
git reset --hard origin/main
```

## 📝 最佳实践

### 1. 提交规范
- 使用清晰的提交信息
- 每次提交只做一件事
- 定期提交和推送

### 2. 分支管理
- 主分支保持稳定
- 新功能使用功能分支
- 及时合并和删除分支

### 3. 文件组织
- 保持目录结构清晰
- 使用有意义的文件名
- 及时清理无用文件

### 4. 备份策略
- 定期推送到远程仓库
- 重要更改前创建标签
- 保持本地和远程同步

## 🆘 紧急情况

### 1. 代码丢失
```bash
# 查看所有操作历史
git reflog

# 恢复丢失的代码
git reset --hard commit-hash
```

### 2. 误删重要文件
```bash
# 查看文件历史
git log -- filename

# 恢复文件
git checkout commit-hash -- filename
```

### 3. 远程仓库问题
```bash
# 重新设置远程仓库
git remote remove origin
git remote add origin new-repository-url
```

## 📞 技术支持

如果遇到问题：
1. 查看本文档
2. 检查 Git 和 Jekyll 文档
3. 搜索 GitHub Issues
4. 联系项目维护者

## 📄 许可证

本项目基于 MIT 许可证开源。

---

**注意**: 请确保在操作前备份重要数据，某些 Git 操作不可逆！
