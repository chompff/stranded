// ============================================================
// PLAYER — Capsule placeholder with tap-to-walk movement
// ============================================================
// Creates a player avatar (capsule placeholder) that walks to
// tapped locations on the terrain. Surface-following via downward
// raycast, smooth rotation toward movement direction, idle bob.
// ============================================================
import * as THREE from 'three';
import { scene, ISLAND_Z, ISLAND_RADIUS, TILE_SIZE, terrainRefs } from './state.js';
import { isDev } from './mode.js';

// --- Reusable objects (no per-frame allocations) ---
const _surfaceRay = new THREE.Raycaster();
const _surfaceOrigin = new THREE.Vector3();
const _surfaceDir = new THREE.Vector3(0, -1, 0);
const _moveDir = new THREE.Vector3();

// --- Constants ---
const WATER_Y = 0;                     // water surface height
const SWIM_BOUNDARY = 200;                 // max distance from island center (X/Z) — covers doubled island
const WADE_THRESHOLD = 0.3;            // below this terrain Y = in water (wading)
const SWIM_THRESHOLD = -0.8;           // below this terrain Y = swimming (deep enough to float)
const DIVE_SPEED = 1.5;               // m/s when diving (slower than swimming)

// Bubble particles (underwater breath)
const BUBBLE_COUNT      = 20;
const BUBBLE_RISE_SPEED = 1.5;       // m/s upward
const BUBBLE_MAX_LIFE   = 2.0;       // seconds
const BUBBLE_SIZE       = 2.0;       // gl_PointSize base
// Burst/pause: emit 2-3 bubbles quickly, then wait 2-4s
const BURST_MIN = 2, BURST_MAX = 3;       // bubbles per burst
const PAUSE_MIN = 2.0, PAUSE_MAX = 4.0;   // seconds between bursts

// Splash particles (water entry/exit)
const SPLASH_COUNT     = 16;          // max particles in pool
const SPLASH_LIFE      = 0.6;         // seconds per droplet
const SPLASH_SIZE      = 8.0;         // gl_PointSize base
const SPLASH_UP_MIN    = 1.5;         // min upward velocity (m/s)
const SPLASH_UP_MAX    = 3.5;         // max upward velocity
const SPLASH_SPREAD    = 1.5;         // horizontal spread velocity (m/s)
const SPLASH_GRAVITY   = 9.8;         // downward pull (m/s²)

// Body tilt angles (radians, 0 = upright, π = fully inverted)
// ────────────────────────────────────────────────────────────
// State                    Degrees   Radians
// Walking / idle / wading    0°      0
// Idle float (treading)     10°      π/18
// Surface swimming          70°      7π/18
// Underwater swimming       90°      π/2       (horizontal travel)
// Diving (trajectory)     90–170°    computed   (angle matches path to target)
// Surfacing (trajectory)  -(90–170)  negative   (head-UP, flipped before rising)
// Underwater idle           90°      π/2
// ────────────────────────────────────────────────────────────
const SURFACE_TILT         = 0;                    //   0° — land, wading, idle
const IDLE_FLOAT_TILT      = Math.PI / 18;         //  10° — treading water
const SURFACE_SWIM_TILT    = 7 * Math.PI / 18;     //  70° — swimming on water surface
const UNDERWATER_IDLE_TILT = Math.PI / 2;           //  90° — stationary at ocean floor
const MIN_DIVE_TILT        = Math.PI / 2;           //  90° — shallowest dive angle (horizontal)
const MAX_DIVE_TILT        = 17 * Math.PI / 18;     // 170° — steepest dive angle (near-vertical)

