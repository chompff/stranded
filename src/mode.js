// ============================================================
// MODE GATE — Developer vs Gameplay mode
// ?dev=1 in URL or sessionStorage('sipDev') === '1' → Dev Mode
// Default (no param) → Gameplay Mode
// ============================================================

// Guest mode (from landing page "Play now") — force play mode
const _params = new URLSearchParams(window.location.search);
if (_params.get('guest') === '1') {
  sessionStorage.removeItem('sipDev');
}
// Persist dev flag across HMR reloads
else if (_params.has('dev')) {
  sessionStorage.setItem('sipDev', '1');
}

export function isDev() {
  return sessionStorage.getItem('sipDev') === '1';
}

export function setDev(on) {
  if (on) sessionStorage.setItem('sipDev', '1');
  else sessionStorage.removeItem('sipDev');
}
