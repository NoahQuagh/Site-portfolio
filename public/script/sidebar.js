function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const body = document.querySelector('body');
    body.classList.toggle('menu-open');
    sidebar.classList.toggle('open');
}