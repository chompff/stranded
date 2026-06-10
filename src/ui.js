import * as THREE from 'three';
import { scene, ISLAND_Z, ISLAND_RADIUS, OCEAN_FLOOR_Y, TILE_SIZE, MAX_HEIGHT, BUILD_RADIUS, camera, renderer, buildState, buildTools, buildCamRefs, camOrbit, floraToolState, callbacks, heightmap, terrainRefs } from './state.js';
import { rotateCam, cycleCam, setCamStage, updateCamUI, getPanLimit } from './camera.js';
import { rebuildFormation, undoPlace, updateBrushCursorSize, sharedRockMat, sharedSandMat, clearDragPreview, saveUndoSnapshot, applyBrush, isTileInBounds, updateDragPreview, getColumn, blocksGroup } from './terrain.js';
import { placeFlora, removeFlora, placedFlora, PALM_CONFIG, FLORA_ID } from './ecosystem.js';
import { CORAL_TYPES } from './reef.js';
import { particles, causticUniforms } from './sky-water.js';
import { isDev } from './mode.js';
import { setPlayerTarget } from './player.js';

// Shared cursor CSS value — matches index.html, avoids inlining base64 SVG per button
const CURSOR_CSS = "cursor: url('assets/cursor.svg') 1 1, pointer !important;";


// --- Build boundary zone visual (square outline showing build limits) ---
let buildBoundaryMesh = null;
function createBuildBoundary() {
  const ts = TILE_SIZE;
  const half = (BUILD_RADIUS + 1) * ts; // outer edge of last buildable tile
  const y = OCEAN_FLOOR_Y + 0.2;
  const outerExtent = 500; // how far the red extends beyond boundary
  
  // Group to hold all boundary visuals
  const group = new THREE.Group();
  group.visible = false;
  
  // Dashed square outline — full boundary
  const corners = [
    new THREE.Vector3(-half, y, ISLAND_Z - half),
    new THREE.Vector3( half, y, ISLAND_Z - half),
    new THREE.Vector3( half, y, ISLAND_Z + half),
    new THREE.Vector3(-half, y, ISLAND_Z + half),
    new THREE.Vector3(-half, y, ISLAND_Z - half), // close the loop
  ];
  const lineGeo = new THREE.BufferGeometry().setFromPoints(corners);
  const lineMat = new THREE.LineDashedMaterial({
    color: 0x44cc66,
    transparent: true,
    opacity: 0.6,
    dashSize: 2.0,
    gapSize: 1.5,
    depthWrite: false,
    depthTest: false,
  });
  const line = new THREE.Line(lineGeo, lineMat);
  line.computeLineDistances();
  line.renderOrder = 6;
  group.add(line);
  
  // 4 outer red planes (north, south, east, west) forming a frame outside the boundary
  const redMat = new THREE.MeshBasicMaterial({
    color: 0xff2200,
    transparent: true,
    opacity: 0.04,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
  });
  
  // North strip
  const stripGeo = new THREE.PlaneGeometry(half * 2 + outerExtent * 2, outerExtent);
  const north = new THREE.Mesh(stripGeo, redMat);
  north.rotation.x = -Math.PI / 2;
  north.position.set(0, y, ISLAND_Z - half - outerExtent / 2);
  north.renderOrder = 5;
  group.add(north);
  
  // South strip
  const south = new THREE.Mesh(stripGeo.clone(), redMat);
  south.rotation.x = -Math.PI / 2;
  south.position.set(0, y, ISLAND_Z + half + outerExtent / 2);
  south.renderOrder = 5;
  group.add(south);
  
  // East strip (only spans inner height — no corner overlap with N/S)
  const sideGeo = new THREE.PlaneGeometry(outerExtent, half * 2);
  const east = new THREE.Mesh(sideGeo, redMat);
  east.rotation.x = -Math.PI / 2;
  east.position.set(half + outerExtent / 2, y, ISLAND_Z);
  east.renderOrder = 5;
  group.add(east);
  
  // West strip
  const west = new THREE.Mesh(sideGeo.clone(), redMat);
  west.rotation.x = -Math.PI / 2;
  west.position.set(-half - outerExtent / 2, y, ISLAND_Z);
  west.renderOrder = 5;
  group.add(west);
  
  scene.add(group);
  buildBoundaryMesh = group;
}
createBuildBoundary();

// --- Build mode orthographic camera ---

function createBuildCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  const sz = buildCamRefs.buildCamState.zoom;
  const buildCamera = new THREE.OrthographicCamera(
    -sz * aspect / 2, sz * aspect / 2,
    sz / 2, -sz / 2, 0.1, 200
  );
  buildCamRefs.buildCamera = buildCamera;
  updateBuildCameraPosition();
}

function updateBuildCameraPosition() {
  if (!buildCamRefs.buildCamera) return;
  const angle = camOrbit.currentAngle;
  const h = buildCamRefs.buildCamState.camY || 45;
  buildCamRefs.buildCamera.position.set(buildCamRefs.buildCamState.panX, h, ISLAND_Z + buildCamRefs.buildCamState.panZ);
  buildCamRefs.buildCamera.lookAt(buildCamRefs.buildCamState.panX, 0, ISLAND_Z + buildCamRefs.buildCamState.panZ);
  // Rotate the "up" direction so N/E/S/W matches the orbit angle
  buildCamRefs.buildCamera.up.set(-Math.sin(angle), 0, -Math.cos(angle));
}

function resizeBuildCamera() {
  if (!buildCamRefs.buildCamera) return;
  const aspect = window.innerWidth / window.innerHeight;
  const sz = buildCamRefs.buildCamState.zoom;
  buildCamRefs.buildCamera.left = -sz * aspect / 2;
  buildCamRefs.buildCamera.right = sz * aspect / 2;
  buildCamRefs.buildCamera.top = sz / 2;
  buildCamRefs.buildCamera.bottom = -sz / 2;
  buildCamRefs.buildCamera.updateProjectionMatrix();
}

createBuildCamera();

// Raycaster for hover detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const hoverPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -OCEAN_FLOOR_Y - 0.1);

function screenToGrid(clientX, clientY) {
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const ts = TILE_SIZE;

  // Primary: raycast against actual terrain meshes (accurate from any camera angle)
  const hits = raycaster.intersectObjects(blocksGroup.children, true);
  if (hits.length > 0) {
    const p = hits[0].point;
    return { x: Math.floor(p.x / ts), z: Math.floor((p.z - ISLAND_Z) / ts), hitY: p.y };
  }

  // Fallback: intersect water plane then ocean floor (for building on empty areas)
  const fallbackHeights = [0, OCEAN_FLOOR_Y + 0.1];
  for (const h of fallbackHeights) {
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -h);
    const hit = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, hit);
    if (hit) {
      return { x: Math.floor(hit.x / ts), z: Math.floor((hit.z - ISLAND_Z) / ts), hitY: hit.y };
    }
  }
  return null;
}

function onPointerMove(e) {
  if (!buildState.active) return;
  
  const tile = screenToGrid(e.clientX, e.clientY);
  if (!tile) {
    if (buildState.hoverMesh) buildState.hoverMesh.visible = false;
    return;
  }
  
  buildState.hoverTile = tile;

  // Update cursor position — use raycast hit point Y for accurate slope tracking
  const ts = TILE_SIZE;
  const col = getColumn(tile.x, tile.z);
  // Use the actual raycast Y when available (slopes/terrain surface),
  // fall back to grid height for flat/empty tiles
  const gridY = OCEAN_FLOOR_Y + col.totalHeight * ts + 0.15;
  const cursorY = (tile.hitY != null) ? tile.hitY + 0.15 : gridY;
  const offset = (buildTools.brush - 1) * ts * 0.5;

  buildState.hoverMesh.position.set(
    (tile.x + 0.5) * ts + offset,
    cursorY,
    ISLAND_Z + (tile.z + 0.5) * ts + offset
  );
  buildState.hoverMesh.visible = true;
  
  // Color: green for raise — red if out of bounds, red for clear
  const outOfBounds = !isTileInBounds(tile.x, tile.z);
  if (outOfBounds) {
    buildState._cursorFillMat.color.set(0xff2200);
    buildState._cursorBorderMat.color.set(0xff2200);
    buildState._cursorFillMat.opacity = 0.6;
    buildState._cursorBorderMat.opacity = 0.3;
  } else if (buildTools.height === 0) {
    buildState._cursorFillMat.color.set(0xCC3333);
    buildState._cursorBorderMat.color.set(0xCC3333);
    buildState._cursorFillMat.opacity = 0.55;
    buildState._cursorBorderMat.opacity = 0.25;
  } else if (buildTools.tool === 'flatten') {
    buildState._cursorFillMat.color.set(0x5bc0de);
    buildState._cursorBorderMat.color.set(0x5bc0de);
    buildState._cursorFillMat.opacity = 0.55;
    buildState._cursorBorderMat.opacity = 0.25;
  } else {
    buildState._cursorFillMat.color.set(0x4A9E5C);
    buildState._cursorBorderMat.color.set(0x4A9E5C);
    buildState._cursorFillMat.opacity = 0.55;
    buildState._cursorBorderMat.opacity = 0.25;
  }

  // If painting (dragging), apply brush
  if (buildState.painting) {
    applyBrush(tile.x, tile.z);
  }
}

