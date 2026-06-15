// ============================================================
// CTA + INSTALL MODAL + ANALYTICS — browser visitors only.
// ============================================================
// Demand-measurement layer for the live island: one floating CTA, an
// install modal with per-host tabs (Lively / Wallpaper Engine / Plash /
// one-click app), email capture into the existing "message in a bottle"
// endpoint, and PostHog event analytics.
//
// HARD RULES (see docs/spec):
//  • NEVER renders in wallpaper mode. Detection is the deterministic
//    triple from the spec: `?desktop` in the URL (the link we distribute
//    to hosts), `window.livelyPropertyListener` (Lively) or
//    `window.wallpaperRegisterAudioListener` (Wallpaper Engine) — checked at
//    load AND re-checked after a delay, because hosts inject their
//    listeners late. `?wallpaper=1` (legacy flag) is honoured too.
//    NOTE: the audio guard's `window._isWallpaper` is intentionally NOT
//    reused — that flag is true for EVERY root-page load by design (the
//    root page is the wallpaper page); it cannot distinguish a browser
//    visitor from a desktop host.
//  • Zero render-budget impact: plain DOM/CSS layered over the canvas,
//    no WebGL additions, no rAF hooks, no observers in hot paths. The
//    only timer is a 1 Hz dwell counter. Modal content mounts lazily on
//    first open.
//  • Analytics never load in wallpaper mode, never when Do Not Track is
//    on, and only after the scene has had the first 2s to itself.
//  • No <select> anywhere (project convention), no frameworks.
// ============================================================

// ── Constants ───────────────────────────────────────────────
const WALLPAPER_URL = 'https://stranded.live/?desktop';
const LIVELY_STORE_DEEPLINK = 'ms-windows-store://pdp/?productid=9NTM2QC6QWS7';
const LIVELY_STORE_WEB = 'https://apps.microsoft.com/detail/9ntm2qc6qws7';
const PLASH_APPSTORE = 'https://apps.apple.com/app/id1494023538';
// Existing "message in a bottle" Google Apps Script endpoint (same one the
// landing/guest signup forms post to).
const SIGNUP_URL = 'https://script.google.com/macros/s/AKfycbw97pWaHISz1VdJsQAp6zlLDM1tWnsxQkNsPblod1zah-oHk-c9yMsbsy8PwZ3ppcEITQ/exec';
// PostHog write-only public client key (safe to ship in frontend code).
const POSTHOG_KEY = 'phc_yX55DiaZbji4bjTM4jvrdonJ3W3kQApiCbqKr4QLkFhX';
const POSTHOG_LIB = 'https://eu-assets.i.posthog.com/static/array.js';
const BOOT_DELAY_MS = 2000;   // pure island first; also covers late host injection

// ── Wallpaper / environment detection ───────────────────────
function isWallpaperContext() {
  const q = new URLSearchParams(location.search);
  if (q.has('desktop') || q.get('wallpaper') === '1') return true;
  if (typeof window.livelyPropertyListener !== 'undefined') return true;     // Lively
  // WE injects `wallpaperRegisterAudioListener` (a function) — that's the global a
  // wallpaper can DETECT. `wallpaperPropertyListener` is page-DEFINED (WE only calls
  // it), so it's never set on our pages and checking it never fired. See WE docs.
  if (typeof window.wallpaperRegisterAudioListener === 'function') return true;  // Wallpaper Engine
  return false;
}