// --- Player state (module-scoped) ---
const playerState = {
  mesh: null,                          // THREE.Group wrapping the capsule
  position: new THREE.Vector3(),       // current world position
  targetPosition: null,                // THREE.Vector3 | null
  isWalking: false,
  walkSpeed: 4.0,                      // meters per second
  swimSpeed: 2.0,                      // meters per second (in water)
  arrivalThreshold: 0.5,              // meters — stop when this close
  surfaceY: 0,                         // smoothed ground height
  rawSurfaceY: 0,                      // unsmoothed ground height (for floor clamps)
  isWading: false,                     // true when in shallow water (upright, walking)
  isSwimming: false,                   // true when in deep water (prone, floating)
  isDiving: false,                     // true when diving underwater
  diveTargetY: 0,                      // offset from swim-base (0 = surface, negative = underwater)
  diveY: 0,                           // current smoothed dive depth
  tilt: 0,                            // current X rotation (pitch) for dive visual
  hasTerrain: false,                   // true when terrain exists below
  rotation: 0,                         // current Y rotation (radians)
  targetRotation: 0,                   // desired Y rotation
  rotationSpeed: 10.0,                 // radians per second
  wasSubmerged: false,                  // was mesh below water surface last frame (splash trigger)
};

// ============================================================
// Surface height query — raycast downward to find terrain
// Returns { y, hasTerrain } so callers know if solid ground exists
// ============================================================
function getSurfaceHeight(worldX, worldZ) {
  const bg = terrainRefs.blocksGroup;
  if (!bg || bg.children.length === 0) return { y: -20, hasTerrain: false };
  _surfaceOrigin.set(worldX, 50, worldZ);
  _surfaceRay.set(_surfaceOrigin, _surfaceDir);
  const hits = _surfaceRay.intersectObjects(bg.children, true);
  return hits.length > 0
    ? { y: hits[0].point.y, hasTerrain: true }
    : { y: -20, hasTerrain: false };
}

// ============================================================
// Create capsule placeholder mesh
// ============================================================
function createPlayerMesh() {
  const group = new THREE.Group();

  // Build capsule from cylinder + two hemisphere caps (Three.js 0.128 has no CapsuleGeometry)
  const R = 0.3;           // radius
  const H = 1.0;           // cylinder height (total ~1.6m with caps)
  const mat = new THREE.MeshLambertMaterial({ color: 0x4488ff });
  const headMat = new THREE.MeshLambertMaterial({ color: 0xffdd44 });

  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 12, 1), mat);
  cyl.castShadow = true;
  cyl.receiveShadow = true;

  const topCap = new THREE.Mesh(new THREE.SphereGeometry(R, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), headMat);
  topCap.position.y = H / 2;

  const botCap = new THREE.Mesh(new THREE.SphereGeometry(R, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat);
  botCap.rotation.x = Math.PI; // flip upside-down
  botCap.position.y = -H / 2;

  // Wrapper so group origin = feet
  const body = new THREE.Group();
  body.add(cyl, topCap, botCap);
  body.position.y = H / 2 + R; // feet at y=0

  group.add(body);
  return group;
}

// ============================================================
// Bubble particle system — GPU-driven Points (same pattern as rain)
// ============================================================
let _bubblePoints = null;
const _bubbleLife = new Float32Array(BUBBLE_COUNT); // per-particle life timer
const _bubblePhase = new Float32Array(BUBBLE_COUNT); // per-particle drift phase
// Burst/pause state
let _burstRemaining = 0;   // bubbles left in current burst
let _pauseTimer = 0;        // seconds until next burst allowed

function createBubbleSystem() {
  const positions = new Float32Array(BUBBLE_COUNT * 3);
  const alphas    = new Float32Array(BUBBLE_COUNT);

  // Park all bubbles below scene, invisible
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    positions[i * 3]     = 0;
    positions[i * 3 + 1] = -50;
    positions[i * 3 + 2] = 0;
    alphas[i] = 0;
    _bubbleLife[i] = 0;
    _bubblePhase[i] = Math.random() * Math.PI * 2;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {},
    vertexShader: /* glsl */ `
      attribute float alpha;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = ${BUBBLE_SIZE.toFixed(1)} * (70.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        // Hollow ring: visible between radius 0.5–0.9, soft edges
        float ring = smoothstep(0.4, 0.6, d) * smoothstep(1.0, 0.8, d);
        // Add faint fill so bubble isn't fully transparent inside
        float fill = smoothstep(1.0, 0.0, d) * 0.15;
        float a = (ring + fill) * vAlpha;
        if (a < 0.01) discard;
        gl_FragColor = vec4(0.7, 0.9, 1.0, a);
      }
    `,
  });

  _bubblePoints = new THREE.Points(geo, mat);
  _bubblePoints.frustumCulled = false; // particles move independently
  scene.add(_bubblePoints);
}

