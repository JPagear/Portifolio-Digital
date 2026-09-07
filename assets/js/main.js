/* ============================================================
   main.js · comportamento partilhado por todas as páginas:
   nav, menu mobile, reveal, consentimento RGPD (cookies +
   Google Fonts), modal de privacidade.
   Requer: window.SITE_ROOT definido antes deste script
   ('' na raiz, '../' a um nível, '../../' a dois níveis).
   ============================================================ */

(() => {
  'use strict';

  const ROOT = window.SITE_ROOT || '';

  /* ---------- NAV scrolled ---------- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---------- HAMBURGER ---------- */
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobile-menu');
  if (hb && mm) {
    hb.addEventListener('click', () => {
      const o = mm.classList.toggle('open');
      hb.classList.toggle('open');
      hb.setAttribute('aria-expanded', o);
    });
    mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mm.classList.remove('open');
      hb.classList.remove('open');
      hb.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- IDIOMA PT / EN ---------- */
  const NAV_I18N = {
    'nav.projects':   { pt: 'Projetos',         en: 'Projects' },
    'nav.experience': { pt: 'Experiência',      en: 'Experience' },
    'nav.about':      { pt: 'Sobre',            en: 'About' },
    'nav.contact':    { pt: 'Contacto',         en: 'Contact' },
    'nav.cv':         { pt: 'Descarregar CV ↗', en: 'Download CV ↗' }
  };
  /* marca os elementos traduzíveis a partir do texto atual */
  document.querySelectorAll('.nav-links a, .mobile-menu a, .nav-cv').forEach(el => {
    const t = el.textContent.trim();
    for (const key in NAV_I18N) {
      if (NAV_I18N[key].pt === t || NAV_I18N[key].en === t) { el.dataset.i18n = key; break; }
    }
  });
  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const e = NAV_I18N[el.dataset.i18n];
      if (e && e[lang]) el.textContent = e[lang];
    });
    document.querySelectorAll('.lang-switch button').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
  }
  function makeLangSwitch() {
    const d = document.createElement('div');
    d.className = 'lang-switch';
    d.setAttribute('role', 'group');
    d.setAttribute('aria-label', 'Idioma / Language');
    d.innerHTML = '<button type="button" data-lang="pt">PT</button><span aria-hidden="true">|</span><button type="button" data-lang="en">EN</button>';
    d.addEventListener('click', e => {
      const b = e.target.closest('button[data-lang]');
      if (b) applyLang(b.dataset.lang);
    });
    return d;
  }
  const cvBtn = document.querySelector('.site-nav .nav-cv');
  if (cvBtn) cvBtn.before(makeLangSwitch());
  if (mm) mm.appendChild(makeLangSwitch());
  let savedLang = 'pt';
  try { savedLang = localStorage.getItem('site-lang') || 'pt'; } catch (e) {}
  applyLang(savedLang === 'en' ? 'en' : 'pt');

  /* ---------- REVEAL ---------- */
  const rio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  window.observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach(el => rio.observe(el));
  window.observeReveals();

  /* ---------- CONSENTIMENTO + PRIVACIDADE (injetado) ---------- */
  const consentHTML = `
<div id="cookie-banner" class="hidden">
  <p class="cookie-text">Este site usa fontes externas (Google Fonts) e Formspree para o formulário de contacto. Ao aceitar, consente o carregamento destes recursos. <a href="javascript:void(0)" data-open-privacy>Aviso de Privacidade</a>.</p>
  <div class="cookie-btns">
    <button class="cookie-btn cookie-reject" type="button">Recusar</button>
    <button class="cookie-btn cookie-accept" type="button">Aceitar</button>
  </div>
</div>
<div id="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="priv-title">
  <div class="priv-box">
    <h2 id="priv-title">Aviso de Privacidade</h2>
    <span class="priv-date">Última atualização: maio de 2026</span>
    <h3>Responsável pelo tratamento</h3>
    <p>João Almeida, Vale de Cambra, Aveiro, Portugal. Contacto: j.joao.almeida06@gmail.com</p>
    <h3>Dados recolhidos</h3>
    <p>Este site recolhe dados pessoais apenas quando utiliza o formulário de contacto: nome, endereço de email e conteúdo da mensagem.</p>
    <h3>Finalidade e base legal</h3>
    <p>Os dados são tratados com base no consentimento (art. 6.º, n.º 1, al. a) do RGPD) e usados exclusivamente para responder à mensagem. Não são partilhados com terceiros, exceto o serviço Formspree utilizado para envio do formulário.</p>
    <h3>Cookies e recursos externos</h3>
    <p>Mediante consentimento, este site carrega fontes do Google Fonts (Google LLC, EUA), o que implica transmissão do endereço IP para servidores Google. Sem consentimento, são usadas fontes locais alternativas. Não são utilizados cookies de rastreamento ou publicidade.</p>
    <h3>Retenção de dados</h3>
    <p>As mensagens enviadas são retidas pelo prazo necessário para responder e eliminadas após 90 dias.</p>
    <h3>Os seus direitos</h3>
    <p>Tem direito de acesso, retificação, apagamento, portabilidade e oposição ao tratamento. Contacte j.joao.almeida06@gmail.com. Pode também reclamar à <a href="https://www.cnpd.pt" target="_blank" rel="noopener">CNPD</a>.</p>
    <button class="priv-close" type="button">Fechar</button>
  </div>
</div>`;
  document.body.insertAdjacentHTML('beforeend', consentHTML);

  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('privacy-modal');

  function loadFonts() {
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach((h, i) => {
      const l = document.createElement('link');
      l.rel = 'preconnect';
      if (i === 1) l.crossOrigin = '';
      l.href = h;
      document.head.appendChild(l);
    });
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap';
    document.head.appendChild(l);
    const fb = document.getElementById('font-fallback');
    if (fb) fb.remove();
  }

  window.openPrivacy = () => modal.classList.add('open');
  window.closePrivacy = () => modal.classList.remove('open');

  banner.querySelector('.cookie-accept').addEventListener('click', () => {
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch (e) {}
    banner.classList.add('hidden');
    loadFonts();
  });
  banner.querySelector('.cookie-reject').addEventListener('click', () => {
    try { localStorage.setItem('cookie-consent', 'rejected'); } catch (e) {}
    banner.classList.add('hidden');
  });
  modal.querySelector('.priv-close').addEventListener('click', window.closePrivacy);
  modal.addEventListener('click', e => { if (e.target === modal) window.closePrivacy(); });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-open-privacy]')) { e.preventDefault(); window.openPrivacy(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closePrivacy(); });

  let consent = null;
  try { consent = localStorage.getItem('cookie-consent'); } catch (e) {}
  if (consent === 'accepted') loadFonts();
  else if (consent !== 'rejected') banner.classList.remove('hidden');
})();
