console.log('Community.js loading...');

function initCommunityPage() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        alert("Please login first");
        window.location.href = "/modules/login/login.html";
        return;
    }
    
    updateUserAvatar(currentUser);
    loadPosts();
    setupCommunityEventListeners();
}

function updateUserAvatar(user) {
    const avatarCircle = document.getElementById('userAvatarCircle');
    if (avatarCircle && user.name) {
        avatarCircle.textContent = user.name.charAt(0).toUpperCase();
    }
}

function loadPosts() {
    const postFeed = document.getElementById('postFeed');
    const emptyState = document.getElementById('emptyState');
    
    if (!postFeed || !emptyState) return;
    
    postFeed.innerHTML = '';
    
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    
    if (posts.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postFeed.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-item';
    postDiv.dataset.postId = post.id;
    
    const timeAgo = post.time || getTimeAgo(new Date(post.createdAt || Date.now()));
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">
                ${post.avatar || 'U'}
            </div>
            <div class="post-user-info">
                <div class="post-username">${post.username}</div>
                ${post.handle ? `<div class="post-user-handle">${post.handle}</div>` : ''}
            </div>
            <div class="post-time">${timeAgo}</div>
        </div>
        <div class="post-content">${escapeHtml(post.content)}</div>
    `;
    
    return postDiv;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

function handleNewPost() {
    const postInput = document.getElementById('postInput');
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!postInput || !currentUser) return;
    
    const content = postInput.value.trim();
    
    if (!content) {
        alert('Please enter some content before posting.');
        return;
    }
    
    const newPost = {
        id: Date.now(),
        username: currentUser.name,
        handle: `@${currentUser.name.toLowerCase()}`,
        avatar: currentUser.name.charAt(0).toUpperCase(),
        content: content,
        createdAt: new Date().toISOString()
    };
    
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    posts.unshift(newPost);
    localStorage.setItem('communityPosts', JSON.stringify(posts));
    
    postInput.value = '';
    loadPosts();
}

function setupCommunityEventListeners() {
    const postButton = document.getElementById('postButton');
    const postInput = document.getElementById('postInput');
    
    if (postButton) {
        postButton.addEventListener('click', handleNewPost);
    }
    
    if (postInput) {
        postInput.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                handleNewPost();
            }
        });
    }
}

function clearAllPosts() {
    if (confirm('Are you sure you want to clear all posts? This cannot be undone.')) {
        localStorage.removeItem('communityPosts');
        loadPosts();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initCommunityPage();
    }, 500);
});