function updateBubbles(dt) {
  if (!_bubblePoints) return;
  const isUnderwater = playerState.isSwimming && playerState.diveY < -0.3;

  // Hide system entirely when not underwater (zero cost)
  if (!isUnderwater) {
    if (_bubblePoints.visible) {
      _bubblePoints.visible = false;
      // Reset all particles so they don't pop in later
      const a = _bubblePoints.geometry.attributes.alpha.array;
      for (let i = 0; i < BUBBLE_COUNT; i++) { a[i] = 0; _bubbleLife[i] = 0; }
      _bubblePoints.geometry.attributes.alpha.needsUpdate = true;
      _burstRemaining = 0;
      _pauseTimer = 0;
    }
    return;
  }
  _bubblePoints.visible = true;

  const pp = _bubblePoints.geometry.attributes.position.array;
  const aa = _bubblePoints.geometry.attributes.alpha.array;
  const t  = performance.now() * 0.001;

  // Head world position (group pos + body offset + topCap offset)
  const headX = playerState.mesh.position.x;
  const headY = playerState.mesh.position.y + 1.3; // H/2+R + H/2 = 0.8 + 0.5
  const headZ = playerState.mesh.position.z;

  // Burst/pause timer — count down pause, then start a new burst
  if (_burstRemaining <= 0) {
    _pauseTimer -= dt;
    if (_pauseTimer <= 0) {
      _burstRemaining = BURST_MIN + Math.floor(Math.random() * (BURST_MAX - BURST_MIN + 1));
      _pauseTimer = PAUSE_MIN + Math.random() * (PAUSE_MAX - PAUSE_MIN);
    }
  }

  for (let i = 0; i < BUBBLE_COUNT; i++) {
    if (_bubbleLife[i] <= 0) {
      // Inactive — spawn if burst has budget
      if (_burstRemaining > 0) {
        // Spawn at head with small random offset
        pp[i * 3]     = headX + (Math.random() - 0.5) * 0.2;
        pp[i * 3 + 1] = headY;
        pp[i * 3 + 2] = headZ + (Math.random() - 0.5) * 0.2;
        _bubbleLife[i] = BUBBLE_MAX_LIFE;
        _bubblePhase[i] = Math.random() * Math.PI * 2;
        aa[i] = 0.01; // will ramp up
        _burstRemaining--;
      }
      continue;
    }

    // Active bubble — rise, drift, fade
    _bubbleLife[i] -= dt;
    const lifeRatio = _bubbleLife[i] / BUBBLE_MAX_LIFE; // 1→0

    // Rise
    pp[i * 3 + 1] += BUBBLE_RISE_SPEED * dt;

    // Gentle sideways drift (sine wave)
    const phase = _bubblePhase[i];
    pp[i * 3]     += Math.sin(t * 2.0 + phase) * 0.003;
    pp[i * 3 + 2] += Math.cos(t * 1.5 + phase) * 0.003;

    // Alpha: ramp up quickly at start, fade out at end
    if (lifeRatio > 0.8) {
      aa[i] = (1.0 - lifeRatio) * 5.0; // 0→1 in first 20% of life
    } else {
      aa[i] = Math.min(1.0, lifeRatio * 2.5); // fade to 0 in last 40%
    }

    // Kill if reached water surface or life expired
    if (pp[i * 3 + 1] >= WATER_Y || _bubbleLife[i] <= 0) {
      aa[i] = 0;
      _bubbleLife[i] = 0;
      pp[i * 3 + 1] = -50; // park below
    }
  }

  _bubblePoints.geometry.attributes.position.needsUpdate = true;
  _bubblePoints.geometry.attributes.alpha.needsUpdate = true;
}

// ============================================================
// Splash particle system — burst of droplets on water entry/exit
// ============================================================
let _splashPoints = null;
const _splashLife = new Float32Array(SPLASH_COUNT);
const _splashVelX = new Float32Array(SPLASH_COUNT);
const _splashVelY = new Float32Array(SPLASH_COUNT);
const _splashVelZ = new Float32Array(SPLASH_COUNT);

