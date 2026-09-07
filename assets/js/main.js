/* ============================================================
   main.js · comportamento partilhado por todas as páginas:
   nav, menu mobile, reveal, consentimento RGPD (cookies +
   Google Fonts), modal de privacidade, idioma PT/EN.
   Requer: window.SITE_ROOT definido antes deste script.
   Idioma: elementos com [data-lang-pt] / [data-lang-en] são
   mostrados/escondidos; textos da navbar via dicionário.
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

  /* ---------- REVEAL ---------- */
  const rio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  window.observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach(el => rio.observe(el));
  window.observeReveals();

  /* ---------- CONSENTIMENTO + PRIVACIDADE (injetado, bilingue) ---------- */
  const consentHTML = `
<div id="cookie-banner" class="hidden">
  <p class="cookie-text">
    <span data-lang-pt>Este site usa fontes externas (Google Fonts) e Formspree para o formulário de contacto. Ao aceitar, consente o carregamento destes recursos. <a href="javascript:void(0)" data-open-privacy>Aviso de Privacidade</a>.</span>
    <span data-lang-en hidden>This site uses external fonts (Google Fonts) and Formspree for the contact form. By accepting, you consent to loading these resources. <a href="javascript:void(0)" data-open-privacy>Privacy Notice</a>.</span>
  </p>
  <div class="cookie-btns">
    <button class="cookie-btn cookie-reject" type="button"><span data-lang-pt>Recusar</span><span data-lang-en hidden>Decline</span></button>
    <button class="cookie-btn cookie-accept" type="button"><span data-lang-pt>Aceitar</span><span data-lang-en hidden>Accept</span></button>
  </div>
</div>
<div id="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="priv-title">
  <div class="priv-box">
    <div data-lang-pt>
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
    </div>
    <div data-lang-en hidden>
      <h2>Privacy Notice</h2>
      <span class="priv-date">Last updated: May 2026</span>
      <h3>Data controller</h3>
      <p>João Almeida, Vale de Cambra, Aveiro, Portugal. Contact: j.joao.almeida06@gmail.com</p>
      <h3>Data collected</h3>
      <p>This site collects personal data only when you use the contact form: name, email address and message content.</p>
      <h3>Purpose and legal basis</h3>
      <p>Data is processed on the basis of consent (art. 6(1)(a) GDPR) and used exclusively to reply to your message. It is not shared with third parties, except the Formspree service used to send the form.</p>
      <h3>Cookies and external resources</h3>
      <p>With your consent, this site loads fonts from Google Fonts (Google LLC, USA), which involves transmitting your IP address to Google servers. Without consent, alternative local fonts are used. No tracking or advertising cookies are used.</p>
      <h3>Data retention</h3>
      <p>Messages are retained for as long as necessary to reply and deleted after 90 days.</p>
      <h3>Your rights</h3>
      <p>You have the right of access, rectification, erasure, portability and objection. Contact j.joao.almeida06@gmail.com. You may also lodge a complaint with the <a href="https://www.cnpd.pt" target="_blank" rel="noopener">CNPD</a>.</p>
    </div>
    <button class="priv-close" type="button"><span data-lang-pt>Fechar</span><span data-lang-en hidden>Close</span></button>
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

  /* ---------- IDIOMA PT / EN ---------- */
  const NAV_I18N = {
    'nav.projects':   { pt: 'Projetos',         en: 'Projects' },
    'nav.experience': { pt: 'Experiência',      en: 'Experience' },
    'nav.about':      { pt: 'Sobre',            en: 'About' },
    'nav.contact':    { pt: 'Contacto',         en: 'Contact' },
    'nav.cv':         { pt: 'Descarregar CV ↗', en: 'Download CV ↗' },
    'footer.privacy': { pt: 'Privacidade',      en: 'Privacy' }
  };
  document.querySelectorAll('.nav-links a, .mobile-menu a, .nav-cv, .footer-priv').forEach(el => {
    const t = el.textContent.trim();
    for (const key in NAV_I18N) {
      if (NAV_I18N[key].pt === t || NAV_I18N[key].en === t) { el.dataset.i18n = key; break; }
    }
  });
  /* Links de download do CV: href muda consoante o idioma ativo */
  document.querySelectorAll('a[href*="joao_almeida_cv_"], a[href*="cv-joao-almeida.pdf"]').forEach(a => a.setAttribute('data-cv', ''));
  window.currentLang = 'pt';
  function applyLang(lang) {
    window.currentLang = lang;
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const e = NAV_I18N[el.dataset.i18n];
      if (e && e[lang]) el.textContent = e[lang];
    });
    document.querySelectorAll('[data-lang-pt]').forEach(el => { el.hidden = lang !== 'pt'; });
    document.querySelectorAll('[data-lang-en]').forEach(el => { el.hidden = lang !== 'en'; });
    document.querySelectorAll('a[data-cv]').forEach(a => {
      a.setAttribute('href', ROOT + 'assets/documents/joao_almeida_cv_' + (lang === 'en' ? 'EN' : 'PT') + '.pdf');
    });
    document.querySelectorAll('.lang-switch button').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }
  window.applyLang = applyLang;
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
})();
