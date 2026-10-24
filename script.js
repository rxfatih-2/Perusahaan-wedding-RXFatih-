/* ================================================================
   Rxfatih Atelier — script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. NAVBAR SCROLL ---------- */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });
    }

    /* ---------- 2. MOBILE MENU ---------- */
const menuBtn = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('active');
        menuBtn.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Tutup menu saat klik link (termasuk link ke halaman lain)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Tutup menu saat klik di luar area menu
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')
            && !navMenu.contains(e.target)
            && !menuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Tutup menu saat resize ke desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1000) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/* ---------- 3. SMOOTH SCROLL (hanya untuk anchor di halaman yang sama) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;           // ← ini kunci fix: kalau tidak ada, biarkan browser yang urus
        e.preventDefault();
        const offset = 70;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
    });
});

    /* ---------- 4. SERVICE PREVIEW ---------- */
    const preview = document.getElementById('servicePreview');
    const previewImg = document.getElementById('servicePreviewImg');
    const serviceRows = document.querySelectorAll('.service-row');
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (preview && previewImg && !isTouch) {
        serviceRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                const src = row.getAttribute('data-img');
                if (src) previewImg.src = src;
                preview.classList.add('active');
            });
            row.addEventListener('mouseleave', () => preview.classList.remove('active'));
        });
        document.addEventListener('mousemove', (e) => {
            if (preview.classList.contains('active')) {
                preview.style.left = e.clientX + 'px';
                preview.style.top  = e.clientY + 'px';
            }
        });
    }

    /* ---------- 5. STATS COUNTER ---------- */
    const statNums = document.querySelectorAll('.stat-num');
    function animateCount(el) {
        const target = +el.dataset.target;
        const duration = 1800;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }
        requestAnimationFrame(tick);
    }
    if (statNums.length) {
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            statNums.forEach(el => io.observe(el));
        } else {
            statNums.forEach(el => el.textContent = el.dataset.target);
        }
    }

    /* ---------- 6. GALLERY REVEAL ---------- */
    const galleryItems = document.querySelectorAll('.g-item');
    if (galleryItems.length && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transition =
                        'opacity 1s cubic-bezier(.22,.61,.36,1), transform 1s cubic-bezier(.22,.61,.36,1)';
                    entry.target.style.transitionDelay = (i * 0.06) + 's';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            io.observe(item);
        });
    }

    /* ---------- 7. GALLERY LIGHTBOX ---------- */
    document.querySelectorAll('.g-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position:fixed; inset:0; z-index:9999;
                background:rgba(30,22,19,.94);
                display:grid; place-items:center;
                padding:2rem; cursor:zoom-out;
                opacity:0; transition:opacity .3s;
            `;
            const big = document.createElement('img');
            big.src = img.src;
            big.style.cssText = `
                max-width:90vw; max-height:90vh;
                object-fit:contain;
                box-shadow:0 40px 80px -20px rgba(0,0,0,.6);
                transform:scale(.96); transition:transform .4s cubic-bezier(.22,.61,.36,1);
            `;
            overlay.appendChild(big);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                big.style.transform = 'scale(1)';
            });
            overlay.addEventListener('click', () => {
                overlay.style.opacity = '0';
                big.style.transform = 'scale(.96)';
                setTimeout(() => {
                    overlay.remove();
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    });

    /* ---------- 8. TESTIMONI CAROUSEL ---------- */
    (function () {
        const track  = document.getElementById('testiTrack');
        if (!track) return;
        const slides = track.querySelectorAll('.testi-slide');
        const dotsEl = document.getElementById('testiDots');
        const btnPrev = document.getElementById('testiPrev');
        const btnNext = document.getElementById('testiNext');
        let index = 0;
        let autoTimer = null;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Slide ' + (i + 1));
            dot.addEventListener('click', () => goTo(i));
            dotsEl.appendChild(dot);
        });
        const dots = dotsEl.querySelectorAll('.testi-dot');
        slides[0].classList.add('active');

        function goTo(i) {
            slides[index].classList.remove('active');
            dots[index].classList.remove('active');
            index = (i + slides.length) % slides.length;
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            restartAuto();
        }
        btnPrev.addEventListener('click', () => goTo(index - 1));
        btnNext.addEventListener('click', () => goTo(index + 1));
        function startAuto() { autoTimer = setInterval(() => goTo(index + 1), 6000); }
        function restartAuto() { clearInterval(autoTimer); startAuto(); }
        startAuto();

        let startX = 0;
        track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].clientX - startX;
            if (Math.abs(diff) > 50) goTo(diff > 0 ? index - 1 : index + 1);
        });
    })();

    /* ---------- 9. CONTACT FORM ---------- */
    (function () {
        const form = document.getElementById('contactForm');
        if (!form) return;
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            const wrap = field.closest('.field');
            if (!wrap) return;
            const check = () => {
                if (field.value && field.value.trim() !== '') wrap.classList.add('filled');
                else wrap.classList.remove('filled');
            };
            field.addEventListener('input', check);
            field.addEventListener('change', check);
            check();
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const original = btn.innerHTML;
            btn.innerHTML = '<span>Mengirim...</span><i class="fa-solid fa-circle-notch fa-spin"></i>';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<span>Terima kasih!</span><i class="fa-solid fa-check"></i>';
                btn.style.background = 'var(--champagne)';
                btn.style.color = 'var(--brown-deep)';
                btn.style.borderColor = 'var(--champagne)';
                setTimeout(() => {
                    form.reset();
                    fields.forEach(f => f.closest('.field')?.classList.remove('filled'));
                    btn.innerHTML = original;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.borderColor = '';
                }, 2000);
            }, 1200);
        });
    })();

    /* ---------- 10. GALLERY PAGE FILTER ---------- */
    (function () {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const gridItems  = document.querySelectorAll('#galleryGrid .g-item');
        if (!filterBtns.length || !gridItems.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.dataset.filter;
                gridItems.forEach(item => {
                    const match = cat === 'all' || item.dataset.cat === cat;
                    item.classList.toggle('hidden', !match);
                });
            });
        });
    })();

});
