// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化移动端手势交互
    initTouchGestures();
    // 获取日月切换按钮
    const themeToggle = document.getElementById('theme-toggle');
    
    // 初始化主题模式
    if (themeToggle) {
        // 检查本地存储中的主题设置
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        // 添加点击事件
        themeToggle.addEventListener('click', function() {
            // 切换暗色模式类
            document.body.classList.toggle('dark-mode');
            
            // 保存用户偏好到本地存储
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    // 获取元素
    const toggleNav = document.getElementById('toggleNav');
    const navCard = document.getElementById('navCard');
    const closeNav = document.getElementById('closeNav');
    const overlay = document.getElementById('overlay');
    const mainContainer = document.getElementById('mainContainer');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 获取头像和名称元素
    const avatarContainer = document.querySelector('.avatar-container');
    
    // 打开导航菜单函数
    function openNavMenu() {
        toggleNav.classList.add('active');
        navCard.classList.add('active');
        overlay.classList.add('active');
        mainContainer.classList.add('blur'); // 添加模糊效果到主容器
        
        // 隐藏头像、名称和箭头
        avatarContainer.classList.add('hidden');
        toggleNav.parentElement.classList.add('hidden');
    }
    
    // 关闭导航菜单函数
    function closeNavMenu() {
        toggleNav.classList.remove('active');
        navCard.classList.remove('active');
        overlay.classList.remove('active');
        mainContainer.classList.remove('blur'); // 移除主容器的模糊效果
        
        // 显示头像、名称和箭头
        avatarContainer.classList.remove('hidden');
        toggleNav.parentElement.classList.remove('hidden');
    }
    
    // 点击箭头切换导航卡片的显示状态
    toggleNav.addEventListener('click', function() {
        if (navCard.classList.contains('active')) {
            closeNavMenu();
        } else {
            openNavMenu();
        }
    });
    
    // 点击关闭按钮关闭导航卡片
    closeNav.addEventListener('click', function() {
        closeNavMenu();
    });
    
    // 点击遮罩层关闭导航菜单
    overlay.addEventListener('click', function() {
        closeNavMenu();
    });
    
    // 选项卡切换功能
    const navTabs = document.querySelector('.nav-tabs');
    
    // 初始化滑块指示器位置
    navTabs.classList.add('tab1');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // 移除所有选项卡的激活状态
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            
            // 激活当前点击的选项卡
            this.classList.add('active');
            
            // 获取当前选项卡对应的内容ID
            const tabId = this.getAttribute('data-tab');
            
            // 更新滑块指示器位置
            navTabs.className = 'nav-tabs';
            navTabs.classList.add('tab' + (index + 1));
            
            // 隐藏所有选项卡内容
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // 显示当前选项卡对应的内容
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 点击页面其他地方关闭导航卡片
    document.addEventListener('mousedown', function(event) {
        // 获取QQ二维码弹窗
        const qrModal = document.getElementById('qrModal');
        
        // 如果导航卡片是激活状态，且点击的不是箭头和导航卡片
        // 并且不是点击在QQ二维码弹窗上
        if (navCard.classList.contains('active') && 
            !toggleNav.contains(event.target) && 
            !navCard.contains(event.target) &&
            !overlay.contains(event.target) &&
            !qrModal.contains(event.target)) {
            // 关闭导航菜单
            closeNavMenu();
        }
    });
    
    // 添加ESC键关闭功能
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navCard.classList.contains('active')) {
            closeNavMenu();
        }
    });
    
    // 获取弹窗元素
    const qrModal = document.getElementById('qrModal');
    const showQRCode = document.getElementById('showQRCode');
    const closeModal = document.querySelector('.close-modal');
    
    // 点击扫码添加显示弹窗
    showQRCode.addEventListener('click', function(event) {
        qrModal.style.display = 'block';
        // 防止事件冒泡到导航菜单
        event.stopPropagation();
    });
    
    // 点击关闭按钮关闭弹窗
    closeModal.addEventListener('click', function(event) {
        qrModal.style.display = 'none';
        // 防止事件冒泡到导航菜单
        event.stopPropagation();
    });
    
    // 点击弹窗外部关闭弹窗
    qrModal.addEventListener('click', function(event) {
        if (event.target == qrModal) {
            qrModal.style.display = 'none';
            // 防止事件冒泡到导航菜单
            event.stopPropagation();
        }
    });
});

// 移动端手势交互功能
function initTouchGestures() {
    const mainContainer = document.getElementById('mainContainer');
    const navCard = document.getElementById('navCard');
    const overlay = document.getElementById('overlay');
    const toggleNav = document.getElementById('toggleNav');
    const avatarContainer = document.querySelector('.avatar-container');
    
    // 手势参数
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // 最小滑动距离
    
    // 向上滑动手势 - 打开导航菜单
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        touchEndX = e.changedTouches[0].screenX;
        
        // 计算水平和垂直滑动距离
        const verticalDistance = touchStartY - touchEndY;
        const horizontalDistance = Math.abs(touchStartX - touchEndX);
        
        // 判断是否为向上滑动（垂直距离足够大且水平距离较小）
        if (verticalDistance > minSwipeDistance && horizontalDistance < verticalDistance / 2) {
            // 如果导航卡片已经打开，则不执行操作
            if (!navCard.classList.contains('active')) {
                // 模拟点击箭头按钮
                toggleNav.classList.add('active');
                navCard.classList.add('active');
                overlay.classList.add('active');
                mainContainer.classList.add('blur');
                
                // 隐藏头像、名称和箭头
                avatarContainer.classList.add('hidden');
                toggleNav.parentElement.classList.add('hidden');
            }
        }
        
        // 判断是否为向下滑动（垂直距离足够大且为负值，水平距离较小）
        if (verticalDistance < -minSwipeDistance && horizontalDistance < Math.abs(verticalDistance) / 2) {
            // 如果导航卡片已经打开，则关闭它
            if (navCard.classList.contains('active')) {
                toggleNav.classList.remove('active');
                navCard.classList.remove('active');
                overlay.classList.remove('active');
                mainContainer.classList.remove('blur');
                
                // 显示头像、名称和箭头
                avatarContainer.classList.remove('hidden');
                toggleNav.parentElement.classList.remove('hidden');
            }
        }
    }, false);
    
    // 导航卡片内的滑动手势
    if (navCard) {
        // 防止导航卡片内的滑动事件冲突
        navCard.addEventListener('touchmove', function(e) {
            // 检查是否在选项卡内容区域滑动
            const tabContent = e.target.closest('.tab-content');
            if (tabContent && tabContent.scrollHeight > tabContent.clientHeight) {
                // 允许选项卡内容区域正常滑动
                e.stopPropagation();
            }
        }, { passive: true });
    }
    
    // 双击头像切换主题
    const avatar = document.querySelector('.avatar');
    let lastTap = 0;
    
    if (avatar) {
        avatar.addEventListener('touchend', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 500 && tapLength > 0) {
                // 双击头像切换主题
                document.body.classList.toggle('dark-mode');
                
                // 保存用户偏好到本地存储
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
                
                e.preventDefault();
            }
            
            lastTap = currentTime;
        });
    }
    
    // 添加触摸反馈
    const allInteractiveElements = document.querySelectorAll('.arrow, .card, .tab, .theme-toggle, .close-btn, .card-link');
    
    allInteractiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        });
    });
}
