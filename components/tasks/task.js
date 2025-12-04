console.log('Task.js loading');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingTaskId = null;

const addTaskBtn = document.getElementById('addTaskBtn');
const taskModal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const taskForm = document.getElementById('taskForm');
const tasksListContainer = document.getElementById('tasksListContainer');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const activeTasksElement = document.getElementById('activeTasks');
const completedTasksElement = document.getElementById('completedTasks');

const myTasksTab = document.getElementById('myTasksTab');
const aiSummaryTab = document.getElementById('aiSummaryTab');
const tasksView = document.getElementById('tasksView');
const aiSummaryView = document.getElementById('aiSummaryView');
const generateSummaryBtn = document.getElementById('generateSummaryBtn');

function initTasksPage() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        alert("Please login first");
        window.location.href = "/modules/login/login.html";
        return;
    }
    
    updateSidebar(currentUser);
    loadTasks();
    updateStats();
    setupEventListeners();
}

function updateSidebar(user) {
    setTimeout(() => {
        const avatar = document.getElementById('profileAvatar');
        const nameEl = document.getElementById('sidebarName');
        const emailEl = document.getElementById('sidebarEmail');
        
        if (avatar && user.name) {
            avatar.textContent = user.name.charAt(0).toUpperCase();
        }
        
        if (nameEl && user.name) {
            nameEl.textContent = user.name;
        }
        
        if (emailEl && user.email) {
            emailEl.textContent = user.email;
        }
        
        const menuItems = document.querySelectorAll('.menu li');
        
        if (menuItems.length >= 2) {
            menuItems.forEach(item => item.classList.remove('active'));
            menuItems[1].classList.add('active');
        }
        
    }, 100);
}

function loadTasks() {
    const userTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = userTasks;
    renderTasks();
}

function renderTasks() {
    if (tasks.length === 0) {
        tasksListContainer.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    tasksListContainer.style.display = 'block';
    
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item" data-task-id="${task.id}">
            <div class="task-checkbox">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTaskCompletion(${task.id})">
            </div>
            <div class="task-content">
                <div class="task-title ${task.completed ? 'completed' : ''}">
                    ${task.title}
                </div>
                ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                <div class="task-meta">
                    <span class="task-priority priority-${task.priority}">
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    ${task.dueDate ? `<span>Due: ${formatDate(task.dueDate)}</span>` : ''}
                </div>
            </div>
            <div class="task-actions">
                <button class="action-btn" onclick="editTask(${task.id})" title="Edit">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="action-btn" onclick="deleteTask(${task.id})" title="Delete">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    activeTasksElement.textContent = activeTasks;
    completedTasksElement.textContent = completedTasks;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function openModal(task = null) {
    if (task) {
        document.querySelector('.modal-header h2').textContent = 'Edit Task';
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskDueDate').value = task.dueDate || '';
        editingTaskId = task.id;
    } else {
        document.querySelector('.modal-header h2').textContent = 'Add New Task';
        taskForm.reset();
        editingTaskId = null;
    }
    taskModal.style.display = 'flex';
}

function closeModalFunc() {
    taskModal.style.display = 'none';
    taskForm.reset();
    editingTaskId = null;
}

function saveTask(taskData) {
    if (editingTaskId) {
        const index = tasks.findIndex(t => t.id === editingTaskId);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData };
        }
    } else {
        const newTask = {
            id: Date.now(),
            ...taskData,
            completed: false,
            createdAt: new Date().toISOString()
        };
        tasks.unshift(newTask);
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateStats();
    closeModalFunc();
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        updateStats();
    }
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        openModal(task);
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        updateStats();
    }
}

function switchView(view) {
    if (view === 'tasks') {
        myTasksTab.classList.add('active');
        aiSummaryTab.classList.remove('active');
        tasksView.classList.add('active');
        aiSummaryView.classList.remove('active');
        addTaskBtn.style.display = 'flex';
    } else if (view === 'ai-summary') {
        myTasksTab.classList.remove('active');
        aiSummaryTab.classList.add('active');
        tasksView.classList.remove('active');
        aiSummaryView.classList.add('active');
        addTaskBtn.style.display = 'none';
    }
}

function generateAISummary() {
    alert('Generating AI summary...');
}

function setupEventListeners() {
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => openModal());
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModalFunc);
    }
    
    if (myTasksTab) {
        myTasksTab.addEventListener('click', () => switchView('tasks'));
    }
    
    if (aiSummaryTab) {
        aiSummaryTab.addEventListener('click', () => switchView('ai-summary'));
    }
    
    if (generateSummaryBtn) {
        generateSummaryBtn.addEventListener('click', generateAISummary);
    }
    
    taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) {
            closeModalFunc();
        }
    });
    
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskData = {
            title: document.getElementById('taskTitle').value.trim(),
            description: document.getElementById('taskDescription').value.trim(),
            priority: document.getElementById('taskPriority').value,
            dueDate: document.getElementById('taskDueDate').value || null
        };
        
        if (!taskData.title) {
            alert('Task title is required');
            return;
        }
        
        saveTask(taskData);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        initTasksPage();
    }, 500);
});

window.toggleTaskCompletion = toggleTaskCompletion;
window.editTask = editTask;
window.deleteTask = deleteTask;
window.switchView = switchView;