/* ============================================================
   motion.js · GSAP + ScrollTrigger choreography.
   Progressive enhancement over the CSS .reveal system in
   global.css: when GSAP is available and the visitor has not
   requested reduced motion, this file takes over .reveal
   animation (staggered, eased) and adds hero entrance,
   card/timeline scroll reveal, a timeline progress line and a
   light parallax on hero/case-study imagery.
   Falls back silently to the plain CSS .reveal fade otherwise.
   ============================================================ */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- pause SMIL packets in the hero background when reduced motion is requested ---------- */
  const heroSvg = document.getElementById('hero-grid-svg');
  if (reduceMotion && heroSvg && typeof heroSvg.pauseAnimations === 'function') {
    heroSvg.pauseAnimations();
  }

  if (reduceMotion || typeof gsap === 'undefined') return;

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

  /* ---------- GENERIC SCROLL REVEAL (everything else with .reveal) ---------- */
  /* Elements already inside the viewport when this script runs are left alone:
     main.js's IntersectionObserver may not have flagged them '.in' yet (that
     callback is always async), and re-hiding content that is about to be
     shown anyway causes a visible flash if GSAP loads late (slow network). */
  const inViewport = el => el.getBoundingClientRect().top < window.innerHeight;
  const rest = Array.from(document.querySelectorAll('.reveal'))
    .filter(el => !heroEls.includes(el) && !el.classList.contains('in') && !inViewport(el));
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