function platformName() {
  const p = ((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '').toLowerCase();
  if (p.includes('win')) return 'windows';
  if (p.includes('mac')) return 'mac';
  if (p.includes('linux')) return 'linux';
  return 'other';
}

function isMobile() {
  return window.matchMedia('(max-width: 700px)').matches
    || window.matchMedia('(pointer: coarse) and (max-width: 1024px)').matches;
}

function dntEnabled() {
  return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1';
}

// ── Analytics (PostHog, deferred, cookieless, intentional events only) ──
let _ph = null;
const _queue = [];

function track(name, props) {
  if (_ph) _ph.capture(name, props || {});
  else _queue.push([name, props || {}]);
}

function initAnalytics() {
  if (dntEnabled()) return;
  const s = document.createElement('script');
  s.src = POSTHOG_LIB;
  s.async = true;
  s.onload = () => {
    if (!window.posthog || typeof window.posthog.init !== 'function') return;
    window.posthog.init(POSTHOG_KEY, {
      api_host: 'https://eu.i.posthog.com',
      persistence: 'memory',        // cookieless: no banner needed
      autocapture: false,           // intentional events only
      capture_pageview: false,      // we fire island_view manually
      capture_pageleave: false,
      disable_session_recording: true,
      person_profiles: 'identified_only',
      loaded: (ph) => {
        _ph = ph;
        for (const [n, p] of _queue) _ph.capture(n, p);
        _queue.length = 0;
      },
    });
  };
  document.head.appendChild(s);

  track('island_view', { os: platformName(), mobile: isMobile() });

  // dwell_60s — 60s of CUMULATIVE VISIBLE time (1 Hz tick, pauses while
  // hidden), so background tabs don't pollute the number.
  let visSec = 0;
  const dwellTimer = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    visSec++;
    if (visSec >= 60) {
      clearInterval(dwellTimer);
      track('dwell_60s', {});
    }
  }, 1000);
}

