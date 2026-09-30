/* ============================================================
   motion.js · GSAP + ScrollTrigger choreography.
   Ownership of .reveal is decided once, deterministically, in
   main.js (window.__motionMode). This file only runs its GSAP
   choreography when that mode is exactly 'gsap' — otherwise it
   exits immediately and touches nothing, leaving either the
   plain CSS reveal (reduced motion) or the IntersectionObserver
   fallback (main.js) fully in charge. No viewport heuristics,
   no race conditions: GSAP is vendored locally (assets/vendor/)
   and loaded synchronously before this file, so by the time
   main.js makes its decision, gsap/ScrollTrigger are already
   defined or definitively not available.
   ============================================================ */

(() => {
  'use strict';

  /* Reduced motion: pause the hero background's SMIL packets regardless of
     GSAP availability (SMIL does not honour prefers-reduced-motion itself). */
  if (window.__motionMode === 'none') {
    const heroSvg = document.getElementById('hero-grid-svg');
    if (heroSvg && typeof heroSvg.pauseAnimations === 'function') heroSvg.pauseAnimations();
    return;
  }

  if (window.__motionMode !== 'gsap') return; // fallback mode: main.js's IntersectionObserver owns .reveal

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('js-gsap');

  const EASE = 'cubic-bezier(0.16,0.8,0.24,1)';
  const NORMAL = 0.35, SLOW = 0.65;

  /* ---------- HERO ENTRANCE CHOREOGRAPHY ---------- */
  const heroTextOrder = ['.hero-tag', '.hero-name', '.hero-title', '.hero-desc', '.hero-ctas', '.hero-meta'];
  const heroTextEls = heroTextOrder.map(sel => document.querySelector(sel)).filter(Boolean);
  const heroVisualEl = document.querySelector('.hero-visual');
  const heroEls = heroVisualEl ? [...heroTextEls, heroVisualEl] : heroTextEls;
  if (heroEls.length) {
    gsap.set(heroEls, { opacity: 0, y: 16 });
    const markIn = () => heroEls.forEach(el => el.classList.add('in'));
    const tl = gsap.timeline({ delay: 0.1, onComplete: markIn });
    tl.to(heroTextEls, { opacity: 1, y: 0, duration: SLOW, ease: EASE, stagger: 0.08 });
    if (heroVisualEl) tl.to(heroVisualEl, { opacity: 1, y: 0, duration: SLOW, ease: EASE }, 0);
  }

  /* ---------- GENERIC SCROLL REVEAL (everything else with .reveal) ----------
     main.js guarantees it has not touched any .reveal element in this mode,
     so every one of them is fair game here without exceptions. */
  const rest = Array.from(document.querySelectorAll('.reveal')).filter(el => !heroEls.includes(el));
  if (rest.length) {
    gsap.set(rest, { opacity: 0, y: 16 });
    ScrollTrigger.batch(rest, {
      start: 'top 90%',
      onEnter: batch => gsap.to(batch, {
        opacity: 1, y: 0, duration: NORMAL, ease: EASE, stagger: 0.07,
        onComplete: () => batch.forEach(el => el.classList.add('in'))
      })
    });
  }

  /* ---------- TIMELINE PROGRESS LINE ---------- */
  document.querySelectorAll('.tl').forEach(tl => {
    const bar = tl.querySelector('.tl-progress');
    if (!bar) return;
    gsap.to(bar, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: tl, start: 'top 75%', end: 'bottom 60%', scrub: 0.4 }
    });
  });

  /* ---------- SUBTLE IMAGE PARALLAX ---------- */
  document.querySelectorAll('.hero-visual img, .cs-hero img').forEach(img => {
    gsap.fromTo(img, { yPercent: -4 }, {
      yPercent: 4, ease: 'none',
      scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  });

  /* ---------- CARD CURSOR SPOTLIGHT (pointer devices only) ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.pcard, .sel-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }
})();
