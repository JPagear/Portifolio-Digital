#!/usr/bin/env node
/* Dev-only QA harness (not part of the shipped site). Spins up a local
   static server for the working tree and drives it with Playwright to
   verify things the design/portfolio-v2 branch specifically needs:
   exact-viewport screenshots, prefers-reduced-motion behaviour, the
   GSAP-unavailable fallback path, console errors, network weight, the
   timeline scroll-progress line, and basic contact-form validation. */

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.resolve(ROOT, '..', 'qa-out');
const PORT = 8971;

const TYPES = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.mjs':'application/javascript',
  '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp',
  '.avif':'image/avif', '.pdf':'application/pdf', '.json':'application/json' };

function startServer() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      let u = decodeURIComponent(req.url.split('?')[0]);
      if (u.includes('node_modules') || u.includes('..')) { res.writeHead(403); res.end(); return; }
      let p = path.join(ROOT, u);
      if (u.endsWith('/')) p = path.join(p, 'index.html');
      fs.readFile(p, (err, data) => {
        if (err) { res.writeHead(404); res.end('not found: ' + p); return; }
        res.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(PORT, () => resolve(server));
  });
}

const VIEWPORTS = [
  { name: '390x844', width: 390, height: 844 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 }
];

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects/' },
  { name: 'experience', path: '/experience/' },
  { name: 'about', path: '/about/' },
  { name: 'contact', path: '/contact/' },
  { name: 'cs-simoldes', path: '/projects/simoldes-infrastructure-security/' },
  { name: 'cs-moliceiros', path: '/projects/moliceiros-da-ria/' }
];

