console.log('Sidebar.js loading...');

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    const avatar = document.getElementById("profileAvatar");
    const sidebarName = document.getElementById("sidebarName");
    const sidebarEmail = document.getElementById("sidebarEmail");
    
    if (avatar) {
        avatar.textContent = currentUser.name.trim().charAt(0).toUpperCase();
    }
    
    if (sidebarName) {
        sidebarName.textContent = currentUser.name;
    }
    
    if (sidebarEmail) {
        sidebarEmail.textContent = currentUser.email;
    }
}

function setActiveMenuItemBasedOnPage() {
    const currentPage = window.location.pathname;
    
    const allMenuItems = document.querySelectorAll('.menu li');
    allMenuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    let activeItem = null;
    
    if (currentPage.includes('/dashboard') || currentPage.endsWith('/') || currentPage.includes('dashboard.html')) {
        activeItem = document.querySelector('.menu li:nth-child(1)');
    } else if (currentPage.includes('/tasks') || currentPage.includes('task.html')) {
        activeItem = document.querySelector('.menu li:nth-child(2)');
    } else if (currentPage.includes('/community')) {
        activeItem = document.querySelector('.menu li:nth-child(3)');
    } else if (currentPage.includes('/expenses')) {
        activeItem = document.querySelector('.menu li:nth-child(4)');
    } else if (currentPage.includes('/notes')) {
        activeItem = document.querySelector('.menu li:nth-child(5)');
    } else if (currentPage.includes('/settings')) {
        activeItem = document.querySelector('.menu li:nth-child(6)');
    }
    
    if (!activeItem) {
        activeItem = document.querySelector('.menu li:nth-child(1)');
    }
    
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function setActiveMenuItem(menuItem) {
    const allMenuItems = document.querySelectorAll('.menu li');
    allMenuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    menuItem.classList.add('active');
}

function setupMenuClickHandlers() {
    const menuItems = document.querySelectorAll('.menu li');
    
    menuItems.forEach(item => {
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
    });
    
    const freshMenuItems = document.querySelectorAll('.menu li');
    
    freshMenuItems.forEach((item, index) => {
        item.dataset.clickCount = 0;
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            item.dataset.clickCount = parseInt(item.dataset.clickCount) + 1;
            
            const menuText = this.querySelector('.menu-text').textContent;
            
            setActiveMenuItem(this);
            
            this.style.backgroundColor = '#eef0ff';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
            
            setTimeout(() => {
                switch(menuText) {
                    case 'Dashboard':
                        window.location.href = '/modules/login/dashboard/dashboard.html';
                        break;
                    case 'Tasks':
                        window.location.href = '/components/tasks/task.html';
                        break;
                    case 'Community':
                        window.location.href = '/components/community/community.html';
                        break;
                    case 'Expenses':
                        window.location.href = '/components/expenses/expenses.html';
                        break;
                    case 'Notes':
                        window.location.href = '/components/notes/notes.html';
                        break;
                    case 'Settings':
                        window.location.href = '/components/settings/settings.html';
                        break;
                    default:
                        window.location.href = '/modules/login/dashboard/dashboard.html';
                }
            }, 100);
        });
    });
}

function setupCollapseArrow() {
    const collapseArrow = document.getElementById('collapseArrow');
    if (collapseArrow) {
        const newArrow = collapseArrow.cloneNode(true);
        collapseArrow.parentNode.replaceChild(newArrow, collapseArrow);
        
        const freshCollapseArrow = document.getElementById('collapseArrow');
        
        freshCollapseArrow.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
                
                localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
                
                if (window.adjustLayoutForSidebar) {
                    setTimeout(window.adjustLayoutForSidebar, 100);
                }
            }
        });
    }
}

function applySavedState() {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.add('collapsed');
        }
    }
}

function setupLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        const newBtn = logoutBtn.cloneNode(true);
        logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
        
        const freshLogoutBtn = document.getElementById('logoutBtn');
        
        freshLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            localStorage.removeItem("currentUser");
            
            window.location.href = "/modules/login/login.html";
        });
    }
}

function initSidebar() {
    setActiveMenuItemBasedOnPage();
    setupMenuClickHandlers();
    setupCollapseArrow();
    applySavedState();
    setupLogoutButton();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initSidebar, 100);
    });
} else {
    setTimeout(initSidebar, 100);
}