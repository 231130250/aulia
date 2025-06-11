/* ======================================================= */
/* SCRIPT.JS - VERSI FINAL & DISEMPURNAKAN 		   */
/* ======================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SELEKSI SEMUA ELEMEN ---
    // Mengambil semua elemen dari HTML agar mudah diakses
    const loginOverlay = document.getElementById('login-overlay');
    const mainContent = document.getElementById('main-content');
    const loginButton = document.getElementById('login-button');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');

    const backgroundMusic = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');

    const giftBox = document.getElementById('gift-box');
    const giftImage = document.getElementById('gift-image');
    const wishesContainer = document.getElementById('wishes-container');
    const wishes = document.querySelectorAll('.wish');
    
    const photoCards = document.querySelectorAll('.photo-card');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.close-button');

    const timelineItems = document.querySelectorAll('.timeline-item');

    // --- 2. STATE & KONFIGURASI ---
    // Menyimpan data atau status yang bisa berubah
    const secretPassword = 'abang'; // Kata sandi dari kode Anda sebelumnya
    let isGiftOpen = false;

    // --- 3. FUNGSI-FUNGSI ---
    // Kumpulan fungsi untuk menjalankan tugas spesifik

    /**
     * Menangani proses login pengguna.
     */
    function handleLogin() {
        if (passwordInput.value.toLowerCase() === secretPassword) {
            loginOverlay.style.animation = 'fadeOut 1s forwards';
            
            setTimeout(() => {
                loginOverlay.classList.add('hidden');
                mainContent.classList.remove('hidden');

                // Otomatis putar musik dan tampilkan tombol kontrol
                backgroundMusic.play();
                musicControl.classList.remove('hidden');
                musicControl.classList.add('visible');
            }, 1000);
        } else {
            errorMessage.classList.remove('hidden');
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
        }
    }

    /**
     * Mengontrol play/pause musik dan mengubah ikon.
     */
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicIcon.src = 'https://cdn-icons-png.flaticon.com/512/26/26472.png'; // Ikon Sound On
            musicIcon.alt = 'Music On';
        } else {
            backgroundMusic.pause();
            musicIcon.src = 'https://cdn-icons-png.flaticon.com/512/26/26470.png'; // Ikon Mute
            musicIcon.alt = 'Music Off';
        }
    }

    /**
     * Menangani animasi saat kado dibuka.
     */
    function openGift() {
        if (isGiftOpen) return;
        isGiftOpen = true;

        giftBox.style.animation = 'shake 0.7s';

        setTimeout(() => {
            giftImage.src = './kado terbuka.png'; // Pastikan nama file kado terbuka Anda sesuai
            wishesContainer.classList.remove('hidden');
            
            // Tampilkan setiap "surat kecil" satu per satu
            wishes.forEach((wish, index) => {
                setTimeout(() => {
                    wish.classList.add('visible');
                }, index * 800);
            });
        }, 700);
    }

    /**
     * Membuka lightbox saat gambar di galeri diklik.
     * @param {Event} event - Event klik dari kartu foto.
     */
    function openLightbox(event) {
        const imageSrc = event.currentTarget.querySelector('img').src;
        lightboxImage.src = imageSrc;
        lightboxModal.classList.remove('hidden');
    }

    /**
     * Menutup lightbox.
     */
    function closeLightbox() {
        lightboxModal.classList.add('hidden');
    }

    // --- 4. INISIALISASI & EVENT LISTENER ---
    // Menjalankan fungsi dan menambahkan event listener ke elemen

    // Listener untuk Tombol Login
    loginButton.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    });

    // Listener untuk Tombol Musik
    musicControl.addEventListener('click', toggleMusic);

    // Listener untuk Kotak Kado
    giftBox.addEventListener('click', openGift);

    // Listener untuk setiap Kartu Foto di Galeri
    photoCards.forEach(card => card.addEventListener('click', openLightbox));

    // Listener untuk menutup Lightbox
    closeButton.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (event) => {
        // Hanya tutup jika yang diklik adalah area gelap (latar belakang modal)
        if (event.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Inisialisasi Intersection Observer untuk animasi scroll Timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Jika elemen masuk ke dalam viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.5 // Animasi terpicu saat 50% elemen terlihat
    });

    // Terapkan observer ke setiap item di timeline
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

});