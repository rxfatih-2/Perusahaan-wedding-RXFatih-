document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PRELOADER
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 600);
        });
    }

    // 2. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            // Hapus scrolled jika di halaman index (agar navbar transparan di hero)
            // Tapi biarkan tetap scrolled jika di halaman gallery
            if (document.querySelector('.hero')) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 3. HAMBURGER MENU LOGIC
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (hamburger && mobileMenu) {
        function toggleMenu() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        hamburger.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);
    }

    // 4. SCROLL REVEAL ANIMATION (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // 5. LIGHTBOX LOGIC (Khusus Gallery)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                if (src) {
                    lightboxImg.src = src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 6. VIDEO LOGIC (Khusus Gallery)
    const videoContainer = document.getElementById('videoContainer');
    const weddingVideo = document.getElementById('weddingVideo');

    if (videoContainer && weddingVideo) {
        videoContainer.addEventListener('click', function() {
            const poster = this.querySelector('.video-poster');
            const playBtn = this.querySelector('.play-btn');
            
            if (poster) poster.style.display = 'none';
            if (playBtn) playBtn.style.display = 'none';
            
            weddingVideo.style.display = 'block';
            weddingVideo.play();
        });
    }
});
