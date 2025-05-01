// 蛇形动画类
class SnakeAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.text = '热爱技术，热爱生活';
        this.particles = [];
        this.initialize();
    }

    initialize() {
        this.canvas.width = 400;
        this.canvas.height = 100;
        
        for (let i = 0; i < this.text.length; i++) {
            this.particles.push({
                x: -100,
                y: 50,
                targetX: i * 20 + 50,
                targetY: 50,
                char: this.text[i],
                delay: i * 100
            });
        }

        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

        let allArrived = true;
        this.particles.forEach(particle => {
            if (particle.delay > 0) {
                particle.delay -= 16;
                allArrived = false;
            } else {
                const dx = particle.targetX - particle.x;
                const dy = particle.targetY - particle.y;
                particle.x += dx * 0.1;
                particle.y += dy * 0.1;

                if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                    allArrived = false;
                }
            }

            this.ctx.fillText(particle.char, particle.x, particle.y);
        });

        if (!allArrived) {
            requestAnimationFrame(() => this.animate());
        }
    }
}

// 每日一言打字机类
class QuoteTyper {
    constructor(element) {
        this.element = element;
        this.quote = '';
        this.isTyping = false;
        this.typingSpeed = 100;
        this.delay = 3000;
    }

    async fetchQuote() {
        try {
            const response = await fetch('https://v1.hitokoto.cn/');
            const data = await response.json();
            return data.hitokoto;
        } catch (error) {
            console.error('获取每日一言失败:', error);
            return '热爱技术，热爱生活';
        }
    }

    async typeQuote() {
        if (this.isTyping) return;
        this.isTyping = true;

        this.quote = await this.fetchQuote();
        this.element.textContent = '';
        
        for (let i = 0; i < this.quote.length; i++) {
            this.element.textContent += this.quote[i];
            await new Promise(resolve => setTimeout(resolve, this.typingSpeed));
        }

        this.isTyping = false;
        setTimeout(() => this.typeQuote(), this.delay);
    }

    start() {
        this.typeQuote();
    }
}

// 贪吃蛇动画
function initSnakeAnimation() {
    const cells = document.querySelectorAll('.graph-cell');
    const rows = document.querySelectorAll('.graph-row');
    const rowCount = rows.length;
    const colCount = rows[0].children.length;
    let snakePath = [];
    let currentIndex = 0;

    // 创建随机路径
    function createRandomPath() {
        const path = [];
        let current = {
            row: Math.floor(Math.random() * rowCount),
            col: Math.floor(Math.random() * colCount)
        };
        path.push(current);

        for (let i = 0; i < 15; i++) {
            const possibleMoves = [];
            
            if (current.row > 0) possibleMoves.push({row: current.row - 1, col: current.col});
            if (current.row < rowCount - 1) possibleMoves.push({row: current.row + 1, col: current.col});
            if (current.col > 0) possibleMoves.push({row: current.row, col: current.col - 1});
            if (current.col < colCount - 1) possibleMoves.push({row: current.row, col: current.col + 1});

            if (possibleMoves.length > 0) {
                const next = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                path.push(next);
                current = next;
            }
        }
        return path;
    }

    // 更新蛇的位置
    function updateSnake() {
        // 清除所有活跃状态
        cells.forEach(cell => {
            cell.classList.remove('snake', 'active');
        });

        // 获取当前路径点
        const point = snakePath[currentIndex];
        const cell = rows[point.row].children[point.col];
        
        // 添加蛇头效果
        cell.classList.add('active');
        
        // 添加蛇体效果（显示最近的7个位置）
        for (let i = 1; i <= 7; i++) {
            const prevIndex = (currentIndex - i + snakePath.length) % snakePath.length;
            const prevPoint = snakePath[prevIndex];
            const prevCell = rows[prevPoint.row].children[prevPoint.col];
            prevCell.classList.add('snake');
        }

        // 移动到下一个位置
        currentIndex = (currentIndex + 1) % snakePath.length;

        // 如果完成一个循环，生成新路径
        if (currentIndex === 0) {
            snakePath = createRandomPath();
        }
    }

    // 初始化路径并开始动画
    snakePath = createRandomPath();
    setInterval(updateSnake, 300);
}

// 技能动画类
class SkillsAnimation {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.initialize();
    }

    initialize() {
        this.skillItems.forEach((item, index) => {
            // 添加延迟动画
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.3s ease';
            item.style.transitionDelay = `${index * 0.05}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        });
    }
}

// 项目卡片动画
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // 阻止除了链接之外的其他点击事件
        card.addEventListener('click', (e) => {
            // 如果点击的不是链接本身，阻止事件冒泡和默认行为
            if (e.target !== card) {
                e.preventDefault();
                e.stopPropagation();
                // 手动触发链接跳转
                window.open(card.href, '_blank', 'noopener');
            }
        });
        // 添加鼠标悬停效果
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化蛇形动画
    const canvas = document.getElementById('snakeCanvas');
    if (canvas) {
        new SnakeAnimation(canvas);
    }

    // 初始化每日一言
    const quoteElement = document.querySelector('.quote-text');
    if (quoteElement) {
        const typer = new QuoteTyper(quoteElement);
        typer.start();
    }

    // 启动贪吃蛇动画
    setTimeout(initSnakeAnimation, 1000);
    
    // 初始化技能动画
    new SkillsAnimation();
    
    // 初始化项目卡片动画
    animateProjects();

    // 二维码弹窗逻辑
    const qrModal = document.getElementById('qr-modal');
    const qrImg = document.getElementById('qr-modal-img');
    const qqBtn = document.getElementById('qq-qr-btn');
    const zsmBtn = document.getElementById('zsm-qr-btn');
    const closeBtn = document.querySelector('.qr-modal-close');
    const mask = document.querySelector('.qr-modal-mask');

    if (qqBtn) {
        qqBtn.onclick = function() {
            qrImg.src = 'images/qq.png';
            qrModal.style.display = 'flex';
        };
    }
    if (zsmBtn) {
        zsmBtn.onclick = function() {
            qrImg.src = 'images/zsm.png';
            qrModal.style.display = 'flex';
        };
    }
    if (closeBtn) {
        closeBtn.onclick = function() {
            qrModal.style.display = 'none';
            qrImg.src = '';
        };
    }
    if (mask) {
        mask.onclick = function() {
            qrModal.style.display = 'none';
            qrImg.src = '';
        };
    }
});