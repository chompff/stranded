// ============================================================
// STRANDED IN PARADISE — Landing Page Entry Point
// Minimal 3D scene: sky + water + DNC + palm trees, fixed camera
// ============================================================
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
  scene, renderer, camera, clock,
  ISLAND_Z, CAM_ORBIT_RADIUS, CAM_WL_RATIO,
  HOME_BEACH_Z, camOff, orbitLookY, gameplayZoom, camOrbit,
  terrainRefs,
} from './state.js';

import {
  dnc_update, cloudState, sunSpecPlane, sunSpecMat,
  waterGeo, wPos, wOrigZ, waterSurface, waterMat,
  waterline as waterlineMesh, wlOrigY, wlPos, waterClipPlane,
  causticMat, causticUniforms, lightRays, godRayMat,
  particles, particleCount,
  dnc_sunSprite, moonSpecPlane, moonSpecMat,
} from './sky-water.js';

// Import terrain for side-effect: creates the starter island geometry
import { islandExtent } from './terrain.js';

// ============================================================
// Fixed camera — cinematic hero shot
// ============================================================
const FIXED_ANGLE = Math.PI / 2; // East-facing (same as game default)

// Camera pivot — computed once, used every frame in animate() and by main.js
let _camPivotX = 0;
let _camPivotZ = ISLAND_Z;

function setupCamera() {
  // Replicate the game's play-mode orbit camera exactly, so when main.js
  // takes over there is zero camera movement.
  const sinA = Math.sin(FIXED_ANGLE);
  const cosA = Math.cos(FIXED_ANGLE);
  const fwdX = gameplayZoom * sinA;
  const fwdZ = gameplayZoom * cosA;
  const panX = fwdX;               // playerOff=0, strafe=0
  const panZ = HOME_BEACH_Z + fwdZ;
  _camPivotX = islandExtent.centerX + panX;
  _camPivotZ = ISLAND_Z + islandExtent.centerZ + panZ;
  camera.position.set(
    sinA * CAM_ORBIT_RADIUS + _camPivotX,
    Math.max(0.3, 0.3 + camOff * 1.5),
    cosA * CAM_ORBIT_RADIUS + _camPivotZ
  );
  camera.lookAt(_camPivotX, orbitLookY + camOff * 2.0, _camPivotZ);
  camera.fov = 50;
  camera.updateProjectionMatrix();

  // Pre-set camOrbit pan so main.js starts at the same position
  camOrbit.panX = panX;
  camOrbit.panTargetX = panX;
  camOrbit.panZ = panZ;
  camOrbit.panTargetZ = panZ;
}
setupCamera();

// ============================================================
// Palm trees — load FL-001.glb, place ~5 on the island
// ============================================================
const palmInstances = [];
// Exposed for the game: at root, main.js adopts these as the island's palms
// (hover shake + coconut drops via ecosystem.js adoptWildPalms).
window._landingPalms = palmInstances;
const gltfLoader = new GLTFLoader();