function onPointerDown(e) {
  // --- Build mode (dev only) ---
  if (buildState.active) {
    if (!buildState.hoverTile) return;
    if (e.target.closest('#buildPanel') || e.target.closest('#cloudToggle')) return;

    // Save undo before starting stroke
    saveUndoSnapshot();

    buildState.painting = true;
    buildState.paintedCells.clear();

    applyBrush(buildState.hoverTile.x, buildState.hoverTile.z);
    return;
  }

  // --- Play mode (or dev with player toggled on): tap-to-walk ---
  if (!isDev() || window._devPlayerOn) {
    // Ignore taps on UI elements
    if (e.target && e.target.closest && (e.target.closest('#modeToggle') || e.target.closest('#musicBtn') || e.target.closest('#ambientBtn') || e.target.closest('#playerToggle'))) return;

    // Character deactivated in Settings → no tap-to-walk, no camera recenter.
    if (window._isPlayerActive && !window._isPlayerActive()) return;

    // Raycast: try terrain first, fall back to water plane
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let worldX, worldZ;
    let diveDepth = 0;       // 0 = surface, negative = dive to that Y
    let isWaterTarget = false; // true = target is in water (swim)
    // Include seabed for dive targeting (terrain only covers above-water)
    const _rayTargets = [...blocksGroup.children];
    if (terrainRefs.seabedMesh) _rayTargets.push(terrainRefs.seabedMesh);
    const hits = raycaster.intersectObjects(_rayTargets, true);
    const DIVE_FLOOR_THRESHOLD = -1.0; // only dive when floor is clearly underwater

    // Water plane intersection for surface-swim fallback
    const _waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const _waterHit = new THREE.Vector3();
    const hasWaterHit = raycaster.ray.intersectPlane(_waterPlane, _waterHit);

    if (hits.length > 0 && hits[0].point.y > DIVE_FLOOR_THRESHOLD) {
      // Terrain above or near waterline.
      // But from the low play-mode camera, rays skim the water surface and
      // can hit the far edge of the island at a grazing angle even when the
      // player clearly clicked on the water.  Compare distances: if the
      // water-plane intersection is CLOSER to the camera than the terrain
      // hit, the click was visually "on the water", not the island.
      const terrainDist = hits[0].distance;
      const waterDist = hasWaterHit
        ? raycaster.ray.origin.distanceTo(_waterHit)
        : Infinity;

      if (hasWaterHit && waterDist < terrainDist - 0.5) {
        // Water is closer — swim on surface
        worldX = _waterHit.x;
        worldZ = _waterHit.z;
        isWaterTarget = true;
      } else {
        // Terrain is closer or equal — walk on land
        const p = hits[0].point;
        worldX = Math.floor(p.x / TILE_SIZE + 0.5) * TILE_SIZE;
        worldZ = Math.floor((p.z - ISLAND_Z) / TILE_SIZE + 0.5) * TILE_SIZE + ISLAND_Z;
      }
    } else if (hits.length > 0 && hits[0].point.y <= DIVE_FLOOR_THRESHOLD) {
      // Terrain below water — distinguish beach slopes from deep ocean floor.
      // Beach slopes are shallow (hitY between -1 and ~-4) and the ray passes
      // through a lot of water before hitting them. Deep ocean floor is at -5+.
      // Use the depth ratio (how far below water vs total water depth) to decide:
      // if the hit is in the upper half of the water column, it's likely a
      // beach slope graze → swim on surface. If deep, it's intentional → dive.
      const hitY = hits[0].point.y;
      const DEEP_DIVE_Y = -4.0; // below this = clearly deep ocean floor
      if (hitY > DEEP_DIVE_Y && hasWaterHit) {
        // Shallow underwater terrain (beach slope) — swim on surface
        worldX = _waterHit.x;
        worldZ = _waterHit.z;
        isWaterTarget = true;
      } else {
        // Deep ocean floor — dive
        const p = hits[0].point;
        worldX = p.x;
        worldZ = p.z;
        diveDepth = p.y;
        isWaterTarget = true;
      }
    } else {
      // No terrain hit — open water surface (swim, no dive)
      if (!hasWaterHit) return;
      worldX = _waterHit.x;
      worldZ = _waterHit.z;
      isWaterTarget = true;
    }

    // Block swimming behind the island (camera orbits at angle PI/2,
    // sitting at +X looking toward -X; "behind" = negative X side).
    // Allow front (+X) and sides (±Z) but not behind.
    if (isWaterTarget && worldX < -(ISLAND_RADIUS + 4)) return;

    setPlayerTarget(worldX, worldZ, diveDepth);

    // Signal camera to smoothly re-center on the player (not in dev mode)
    if (!isDev()) camOrbit._recentering = true;
  }
}