function createSplashSystem() {
  const positions = new Float32Array(SPLASH_COUNT * 3);
  const alphas    = new Float32Array(SPLASH_COUNT);

  // Park all particles below scene, invisible
  for (let i = 0; i < SPLASH_COUNT; i++) {
    positions[i * 3]     = 0;
    positions[i * 3 + 1] = -50;
    positions[i * 3 + 2] = 0;
    alphas[i] = 0;
    _splashLife[i] = 0;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {},
    vertexShader: /* glsl */ `
      attribute float alpha;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = ${SPLASH_SIZE.toFixed(1)} * (70.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float circle = smoothstep(1.0, 0.6, d);
        float a = circle * vAlpha;
        if (a < 0.01) discard;
        gl_FragColor = vec4(0.3, 0.85, 0.82, a);
      }
    `,
  });

  _splashPoints = new THREE.Points(geo, mat);
  _splashPoints.frustumCulled = false;
  _splashPoints.visible = false;
  scene.add(_splashPoints);
}

function emitSplash(worldX, worldZ) {
  if (!_splashPoints) return;
  _splashPoints.visible = true;

  const pp = _splashPoints.geometry.attributes.position.array;
  const aa = _splashPoints.geometry.attributes.alpha.array;

  for (let i = 0; i < SPLASH_COUNT; i++) {
    // Spawn at water surface around the player
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 0.3;
    pp[i * 3]     = worldX + Math.cos(angle) * radius;
    pp[i * 3 + 1] = WATER_Y + 0.05;
    pp[i * 3 + 2] = worldZ + Math.sin(angle) * radius;

    // Velocity: outward + upward
    _splashVelX[i] = Math.cos(angle) * SPLASH_SPREAD * (0.4 + Math.random() * 0.6);
    _splashVelY[i] = SPLASH_UP_MIN + Math.random() * (SPLASH_UP_MAX - SPLASH_UP_MIN);
    _splashVelZ[i] = Math.sin(angle) * SPLASH_SPREAD * (0.4 + Math.random() * 0.6);

    _splashLife[i] = SPLASH_LIFE * (0.6 + Math.random() * 0.4);
    aa[i] = 0.7;
  }

  _splashPoints.geometry.attributes.position.needsUpdate = true;
  _splashPoints.geometry.attributes.alpha.needsUpdate = true;
}

function updateSplash(dt) {
  if (!_splashPoints || !_splashPoints.visible) return;

  const pp = _splashPoints.geometry.attributes.position.array;
  const aa = _splashPoints.geometry.attributes.alpha.array;
  let anyAlive = false;

  for (let i = 0; i < SPLASH_COUNT; i++) {
    if (_splashLife[i] <= 0) continue;

    _splashLife[i] -= dt;
    anyAlive = true;

    // Apply gravity to vertical velocity
    _splashVelY[i] -= SPLASH_GRAVITY * dt;

    // Move
    pp[i * 3]     += _splashVelX[i] * dt;
    pp[i * 3 + 1] += _splashVelY[i] * dt;
    pp[i * 3 + 2] += _splashVelZ[i] * dt;

    // Kill if fell back below water
    if (pp[i * 3 + 1] < WATER_Y && _splashVelY[i] < 0) {
      _splashLife[i] = 0;
    }

    // Alpha: fade out as life expires
    const lifeRatio = Math.max(0, _splashLife[i] / SPLASH_LIFE);
    aa[i] = lifeRatio * 0.7;

    if (_splashLife[i] <= 0) {
      aa[i] = 0;
      pp[i * 3 + 1] = -50;
    }
  }

  _splashPoints.geometry.attributes.position.needsUpdate = true;
  _splashPoints.geometry.attributes.alpha.needsUpdate = true;

  // Hide system when all particles are dead (zero draw cost)
  if (!anyAlive) _splashPoints.visible = false;
}