gltfLoader.load('assets/models/FL-001.glb', (gltf) => {
  const template = gltf.scene;

  // Enable shadow casting on all meshes in the palm model
  template.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Doubled island: player at edge (right tip) → clear white sand → dense palms
  // Island right edge at ISLAND_Z - 107 (gz -54), palms start at ISLAND_Z - 85 (gz -43)
  const placements = [
    // ── Clear beach at right edge — NO trees (player spawn area) ──

    // ── Dense palm grove starts ~gz -43, one palm every ~2 tiles ──
    { x:  0.6, z: ISLAND_Z - 85, scale: 3.0, rotY: 2.2 },
    { x: -0.8, z: ISLAND_Z - 83, scale: 2.8, rotY: 4.5 },
    { x:  0.3, z: ISLAND_Z - 81, scale: 3.1, rotY: 1.3 },
    { x: -0.5, z: ISLAND_Z - 79, scale: 2.9, rotY: 3.1 },
    { x:  0.8, z: ISLAND_Z - 77, scale: 3.0, rotY: 5.0 },
    { x: -1.0, z: ISLAND_Z - 75, scale: 2.7, rotY: 0.8 },
    { x:  0.4, z: ISLAND_Z - 73, scale: 3.2, rotY: 2.5 },
    { x: -0.7, z: ISLAND_Z - 71, scale: 2.8, rotY: 4.2 },
    { x:  1.2, z: ISLAND_Z - 69, scale: 3.0, rotY: 1.0 },
    { x: -0.3, z: ISLAND_Z - 67, scale: 2.9, rotY: 3.5 },
    { x:  0.9, z: ISLAND_Z - 65, scale: 3.1, rotY: 5.3 },
    { x: -0.6, z: ISLAND_Z - 63, scale: 2.7, rotY: 0.5 },
    { x:  0.2, z: ISLAND_Z - 61, scale: 3.3, rotY: 2.8 },
    { x: -1.1, z: ISLAND_Z - 59, scale: 2.8, rotY: 4.0 },
    { x:  0.7, z: ISLAND_Z - 57, scale: 3.0, rotY: 1.7 },
    { x: -0.4, z: ISLAND_Z - 55, scale: 2.9, rotY: 3.9 },
    { x:  1.0, z: ISLAND_Z - 53, scale: 3.2, rotY: 5.6 },
    { x: -0.8, z: ISLAND_Z - 51, scale: 2.7, rotY: 0.3 },
    { x:  0.5, z: ISLAND_Z - 49, scale: 3.1, rotY: 2.1 },
    { x: -0.2, z: ISLAND_Z - 47, scale: 2.8, rotY: 4.4 },
    { x:  0.8, z: ISLAND_Z - 45, scale: 3.0, rotY: 1.5 },
    { x: -0.9, z: ISLAND_Z - 43, scale: 2.9, rotY: 3.7 },
    { x:  0.3, z: ISLAND_Z - 41, scale: 3.2, rotY: 5.1 },
    { x: -0.5, z: ISLAND_Z - 39, scale: 2.7, rotY: 0.9 },
    { x:  1.1, z: ISLAND_Z - 37, scale: 3.0, rotY: 2.6 },
    { x: -0.7, z: ISLAND_Z - 35, scale: 2.8, rotY: 4.8 },
    // ── Dense continues through mid-island ──
    { x:  0.6, z: ISLAND_Z - 33, scale: 3.1, rotY: 1.2 },
    { x: -0.3, z: ISLAND_Z - 31, scale: 2.9, rotY: 3.4 },
    { x:  0.9, z: ISLAND_Z - 29, scale: 3.0, rotY: 5.5 },
    { x: -1.0, z: ISLAND_Z - 27, scale: 2.7, rotY: 0.7 },
    { x:  0.4, z: ISLAND_Z - 25, scale: 3.2, rotY: 2.3 },
    { x: -0.6, z: ISLAND_Z - 23, scale: 2.8, rotY: 4.6 },
    { x:  1.2, z: ISLAND_Z - 21, scale: 3.0, rotY: 1.8 },
    { x: -0.4, z: ISLAND_Z - 19, scale: 2.9, rotY: 3.2 },
    { x:  0.7, z: ISLAND_Z - 17, scale: 3.1, rotY: 5.0 },
    { x: -0.8, z: ISLAND_Z - 15, scale: 2.7, rotY: 0.4 },
    { x:  0.2, z: ISLAND_Z - 13, scale: 3.3, rotY: 2.9 },
    { x: -0.5, z: ISLAND_Z - 11, scale: 2.8, rotY: 4.3 },
    { x:  1.0, z: ISLAND_Z - 9,  scale: 3.0, rotY: 1.6 },
    { x: -0.3, z: ISLAND_Z - 7,  scale: 2.9, rotY: 3.8 },
    { x:  0.8, z: ISLAND_Z - 5,  scale: 3.2, rotY: 5.2 },
    { x: -0.7, z: ISLAND_Z - 3,  scale: 2.7, rotY: 0.6 },
    { x:  0.5, z: ISLAND_Z - 1,  scale: 3.1, rotY: 2.4 },
    // ── Dense continues (positive Z) ──
    { x: -0.4, z: ISLAND_Z + 1,  scale: 2.8, rotY: 4.1 },
    { x:  0.9, z: ISLAND_Z + 5,  scale: 3.0, rotY: 1.3 },
    { x: -0.6, z: ISLAND_Z + 9,  scale: 2.9, rotY: 3.6 },
    { x:  0.3, z: ISLAND_Z + 13, scale: 3.2, rotY: 5.4 },
    { x: -0.8, z: ISLAND_Z + 17, scale: 2.7, rotY: 0.8 },
    { x:  1.1, z: ISLAND_Z + 21, scale: 3.0, rotY: 2.7 },
    { x: -0.3, z: ISLAND_Z + 25, scale: 2.9, rotY: 4.9 },
    { x:  0.7, z: ISLAND_Z + 29, scale: 3.1, rotY: 1.1 },
    { x: -0.5, z: ISLAND_Z + 33, scale: 2.8, rotY: 3.3 },
    { x:  0.4, z: ISLAND_Z + 37, scale: 3.0, rotY: 5.1 },
    { x: -0.9, z: ISLAND_Z + 41, scale: 2.7, rotY: 0.5 },
    { x:  0.6, z: ISLAND_Z + 45, scale: 3.2, rotY: 2.2 },
    { x: -0.2, z: ISLAND_Z + 49, scale: 2.9, rotY: 4.7 },
    // ── Continues to far end ──
    { x:  0.8, z: ISLAND_Z + 55, scale: 3.0, rotY: 1.4 },
    { x: -0.7, z: ISLAND_Z + 61, scale: 2.8, rotY: 3.5 },
    { x:  0.3, z: ISLAND_Z + 67, scale: 3.1, rotY: 5.3 },
    { x: -0.4, z: ISLAND_Z + 73, scale: 2.9, rotY: 0.9 },
    { x:  1.0, z: ISLAND_Z + 79, scale: 3.0, rotY: 2.6 },
    { x: -0.6, z: ISLAND_Z + 85, scale: 2.7, rotY: 4.2 },
    { x:  0.5, z: ISLAND_Z + 91, scale: 3.2, rotY: 1.7 },
    { x: -0.3, z: ISLAND_Z + 97, scale: 2.8, rotY: 3.8 },
    { x:  0.9, z: ISLAND_Z + 103, scale: 3.0, rotY: 5.0 },
    { x: -0.8, z: ISLAND_Z + 111, scale: 2.9, rotY: 0.7 },
    { x:  0.4, z: ISLAND_Z + 119, scale: 3.1, rotY: 2.3 },
    { x: -0.5, z: ISLAND_Z + 127, scale: 2.7, rotY: 4.5 },
    { x:  0.7, z: ISLAND_Z + 135, scale: 3.0, rotY: 1.9 },
    { x: -0.2, z: ISLAND_Z + 143, scale: 2.9, rotY: 3.4 },
  ];

  placements.forEach((p, i) => {
    const palm = template.clone();
    // Per-palm variety: ±10% overall size + independent height stretch,
    // layered on the hand-tuned base scale of each placement.
    const size = p.scale * (0.9 + Math.random() * 0.2);
    const stretch = 0.85 + Math.random() * 0.3;
    palm.scale.set(size, size * stretch, size);
    palm.position.set(p.x, 1, p.z); // Y=1 is approximate plateau surface
    palm.rotation.y = p.rotY;
    // Slight organic tilt
    palm.rotation.x = (Math.random() - 0.5) * 0.04;
    palm.rotation.z = (Math.random() - 0.5) * 0.04;
    scene.add(palm);
    palmInstances.push(palm);
  });
});

