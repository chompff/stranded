// ============================================================
// BORA BORA — Shared State & Constants
// All modules import from here for shared scene references
// ============================================================
import * as THREE from 'three';

// --- Canvas & Renderer ---
export const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

export const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;

// --- Scene ---
export const scene = new THREE.Scene();

// --- Clock ---
export const clock = new THREE.Clock();

// --- Constants ---
export const ISLAND_Z = -50;
export const ISLAND_RADIUS = 18;
export const CAM_Z = 25;
export const OCEAN_FLOOR_Y = -11;
export const ISLAND_SEED = parseInt(sessionStorage.getItem('sipSeed') ?? '42', 10);   // Master seed — drives all procedural island generation
export const TILE_SIZE = 2;
export const MAX_HEIGHT = 12;
export const MAX_SAND_OVERHANG = 3;
export const BUILD_RADIUS = 150;
export const CAM_ORBIT_RADIUS = Math.max(75, ISLAND_RADIUS * 4.2);
export const CAM_WL_RATIO = 1 / 3;
export let orbitLookY = 8.5;
export function setOrbitLookY(val) { orbitLookY = val; }

// --- Camera (perspective — primary) ---
export const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1200);
camera.position.set(0, 0.3, CAM_Z);
camera.lookAt(0, 8.5, ISLAND_Z);

// --- Camera orbit state ---
// Home Beach — the main stage, player spawn point, camera default
export const HOME_BEACH_Z = -150;

export const camOrbit = {
  currentAngle: Math.PI / 2,
  targetAngle: Math.PI / 2,
  dirIndex: 1,
  labels: ['N', 'E', 'S', 'W'],
  topBlend: 0,
  topTarget: 0,
  panX: 0,
  panZ: HOME_BEACH_Z,
  panTargetX: 0,
  panTargetZ: HOME_BEACH_Z,
};

// --- Build state ---
export const buildState = {
  active: false,
  _buildModeDim: false,
  hoverMesh: null,
  hoverTile: null,
  painting: false,
  paintedCells: new Set(),
  dragPreviewGroup: null,
};

export const buildTools = {
  material: 'sand',
  height: 3,
  tool: 'raise',
  brush: 1,
};

export const floraToolState = {
  mode: 'terrain',
  selectedSpecies: 'FL-001',
};

// --- Heightmap ---
export const heightmap = new Map();

// --- Terrain mesh refs (set by terrain.js) ---
export const terrainRefs = {
  currentRockMesh: null,
  currentSandMesh: null,
  blocksGroup: null,
  sharedRockMat: null,
  sharedSandMat: null,
  seabedMesh: null,          // Set by sky-water.js — used for underwater raycasts (coral, dive)
};

// --- Undo ---
export const undoStack = [];

// --- Key tracking ---
export const keysHeld = {};

// --- Build camera refs (set by ui.js) ---
export const buildCamRefs = {
  buildCamera: null,
  usingBuildCamera: false,
  buildCamState: { zoom: 63, panX: 0, panZ: 0, blending: 0, transitioning: false, camY: 45 },
};

// --- Cross-module callbacks (wired by main.js to avoid circular deps) ---
export const callbacks = {
  removeFlora: null,
  placeFlora: null,
  rebuildFormation: null,
  updateDragPreview: null,
};

// --- Resize handler ---
export function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// --- Scroll zoom ---
const _isDev = sessionStorage.getItem('sipDev') === '1';
export let camOff = _isDev ? 0.93 : 1.5;
export function setCamOff(val) { if (!_isDev) return; camOff = val; }

// --- Gameplay forward/backward zoom (pan along camera look direction) ---
// Clamped between -28.5 (zoomed in / closest) and -7.5 (zoomed out / furthest)
export let gameplayZoom = -7.5;
export function setGameplayZoom(val) { gameplayZoom = Math.max(-28.5, Math.min(-7.5, val)); }

// --- Build mode zoom (scroll zooms in/out during build) ---
// 0 = default builder height, negative = zoomed in, positive = zoomed out
export let buildZoom = 0;
export function setBuildZoom(val) { buildZoom = Math.max(-0.7, Math.min(0.8, val)); }

window.addEventListener('wheel', e => {
  if (_isDev) {
    // In dev/build mode: scroll zooms the builder camera in/out
    buildZoom += e.deltaY * 0.002;
    buildZoom = Math.max(-0.7, Math.min(0.8, buildZoom));
  } else {
    // Scroll up (negative deltaY) = zoom in (more negative), scroll down = zoom out
    gameplayZoom += e.deltaY * 0.05;
    gameplayZoom = Math.max(-28.5, Math.min(-7.5, gameplayZoom));
  }
}, { passive: true });
