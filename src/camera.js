// ============================================================
// BORA BORA — Camera Utility Functions
// ============================================================
import { camOrbit } from './state.js';

function rotateCam(dir) {
  camOrbit.dirIndex = (camOrbit.dirIndex + dir + 4) % 4;
  camOrbit.targetAngle += dir * Math.PI / 2;
  updateCamUI();
}

// Toggle: 0 (orbit) ↔ 1 (builder) — overhead removed
function cycleCam() {
  camOrbit.topTarget = camOrbit.topTarget === 0 ? 1 : 0;
  updateCamUI();
}

function setCamStage(stage) {
  camOrbit.topTarget = stage;
  updateCamUI();
}

function updateCamUI() {
  const label = document.getElementById('camLabel');
  const btnTop = document.getElementById('btnTopDown');
  const compassDir = camOrbit.labels[camOrbit.dirIndex];

  if (camOrbit.topTarget === 0) {
    label.textContent = compassDir;
    btnTop.classList.remove('active');
  } else {
    label.textContent = '↗ ' + compassDir;
    btnTop.classList.add('active');
  }
}

export function getPanLimit() {
  // Dev mode gets generous pan limits regardless of camera stage
  const _isDev = sessionStorage.getItem('sipDev') === '1';
  if (_isDev) return 600;
  if (camOrbit.topTarget === 0) return 80;
  return 200; // builder
}

export { rotateCam, cycleCam, setCamStage, updateCamUI };