// ============================================================
// Player character — capsule placeholder on home beach
// ============================================================
// Raycast terrain to get exact surface Y (matches main.js initPlayer)
function _getSpawnY(wx, wz) {
  const bg = terrainRefs.blocksGroup;
  if (!bg || bg.children.length === 0) return 1; // fallback
  const ray = new THREE.Raycaster(
    new THREE.Vector3(wx, 50, wz),
    new THREE.Vector3(0, -1, 0)
  );
  const hits = ray.intersectObjects(bg.children, true);
  return hits.length > 0 ? hits[0].point.y : 1;
}
const _spawnY = _getSpawnY(0, -155);

let playerGroup;
{
  const R = 0.3, H = 1.0;
  const bodyMat = new THREE.MeshLambertMaterial({ color: 0x4488ff });
  const headMat = new THREE.MeshLambertMaterial({ color: 0xffdd44 });

  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 12, 1), bodyMat);
  cyl.castShadow = true;
  const topCap = new THREE.Mesh(new THREE.SphereGeometry(R, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), headMat);
  topCap.position.y = H / 2;
  const botCap = new THREE.Mesh(new THREE.SphereGeometry(R, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), bodyMat);
  botCap.rotation.x = Math.PI;
  botCap.position.y = -H / 2;

  const body = new THREE.Group();
  body.add(cyl, topCap, botCap);
  body.position.y = H / 2 + R; // feet at y=0

  playerGroup = new THREE.Group();
  playerGroup.add(body);
  playerGroup.position.set(0, _spawnY, -155); // Home Beach (right edge of doubled island)
  playerGroup.rotation.y = Math.PI; // face camera
  playerGroup.scale.setScalar(1); // normal size
  scene.add(playerGroup);
}

