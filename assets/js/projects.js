/* ============================================================
   projects.js — render da grelha de projetos + filtros.
   Usado em /projects/. Requer projects-data.js e SITE_ROOT.
   ============================================================ */

(() => {
  'use strict';

  const ROOT = window.SITE_ROOT || '';
  const grid = document.getElementById('projects');
  if (!grid || !window.PROJECTS) return;

  const CAT_LABELS = {
    all: 'All',
    infrastructure: 'Infrastructure',
    security: 'Security',
    networking: 'Networking',
    development: 'Development / Scripts',
    academic: 'Academic',
    professional: 'Professional'
  };

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  /* ---------- render dos cards ---------- */
  grid.innerHTML = window.PROJECTS.map(p => {
    const links = (p.links || []).map(l => {
      if (l.mute) return `<span class="muted">${esc(l.label)}</span>`;
      const href = l.slug
        ? `${ROOT}projects/${p.slug}/`
        : (l.ext ? l.href : ROOT + l.href);
      const target = l.ext ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${esc(href)}"${target}>${esc(l.label)} →</a>`;
    }).join('');
    const media = `<img src="${esc(ROOT + p.img)}" alt="${esc(p.title)}" loading="lazy">`;
    const title = p.caseStudy
      ? `<a href="${ROOT}projects/${p.slug}/">${esc(p.title)}</a>`
      : esc(p.title);
    return `<article class="pcard reveal" data-cat="${p.cats.join(' ')}">
      <div class="pcard-media${p.imgContain ? ' contain' : ''}">${media}</div>
      <p class="pcard-meta"><span class="cat">${esc(p.catLabel)}</span><span>${esc(p.year)}</span>${p.conf ? '<span>Confidencial</span>' : ''}</p>
      <h2 class="pcard-title">${title}</h2>
      <p class="pcard-desc">${esc(p.desc)}</p>
      <p class="pcard-tags">${p.tags.map(esc).join(' · ')}</p>
      <p class="pcard-links">${links}</p>
    </article>`;
  }).join('');

  /* ---------- filtros ---------- */
  const filters = document.getElementById('filters');
  if (filters) {
    const counts = { all: window.PROJECTS.length };
    window.PROJECTS.forEach(p => p.cats.forEach(c => { counts[c] = (counts[c] || 0) + 1; }));
    filters.innerHTML = Object.keys(CAT_LABELS)
      .filter(c => counts[c])
      .map((c, i) =>
        `<button class="filter-btn${i === 0 ? ' active' : ''}" type="button" data-filter="${c}">${CAT_LABELS[c]} <span class="n">${counts[c]}</span></button>`
      ).join('');
    filters.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      grid.querySelectorAll('.pcard').forEach(c => {
        c.classList.toggle('hide', !(f === 'all' || (c.dataset.cat || '').split(/\s+/).includes(f)));
      });
    });
  }

  if (window.observeReveals) window.observeReveals();
})();