function onPointerUp(e) {
  if (!buildState.painting) return;
  buildState.painting = false;
  buildState.paintedCells.clear();
  clearDragPreview();
  // Only rebuild terrain mesh when terrain was actually modified (not in flora mode)
  if (floraToolState.mode !== 'flora') rebuildFormation();
}

window.addEventListener('pointermove', onPointerMove, { passive: true });
window.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointerup', onPointerUp);
window.addEventListener('pointercancel', onPointerUp);

function showWarning(msg) {
  let el = document.getElementById('buildWarning');
  if (!el) {
    el = document.createElement('div');
    el.id = 'buildWarning';
    el.style.cssText = 'position:fixed; bottom:180px; left:50%; transform:translateX(-50%); z-index:101; background:rgba(220,60,40,0.92); color:#fff; font:700 16px/1.3 "Tahiti",system-ui,sans-serif; padding:12px 24px; border-radius:20px; backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); pointer-events:none; transition:opacity 0.3s; letter-spacing:0.3px; text-shadow:0 1px 2px rgba(0,0,0,0.3);';
    document.body.appendChild(el);
  }
  el.textContent = '\u26A0 ' + msg;
  el.style.opacity = '1';
  clearTimeout(window._warningTimeout);
  window._warningTimeout = setTimeout(hideWarning, 2000);
}

function hideWarning() {
  clearTimeout(window._warningTimeout);
  const el = document.getElementById('buildWarning');
  if (el) el.style.opacity = '0';
}

// --- Toggle build mode ---
function toggleBuildMode() {
  if (!isDev()) return; // build mode is dev-only
  buildState.active = !buildState.active;
  const btnBuild = document.getElementById('btnBuild');
  if (!buildState.active) {
    // EXIT build mode — restore camera
    if (buildState.hoverMesh) buildState.hoverMesh.visible = false;
    clearDragPreview();
    hideWarning();
    camOrbit.topTarget = buildState._prevTopTarget;
    // Clamp pan to orbit limits so camera smoothly returns near island
    const exitMaxPan = buildState._prevTopTarget === 0 ? 40 : 100;
    camOrbit.panTargetX = Math.max(-exitMaxPan, Math.min(exitMaxPan, camOrbit.panTargetX));
    camOrbit.panTargetZ = Math.max(-exitMaxPan, Math.min(exitMaxPan, camOrbit.panTargetZ));
    updateCamUI();
    if (btnBuild) { btnBuild.classList.remove('active'); btnBuild.textContent = '\uD83C\uDFD7\uFE0F Build'; }
    // Hide build boundary
    if (buildBoundaryMesh) buildBoundaryMesh.visible = false;
    // Restore water effects to full intensity
    particles.material.opacity = 0.5;
    // God ray opacity is now GPU-driven via shader uniforms (no reset needed)
    causticUniforms.uCausticIntensity.value = 1.0;
  } else {
    // ENTER build mode — save state, go to elevated diagonal view
    buildState._prevTopTarget = camOrbit.topTarget;
    // Switch to builder view (elevated diagonal) — user can cycle to overhead with V
    camOrbit.topTarget = 1;
    updateCamUI();
    if (btnBuild) { btnBuild.classList.add('active'); btnBuild.textContent = '\uD83D\uDEAA Exit'; }
    // Show build boundary
    if (buildBoundaryMesh) buildBoundaryMesh.visible = true;
  }
  updateBuildUI();
}

function setGridSize(size) {
  updateBuildUI();
}