// ============================================================
// Init — call once after terrain is ready
// ============================================================
export function initPlayer() {
  // Clean up previous mesh (HMR safety — prevents duplicate capsules)
  if (playerState.mesh) {
    scene.remove(playerState.mesh);
    playerState.mesh = null;
  }
  playerState.mesh = createPlayerMesh();

  // Spawn at island edge — washed ashore (gz -53, near right tip)
  const spawnX = 0;
  const spawnZ = -155;
  const { y: spawnY } = getSurfaceHeight(spawnX, spawnZ);
  playerState.position.set(spawnX, spawnY, spawnZ);
  playerState.surfaceY = spawnY;
  playerState.mesh.position.copy(playerState.position);

  // Face toward the camera (roughly +Z in world)
  playerState.rotation = Math.PI;
  playerState.targetRotation = Math.PI;
  playerState.mesh.rotation.y = Math.PI;

  scene.add(playerState.mesh);

  // Visible in play mode, or in dev mode if player toggle is on
  setPlayerVisible(!isDev() || !!window._devPlayerOn);

  // Bubble particles for underwater breathing
  createBubbleSystem();

  // Splash particles for water entry/exit
  createSplashSystem();
}

// ============================================================
// Set walk target — called from tap handler
// diveDepth: negative number = dive to that Y (ocean floor),
//            0 or falsy = stay at surface
// ============================================================
export function setPlayerTarget(worldX, worldZ, diveDepth) {
  if (!playerState.mesh) return;

  if (!playerState.targetPosition) {
    playerState.targetPosition = new THREE.Vector3();
  }

  const { y: surfaceY } = getSurfaceHeight(worldX, worldZ);
  playerState.targetPosition.set(worldX, surfaceY, worldZ);
  playerState.isWalking = true;

  // Dive state: negative diveDepth = dive to ocean floor
  // diveTargetY is an offset from the swim-base position (WATER_Y - 1.1)
  // with a margin so the capsule sits slightly above the floor, not clipping into it
  const shouldDive = diveDepth < 0;
  playerState.isDiving = shouldDive;
  const SWIM_BASE = WATER_Y - 1.1;   // capsule Y when surface-swimming
  const FLOOR_MARGIN = 0.3;           // keep capsule above the floor
  playerState.diveTargetY = shouldDive ? (diveDepth + FLOOR_MARGIN - SWIM_BASE) : 0;

  // Face direction of travel
  const dx = worldX - playerState.position.x;
  const dz = worldZ - playerState.position.z;
  playerState.targetRotation = Math.atan2(dx, dz);
}

