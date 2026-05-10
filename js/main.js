/* ================================================
   HEYJASMINE — main.js
   Scroll Reveal · Countdown Timer · Nav Effects
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));


  /* ── 2. COUNTDOWN TIMER ──
     Set target date/time here (default: 5 days 14 hours 32 minutes from first load)
     For a fixed deadline, replace `end` with: new Date('2025-12-31T23:59:59')
  */
  const end = new Date(Date.now() + 5 * 24 * 3600 * 1000 + 14 * 3600 * 1000 + 32 * 60 * 1000);

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const diff = end - Date.now();

    if (diff <= 0) {
      // Timer expired — show zeros
      if (daysEl)    daysEl.textContent    = '00';
      if (hoursEl)   hoursEl.textContent   = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    if (daysEl)    daysEl.textContent    = pad(d);
    if (hoursEl)   hoursEl.textContent   = pad(h);
    if (minutesEl) minutesEl.textContent = pad(m);
    if (secondsEl) secondsEl.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);


  /* ── 3. NAVBAR SCROLL EFFECT ── */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.padding = '12px 60px';
      nav.style.boxShadow = '0 4px 24px rgba(44,42,39,0.07)';
    } else {
      nav.style.padding = '20px 60px';
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });


  /* ── 4. SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── 5. CTA FORM SUBMIT ── */
  const ctaForm = document.querySelector('.cta-form');

  if (ctaForm) {
    const btn = ctaForm.querySelector('.btn-jasmine');
    const input = ctaForm.querySelector('.cta-input');

    btn.addEventListener('click', () => {
      const value = input.value.trim();
      if (!value) {
        input.style.borderColor = '#E88A8A';
        input.placeholder = 'Masukkan nama brand kamu dulu ✦';
        setTimeout(() => {
          input.style.borderColor = '';
          input.placeholder = 'Nama brand / bisnis kamu...';
        }, 2500);
        return;
      }

      // Success state — replace with actual form submission / WhatsApp redirect
      const waNumber = '6281234567890'; // ← ganti dengan nomor WhatsApp aktif
      const waMessage = encodeURIComponent(`Halo HeyJasmine! Saya dari brand *${value}* ingin konsultasi gratis. 🌿`);
      window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
    });
  }

});
