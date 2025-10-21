function marcarEnlaceActivoCabecera() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    console.log()
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
    marcarEnlaceActivoCabecera();
});