// --- Build the new flat toolbar UI ---
function buildBuildMenu() {
  const panel = document.getElementById('buildPanel');
  if (!panel) return;
  
  panel.innerHTML = '';
  
  // Row 1: Material + Height
  const row1 = document.createElement('div');
  row1.style.cssText = 'display:flex; gap:4px; align-items:center; justify-content:center; flex-wrap:wrap;';
  
  // Mode toggle row (Terrain vs Flora)
  const modeRow = document.createElement('div');
  modeRow.style.cssText = 'display:flex; gap:4px; align-items:center; justify-content:center; margin-bottom:6px;';
  
  ['terrain', 'flora'].forEach(mode => {
    const btn = document.createElement('button');
    const isActive = floraToolState.mode === mode;
    const icon = mode === 'terrain' ? '\u26F0\uFE0F' : '\uD83C\uDF3F';
    btn.textContent = icon + ' ' + mode.charAt(0).toUpperCase() + mode.slice(1);
    btn.style.cssText = `
      padding: 10px 20px; border: 2px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.3)'};
      border-radius: 20px; font: 700 13px/1 system-ui, sans-serif;
      backdrop-filter: blur(8px); transition: all 0.2s;
      background: ${isActive ? (mode === 'flora' ? 'rgba(76,175,80,0.85)' : 'rgba(255,255,255,0.85)') : 'rgba(255,255,255,0.15)'};
      color: ${isActive ? (mode === 'flora' ? '#fff' : '#6E4B40') : 'rgba(255,255,255,0.9)'};
    `;
    btn.addEventListener('click', (e) => { e.stopPropagation(); floraToolState.mode = mode; buildBuildMenu(); });
    modeRow.appendChild(btn);
  });
  panel.appendChild(modeRow);
  
  // --- FLORA MODE: species selector ---
  if (floraToolState.mode === 'flora') {
    const floraRow = document.createElement('div');
    floraRow.style.cssText = 'display:flex; gap:4px; align-items:center; justify-content:center; flex-wrap:wrap; margin-bottom:6px;';
    
    // Coconut Palm button
    const palmBtn = document.createElement('button');
    const palmActive = floraToolState.selectedSpecies === FLORA_ID;
    palmBtn.textContent = PALM_CONFIG.icon + ' ' + PALM_CONFIG.name;
    palmBtn.style.cssText = `
      padding: 8px 14px; border: 2px solid ${palmActive ? '#4CAF50' : 'rgba(255,255,255,0.3)'};
      border-radius: 16px; font: 600 12px/1 system-ui, sans-serif;
      backdrop-filter: blur(8px); transition: all 0.2s;
      background: ${palmActive ? 'rgba(76,175,80,0.85)' : 'rgba(255,255,255,0.15)'};
      color: ${palmActive ? '#fff' : 'rgba(255,255,255,0.9)'};
    `;
    palmBtn.addEventListener('click', (e) => { e.stopPropagation(); floraToolState.selectedSpecies = FLORA_ID; buildBuildMenu(); });
    floraRow.appendChild(palmBtn);

    // Coral type buttons
    CORAL_TYPES.forEach(ct => {
      const btn = document.createElement('button');
      const isActive = floraToolState.selectedSpecies === ct.id;
      btn.textContent = ct.icon + ' ' + ct.name;
      btn.style.cssText = `
        padding: 8px 14px; border: 2px solid ${isActive ? '#00BCD4' : 'rgba(255,255,255,0.3)'};
        border-radius: 16px; font: 600 12px/1 system-ui, sans-serif;
        backdrop-filter: blur(8px); transition: all 0.2s;
        background: ${isActive ? 'rgba(0,188,212,0.85)' : 'rgba(255,255,255,0.15)'};
        color: ${isActive ? '#fff' : 'rgba(255,255,255,0.9)'};
      `;
      btn.addEventListener('click', (e) => { e.stopPropagation(); floraToolState.selectedSpecies = ct.id; buildBuildMenu(); });
      floraRow.appendChild(btn);
    });

    // Divider before Remove
    const floraDivRemove = document.createElement('span');
    floraDivRemove.style.cssText = 'width:2px;height:22px;background:rgba(255,255,255,0.2);margin:0 4px;';
    floraRow.appendChild(floraDivRemove);

    // Remove flora button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '\uD83D\uDEAB Remove';
    removeBtn.style.cssText = `
      padding: 8px 14px; border: 2px solid ${floraToolState.selectedSpecies === 'REMOVE' ? '#CC3333' : 'rgba(255,255,255,0.3)'};
      border-radius: 16px; font: 600 12px/1 system-ui, sans-serif;
      backdrop-filter: blur(8px); transition: all 0.2s;
      background: ${floraToolState.selectedSpecies === 'REMOVE' ? 'rgba(204,51,51,0.85)' : 'rgba(255,255,255,0.15)'};
      color: ${floraToolState.selectedSpecies === 'REMOVE' ? '#fff' : 'rgba(255,255,255,0.9)'};
    `;
    removeBtn.addEventListener('click', (e) => { e.stopPropagation(); floraToolState.selectedSpecies = 'REMOVE'; buildBuildMenu(); });
    floraRow.appendChild(removeBtn);

    // Divider before Brush size
    const floraDivBrush = document.createElement('span');
    floraDivBrush.style.cssText = 'width:2px;height:22px;background:rgba(255,255,255,0.2);margin:0 4px;';
    floraRow.appendChild(floraDivBrush);

    // Brush size (shared with terrain)
    [1, 2, 3].forEach(sz => {
      const btn = document.createElement('button');
      const isActive = buildTools.brush === sz;
      btn.textContent = sz + '\u00D7' + sz;
      btn.style.cssText = `
        padding: 8px 14px; border: 2px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.3)'};
        border-radius: 16px; font: 600 12px/1 system-ui, sans-serif;
        backdrop-filter: blur(8px); transition: all 0.2s;
        background: ${isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.15)'};
        color: ${isActive ? '#6E4B40' : 'rgba(255,255,255,0.9)'};
      `;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        buildTools.brush = sz;
        updateBrushCursorSize();
        buildBuildMenu();
      });
      floraRow.appendChild(btn);
    });

    panel.appendChild(floraRow);
    // Skip terrain controls — return early
    return;
  }
  
  // Material buttons
  ['rock', 'sand'].forEach(mat => {
    const btn = document.createElement('button');
    const isActive = buildTools.material === mat;
    const icon = mat === 'rock' ? '\uD83E\uDEA8' : '\uD83C\uDFD6\uFE0F';
    btn.textContent = icon + ' ' + mat.charAt(0).toUpperCase() + mat.slice(1);
    btn.style.cssText = `
      padding: 10px 16px; border: 2px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.3)'};
      border-radius: 20px; font: 600 13px/1 system-ui, sans-serif; ${CURSOR_CSS}
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: all 0.2s;
      background: ${isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.15)'};
      color: ${isActive ? '#6E4B40' : 'rgba(255,255,255,0.9)'};
    `;
    btn.addEventListener('click', (e) => { e.stopPropagation(); buildTools.material = mat; buildBuildMenu(); });
    row1.appendChild(btn);
  });
  
  // Divider
  const div1 = document.createElement('span');
  div1.style.cssText = 'width:2px;height:22px;background:rgba(255,255,255,0.2);margin:0 4px;';
  row1.appendChild(div1);
  
  // Height buttons (0 = clear, 1-N = height levels; sand caps at 8)
  const maxH = buildTools.material === 'sand' ? 8 : MAX_HEIGHT;
  if (buildTools.material === 'sand' && buildTools.height > 8) buildTools.height = 8;
  for (let h = 0; h <= maxH; h++) {
    const btn = document.createElement('button');
    const isActive = buildTools.height === h;
    const isClear = h === 0;
    const isWaterLevel = h === 6;
    btn.textContent = isClear ? '\uD83D\uDEAB' : String(h);
    btn.title = isClear ? 'Clear terrain' : (isWaterLevel ? 'Height ' + h + ' (water level)' : 'Height ' + h);
    btn.style.cssText = `
      width: ${isClear ? '36px' : '30px'}; height: 30px; border: 2px solid ${isActive ? (isClear ? '#CC3333' : '#fff') : (isWaterLevel ? 'rgba(96,176,224,0.6)' : 'rgba(255,255,255,0.3)')};
      border-radius: ${isClear ? '16px' : '50%'}; ${isWaterLevel && !isActive ? 'box-shadow: 0 2px 0 0 #60b0e0;' : ''} font: 700 ${isClear ? '13px' : '12px'}/1 system-ui, sans-serif; ${CURSOR_CSS}
      backdrop-filter: blur(8px); transition: all 0.2s;
      background: ${isActive ? (isClear ? 'rgba(204,51,51,0.85)' : 'rgba(255,255,255,0.85)') : 'rgba(255,255,255,0.15)'};
      color: ${isActive ? (isClear ? '#fff' : '#6E4B40') : 'rgba(255,255,255,0.9)'};
    `;
    btn.addEventListener('click', (e) => { e.stopPropagation(); buildTools.height = h; buildBuildMenu(); });
    row1.appendChild(btn);
  }
  
  panel.appendChild(row1);
  
  // Row 2: Tools + Brush size
  const row2 = document.createElement('div');
  row2.style.cssText = 'display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap;';
  
  // Tool mode: raise (default) or flatten
  if (buildTools.tool !== 'raise' && buildTools.tool !== 'flatten') buildTools.tool = 'raise';

  // Flatten toggle button
  const flatBtn = document.createElement('button');
  const flatActive = buildTools.tool === 'flatten';
  flatBtn.textContent = '\u2B1C Flatten';
  flatBtn.title = 'Flatten terrain to selected height (F)';
  flatBtn.style.cssText = `
    padding: 8px 14px; border: 2px solid ${flatActive ? '#5bc0de' : 'rgba(255,255,255,0.3)'};
    border-radius: 16px; font: 600 12px/1 system-ui, sans-serif;
    backdrop-filter: blur(8px); transition: all 0.2s;
    background: ${flatActive ? 'rgba(91,192,222,0.85)' : 'rgba(255,255,255,0.15)'};
    color: ${flatActive ? '#fff' : 'rgba(255,255,255,0.9)'};
  `;
  flatBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    buildTools.tool = buildTools.tool === 'flatten' ? 'raise' : 'flatten';
    buildBuildMenu();
  });
  row2.appendChild(flatBtn);

  // Divider between flatten and brush size
  const divFlat = document.createElement('span');
  divFlat.style.cssText = 'width:2px;height:22px;background:rgba(255,255,255,0.2);margin:0 4px;';
  row2.appendChild(divFlat);

  // Brush size
  [1, 2, 3].forEach(sz => {
    const btn = document.createElement('button');
    const isActive = buildTools.brush === sz;
    btn.textContent = sz + '\u00D7' + sz;
    btn.style.cssText = `
      padding: 8px 14px; border: 2px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.3)'};
      border-radius: 16px; font: 600 12px/1 system-ui, sans-serif; ${CURSOR_CSS}
      backdrop-filter: blur(8px); transition: all 0.2s;
      background: ${isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.15)'};
      color: ${isActive ? '#6E4B40' : 'rgba(255,255,255,0.9)'};
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      buildTools.brush = sz;
      updateBrushCursorSize();
      buildBuildMenu();
    });
    row2.appendChild(btn);
  });
  
  // Divider
  const div3 = document.createElement('span');
  div3.style.cssText = 'width:2px;height:22px;background:rgba(255,255,255,0.2);margin:0 4px;';
  row2.appendChild(div3);
  
  // Undo button
  const undoBtn = document.createElement('button');
  undoBtn.textContent = '\u21A9 Undo';
  undoBtn.style.cssText = `
    padding: 8px 16px; border: 2px solid rgba(255,255,255,0.3);
    border-radius: 16px; font: 600 12px/1 system-ui, sans-serif; ${CURSOR_CSS}
    backdrop-filter: blur(8px); transition: all 0.2s;
    background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9);
  `;
  undoBtn.addEventListener('click', (e) => { e.stopPropagation(); undoPlace(); });
  row2.appendChild(undoBtn);
  
  panel.appendChild(row2);
  
  // Row 3: Hint
  const hint = document.createElement('div');
  hint.style.cssText = 'color:rgba(255,255,255,0.45); font:11px/1 system-ui,sans-serif; margin-top:4px; text-align:center;';
  hint.textContent = 'B exit \u00B7 Click+drag to paint \u00B7 F flatten \u00B7 Ctrl+Z undo \u00B7 Scroll to zoom';
  panel.appendChild(hint);
}

function updateBuildUI() {
  const panel = document.getElementById('buildPanel');
  if (panel) {
    panel.style.display = buildState.active ? 'flex' : 'none';
    if (buildState.active) buildBuildMenu();
  }
}

export { toggleBuildMode, buildBuildMenu, createBuildCamera, updateBuildCameraPosition, resizeBuildCamera, updateBuildUI, screenToGrid };