async function main() {
  await fsp.mkdir(OUT, { recursive: true });
  const server = await startServer();
  const base = `http://localhost:${PORT}`;
  const browser = await chromium.launch();
  const report = { breakpoints: [], reducedMotion: {}, fallback: {}, network: {}, timeline: {}, contact: {}, consoleErrors: {} };

  // ---------- 1. Breakpoint screenshots + console errors ----------
  for (const vp of VIEWPORTS) {
    const pagesToShoot = vp.name === '1440x900' ? PAGES : PAGES.filter(p => !p.name.startsWith('cs-'));
    for (const pg of pagesToShoot) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push('pageerror: ' + e.message));
      page.on('console', msg => { if (msg.type() === 'error') errors.push('console.error: ' + msg.text()); });
      await page.goto(base + pg.path, { waitUntil: 'networkidle' });
      // Scroll the full page in steps first: ScrollTrigger.batch only creates
      // a reveal tween once an element has actually crossed its trigger point,
      // so a full-page screenshot taken without scrolling first would show
      // below-the-fold content stuck at its pre-reveal opacity:0 — a test
      // artifact, not a real user experience (a real visitor scrolls).
      const fullHeight = await page.evaluate(() => document.body.scrollHeight);
      const scrollSteps = 10;
      for (let i = 1; i <= scrollSteps; i++) {
        await page.evaluate(y => window.scrollTo(0, y), Math.round((fullHeight / scrollSteps) * i));
        await page.waitForTimeout(60);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.evaluate(() => { if (window.gsap) { gsap.globalTimeline.time(9999); if (window.ScrollTrigger) ScrollTrigger.refresh(); } });
      await page.waitForTimeout(150);
      const cookieAccept = await page.$('.cookie-accept');
      if (cookieAccept) { await cookieAccept.click().catch(() => {}); await page.waitForTimeout(100); }
      const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      const file = path.join(OUT, `${vp.name}_${pg.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      report.breakpoints.push({ viewport: vp.name, page: pg.name, file, overflowX, errors });
      await context.close();
    }
  }

  // ---------- 2. Reduced motion ----------
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    const heroCheck = await page.evaluate(() => {
      const reveal = [...document.querySelectorAll('.reveal')];
      return {
        motionMode: window.__motionMode,
        allRevealOpacity1: reveal.every(el => getComputedStyle(el).opacity === '1'),
        stuckCount: reveal.filter(el => getComputedStyle(el).opacity !== '1').length,
        heroNameOpacity: getComputedStyle(document.querySelector('.hero-name')).opacity
      };
    });
    await page.screenshot({ path: path.join(OUT, 'reduced-motion_home.png'), fullPage: true });

    // spotlight should not visually engage on hover under reduced motion
    const card = await page.$('.pcard, .sel-card');
    let spotlightAfterHover = null;
    if (card) {
      await card.hover();
      await page.waitForTimeout(100);
      spotlightAfterHover = await page.evaluate(el => getComputedStyle(el, '::before').display, card);
    }

    // timeline: check .tl-progress is fully drawn, not animating
    await page.goto(base + '/experience/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);
    const tlCheck = await page.evaluate(() => {
      const bars = [...document.querySelectorAll('.tl-progress')];
      return bars.map(b => getComputedStyle(b).transform);
    });

    // mobile menu still functional
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click('#hamburger');
    const menuOpen = await page.evaluate(() => document.getElementById('mobile-menu').classList.contains('open'));

    report.reducedMotion = { ...heroCheck, spotlightAfterHoverDisplay: spotlightAfterHover, tlProgressTransforms: tlCheck, mobileMenuOpensUnderReducedMotion: menuOpen, errors };
    await context.close();
  }

  // ---------- 3. GSAP unavailable → fallback ----------
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.route('**/assets/vendor/*.js', route => route.abort());
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const before = await page.evaluate(() => ({
      motionMode: window.__motionMode,
      gsapDefined: typeof window.gsap
    }));
    // scroll to trigger IntersectionObserver fallback on below-fold content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => {
      const reveal = [...document.querySelectorAll('.reveal')];
      return { allVisible: reveal.every(el => getComputedStyle(el).opacity === '1'), count: reveal.length };
    });
    report.fallback = { ...before, ...after, errors };
    await context.close();
  }

  // ---------- 4. Network weight: home + projects ----------
  for (const [key, p] of [['home', '/'], ['projects', '/projects/']]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const resources = [];
    page.on('response', async res => {
      try {
        const req = res.request();
        const headers = res.headers();
        const len = headers['content-length'] ? parseInt(headers['content-length'], 10) : (await res.body().then(b => b.length).catch(() => 0));
        resources.push({ url: req.url().replace(base, ''), type: req.resourceType(), bytes: len || 0 });
      } catch {}
    });
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    await context.close();
    const byType = {};
    let total = 0;
    for (const r of resources) { byType[r.type] = (byType[r.type] || 0) + r.bytes; total += r.bytes; }
    report.network[key] = { total, byType, resources };
  }

  // ---------- 5. Timeline scroll progress, start to finish ----------
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + '/experience/', { waitUntil: 'networkidle' });
    const samples = [];
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      await page.evaluate(y => window.scrollTo(0, y), Math.round((scrollHeight / steps) * i));
      await page.waitForTimeout(80);
      const vals = await page.evaluate(() => [...document.querySelectorAll('.tl-progress')].map(b => {
        const m = getComputedStyle(b).transform;
        return m;
      }));
      samples.push({ step: i, scrollY: Math.round((scrollHeight / steps) * i), transforms: vals });
    }
    report.timeline = { samples };
    await context.close();
  }

  // ---------- 6. Contact form QA (no real submission) ----------
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    let formPosted = false;
    await page.route('**formspree.io/**', route => { formPosted = true; route.abort(); });
    await page.goto(base + '/contact/', { waitUntil: 'networkidle' });

    // empty submit
    await page.click('#f-submit');
    const emptyMsg = await page.textContent('#fnote');

    // invalid email
    await page.fill('#f-name', 'QA Bot');
    await page.fill('#f-email', 'not-an-email');
    await page.fill('#f-message', 'QA test message');
    const invalidBorder = await page.$eval('#f-email', el => el.style.borderColor);

    // valid email, no consent
    await page.fill('#f-email', 'qa@example.com');
    const validBorder = await page.$eval('#f-email', el => el.style.borderColor);
    await page.click('#f-submit');
    const noConsentMsg = await page.textContent('#fnote');

    // keyboard tab order sanity: focus name, tab through to submit, count focusable stops
    await page.focus('#f-name');
    const tabSequence = [];
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      const id = await page.evaluate(() => document.activeElement.id || document.activeElement.tagName);
      tabSequence.push(id);
    }

    report.contact = { emptyMsg, invalidBorder, validBorder, noConsentMsg, formPosted, tabSequence };
    await context.close();
  }

  await browser.close();
  server.close();
  await fsp.writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
