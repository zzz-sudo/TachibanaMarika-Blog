/*!
 * 侧边栏控制器 - 实现左侧边栏的左移和最新文章部分的移除功能
 * 按照图片指示进行操作
 */

class SidebarController {
    constructor() {
        this.isSidebarCollapsed = false;
        this.sidebar = null;
        this.mainContent = null;
        this.toggleButton = null;
        this.init();
    }

    init() {
        // 等待页面加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSidebar());
        } else {
            this.setupSidebar();
        }
    }

    setupSidebar() {
        console.log('🔧 侧边栏控制器初始化中...');
        
        // 查找侧边栏和主内容区域
        this.sidebar = document.querySelector('.sidebar');
        this.mainContent = document.querySelector('.main');
        
        if (!this.sidebar) {
            console.log('⚠️ 未找到侧边栏，等待动态创建...');
            // 等待侧边栏动态创建
            setTimeout(() => this.setupSidebar(), 1000);
            return;
        }

        // 创建切换按钮
        this.createToggleButton();
        
        // 添加左移功能到Telegram链接
        this.addTelegramLeftMove();
        
        // 移除最新文章部分
        this.removeRecentPosts();
        
        // 设置滚动条样式
        this.setupScrollbars();
        
        console.log('✅ 侧边栏控制器初始化完成');
    }

    createToggleButton() {
        // 在Telegram链接旁边创建切换按钮
        const telegramLink = this.sidebar.querySelector('a[href*="t.me"], a[href*="telegram"]');
        if (telegramLink) {
            const toggleButton = document.createElement('button');
            toggleButton.className = 'sidebar-toggle-btn';
            toggleButton.innerHTML = '◀';
            toggleButton.title = '左移侧边栏';
            toggleButton.style.cssText = `
                position: absolute;
                right: -15px;
                top: 50%;
                transform: translateY(-50%);
                background: #007bff;
                color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;
            
            // 设置侧边栏为相对定位
            this.sidebar.style.position = 'relative';
            
            // 插入按钮
            telegramLink.parentNode.insertBefore(toggleButton, telegramLink.nextSibling);
            
            // 添加点击事件
            toggleButton.addEventListener('click', () => this.toggleSidebar());
            
            this.toggleButton = toggleButton;
            console.log('✅ 侧边栏切换按钮已创建');
        }
    }

    addTelegramLeftMove() {
        // 为Telegram链接添加左移提示
        const telegramLink = this.sidebar.querySelector('a[href*="t.me"], a[href*="telegram"]');
        if (telegramLink) {
            // 添加左移提示
            const leftMoveHint = document.createElement('div');
            leftMoveHint.className = 'left-move-hint';
            leftMoveHint.textContent = '左移';
            leftMoveHint.style.cssText = `
                position: absolute;
                left: -40px;
                top: 50%;
                transform: translateY(-50%);
                background: #ff4444;
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1001;
                animation: pulse 2s infinite;
            `;
            
            // 添加脉冲动画样式
            if (!document.querySelector('#left-move-styles')) {
                const style = document.createElement('style');
                style.id = 'left-move-styles';
                style.textContent = `
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            telegramLink.parentNode.style.position = 'relative';
            telegramLink.parentNode.appendChild(leftMoveHint);
            
            console.log('✅ Telegram左移提示已添加');
        }
    }

    removeRecentPosts() {
        // 查找并移除"最新文章"部分
        const recentPostsTitle = document.querySelector('.archive__subtitle');
        if (recentPostsTitle && recentPostsTitle.textContent.includes('最新文章')) {
            // 添加移除提示
            const removeHint = document.createElement('div');
            removeHint.className = 'remove-hint';
            removeHint.textContent = '移除';
            removeHint.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                background: #ff4444;
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 12px;
                z-index: 1001;
                animation: pulse 2s infinite;
            `;
            
            // 设置父容器为相对定位
            recentPostsTitle.parentNode.style.position = 'relative';
            recentPostsTitle.parentNode.appendChild(removeHint);
            
            // 只隐藏最新文章标题，保留文章内容
            if (recentPostsTitle) {
                recentPostsTitle.style.display = 'none';
                console.log('✅ 最新文章标题已隐藏，保留文章内容');
            }
        }
    }

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        
        if (this.isSidebarCollapsed) {
            // 左移侧边栏
            this.sidebar.style.transform = 'translateX(-100%)';
            this.sidebar.style.transition = 'transform 0.3s ease';
            this.toggleButton.innerHTML = '▶';
            this.toggleButton.title = '展开侧边栏';
            this.toggleButton.style.right = '-15px';
            
            // 调整主内容区域
            if (this.mainContent) {
                this.mainContent.style.marginLeft = '0';
                this.mainContent.style.transition = 'margin-left 0.3s ease';
            }
            
            console.log('✅ 侧边栏已左移');
        } else {
            // 恢复侧边栏
            this.sidebar.style.transform = 'translateX(0)';
            this.toggleButton.innerHTML = '◀';
            this.toggleButton.title = '左移侧边栏';
            
            // 恢复主内容区域
            if (this.mainContent) {
                this.mainContent.style.marginLeft = '320px';
            }
            
            console.log('✅ 侧边栏已恢复');
        }
    }

    setupScrollbars() {
        // 移除左侧边栏的滚动条，使用右侧主滚动条
        if (this.sidebar) {
            this.sidebar.style.overflowY = 'hidden';
            this.sidebar.style.overflowX = 'hidden';
        }
        
        // 确保主内容区域可以滚动
        if (this.mainContent) {
            this.mainContent.style.overflowY = 'auto';
            this.mainContent.style.overflowX = 'hidden';
        }
        
        // 设置整体页面滚动
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';
        
        console.log('✅ 滚动条设置完成');
    }
}

// 创建侧边栏控制器实例
const sidebarController = new SidebarController();

// 暴露给全局使用
window.SidebarController = sidebarController;

console.log('🔧 侧边栏控制器已加载'); 