// ============================================================
// "This is you" label — HTML overlay arrow pointing to character
// ============================================================
let tiyAlive = true;
{
  const label = document.createElement('div');
  label.className = 'this-is-you';
  label.textContent = 'This is you \uD83D\uDE0A';
  document.body.appendChild(label);

  // Project character world position to screen each frame
  const charWorldPos = new THREE.Vector3(0, _spawnY + 1.6 + 0.5, -155); // above head at island edge
  function tick() {
    if (!tiyAlive) return;
    requestAnimationFrame(tick);
    const pos = charWorldPos.clone().project(camera);
    const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-pos.y * 0.5 + 0.5) * window.innerHeight;
    label.style.left = x + 'px';
    label.style.top = y + 'px';
  }
  setTimeout(tick, 500);

  // Fade out after 10 seconds
  setTimeout(() => {
    label.style.opacity = '0';
    setTimeout(() => { tiyAlive = false; label.remove(); }, 1000);
  }, 10000);
}

// ============================================================
// Waterline + clip plane helper (fixed angle version)
// ============================================================
function updateWaterline(t) {
  const angle = FIXED_ANGLE;
  const camDirX = Math.sin(angle);
  const camDirZ = Math.cos(angle);

  const wlDefault = CAM_ORBIT_RADIUS * (1 - CAM_WL_RATIO);
  const dirExtent = Math.abs(camDirX) * islandExtent.extentX + Math.abs(camDirZ) * islandExtent.extentZ;
  const wlFromIsland = Math.max(wlDefault, dirExtent + 10);

  const pivotX = _camPivotX;
  const pivotZ = _camPivotZ;

  waterlineMesh.position.set(
    Math.sin(angle) * wlFromIsland + pivotX,
    0,
    Math.cos(angle) * wlFromIsland + pivotZ
  );
  waterlineMesh.rotation.y = angle;
  waterlineMesh.visible = true;
  waterlineMesh.material.opacity = 1;

  // Wave animation on waterline strip
  const cosA = Math.cos(angle), sinA = Math.sin(angle);
  const wlWx = waterlineMesh.position.x, wlWz = waterlineMesh.position.z;
  for (let i = 0; i < wlPos.count; i++) {
    const lx = wlPos.getX(i);
    const worldX = wlWx + lx * cosA;
    const worldZ = wlWz - lx * sinA;
    const wave = Math.sin(worldX * 0.15 + t * 1.2) * 0.14
      + Math.cos((-(worldZ - ISLAND_Z)) * 0.12 + t * 0.9) * 0.10
      + Math.sin(worldX * 0.4 + (-(worldZ - ISLAND_Z)) * 0.3 + t * 1.8) * 0.05
      + Math.cos(worldX * 0.08 + t * 0.4) * 0.20;
    wlPos.setY(i, wlOrigY[i] + wave);
  }
  wlPos.needsUpdate = true;

  // Clip plane
  const clipNx = -Math.sin(angle);
  const clipNz = -Math.cos(angle);
  const clipDist = wlFromIsland - 0.1;
  const clipPx = Math.sin(angle) * clipDist + pivotX;
  const clipPz = Math.cos(angle) * clipDist + pivotZ;
  const clipConst = -(clipNx * clipPx + clipNz * clipPz);
  waterClipPlane.normal.set(clipNx, 0, clipNz);
  waterClipPlane.constant = clipConst;
  waterMat.clippingPlanes = [waterClipPlane];
  sunSpecMat.clippingPlanes = [waterClipPlane];
  moonSpecMat.clippingPlanes = [waterClipPlane];
}

