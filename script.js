/* ======================================================= */
/* SCRIPT.JS - VERSI FINAL DENGAN IKON GAMBAR & SESSION    */
/* ======================================================= */

console.log(
    "%cHei, Adek! Kalau kamu bisa lihat ini, berarti kamu memang pacar IT-ku yang paling keren. I love you more than `i++` in an infinite loop. ❤️ - Dimas",
    "color: #ff7e8e; font-size: 20px; font-family: 'Pacifico', cursive; -webkit-text-stroke: 1px #333; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);"
);

document.addEventListener('DOMContentLoaded', function() {

    // Cek status login di awal
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.querySelector('.navbar').classList.remove('hidden');
        const musicControl = document.getElementById('music-control');
        musicControl.classList.remove('hidden');
        musicControl.classList.add('visible');
        document.getElementById('background-music').play().catch(error => { console.log("Autoplay musik dicegah oleh browser."); });
    }

    // --- 1. SELEKSI ELEMEN ---
    const navbar = document.querySelector('.navbar');
    const preloader = document.getElementById('preloader');
    const loginOverlay = document.getElementById('login-overlay');
    const mainContent = document.getElementById('main-content');
    const loginButton = document.getElementById('login-button');
    const passwordInput = document.getElementById('password-input');
    const loginBox = document.querySelector('.login-box');
    const errorMessage = document.getElementById('error-message');
    const backgroundMusic = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon'); // <-- Variabel ini diperlukan lagi
    const giftBox = document.getElementById('gift-box');
    const giftImage = document.getElementById('gift-image');
    const wishesContainer = document.getElementById('wishes-container');
    const wishes = document.querySelectorAll('.wish');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.close-button');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const imagesToLightbox = document.querySelectorAll('.photo-card, .lightboxable');

    // --- 2. STATE & KONFIGURASI ---
    const secretPassword = 'adek';
    let isGiftOpen = false;

    // --- 3. LOGIKA PRELOADER ---
    window.addEventListener('load', () => {
        preloader.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => { preloader.classList.add('hidden'); }, 500);
    });

    // --- 4. FUNGSI-FUNGSI UTAMA ---
    function handleLogin() {
        if (passwordInput.value.trim().toLowerCase() === secretPassword) {
            sessionStorage.setItem('isLoggedIn', 'true');
            loginOverlay.style.animation = 'fadeOut 1s forwards';
            setTimeout(() => {
                loginOverlay.classList.add('hidden');
                mainContent.classList.remove('hidden');
                navbar.classList.remove('hidden');
                backgroundMusic.play();
                musicControl.classList.remove('hidden');
                musicControl.classList.add('visible');
            }, 1000);
        } else {
            errorMessage.classList.remove('hidden');
            loginBox.style.animation = 'shake 0.5s';
            setTimeout(() => { loginBox.style.animation = ''; }, 500);
        }
    }

    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicIcon.src = 'musik-on.png';
        } else {
            backgroundMusic.pause();
            musicIcon.src = 'musik off.png';
        }
    }

    function openGift() {
        if (isGiftOpen) return;
        isGiftOpen = true;
        giftBox.style.cursor = 'default';
        giftBox.style.animation = 'shake 0.7s';
        setTimeout(() => {
            giftImage.src = 'kado terbuka.png';
            wishesContainer.classList.remove('hidden');
            wishes.forEach((wish, index) => {
                setTimeout(() => { wish.classList.add('visible'); }, index * 500);
            });
        }, 700);
    }

    function openLightbox(event) {
        let imageSrc;
        if (event.currentTarget.classList.contains('photo-card')) {
            imageSrc = event.currentTarget.querySelector('img').src;
        } else {
            imageSrc = event.currentTarget.src;
        }
        lightboxImage.src = imageSrc;
        lightboxModal.classList.remove('hidden');
    }

    function closeLightbox() {
        lightboxModal.classList.add('hidden');
    }

    // --- 5. INISIALISASI & EVENT LISTENER ---
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });
    loginButton.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') handleLogin();
    });
    musicControl.addEventListener('click', toggleMusic);
    giftBox.addEventListener('click', openGift);
    imagesToLightbox.forEach(item => item.addEventListener('click', openLightbox));
    closeButton.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (event) => {
        if (event.target === lightboxModal) closeLightbox();
    });
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.3 });
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});