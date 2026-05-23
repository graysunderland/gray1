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

  /* ---- Typed hero word ---- */
  const typedEl = document.querySelector('[data-typed]');
  if (typedEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const words = ['considered', 'enduring', 'human', 'precise', 'inevitable'];
    const TYPE_SPEED = 90;
    const DELETE_SPEED = 45;
    const HOLD = 1800;
    const PAUSE = 350;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const step = () => {
      const word = words[wordIndex];
      if (!isDeleting) {
        charIndex++;
        typedEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          isDeleting = true;
          setTimeout(step, HOLD);
          return;
        }
        setTimeout(step, TYPE_SPEED + Math.random() * 40);
      } else {
        charIndex--;
        typedEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(step, PAUSE);
          return;
        }
        setTimeout(step, DELETE_SPEED);
      }
    };

    setTimeout(step, 500);
  } else if (typedEl) {
    typedEl.textContent = 'considered';
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
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
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

    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }, 5000);
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