// ── Styles (injected once) ──────────────────────────────────
function injectStyles() {
  if (document.getElementById('ctaStyle')) return;
  const st = document.createElement('style');
  st.id = 'ctaStyle';
  st.textContent = `
  .cta-pill {
    position: fixed;
    bottom: max(30px, env(safe-area-inset-bottom, 30px));
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    z-index: 300;
    padding: 16px 34px;
    border: 1.5px solid rgba(191,233,228,0.75);
    border-radius: 32px;
    background: linear-gradient(180deg, rgba(159,224,216,0.30), rgba(106,188,177,0.22));
    backdrop-filter: blur(14px) saturate(1.2);
    -webkit-backdrop-filter: blur(14px) saturate(1.2);
    color: #fff;
    font: 700 15px/1 system-ui, -apple-system, sans-serif;
    letter-spacing: 0.03em;
    text-shadow: 0 1px 8px rgba(10,40,36,0.35);
    box-shadow: 0 10px 36px rgba(96,180,168,0.40), inset 0 1px 0 rgba(255,255,255,0.35);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.9s ease, transform 0.9s ease, background 0.2s, border-color 0.2s, box-shadow 0.2s;
  }
  .cta-pill::after {
    /* breathing lagoon glow — opacity-only animation (compositor, no repaints) */
    content: '';
    position: absolute;
    inset: -14px;
    border-radius: 44px;
    background: radial-gradient(closest-side, rgba(143,216,207,0.35), rgba(143,216,207,0));
    z-index: -1;
    pointer-events: none;
    animation: ctaGlow 3.2s ease-in-out infinite;
  }
  @keyframes ctaGlow {
    0%, 100% { opacity: 0.45; }
    50%      { opacity: 1; }
  }
  .cta-pill.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  .cta-pill:hover {
    background: linear-gradient(180deg, rgba(175,232,225,0.42), rgba(120,200,189,0.32));
    border-color: rgba(220,245,242,0.95);
    box-shadow: 0 14px 44px rgba(96,180,168,0.55), inset 0 1px 0 rgba(255,255,255,0.45);
    transform: translateX(-50%) translateY(-3px) scale(1.02);
  }
  .cta-backdrop {
    position: fixed;
    inset: 0;
    z-index: 400;
    background: rgba(4,10,14,0.4);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  .cta-backdrop.show { opacity: 1; }
  .cta-card {
    width: min(520px, 94vw);
    max-height: min(86vh, 720px);
    overflow-y: auto;
    border-radius: 22px;
    border: 1px solid rgba(255,255,255,0.22);
    background: rgba(8,16,22,0.62);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 18px 60px rgba(0,0,0,0.45);
    color: #fff;
    padding: 26px 26px 22px;
    transform: translateY(10px);
    transition: transform 0.25s ease;
  }
  .cta-backdrop.show .cta-card { transform: translateY(0); }
  .cta-h {
    font-family: 'Tahiti', serif;
    font-size: clamp(1.35rem, 4.2vw, 1.8rem);
    letter-spacing: 0.06em;
    line-height: 1.1;
    margin: 0 0 6px;
    text-align: center;
  }
  .cta-sub {
    font: 400 13px/1.5 system-ui, sans-serif;
    color: rgba(255,255,255,0.75);
    text-align: center;
    margin: 0 0 18px;
  }
  .cta-close {
    position: absolute;
    top: 14px; right: 16px;
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.08);
    color: #fff;
    font: 400 15px/1 system-ui, sans-serif;
    cursor: pointer;
    transition: background 0.2s;
  }
  .cta-close:hover { background: rgba(255,255,255,0.2); }
  .cta-tabs { display: flex; gap: 5px; margin-bottom: 16px; }
  .cta-tabs button {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 4px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.22);
    background: rgba(0,0,0,0.3);
    color: #fff;
    font: 600 11px/1.2 system-ui, sans-serif;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .cta-tabs button .os { font-weight: 400; font-size: 9.5px; opacity: 0.65; }
  .cta-tabs button:hover { background: rgba(255,255,255,0.12); }
  .cta-tabs button.on { background: rgba(255,255,255,0.9); color: #14202a; }
  .cta-tabs button.on .os { opacity: 0.6; }
  .cta-badge {
    display: inline-block;
    margin-left: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(143,216,207,0.18);
    border: 1px solid rgba(143,216,207,0.5);
    color: #bfe9e4;
    font: 600 10px/1.3 system-ui, sans-serif;
    vertical-align: middle;
  }
  .cta-steps { margin: 0; padding: 0 0 0 2px; list-style: none; counter-reset: ctastep; }
  .cta-steps li {
    counter-increment: ctastep;
    position: relative;
    padding: 0 0 14px 34px;
    font: 400 13px/1.55 system-ui, sans-serif;
    color: rgba(255,255,255,0.88);
  }
  .cta-steps li::before {
    content: counter(ctastep);
    position: absolute;
    left: 0; top: 1px;
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.1);
    font: 600 11px/22px system-ui, sans-serif;
    text-align: center;
  }
  .cta-note {
    font: 400 12px/1.55 system-ui, sans-serif;
    color: rgba(255,255,255,0.65);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 10px 12px;
    margin: 0 0 14px;
  }
  .cta-link {
    color: #9fe0d8;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .cta-copyrow { display: flex; gap: 6px; margin: 8px 0 2px; }
  .cta-copyrow input {
    flex: 1;
    min-width: 0;
    padding: 9px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(0,0,0,0.35);
    color: #cfe8e4;
    font: 500 12px/1 ui-monospace, Consolas, monospace;
    outline: none;
  }
  .cta-copyrow button, .cta-mailrow button {
    padding: 9px 16px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.14);
    color: #fff;
    font: 600 12px/1 system-ui, sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s;
  }
  .cta-copyrow button:hover, .cta-mailrow button:hover { background: rgba(255,255,255,0.28); }
  .cta-shot {
    display: block;
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.14);
    margin: 8px 0 2px;
  }
  .cta-mailrow { display: flex; gap: 6px; margin-top: 8px; }
  .cta-mailrow input {
    flex: 1;
    min-width: 0;
    padding: 9px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(0,0,0,0.35);
    color: #fff;
    font: 400 13px/1 system-ui, sans-serif;
    outline: none;
  }
  .cta-mailrow input:focus { border-color: rgba(255,255,255,0.6); }
  .cta-mailmsg { font: 400 12px/1.4 system-ui, sans-serif; margin-top: 7px; min-height: 16px; }
  .cta-mailmsg.ok { color: #9fe0d8; }
  .cta-mailmsg.err { color: #ff9f9f; }
  .cta-mailrow button {
    background: linear-gradient(180deg, rgba(159,224,216,0.9), rgba(122,201,190,0.8));
    border-color: rgba(220,245,242,0.85);
    color: #11332e;
    font-weight: 700;
  }
  .cta-mailrow button:hover { background: linear-gradient(180deg, rgba(180,235,228,0.95), rgba(140,214,203,0.85)); }
  .cta-bottle {
    margin-top: 18px;
    padding: 16px 16px 13px;
    border-radius: 16px;
    border: 1px solid rgba(143,216,207,0.4);
    background: linear-gradient(180deg, rgba(143,216,207,0.13), rgba(143,216,207,0.04));
  }
  .cta-bottle h3 { margin: 0 0 5px; font: 700 14px/1.3 system-ui, sans-serif; }
  .cta-bottle p { margin: 0 0 6px; font: 400 12px/1.55 system-ui, sans-serif; color: rgba(255,255,255,0.72); }
  .cta-sheet {
    position: fixed;
    left: 0; right: 0;
    bottom: 0;
    z-index: 400;
    border-radius: 20px 20px 0 0;
    border: 1px solid rgba(255,255,255,0.2);
    border-bottom: none;
    background: rgba(8,16,22,0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    padding: 18px 18px max(18px, env(safe-area-inset-bottom, 18px));
    color: #fff;
    transform: translateY(102%);
    transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  .cta-sheet.show { transform: translateY(0); }
  .cta-sheet p { margin: 0 0 10px; font: 400 13px/1.5 system-ui, sans-serif; color: rgba(255,255,255,0.85); }
  .cta-sheet .cta-actions { display: flex; gap: 6px; margin-top: 10px; }
  .cta-sheet .cta-actions button {
    flex: 1;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.12);
    color: #fff;
    font: 600 12px/1 system-ui, sans-serif;
    cursor: pointer;
  }
  `;
  document.head.appendChild(st);
}

