#!/bin/bash

# TachibanaMarika 博客部署脚本

echo "🚀 开始部署博客..."

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  发现未提交的更改，请先提交或暂存更改"
    git status
    exit 1
fi

# 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 添加所有更改
echo "📝 添加更改到暂存区..."
git add .

# 提交更改
echo "💾 提交更改..."
read -p "请输入提交信息: " commit_message
git commit -m "$commit_message"

# 推送到远程仓库
echo "🚀 推送到远程仓库..."
git push origin main

echo "✅ 部署完成！"
echo "🌐 网站将在几分钟后更新: https://zzz-sudo.github.io/TachibanaMarika-Blog/"
echo "📊 查看部署状态: https://github.com/zzz-sudo/TachibanaMarika-Blog/actions" 