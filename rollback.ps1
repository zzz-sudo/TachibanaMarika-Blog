# TachibanaMarika 博客回退脚本 (PowerShell)

Write-Host "🔄 博客回退工具" -ForegroundColor Yellow
Write-Host "==================" -ForegroundColor Yellow

# 显示最近的提交记录
Write-Host "📋 最近的提交记录:" -ForegroundColor Cyan
git log --oneline -10

Write-Host ""
Write-Host "请选择回退选项:" -ForegroundColor Green
Write-Host "1. 回到上一个提交点 (保留修改)" -ForegroundColor White
Write-Host "2. 回到上一个提交点 (删除修改)" -ForegroundColor White
Write-Host "3. 回到特定提交点" -ForegroundColor White
Write-Host "4. 查看所有操作历史" -ForegroundColor White
Write-Host "5. 退出" -ForegroundColor White

$choice = Read-Host "请输入选项 (1-5)"

switch ($choice) {
    "1" {
        Write-Host "🔄 回到上一个提交点 (保留修改)..." -ForegroundColor Blue
        git reset --soft HEAD~1
        Write-Host "✅ 已回到上一个提交点，修改保留在暂存区" -ForegroundColor Green
    }
    "2" {
        Write-Host "⚠️  警告：这将删除所有未提交的修改！" -ForegroundColor Red
        $confirm = Read-Host "确认继续？(输入 'yes' 确认)"
        if ($confirm -eq "yes") {
            Write-Host "🔄 回到上一个提交点 (删除修改)..." -ForegroundColor Blue
            git reset --hard HEAD~1
            Write-Host "✅ 已回到上一个提交点，所有修改已删除" -ForegroundColor Green
        } else {
            Write-Host "❌ 操作已取消" -ForegroundColor Yellow
        }
    }
    "3" {
        Write-Host "📋 最近的提交记录:" -ForegroundColor Cyan
        git log --oneline -20
        $commitHash = Read-Host "请输入要回到的提交哈希值"
        Write-Host "⚠️  警告：这将删除所有未提交的修改！" -ForegroundColor Red
        $confirm = Read-Host "确认回到提交 $commitHash？(输入 'yes' 确认)"
        if ($confirm -eq "yes") {
            Write-Host "🔄 回到提交 $commitHash..." -ForegroundColor Blue
            git reset --hard $commitHash
            Write-Host "✅ 已回到指定提交点" -ForegroundColor Green
        } else {
            Write-Host "❌ 操作已取消" -ForegroundColor Yellow
        }
    }
    "4" {
        Write-Host "📋 所有操作历史:" -ForegroundColor Cyan
        git reflog --oneline -20
        Write-Host ""
        Write-Host "💡 提示：使用 'git reset --hard <commit-hash>' 可以回到任意操作点" -ForegroundColor Yellow
    }
    "5" {
        Write-Host "👋 退出回退工具" -ForegroundColor Green
        exit 0
    }
    default {
        Write-Host "❌ 无效选项，请重新运行脚本" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "当前状态:" -ForegroundColor Cyan
git status

Read-Host "按回车键退出" 