// ============================================================
// Loading curtain — hold the white cover until the game module
// (main.js) has fully initialized AND every asset tracked by
// THREE.DefaultLoadingManager (GLB models, textures) has finished
// loading, then fade it out. All loads at root start during module
// evaluation (landing palms here; rocks/slabs/birds/fish in main.js),
// so the module-ready + loader-idle gate covers everything. A safety
// cap guarantees the curtain always lifts even if an asset stalls.
// The graphics scan is NOT in this path — it runs only on request via
// Settings → Graphics → "Scan this device", so boot stays fast.
// Progress bar weighting: assets 85% + game module 15%.
// ============================================================
const CURTAIN_IDLE_GRACE_MS = 400;  // loader must stay idle this long (bridges back-to-back loads)
const CURTAIN_MAX_WAIT_MS = 15000;  // absolute cap — never strand the user on white
const _curtainT0 = performance.now();
let _loaderBusy = false;
let _loaderIdleSince = performance.now();
let _assetRatio = 0;                // monotonic: itemsTotal grows as loads queue
THREE.DefaultLoadingManager.onStart = () => { _loaderBusy = true; };
THREE.DefaultLoadingManager.onProgress = (url, loaded, total) => {
  if (total > 0) _assetRatio = Math.max(_assetRatio, loaded / total);
};
THREE.DefaultLoadingManager.onLoad = () => {
  _loaderBusy = false;
  _loaderIdleSince = performance.now();
  _assetRatio = 1;
};

function liftCurtain() {
  const curtain = document.getElementById('sceneCurtain');
  if (curtain) curtain.classList.add('lifted');
  // Remove from DOM after the fade completes
  setTimeout(() => { if (curtain) curtain.remove(); }, 2000);
}

const _curtainBarEl = document.getElementById('curtainBarFill');
const _curtainStatusEl = document.getElementById('curtainStatus');

// Castaway chores — rotating status lines under the bar. The HTML ships
// "loading paradise…" as line zero; these take over after the first beat.
const CURTAIN_LINES = [
  'hanging coconuts…',
  'combing the beach…',
  'convincing palms to sway…',
  'teaching crabs to sidestep…',
  'stirring the lagoon…',
  'herding reef fish…',
  'bribing the seagulls…',
  'warming the sand…',
  'polishing seashells…',
  'untangling the seaweed…',
  'raking yesterday’s footprints…',
  'bottling messages…',
];
const CURTAIN_LINE_MS = 1400;       // one chore at a time, unhurried
let _lineIdx = Math.floor(Math.random() * CURTAIN_LINES.length);
let _lineSwapT = _curtainT0;

const _curtainPoll = setInterval(() => {
  const now = performance.now();
  const assetsIdle = !_loaderBusy && (now - _loaderIdleSince >= CURTAIN_IDLE_GRACE_MS);
  const progress = _assetRatio * 0.85 + (window._mainReady ? 0.15 : 0);
  if (_curtainBarEl) _curtainBarEl.style.width = Math.round(progress * 100) + '%';
  if (_curtainStatusEl && now - _lineSwapT >= CURTAIN_LINE_MS) {
    _lineSwapT = now;
    _curtainStatusEl.textContent = CURTAIN_LINES[_lineIdx % CURTAIN_LINES.length];
    _lineIdx++;
  }
  if ((window._mainReady && assetsIdle) || (now - _curtainT0 >= CURTAIN_MAX_WAIT_MS)) {
    clearInterval(_curtainPoll);
    if (_curtainBarEl) _curtainBarEl.style.width = '100%';
    liftCurtain();
  }
}, 100);

