/* ============================================
   GRAY SUNDERLAND — Portfolio JS
   ============================================ */

(() => {
  'use strict';

  /* ---- Live clock ---- */
  const clockEl = document.querySelector('[data-clock]');
  if (clockEl) {
    const tz = clockEl.dataset.tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzLabel = clockEl.dataset.tzLabel || 'LOCAL';
    const tick = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: tz,
      }).format(now);
      clockEl.textContent = `${time} ${tzLabel}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Nav scroll state ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Intersection reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .work-item');
  if (revealEls.length && 'IntersectionObserver' in window) {
    // Mark elements as animatable ONLY if they're below the fold.
    // Anything already in view at load shouldn't fade in awkwardly.
    const viewportH = window.innerHeight;
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > viewportH * 0.9) {
        el.classList.add('is-animatable');
      } else {
        el.classList.add('is-visible');
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );
    revealEls.forEach((el) => {
      if (el.classList.contains('is-animatable')) io.observe(el);
    });

    // Safety: ensure everything resolves to visible eventually even if
    // the observer doesn't fire (e.g. instant scroll, screenshot tools).
    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }, 4000);
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---- Marquee — duplicate content for seamless loop ---- */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const items = Array.from(marqueeTrack.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marqueeTrack.appendChild(clone);
    });
  }

  /* ---- Smooth anchor scrolling ---- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