// ============================================================
// Per-frame update — movement, surface, rotation, mesh sync
// ============================================================
export function updatePlayer(dt) {
  if (!playerState.mesh || !playerState.mesh.visible) return;

  // --- Surface following (before movement so speed can adapt) ---
  const { y: queriedY, hasTerrain } = getSurfaceHeight(playerState.position.x, playerState.position.z);
  playerState.surfaceY += (queriedY - playerState.surfaceY) * 0.15;
  playerState.rawSurfaceY = queriedY;  // unsmoothed — used for floor clamps
  playerState.hasTerrain = hasTerrain;

  // Three zones: land (above WADE), wading (WADE to SWIM), swimming (below SWIM)
  playerState.isWading = playerState.surfaceY < WADE_THRESHOLD && playerState.surfaceY >= SWIM_THRESHOLD;
  playerState.isSwimming = playerState.surfaceY < SWIM_THRESHOLD;

  // On land / wading: follow terrain. Swimming: float at water surface.
  const effectiveY = playerState.isSwimming ? WATER_Y : playerState.surfaceY;
  playerState.position.y = effectiveY;

  // --- Dive depth smoothing (constant speed, same for diving & surfacing) ---
  if (playerState.isSwimming) {
    const diveGap = playerState.diveTargetY - playerState.diveY;
    const verticalStep = DIVE_SPEED * dt;
    if (Math.abs(diveGap) < verticalStep) {
      playerState.diveY = playerState.diveTargetY;
    } else {
      playerState.diveY += Math.sign(diveGap) * verticalStep;
    }
    // Clamp dive offset so capsule can't go below the seabed at current position.
    // swimBaseY (WATER_Y - 1.1) + diveY = mesh Y; must stay >= floor + margin.
    // Use raw (unsmoothed) queriedY so the clamp reacts instantly to terrain changes.
    if (hasTerrain) {
      const SWIM_BASE = WATER_Y - 1.1;
      const FLOOR_MARGIN = 0.3;  // keep capsule slightly above the floor
      const minDiveY = queriedY + FLOOR_MARGIN - SWIM_BASE;
      if (playerState.diveY < minDiveY) {
        playerState.diveY = minDiveY;
      }
    }
  } else {
    // On land: reset dive state
    playerState.diveY = 0;
    playerState.diveTargetY = 0;
    playerState.isDiving = false;
  }

  // --- Movement ---
  if (playerState.isWalking && playerState.targetPosition) {
    _moveDir.set(
      playerState.targetPosition.x - playerState.position.x,
      0,
      playerState.targetPosition.z - playerState.position.z
    );
    const dist = _moveDir.length();

    if (dist < playerState.arrivalThreshold) {
      // Arrived — if diving, stay submerged; if on land, stop
      playerState.isWalking = false;
      playerState.targetPosition = null;
    } else {
      // Dive slowest, swim slower, wade/walk fastest
      const speed = playerState.isDiving ? DIVE_SPEED
        : playerState.isSwimming ? playerState.swimSpeed
        : playerState.isWading ? playerState.walkSpeed * 0.7
        : playerState.walkSpeed;
      _moveDir.normalize();
      const step = Math.min(speed * dt, dist);
      playerState.position.x += _moveDir.x * step;
      playerState.position.z += _moveDir.z * step;

      // Update facing direction continuously
      playerState.targetRotation = Math.atan2(_moveDir.x, _moveDir.z);
    }
  }

  // --- Swim boundary clamp (keep player within ~20m of island edge) ---
  if (!isDev()) {
    playerState.position.x = Math.max(-SWIM_BOUNDARY, Math.min(SWIM_BOUNDARY, playerState.position.x));
    playerState.position.z = Math.max(ISLAND_Z - SWIM_BOUNDARY, Math.min(ISLAND_Z + SWIM_BOUNDARY, playerState.position.z));
  }

  // --- Rotation (smooth shortest-arc) ---
  let rotDelta = playerState.targetRotation - playerState.rotation;
  // Normalize to [-PI, PI]
  rotDelta = ((rotDelta + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (rotDelta < -Math.PI) rotDelta += Math.PI * 2;

  const rotStep = Math.min(Math.abs(rotDelta), playerState.rotationSpeed * dt);
  playerState.rotation += rotStep * Math.sign(rotDelta);
  playerState.mesh.rotation.y = playerState.rotation;

  // --- Tilt — body angle matches movement trajectory ---
  //  State                        Angle   Condition
  //  Walking / idle / wading        0°    !isSwimming
  //  Idle float (treading)         10°    isSwimming, surface, !isWalking
  //  Surface swimming              70°    isSwimming, surface, isWalking
  //  Diving (trajectory-based)  90–170°   isSwimming, descending — angle from path to target
  //  Surfacing (flipped)     -(90–170°)   isSwimming, ascending — head-UP, angle from path
  //  Underwater swimming           90°    isSwimming, submerged, horizontal travel
  //  Underwater idle               90°    isSwimming, submerged, !isWalking
  const isSubmerged = Math.abs(playerState.diveY) > 0.3;
  const diveGapNow = playerState.diveTargetY - playerState.diveY;
  const isDiving    = diveGapNow < -0.15; // descending (diveY going more negative)
  const isSurfacing = diveGapNow > 0.15;  // ascending  (diveY going toward 0)

  let targetTilt = SURFACE_TILT;
  if (playerState.isSwimming) {
    if (isDiving || isSurfacing) {
      // Compute trajectory angle from horizontal distance + vertical distance
      // to the target. More vertical = steeper angle (toward 170°).
      // More horizontal = shallower angle (toward 90°).
      const hDist = playerState.targetPosition
        ? Math.sqrt(
            (playerState.targetPosition.x - playerState.position.x) ** 2 +
            (playerState.targetPosition.z - playerState.position.z) ** 2
          )
        : 0;
      const vDist = Math.abs(diveGapNow);
      // atan2(vertical, horizontal): 0 = pure horizontal, π/2 = pure vertical
      const trajectoryAngle = Math.atan2(vDist, hDist);
      // Map: 0 → MIN_DIVE_TILT (90°), π/2 → MAX_DIVE_TILT (170°)
      const tiltMagnitude = MIN_DIVE_TILT +
        (trajectoryAngle / (Math.PI / 2)) * (MAX_DIVE_TILT - MIN_DIVE_TILT);

      if (isSurfacing) {
        // Mirror the dive angle: π - tilt flips the pitch so head points upward
        // Dive 170° (steep down) → Surface 10° (nearly upright, head up)
        // Dive 90° (horizontal)  → Surface 90° (horizontal, unchanged)
        targetTilt = Math.PI - tiltMagnitude;
      } else {
        // Head points DOWN — positive tilt for diving
        targetTilt = tiltMagnitude;
      }
    } else if (isSubmerged && playerState.isWalking) {
      // Moving horizontally underwater — prone (90°)
      targetTilt = UNDERWATER_IDLE_TILT; // 90°, same as idle but moving
    } else if (isSubmerged) {
      // Stationary at ocean floor — prone (90°)
      targetTilt = UNDERWATER_IDLE_TILT;
    } else if (playerState.isWalking) {
      // Swimming on surface toward a target — forward lean (70°)
      targetTilt = SURFACE_SWIM_TILT;
    } else {
      // Floating stationary on surface — treading water (10°)
      targetTilt = IDLE_FLOAT_TILT;
    }
  }
  playerState.tilt += (targetTilt - playerState.tilt) * 0.08;
  // Apply tilt to the body child (first child of the group)
  const body = playerState.mesh.children[0];
  if (body) body.rotation.x = playerState.tilt;

  // --- Visual Y: bob + swim/dive offset ---
  const t = performance.now() * 0.001;

  // Compute target Y for each state
  let targetMeshY;
  if (playerState.isSwimming) {
    const waveBob = Math.sin(t * 1.5) * 0.08;
    const swimBaseY = WATER_Y - 1.1 + waveBob;
    const swimY = swimBaseY + playerState.diveY;
    if (playerState.hasTerrain) {
      targetMeshY = Math.max(swimY, playerState.rawSurfaceY + 0.3);
    } else {
      targetMeshY = swimY;
    }
  } else if (playerState.isWading) {
    // Wading: follow terrain but cap at water surface so capsule sinks smoothly
    const wadeBob = Math.sin(t * 1.8) * 0.02;
    targetMeshY = Math.min(playerState.position.y + wadeBob, WATER_Y);
  } else if (!playerState.isWalking) {
    targetMeshY = playerState.position.y + Math.sin(t * 2) * 0.03;
  } else {
    targetMeshY = playerState.position.y;
  }

  // Smooth the mesh Y to blend transitions (land → wade → swim and back)
  if (playerState.mesh.position.y === 0 && !playerState._meshYInit) {
    // First frame — snap to target
    playerState.mesh.position.y = targetMeshY;
    playerState._meshYInit = true;
  } else {
    const lerpRate = 0.12;
    playerState.mesh.position.y += (targetMeshY - playerState.mesh.position.y) * lerpRate;
  }
  playerState.mesh.position.x = playerState.position.x;
  playerState.mesh.position.z = playerState.position.z;

  // --- Splash on water surface crossing (uses final mesh Y) ---
  const feetY = playerState.mesh.position.y;   // bottom of capsule
  const isSubmergedNow = feetY <= WATER_Y;
  if (isSubmergedNow !== playerState.wasSubmerged) {
    emitSplash(playerState.mesh.position.x, playerState.mesh.position.z);
  }
  playerState.wasSubmerged = isSubmergedNow;

  // --- Underwater bubbles ---
  updateBubbles(dt);

  // --- Water splash droplets ---
  updateSplash(dt);
}

// ============================================================
// Getters
// ============================================================
export function getPlayerWorldPosition() {
  return playerState.position;
}

export function isPlayerUnderwater() {
  return playerState.isSwimming && playerState.diveY < -0.3;
}

// ============================================================
// Visibility toggle (dev/play mode)
// ============================================================
export function setPlayerVisible(visible) {
  if (playerState.mesh) {
    playerState.mesh.visible = visible;
  }
}
