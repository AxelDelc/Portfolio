// Two-layer titles: the saffron layer drifts slightly with the pointer
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const root = document.documentElement;
    window.addEventListener('pointermove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 12;
        const y = (event.clientY / window.innerHeight - 0.5) * 8;
        root.style.setProperty('--mx', x.toFixed(1) + 'px');
        root.style.setProperty('--my', y.toFixed(1) + 'px');
    });
}

// Project gallery lightbox (only on project pages)
const lightbox = document.getElementById('lightbox');
const galleryItems = document.querySelectorAll('.gallery-item');

if (lightbox && galleryItems.length > 0) {
    const lightboxImage = document.getElementById('lightboxImage');
    const closeButton = document.getElementById('closeLightbox');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const images = Array.from(galleryItems).map((item) => item.querySelector('img'));
    let currentIndex = 0;
    let lastFocused = null;

    const showImage = (index) => {
        currentIndex = (index + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
    };

    const openLightbox = (index) => {
        lastFocused = document.activeElement;
        showImage(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeButton.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', () => showImage(currentIndex - 1));
    nextButton.addEventListener('click', () => showImage(currentIndex + 1));

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
}
