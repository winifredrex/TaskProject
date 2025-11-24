const sidebar = document.querySelector('.sidebar');
const collapseArrow = document.querySelector('.collapse-arrow');

collapseArrow.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    
    // Rotate the image
    if (sidebar.classList.contains('collapsed')) {
        collapseArrow.style.transform = 'rotate(180deg)';
    } else {
        collapseArrow.style.transform = 'rotate(0deg)';
    }
});
