// ============================================================
// REEF — Coral Catalog & Model Preloading
// ============================================================
// Defines the 7 coral species and preloads their optimized GLBs.
// Corals are placed manually via the Flora build menu
// (handled by ecosystem.js placeFlora).
// ============================================================

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ─── Coral catalog ──────────────────────────────────────────
// Each entry maps to an optimized GLB in assets/models/coral/optimized/
export const CORAL_TYPES = [
  { id: 'tube-coral',      file: 'tube-coral.glb',      scale: [0.75, 1.35], name: 'Tube Coral',      icon: '🪸' },
  { id: 'cauliflower',     file: 'cauliflower.glb',      scale: [0.60, 1.05], name: 'Cauliflower',     icon: '🪸' },
  { id: 'staghorn',        file: 'staghorn.glb',         scale: [0.75, 1.20], name: 'Staghorn',        icon: '🌿' },
  { id: 'cup-coral',       file: 'cup-coral.glb',        scale: [0.54, 0.90], name: 'Cup Coral',       icon: '🪸' },
  { id: 'brain-coral',     file: 'brain-coral.glb',      scale: [0.45, 0.84], name: 'Brain Coral',     icon: '🧠' },
  { id: 'colony-cluster',  file: 'colony-cluster.glb',   scale: [0.75, 1.35], name: 'Colony Cluster',  icon: '🪨' },
  { id: 'branching-bush',  file: 'branching-bush.glb',   scale: [0.54, 1.05], name: 'Branching Bush',  icon: '🌊' },
];

// ─── Model cache ─────────────────────────────────────────────
export const coralCache = new Map();       // id → { scene }

// ─── Load all coral models ──────────────────────────────────
const gltfLoader = new GLTFLoader();

function loadCoral(filePath) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(filePath, (gltf) => resolve({ scene: gltf.scene }), undefined, reject);
  });
}

export async function preloadCorals() {
  const basePath = 'assets/models/coral/optimized/';
  const promises = CORAL_TYPES.map(async (ct) => {
    try {
      const result = await loadCoral(basePath + ct.file);
      coralCache.set(ct.id, result);
    } catch (err) {
      console.warn(`[reef] Failed to load ${ct.id}:`, err);
    }
  });
  await Promise.all(promises);
  console.log(`[reef] Loaded ${coralCache.size}/${CORAL_TYPES.length} coral models`);
}
