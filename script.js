'use strict';

// Ganti nomor WhatsApp tujuan dengan format kode negara tanpa tanda + (contoh: 6281234567890)
const WHATSAPP_NUMBER = '6288226621362';

const THEME_CATALOG = {
  sunda: {
    category: 'Warisan Budaya • Jawa Barat',
    code: 'EDITION // SUNDA-01',
    title: 'Sunda Siger & Parahyangan',
    description:
      'Nuansa hijau zamrud hutan priangan berpadu aksen emas siger Sunda, ornamen mega mendung halus, dan alur sambutan hangat khas tanah Pasundan.',
    liveUrl: 'https://rxfatih-2.github.io/Sunda-wedding-/',
    bookingLabel: 'Adat Sunda (Siger & Parahyangan)',
    swatches: [
      { label: '#163026', hex: '#163026' },
      { label: '#D6A954', hex: '#D6A954' },
      { label: '#F6EFE2', hex: '#F6EFE2' }
    ],
    highlights: [
      'Ornamen mahkota siger dan lengkung arsitektur Pasundan',
      'Tipografi serif editorial dengan aksen kaligrafi pembuka',
      'Navigasi peta lokasi, hitung mundur, dan amplop digital terintegrasi'
    ],
    screen: {
      sub: 'Wilujeng Sumping',
      couple: 'Neng Sari & Kang Dimas',
      venue: 'Gedong Sate Heritage Hall • Bandung',
      pill: 'Buka Undangan'
    }
  },
  bugis: {
    category: 'Warisan Budaya • Sulawesi Selatan',
    code: 'EDITION // BUGIS-02',
    title: 'Bugis Sutera & Saoraja',
    description:
      'Terinspirasi kemegahan tenun sutera Bugis-Makassar dengan dominasi merah marun kerajaan, benang emas, dan tata penghormatan keluarga.',
    liveUrl: 'https://rxfatih-2.github.io/Bugis-wedding-/',
    bookingLabel: 'Adat Bugis (Sutera & Saoraja)',
    swatches: [
      { label: '#4A151B', hex: '#4A151B' },
      { label: '#E2B35C', hex: '#E2B35C' },
      { label: '#FDF3E7', hex: '#FDF3E7' }
    ],
    highlights: [
      'Motif geometris tenun sutera dan ornamen bola soba',
      'Susunan gelar adat serta prosesi mappacci dan akad',
      'Animasi transisi berlapis yang ringan di perangkat seluler'
    ],
    screen: {
      sub: 'Salamaki Tapada Salama',
      couple: 'Andi Tenri & Andi Farhan',
      venue: 'Saoraja Ballroom • Makassar',
      pill: 'Buka Undangan'
    }
  },
  minang: {
    category: 'Warisan Budaya • Sumatera Barat',
    code: 'EDITION // MINANG-03',
    title: 'Minangkabau Suntiang & Gadang',
    description:
      'Perpaduan hitam marawa, merah marun, dan kilau emas suntiang Minang dengan siluet atap gonjong yang tegas dan berwibawa.',
    liveUrl: 'https://rxfatih-2.github.io/Minangkabau-wedding-/',
    bookingLabel: 'Adat Minangkabau (Suntiang & Gadang)',
    swatches: [
      { label: '#1E1916', hex: '#1E1916' },
      { label: '#3A1614', hex: '#3A1614' },
      { label: '#E4B44A', hex: '#E4B44A' }
    ],
    highlights: [
      'Siluet atap Rumah Gadang dan ukiran itiak pulang patang',
      'Komposisi warna marawa klasik dengan kontras tinggi',
      'Halaman kisah cinta dan konfirmasi kehadiran tamu terstruktur'
    ],
    screen: {
      sub: 'Baralek Gadang',
      couple: 'Rani & Gilang',
      venue: 'Istano Silinduang Bulan • Bukittinggi',
      pill: 'Buka Undangan'
    }
  },
  mario: {
    category: 'Konsep Interaktif • Retro Arcade',
    code: 'EDITION // MARIO-04',
    title: 'Retro Super Mario Adventure',
    description:
      'Konsep undangan interaktif bergaya permainan klasik 8-bit dengan karakter animasi, mekanik petualangan ringan, dan suasana ceria yang tak terlupakan.',
    liveUrl: 'https://rxfatih-2.github.io/Mario-wedding-/',
    bookingLabel: 'Retro Super Mario (Interaktif)',
    swatches: [
      { label: '#2563EB', hex: '#2563EB' },
      { label: '#FACC15', hex: '#FACC15' },
      { label: '#15803D', hex: '#15803D' }
    ],
    highlights: [
      'Animasi karakter interaktif dan mekanik level permainan',
      'Efek suara retro opsional yang ramah peramban ponsel',
      'Cocok untuk pasangan muda yang menginginkan pengalaman anti-mainstream'
    ],
    screen: {
      sub: 'World 1-1 • Love Quest',
      couple: 'Mario & Peach',
      venue: 'Mushroom Kingdom Castle',
      pill: 'Press Start'
    }
  }
};

