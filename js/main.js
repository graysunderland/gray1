/* ============================================
   GRAY SUNDERLAND — Portfolio JS
   ============================================ */

(() => {
  'use strict';

  /* ---- Custom cursor ----
     Follows the mouse with rAF-smoothed lerp. Detects hover over interactive
     elements (links/buttons/work tiles) and adds .is-link so the CSS reveals
     the + icon. Only runs on devices that report a fine pointer. */
  const cursor = document.querySelector('.cursor');
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cursor && supportsHover) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = null;
    let hasMoved = false;

    const interactiveSelector = 'a, button, [role="button"], .work-tile, .cta, .nav-cta, label[for], input, textarea, select';

    const render = () => {
      // Lerp for smoothness — 0.22 = quick but feels like it has weight
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        cursor.classList.add('is-visible');
        // Snap to position on first move so it doesn't fly in from 0,0
        currentX = targetX;
        currentY = targetY;
        if (!rafId) render();
      }
      const el = e.target.closest(interactiveSelector);
      cursor.classList.toggle('is-link', !!el);
    };

    const onLeave = () => cursor.classList.remove('is-visible');
    const onEnter = () => { if (hasMoved) cursor.classList.add('is-visible'); };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    // Hide on touch start (in case of hybrid devices)
    window.addEventListener('touchstart', () => {
      cursor.classList.remove('is-visible');
    }, { passive: true });
  }

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
    /* Each phrase completes "Product, UI, UX & brand. Shipped ___"
       Non-breaking spaces (\u00A0) bind multi-word phrases as a single
       unit so they never split into a single-word orphan line on mobile. */
    const words = [
      'since\u00A02011.',
      'through every\u00A0cycle.',
      "for the world's\u00A0best.",
      'before the\u00A0playbook.',
      'since the early\u00A0days.'
    ];
    const TYPE_SPEED = 70;
    const DELETE_SPEED = 35;
    const HOLD = 2400;
    const PAUSE = 400;

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
    typedEl.textContent = "since\u00A02011.";
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
