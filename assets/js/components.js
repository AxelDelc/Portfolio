async function loadComponents() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Charger le header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        const res = await fetch('components/header.html');
        const html = await res.text();
        headerPlaceholder.outerHTML = html;

        // Marquer le lien actif
        document.querySelectorAll('header nav ul a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Initialiser le menu hamburger
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('nav ul');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }
    }

    // Charger le footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        const res = await fetch('components/footer.html');
        const html = await res.text();
        footerPlaceholder.outerHTML = html;
    }
}

loadComponents();
