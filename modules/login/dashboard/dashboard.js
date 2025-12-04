console.log('Dashboard.js loading...');

function updateUserName() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (currentUser) {
        const userNameElement = document.getElementById("userName");
        
        if (userNameElement) {
            userNameElement.textContent = currentUser.name;
        }
        
        const header = document.querySelector('.header h1');
        if (header && currentUser) {
            const hour = new Date().getHours();
            let greeting;
            
            if (hour < 12) greeting = "Good morning";
            else if (hour < 18) greeting = "Good afternoon";
            else greeting = "Good evening";
            
            header.innerHTML = `${greeting}, <span id="userName">${currentUser.name}</span>!`;
        }
        
        const sidebarName = document.getElementById("sidebarName");
        const sidebarEmail = document.getElementById("sidebarEmail");
        const avatar = document.getElementById("profileAvatar");
        
        if (sidebarName) {
            sidebarName.textContent = currentUser.name;
        }
        if (sidebarEmail) {
            sidebarEmail.textContent = currentUser.email;
        }
        if (avatar) {
            avatar.textContent = currentUser.name.trim().charAt(0).toUpperCase();
        }
        
        return true;
    } else {
        alert("Please login first");
        window.location.href = "/modules/login/login.html";
        return false;
    }
}

function adjustLayoutForSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
        const isCollapsed = sidebar.classList.contains('collapsed');
        
        document.body.classList.toggle('sidebar-collapsed', isCollapsed);
        document.body.classList.toggle('sidebar-expanded', !isCollapsed);
        
        const statsContainer = document.querySelector('.stats-container');
        const bottomGrid = document.querySelector('.bottom-grid');
        
        if (isCollapsed) {
            if (statsContainer) {
                statsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
            }
            if (bottomGrid) {
                bottomGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
        } else {
            if (statsContainer) {
                statsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
            }
            if (bottomGrid) {
                bottomGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(400px, 1fr))';
            }
        }
    }
}

function initDashboard() {
    const userUpdated = updateUserName();
    
    if (userUpdated) {
        adjustLayoutForSidebar();
        
        const collapseArrow = document.getElementById('collapseArrow');
        if (collapseArrow) {
            collapseArrow.addEventListener('click', () => {
                setTimeout(adjustLayoutForSidebar, 300);
            });
        }
        
        window.addEventListener('resize', adjustLayoutForSidebar);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    setTimeout(initDashboard, 100);
}

window.updateUserName = updateUserName;
window.adjustLayoutForSidebar = adjustLayoutForSidebar;
window.initDashboard = initDashboard;