function formatRupiah(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Header scroll elevation & mobile navigation drawer
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');

  window.addEventListener(
    'scroll',
    () => {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    },
    { passive: true }
  );

  function closeMobileNav() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      primaryNav.classList.toggle('is-open', !isOpen);
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        closeMobileNav();
        menuToggle.focus();
      }
    });
  }

  // Ambient audio controller (uses local assets/music.mp3 with Web Audio gentle chord fallback)
  const audioToggle = document.getElementById('audio-toggle');
  const bgMusic = document.getElementById('bg-music');
  let audioCtx = null;
  let fallbackTimer = null;
  let isPlaying = false;

  function startGentleFallbackTone() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const notes = [261.63, 329.63, 392.0, 493.88];
    let step = 0;

    const playNote = () => {
      if (!isPlaying || !audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[step % notes.length], now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.025, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 2.5);
      step += 1;
    };

    playNote();
    fallbackTimer = window.setInterval(playNote, 2600);
  }

  function stopAudio() {
    isPlaying = false;
    if (bgMusic) {
      bgMusic.pause();
    }
    if (fallbackTimer) {
      clearInterval(fallbackTimer);
      fallbackTimer = null;
    }
    if (audioToggle) {
      audioToggle.setAttribute('aria-pressed', 'false');
    }
  }

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      if (isPlaying) {
        stopAudio();
        return;
      }
      isPlaying = true;
      audioToggle.setAttribute('aria-pressed', 'true');
      if (bgMusic) {
        bgMusic.play().catch(() => {
          startGentleFallbackTone();
        });
      } else {
        startGentleFallbackTone();
      }
    });
  }

  // Interactive Theme Showcase Stage
  const themeTabs = document.querySelectorAll('.theme-tab');
  const showcaseStage = document.getElementById('panel-preview');
  const categoryEl = document.getElementById('theme-category');
  const codeEl = document.getElementById('theme-code');
  const titleEl = document.getElementById('theme-title');
  const descEl = document.getElementById('theme-desc');
  const swatchesEl = document.getElementById('theme-swatches');
  const highlightsEl = document.getElementById('theme-highlights');
  const liveLinkEl = document.getElementById('theme-live-link');
  const selectThemeBtn = document.getElementById('theme-select-for-order');
  const deviceMockup = document.getElementById('device-mockup');
  const screenSub = document.getElementById('screen-sub');
  const screenCouple = document.getElementById('screen-couple');
  const screenVenue = document.getElementById('screen-venue');
  const screenPill = document.getElementById('screen-pill');
  const bookingThemeSelect = document.getElementById('selected-theme');

  let activeThemeKey = 'sunda';

  function renderTheme(themeKey, syncUrl = true) {
    const data = THEME_CATALOG[themeKey];
    if (!data) return;
    activeThemeKey = themeKey;

    themeTabs.forEach((tab) => {
      const selected = tab.dataset.theme === themeKey;
      tab.setAttribute('aria-selected', String(selected));
      if (selected && showcaseStage) {
        showcaseStage.setAttribute('aria-labelledby', tab.id);
      }
    });

    if (categoryEl) categoryEl.textContent = data.category;
    if (codeEl) codeEl.textContent = data.code;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;
    if (liveLinkEl) liveLinkEl.href = data.liveUrl;

    if (swatchesEl) {
      swatchesEl.innerHTML = '';
      data.swatches.forEach((swatch) => {
        const chip = document.createElement('span');
        chip.className = 'swatch-chip';
        const dot = document.createElement('span');
        dot.className = 'swatch-dot';
        dot.style.backgroundColor = swatch.hex;
        const label = document.createTextNode(swatch.label);
        chip.appendChild(dot);
        chip.appendChild(label);
        swatchesEl.appendChild(chip);
      });
    }

    if (highlightsEl) {
      highlightsEl.innerHTML = '';
      data.highlights.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        highlightsEl.appendChild(li);
      });
    }

    if (deviceMockup) deviceMockup.dataset.activeTheme = themeKey;
    if (screenSub) screenSub.textContent = data.screen.sub;
    if (screenCouple) screenCouple.textContent = data.screen.couple;
    if (screenVenue) screenVenue.textContent = data.screen.venue;
    if (screenPill) screenPill.textContent = data.screen.pill;

    if (syncUrl && window.history && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.set('tema', themeKey);
      window.history.replaceState({}, '', url);
    }
  }

  themeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      renderTheme(tab.dataset.theme, true);
    });
  });

  if (selectThemeBtn) {
    selectThemeBtn.addEventListener('click', () => {
      const current = THEME_CATALOG[activeThemeKey];
      if (current && bookingThemeSelect) {
        bookingThemeSelect.value = current.bookingLabel;
      }
      const bookingSection = document.getElementById('konsultasi');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const initialParams = new URLSearchParams(window.location.search);
  const requestedTheme = initialParams.get('tema');
  if (requestedTheme && THEME_CATALOG[requestedTheme]) {
    renderTheme(requestedTheme, false);
  } else {
    renderTheme('sunda', false);
  }

  // Package & Add-on Configurator
  const tierCards = document.querySelectorAll('.tier-card');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const totalAmountEl = document.getElementById('total-amount');
  const selectedPackageInput = document.getElementById('selected-package');
  const applyEstimateBtn = document.getElementById('apply-estimate-btn');

  function updateEstimate() {
    let basePrice = 199000;
    let tierName = 'Essential';

    tierCards.forEach((card) => {
      const radio = card.querySelector('input[type="radio"]');
      const isChecked = radio && radio.checked;
      card.classList.toggle('is-selected', Boolean(isChecked));
      if (isChecked) {
        basePrice = Number(card.dataset.price || 199000);
        const nameNode = card.querySelector('.tier-name');
        if (nameNode) {
          tierName = nameNode.childNodes[0].textContent.trim();
        }
      }
    });

    let addonSum = 0;
    const activeAddons = [];
    addonCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        addonSum += Number(checkbox.dataset.addonPrice || 0);
        activeAddons.push(checkbox.value);
      }
    });

    const grandTotal = basePrice + addonSum;
    const formattedTotal = formatRupiah(grandTotal);

    if (totalAmountEl) {
      totalAmountEl.textContent = formattedTotal;
    }

    if (selectedPackageInput) {
      const addonSummary = activeAddons.length > 0 ? ' + ' + activeAddons.join(', ') : '';
      selectedPackageInput.value = `${tierName}${addonSummary} (${formattedTotal})`;
    }
  }

  tierCards.forEach((card) => {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener('change', updateEstimate);
    }
  });

  addonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateEstimate);
  });

  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      updateEstimate();
    });
  }

  updateEstimate();

  // Direct-to-WhatsApp Booking Form with inline validation
  const bookingForm = document.getElementById('whatsapp-booking-form');
  const coupleInput = document.getElementById('couple-names');
  const dateInput = document.getElementById('event-date');
  const coupleError = document.getElementById('error-couple-names');
  const dateError = document.getElementById('error-event-date');
  const submitBtn = document.getElementById('submit-booking-btn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let firstInvalid = null;

      if (coupleError) coupleError.textContent = '';
      if (dateError) dateError.textContent = '';

      const coupleValue = coupleInput ? coupleInput.value.trim() : '';
      const dateValue = dateInput ? dateInput.value.trim() : '';

      if (!coupleValue) {
        if (coupleError) {
          coupleError.textContent = 'Mohon isi nama pasangan mempelai.';
        }
        firstInvalid = coupleInput;
      }

      if (!dateValue) {
        if (dateError) {
          dateError.textContent = 'Mohon pilih perkiraan tanggal acara.';
        }
        if (!firstInvalid) {
          firstInvalid = dateInput;
        }
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const themeValue = bookingThemeSelect ? bookingThemeSelect.value : 'Adat Sunda';
      const packageValue = selectedPackageInput ? selectedPackageInput.value : 'Essential';
      const notesEl = document.getElementById('client-notes');
      const notesValue = notesEl && notesEl.value.trim() ? notesEl.value.trim() : '-';

      const messageLines = [
        'Halo RXFatih Wedding Studio, saya ingin berkonsultasi mengenai pembuatan undangan pernikahan digital:',
        '',
        `*Nama Pasangan:* ${coupleValue}`,
        `*Perkiraan Tanggal:* ${dateValue}`,
        `*Pilihan Tema:* ${themeValue}`,
        `*Paket & Estimasi:* ${packageValue}`,
        `*Catatan Konsep:* ${notesValue}`,
        '',
        'Mohon informasi ketersediaan jadwal dan langkah selanjutnya. Terima kasih.'
      ];

      const encodedMessage = encodeURIComponent(messageLines.join('\n'));
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        const labelSpan = submitBtn.querySelector('span');
        const originalText = labelSpan ? labelSpan.textContent : '';
        if (labelSpan) labelSpan.textContent = 'Membuka WhatsApp...';

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        window.setTimeout(() => {
          submitBtn.disabled = false;
          if (labelSpan) labelSpan.textContent = originalText;
        }, 1200);
      } else {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // IntersectionObserver for subtle scroll reveals
  const revealElements = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
});
