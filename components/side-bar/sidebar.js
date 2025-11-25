const sidebar = document.querySelector('.sidebar');
const collapseArrow = document.querySelector('.collapse-arrow');

collapseArrow.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        collapseArrow.style.transform = 'rotate(180deg)';
    } else {
        collapseArrow.style.transform = 'rotate(0deg)';
    }
});

const name = "Winifred Rex"; 
const avatar = document.getElementById("profileAvatar");

if (name && avatar) {
    avatar.textContent = name.trim().charAt(0);
}
