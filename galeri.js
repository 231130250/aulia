/* ======================================================= */
/* SCRIPT.JS - UNTUK HALAMAN GALERI                        */
/* ======================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELEKSI ELEMEN ---
    const photoCards = document.querySelectorAll('.gallery-grid .photo-card');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.close-button');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- 2. LOGIKA NAVBAR ---
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // --- 3. ANIMASI PEMBUKA HALAMAN ---
    function animateGallery() {
        photoCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        });
    }
    window.addEventListener('load', animateGallery);

    // --- 4. LOGIKA LIGHTBOX ---
    function openLightbox(event) {
        const imageSrc = event.currentTarget.querySelector('img').src;
        lightboxImage.src = imageSrc;
        lightboxModal.classList.remove('hidden');
    }

    function closeLightbox() {
        lightboxModal.classList.add('hidden');
    }

    photoCards.forEach(card => card.addEventListener('click', openLightbox));
    closeButton.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (event) => {
        if (event.target === lightboxModal) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
            closeLightbox();
        }
    });
});