// ── Email capture (reuses the message-in-a-bottle endpoint) ─
// `source` rides both as a first-class field and inside `wish`, so it lands
// in the existing sheet even where the Apps Script only stores known columns.
function makeEmailForm(sourceOrFn, placeholder) {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="cta-mailrow">
      <input type="email" autocomplete="email" placeholder="${placeholder || 'your@email.com'}" aria-label="Email address">
      <button type="button">Send 🍾</button>
    </div>
    <div class="cta-mailmsg" role="status"></div>`;
  const input = wrap.querySelector('input');
  const btn = wrap.querySelector('button');
  const msg = wrap.querySelector('.cta-mailmsg');
  btn.addEventListener('click', async () => {
    const email = input.value.trim();
    if (!email || !email.includes('@') || !email.includes('.')) {
      msg.className = 'cta-mailmsg err';
      msg.textContent = 'That email doesn’t look right.';
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const source = typeof sourceOrFn === 'function' ? sourceOrFn() : sourceOrFn;
    try {
      await fetch(SIGNUP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, wish: 'install-interest: ' + source, bug: 'empty' }),
      });
      msg.className = 'cta-mailmsg ok';
      msg.textContent = 'Bottle received. Watch the horizon.';
      input.value = '';
      track('email_submit', { source });
    } catch (e) {
      msg.className = 'cta-mailmsg err';
      msg.textContent = 'The tide ate it. Try again?';
    }
    btn.disabled = false;
    btn.textContent = 'Send 🍾';
  });
  return wrap;
}

// ── Copy-URL control ────────────────────────────────────────
function makeCopyRow(host) {
  const row = document.createElement('div');
  row.className = 'cta-copyrow';
  row.innerHTML = `
    <input type="text" readonly value="${WALLPAPER_URL}" aria-label="Wallpaper link">
    <button type="button">Copy</button>`;
  const input = row.querySelector('input');
  const btn = row.querySelector('button');
  btn.addEventListener('click', async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(WALLPAPER_URL);
      ok = true;
    } catch (e) {
      // Fallback for non-secure contexts / older browsers
      try {
        input.focus();
        input.select();
        ok = document.execCommand('copy');
      } catch (e2) { /* leave ok=false */ }
    }
    btn.textContent = ok ? 'Copied ✓' : 'Copy failed';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1700);
    if (ok) track('url_copy', { host });
  });
  return row;
}

function shotImg(file, alt) {
  // Screenshot slot — images land in assets/install/ later; until then the
  // broken image hides itself.
  return `<img class="cta-shot" src="assets/install/${file}" alt="${alt}" loading="lazy" onerror="this.style.display='none'">`;
}

// ── The modal ───────────────────────────────────────────────
let _modal = null;
let _lastFocus = null;

const TABS = [
  { id: 'lively', os: 'Windows', name: 'Lively' },
  { id: 'we', os: 'Windows', name: 'Wallpaper Engine' },
  { id: 'plash', os: 'macOS', name: 'Plash' },
];
let _activeTab = 'lively';   // which tab the shared bottle block attributes signups to

function buildTabPanel(id) {
  const panel = document.createElement('div');
  panel.dataset.panel = id;

  if (id === 'lively') {
    panel.innerHTML = `
      <ol class="cta-steps">
        <li>Install <a class="cta-link" href="${LIVELY_STORE_DEEPLINK}"
              onclick="setTimeout(()=>{ if (document.visibilityState==='visible') window.open('${LIVELY_STORE_WEB}','_blank','noopener'); }, 600); return false;"
            >Lively Wallpaper</a> <span class="cta-badge">Recommended · Free</span><br>
            <a class="cta-link" href="${LIVELY_STORE_WEB}" target="_blank" rel="noopener">Microsoft Store page</a>
            ${shotImg('lively-store.png', 'Lively Wallpaper on the Microsoft Store')}</li>
        <li>In Lively: click <strong>+ Add Wallpaper</strong>, then paste this link:
            ${shotImg('lively-add-url.png', 'Lively — Add Wallpaper dialog with the URL field')}</li>
      </ol>`;
    panel.children[0].children[1].appendChild(makeCopyRow('lively'));
    const done = document.createElement('ol');
    done.className = 'cta-steps';
    done.style.counterReset = 'ctastep 2';
    done.innerHTML = '<li>Done. Hover the palms. Click the sand. The gear icon (top-right) has settings.</li>';
    panel.appendChild(done);
  }

  if (id === 'we') {
    panel.innerHTML = `
      <div class="cta-note">Already own Wallpaper Engine ($4 on Steam)? It works, with one limit:
        it forwards mouse movement but not clicks, so palms sway under your cursor but
        tap-to-walk stays off.</div>
      <ol class="cta-steps">
        <li>Right-click the Wallpaper Engine icon in your system tray.</li>
        <li>Choose <strong>Change Wallpaper</strong> → <strong>Open From URL</strong>, and paste this link:</li>
      </ol>`;
    panel.querySelectorAll('.cta-steps li')[1].appendChild(makeCopyRow('we'));
  }

  if (id === 'plash') {
    panel.innerHTML = `
      <ol class="cta-steps">
        <li>Install <a class="cta-link" href="${PLASH_APPSTORE}" target="_blank" rel="noopener">Plash</a>
            (free, Mac App Store).</li>
        <li>Click the Plash menu-bar icon → <strong>Add Website</strong> → paste this link:</li>
        <li>Enable Plash’s <strong>Browsing Mode</strong> if you want the island to respond
            to your cursor.</li>
      </ol>`;
    panel.querySelectorAll('.cta-steps li')[1].appendChild(makeCopyRow('plash'));
  }

  return panel;
}

function selectTab(modal, id) {
  _activeTab = id;
  modal.querySelectorAll('.cta-tabs button').forEach((b) => {
    b.classList.toggle('on', b.dataset.tab === id);
    b.setAttribute('aria-selected', b.dataset.tab === id ? 'true' : 'false');
  });
  modal.querySelectorAll('[data-panel]').forEach((p) => {
    p.style.display = p.dataset.panel === id ? '' : 'none';
  });
  track('tab_view', { tab: id });
}

function openModal() {
  _lastFocus = document.activeElement;
  if (!_modal) {
    // Lazy-mount on first open
    const backdrop = document.createElement('div');
    backdrop.className = 'cta-backdrop';
    backdrop.innerHTML = `
      <div class="cta-card" role="dialog" aria-modal="true" aria-label="Make this island your desktop wallpaper" style="position:relative;">
        <button type="button" class="cta-close" aria-label="Close">✕</button>
        <h2 class="cta-h">Make this island your desktop wallpaper</h2>
        <p class="cta-sub">A calm, living island behind your windows. Pick your setup:</p>
        <div class="cta-tabs" role="tablist">
          ${TABS.map(t => `<button type="button" role="tab" data-tab="${t.id}">
              ${t.os ? `<span class="os">${t.os}</span>` : '<span class="os">&nbsp;</span>'}${t.name}
            </button>`).join('')}
        </div>
      </div>`;
    const card = backdrop.querySelector('.cta-card');
    for (const t of TABS) card.appendChild(buildTabPanel(t.id));

    // Shared one-click-app interest block — prominent, under EVERY tab (this
    // carries the demand signal the removed fourth tab used to measure).
    const bottle = document.createElement('div');
    bottle.className = 'cta-bottle';
    bottle.innerHTML = `
      <h3>Prefer a one-click app? 🍾</h3>
      <p>We’re building a tiny installer — download, and the island is your
        desktop. No third-party apps, no URLs. Leave your email and a message
        in a bottle will wash up when it ships.</p>`;
    bottle.appendChild(makeEmailForm(() => 'oneclick:' + _activeTab));
    card.appendChild(bottle);

    backdrop.querySelectorAll('.cta-tabs button').forEach((b) => {
      b.addEventListener('click', () => selectTab(backdrop, b.dataset.tab));
    });
    backdrop.querySelector('.cta-close').addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    backdrop.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key !== 'Tab') return;
      // Focus trap
      const els = backdrop.querySelectorAll('button, input, a[href]');
      const focusable = Array.from(els).filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
    document.body.appendChild(backdrop);
    _modal = backdrop;
  }
  _modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  const os = platformName();
  selectTab(_modal, os === 'mac' ? 'plash' : 'lively');
  requestAnimationFrame(() => _modal.classList.add('show'));
  _modal.querySelector('.cta-close').focus();
}

function closeModal() {
  if (!_modal) return;
  _modal.classList.remove('show');
  document.body.style.overflow = '';
  setTimeout(() => { if (_modal) _modal.style.display = 'none'; }, 250);
  if (_lastFocus && _lastFocus.focus) _lastFocus.focus();
}

// ── Mobile sheet ────────────────────────────────────────────
let _sheet = null;

function openSheet() {
  if (!_sheet) {
    const sheet = document.createElement('div');
    sheet.className = 'cta-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-label', 'Send this to your computer');
    sheet.innerHTML = `<p>The island lives on desktops. Mail yourself the link:</p>`;
    sheet.appendChild(makeEmailForm('mobile'));
    const actions = document.createElement('div');
    actions.className = 'cta-actions';
    actions.innerHTML = `
      <button type="button" data-act="copy">Copy link</button>
      ${navigator.share ? '<button type="button" data-act="share">Share</button>' : ''}
      <button type="button" data-act="close">Close</button>`;
    sheet.appendChild(actions);
    actions.querySelector('[data-act="copy"]').addEventListener('click', async (e) => {
      const b = e.currentTarget;
      let ok = false;
      try { await navigator.clipboard.writeText(WALLPAPER_URL); ok = true; } catch (err) { /* no-op */ }
      b.textContent = ok ? 'Copied ✓' : 'Copy failed';
      setTimeout(() => { b.textContent = 'Copy link'; }, 1700);
      if (ok) track('url_copy', { host: 'mobile' });
    });
    const shareBtn = actions.querySelector('[data-act="share"]');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        track('share_click', {});
        navigator.share({ title: 'Stranded in Paradise', url: 'https://stranded.live' }).catch(() => {});
      });
    }
    actions.querySelector('[data-act="close"]').addEventListener('click', closeSheet);
    document.body.appendChild(sheet);
    _sheet = sheet;
  }
  _sheet.style.display = '';
  requestAnimationFrame(() => _sheet.classList.add('show'));
}

function closeSheet() {
  if (!_sheet) return;
  _sheet.classList.remove('show');
  setTimeout(() => { if (_sheet) _sheet.style.display = 'none'; }, 320);
}

// ── CTA pill ────────────────────────────────────────────────
function mountCta() {
  injectStyles();
  // Browser visitors get the clean island: the in-scene settings gear is a
  // wallpaper/desktop affordance (and a dev-page tool), not part of the pitch.
  // Wallpaper mode never reaches this code, so the gear stays available there.
  const hideGear = document.createElement('style');
  hideGear.textContent = '.sip-set { display: none !important; }';
  document.head.appendChild(hideGear);
  const mobile = isMobile();
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'cta-pill';
  btn.textContent = mobile ? 'Send this to your computer' : 'Make this your desktop';
  btn.addEventListener('click', () => {
    track('cta_click', { mobile });
    if (mobile) openSheet();
    else openModal();
  });
  document.body.appendChild(btn);
  requestAnimationFrame(() => btn.classList.add('show'));
}

// ── Boot ────────────────────────────────────────────────────
// Check at load; bail immediately in wallpaper mode. Re-check after the boot
// delay (hosts inject their listeners late) before mounting anything or
// loading analytics.
if (!isWallpaperContext()) {
  setTimeout(() => {
    if (isWallpaperContext()) return;   // a host revealed itself late — stay invisible
    mountCta();
    initAnalytics();
  }, BOOT_DELAY_MS);
}
