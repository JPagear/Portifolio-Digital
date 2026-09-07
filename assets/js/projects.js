/* ============================================================
   projects.js · render bilingue da grelha de projetos + filtros.
   Usado em /projects/. Requer projects-data.js e SITE_ROOT.
   Re-renderiza no evento 'langchange' (main.js).
   ============================================================ */

(() => {
  'use strict';

  const ROOT = window.SITE_ROOT || '';
  const grid = document.getElementById('projects');
  const filters = document.getElementById('filters');
  if (!grid || !window.PROJECTS) return;

  const CAT_LABELS = {
    all:            { pt: 'Todos',                    en: 'All' },
    infrastructure: { pt: 'Infraestrutura',           en: 'Infrastructure' },
    security:       { pt: 'Segurança',                en: 'Security' },
    networking:     { pt: 'Redes',                    en: 'Networking' },
    development:    { pt: 'Desenvolvimento / Scripts', en: 'Development / Scripts' },
    web:            { pt: 'Web / Sites',              en: 'Web / Sites' },
    academic:       { pt: 'Académico',                en: 'Academic' },
    professional:   { pt: 'Profissional',             en: 'Professional' }
  };
  const CONF = { pt: 'Confidencial', en: 'Confidential' };

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  let activeFilter = 'all';

  function render(lang) {
    grid.innerHTML = window.PROJECTS.map(p => {
      const links = (p.links || []).map(l => {
        const label = l.label[lang] || l.label.pt;
        if (l.mute) return `<span class="muted">${esc(label)}</span>`;
        const href = l.slug ? `${ROOT}projects/${p.slug}/` : (l.ext ? l.href : ROOT + l.href);
        const target = l.ext ? ' target="_blank" rel="noopener"' : '';
        return `<a href="${esc(href)}"${target}>${esc(label)} →</a>`;
      }).join('');
      const title = p.title[lang] || p.title.pt;
      const media = `<img src="${esc(ROOT + p.img)}" alt="${esc(title)}" loading="lazy">`;
      const titleHTML = p.caseStudy
        ? `<a href="${ROOT}projects/${p.slug}/">${esc(title)}</a>`
        : esc(title);
      const mediaStyle = p.imgBg ? ` style="background:${p.imgBg}"` : '';
      const status = p.status ? `<span>${esc(p.status[lang] || p.status.pt)}</span>` : '';
      return `<article class="pcard reveal in" data-cat="${p.cats.join(' ')}">
        <div class="pcard-media${p.imgContain ? ' contain' : ''}"${mediaStyle}>${media}</div>
        <p class="pcard-meta"><span class="cat">${esc(p.catLabel[lang] || p.catLabel.pt)}</span><span>${esc(p.year)}</span>${status}${p.conf ? `<span>${CONF[lang]}</span>` : ''}</p>
        <h2 class="pcard-title">${titleHTML}</h2>
        <p class="pcard-desc">${esc(p.desc[lang] || p.desc.pt)}</p>
        <p class="pcard-tags">${p.tags.map(esc).join(' · ')}</p>
        <p class="pcard-links">${links}</p>
      </article>`;
    }).join('');
    applyFilter(activeFilter);

    if (filters) {
      const counts = { all: window.PROJECTS.length };
      window.PROJECTS.forEach(p => p.cats.forEach(c => { counts[c] = (counts[c] || 0) + 1; }));
      filters.innerHTML = Object.keys(CAT_LABELS)
        .filter(c => counts[c])
        .map(c =>
          `<button class="filter-btn${c === activeFilter ? ' active' : ''}" type="button" data-filter="${c}">${CAT_LABELS[c][lang]} <span class="n">${counts[c]}</span></button>`
        ).join('');
    }
  }

  function applyFilter(f) {
    activeFilter = f;
    grid.querySelectorAll('.pcard').forEach(c => {
      c.classList.toggle('hide', !(f === 'all' || (c.dataset.cat || '').split(/\s+/).includes(f)));
    });
  }

  if (filters) {
    filters.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  }

  render(window.currentLang || 'pt');
  document.addEventListener('langchange', e => render(e.detail.lang));
})();