// ============================================================
// Animation loop — simplified from main.js (stoppable)
// ============================================================
let landingRunning = true;

function animate() {
  if (!landingRunning) return;
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Day/night cycle
  dnc_update(t);

  // Water waves
  for (let i = 0; i < wPos.count; i++) {
    const x = wPos.getX(i), y = wPos.getY(i);
    wPos.setZ(i, wOrigZ[i]
      + Math.sin(x * 0.15 + t * 1.2) * 0.14
      + Math.cos(y * 0.12 + t * 0.9) * 0.10
      + Math.sin(x * 0.4 + y * 0.3 + t * 1.8) * 0.05
      + Math.cos(x * 0.08 + t * 0.4) * 0.20
    );
  }
  wPos.needsUpdate = true;
  waterGeo.computeVertexNormals();

  // Sun specular plane
  const spPos = sunSpecPlane.geometry.attributes.position;
  for (let i = 0; i < spPos.count; i++) {
    const x = spPos.getX(i), y = spPos.getY(i);
    spPos.setZ(i,
      Math.sin(x * 0.15 + t * 1.2) * 0.14
      + Math.cos(y * 0.12 + t * 0.9) * 0.10
      + Math.sin(x * 0.4 + y * 0.3 + t * 1.8) * 0.05
      + Math.cos(x * 0.08 + t * 0.4) * 0.20
    );
  }
  spPos.needsUpdate = true;
  sunSpecPlane.geometry.computeVertexNormals();
  sunSpecMat.uniforms.uTime.value = t;
  sunSpecMat.uniforms.uCamPos.value.copy(camera.position);

  // Moon specular plane (night)
  if (moonSpecPlane.visible) {
    const mpPos = moonSpecPlane.geometry.attributes.position;
    for (let i = 0; i < mpPos.count; i++) {
      const x = mpPos.getX(i), y = mpPos.getY(i);
      mpPos.setZ(i,
        Math.sin(x * 0.15 + t * 1.2) * 0.14
        + Math.cos(y * 0.12 + t * 0.9) * 0.10
        + Math.sin(x * 0.4 + y * 0.3 + t * 1.8) * 0.05
        + Math.cos(x * 0.08 + t * 0.4) * 0.20
      );
    }
    mpPos.needsUpdate = true;
    moonSpecPlane.geometry.computeVertexNormals();
    moonSpecMat.uniforms.uTime.value = t;
    moonSpecMat.uniforms.uCamPos.value.copy(camera.position);
  }

  // God rays
  const cloudCover = cloudState.cover;
  godRayMat.uniforms.uTime.value = t;
  godRayMat.uniforms.uCloudDim.value = 1.0 - cloudCover * 0.7;
  godRayMat.uniforms.uSunX.value = dnc_sunSprite.position.x;

  // Cloud dome rotation
  cloudState.domeRef.rotation.y = t * 0.003;

  // Caustics
  causticMat.uniforms.uTime.value = t;
  causticUniforms.uCausticTime.value = t;

  // Particles
  const pp = particles.geometry.attributes.position.array;
  const pa = particles.geometry.attributes.alpha.array;
  const fadeStart = -3.0, fadeEnd = -0.5;
  for (let i = 0; i < particleCount; i++) {
    pp[i * 3] += Math.sin(t * 0.2 + i) * 0.003;
    pp[i * 3 + 1] += 0.003 + Math.sin(t * 0.3 + i * 0.5) * 0.001;
    pp[i * 3 + 2] += Math.cos(t * 0.15 + i) * 0.002;
    const y = pp[i * 3 + 1];
    if (y > fadeStart) {
      pa[i] = 0.5 * Math.max(0, (fadeEnd - y) / (fadeEnd - fadeStart));
    } else {
      pa[i] = 0.5;
    }
    if (y > fadeEnd) {
      pp[i * 3 + 1] = -11;
      pp[i * 3] = (Math.random() - 0.5) * 200;
      pp[i * 3 + 2] = (Math.random() - 0.5) * 200;
      pa[i] = 0.5;
    }
  }
  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.alpha.needsUpdate = true;

  // Palm tree wind sway
  palmInstances.forEach((palm, i) => {
    palm.rotation.z = Math.sin(t * 0.5 + i * 1.7) * 0.06;
  });

  // Waterline + clip plane
  updateWaterline(t);

  // Fixed camera — matches the game's play-mode orbit exactly so
  // there is zero camera jump when main.js takes over.
  const breathe = Math.sin(t * 0.3) * 0.01;
  const sway = Math.sin(t * 0.15) * 0.08;
  camera.position.set(
    Math.sin(FIXED_ANGLE) * CAM_ORBIT_RADIUS + sway + _camPivotX,
    2.55 + breathe,
    Math.cos(FIXED_ANGLE) * CAM_ORBIT_RADIUS + _camPivotZ
  );
  camera.lookAt(_camPivotX, orbitLookY + camOff * 2.0, _camPivotZ);

  renderer.render(scene, camera);
}

animate();

// ============================================================
// stopAndCleanup — stops landing loop and removes landing objects
// Called when transitioning to the game
// ============================================================
window._landingCleanup = function() {
  // Stop the landing animation loop
  landingRunning = false;

  // Kill the "this is you" label
  tiyAlive = false;
  const tiy = document.querySelector('.this-is-you');
  if (tiy) tiy.remove();

  // Remove the landing player capsule from the scene immediately
  // (main.js creates its own player via initPlayer)
  if (playerGroup) {
    scene.remove(playerGroup);
    playerGroup = null;
  }

  // Keep landing palm trees — they ARE the game's trees now.
  // main.js skips its own tree spawning when _fromLanding is set.
};

// ============================================================
// Confetti burst
// ============================================================
function burstConfetti() {
  const COUNT = 120;
  const COLORS = [
    '#ff577f', '#ff884b', '#ffd384', '#fff9b0', // warm
    '#3ec1d3', '#6cc4a1', '#a8e6cf', '#b8b5ff', // cool
    '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3',  // vivid
  ];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(container);

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('div');
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const x = 20 + Math.random() * 60;
    const delay = Math.random() * 0.6;
    const dur = 2.0 + Math.random() * 1.5;
    const drift = (Math.random() - 0.5) * 40;
    const spin = (Math.random() - 0.5) * 1080;
    const w = 6 + Math.random() * 6;
    const h = Math.random() > 0.4 ? w * (1.5 + Math.random()) : w;
    const radius = Math.random() > 0.6 ? '50%' : '2px';
    el.style.cssText = `
      position:absolute;
      left:${x}%;
      top:-3%;
      width:${w}px;
      height:${h}px;
      background:${color};
      border-radius:${radius};
      opacity:1;
      pointer-events:none;
      animation:confettiFall ${dur}s ${delay}s ease-in forwards;
      --drift:${drift}vw;
      --spin:${spin}deg;
    `;
    container.appendChild(el);
  }

  setTimeout(() => container.remove(), 5000);
}

// ============================================================
// Email signup — POST to Google Apps Script
// ============================================================
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw97pWaHISz1VdJsQAp6zlLDM1tWnsxQkNsPblod1zah-oHk-c9yMsbsy8PwZ3ppcEITQ/exec';

const form = document.getElementById('signupForm');
const emailInput = document.getElementById('emailInput');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email || !email.includes('@') || !email.includes('.')) {
    formMessage.innerHTML = '<p class="landing-error">Please enter a valid email address.</p>';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formMessage.innerHTML = '';

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    // With no-cors we can't read the response, but the request fires
    form.style.display = 'none';
    formMessage.innerHTML = '<div class="landing-success">\ud83c\udf34 You\'re on the list! We\'ll ping you when it\'s ready. \ud83c\udf34</div>';
    burstConfetti();
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Notify me \uD83C\uDF34';
    formMessage.innerHTML = '<p class="landing-error">Something went wrong. Please try again.</p>';
  }
});

// ============================================================
// Resize handler (state.js handles the main resize, but we
// need to re-apply our fixed camera after resize)
// ============================================================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
