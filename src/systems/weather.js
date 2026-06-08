// ============================================================
// WEATHER SYSTEM — Markov chain state machine with tropical biases
// ============================================================
// States: 0=Clear, 1=Cloudy, 2=Mist, 3=Rain
// Transitions use a Markov chain with time-of-day bias nudges.
// Durations are real-world minutes. Everything runs on the real clock.
// ============================================================

// --- Weather state IDs ---
export const WEATHER_CLEAR  = 0;
export const WEATHER_CLOUDY = 1;
export const WEATHER_MIST   = 2;
export const WEATHER_RAIN   = 3;
export const WEATHER_NAMES  = ['Clear', 'Cloudy', 'Mist', 'Rain'];

// --- Markov transition matrix ---
// Row = current state, columns = [Clear, Cloudy, Mist, Rain]
// Designed to produce ~55% clear, 25% cloudy, 10% mist, 10% rain steady-state
const TRANSITION_MATRIX = [
  // From Clear →
  [0.50, 0.35, 0.10, 0.05],
  // From Cloudy →
  [0.35, 0.30, 0.10, 0.25],
  // From Mist →
  [0.40, 0.30, 0.15, 0.15],
  // From Rain →
  [0.25, 0.45, 0.20, 0.10],
];

// --- Duration ranges per state (in real-world SECONDS) ---
// Clear:  45–180 min,  Cloudy: 30–120 min,  Mist: 15–45 min,  Rain: 8–25 min
const DURATION_RANGES = [
  [45 * 60,  180 * 60],   // Clear
  [30 * 60,  120 * 60],   // Cloudy
  [15 * 60,   45 * 60],   // Mist
  [ 8 * 60,   25 * 60],   // Rain
];

// --- Time-of-day bias multipliers ---
// Each entry: [hourStart, hourEnd, biasPerState]
// Biases are multiplied into the transition row then re-normalized.
const TIME_BIASES = [
  { start: 5,  end: 8,  bias: [1.0, 1.0, 1.5, 0.5] },  // Morning: more mist, less rain
  { start: 12, end: 17, bias: [1.0, 1.0, 0.6, 1.4] },  // Afternoon: more rain, less mist
  { start: 18, end: 20, bias: [1.3, 1.0, 1.0, 0.7] },  // Evening: more clear (golden hour)
  // Night (21–05): no bias — all neutral (1.0)
];

// --- Visual transition duration (seconds) ---
const TRANSITION_DURATION_MIN = 30;
const TRANSITION_DURATION_MAX = 60;

// --- Seeded PRNG (mulberry32) for reproducible offline catch-up ---
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// ============================================================
// Weather state object — the single source of truth
// ============================================================
export const weatherState = {
  current: WEATHER_CLEAR,       // Active weather state ID
  timeRemaining: 0,             // Seconds left in current state
  transitioning: false,         // True during visual crossfade
  transitionFrom: WEATHER_CLEAR,// State we're fading FROM
  transitionTo: WEATHER_CLEAR,  // State we're fading TO
  transitionProgress: 0,        // 0→1 progress through crossfade
  transitionDuration: 0,        // Total crossfade duration (seconds)
  seed: Date.now(),             // RNG seed for reproducibility
  devOverride: -1,              // -1 = auto, 0-3 = forced state (dev mode)
  initialized: false,
};

// Internal RNG instance — created from seed
let _rng = mulberry32(weatherState.seed);

// ============================================================
// Helpers
// ============================================================

/** Get current real-world hour as float (0–24) */
function getCurrentHour() {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

/** Get time-of-day bias array for the current hour */
function getTimeBias(hour) {
  for (const tb of TIME_BIASES) {
    if (hour >= tb.start && hour < tb.end) return tb.bias;
  }
  return [1.0, 1.0, 1.0, 1.0]; // neutral
}

/** Pick next state using Markov chain + time-of-day bias */
function rollNextState(fromState) {
  const row = TRANSITION_MATRIX[fromState].slice(); // copy
  const bias = getTimeBias(getCurrentHour());

  // Apply bias multipliers
  for (let i = 0; i < 4; i++) row[i] *= bias[i];

  // Normalize to sum = 1
  const sum = row[0] + row[1] + row[2] + row[3];
  for (let i = 0; i < 4; i++) row[i] /= sum;

  // Weighted random pick
  const r = _rng();
  let cumulative = 0;
  for (let i = 0; i < 4; i++) {
    cumulative += row[i];
    if (r < cumulative) return i;
  }
  return 0; // fallback
}

/** Pick a random duration for a state (in seconds) */
function rollDuration(state) {
  const [min, max] = DURATION_RANGES[state];
  return min + _rng() * (max - min);
}

/** Pick a random transition crossfade duration (in seconds) */
function rollTransitionDuration() {
  return TRANSITION_DURATION_MIN + _rng() * (TRANSITION_DURATION_MAX - TRANSITION_DURATION_MIN);
}

// ============================================================
// Callbacks — set by main.js to wire into the visual system
// ============================================================
let _onStateChange = null;     // (fromState, toState) → called when transition starts
let _onTransitionTick = null;  // (fromState, toState, progress) → called each frame during crossfade
let _onTransitionEnd = null;   // (newState) → called when crossfade finishes

export function weatherSetCallbacks({ onStateChange, onTransitionTick, onTransitionEnd }) {
  _onStateChange = onStateChange || null;
  _onTransitionTick = onTransitionTick || null;
  _onTransitionEnd = onTransitionEnd || null;
}

// ============================================================
// Init — call once at startup (optionally with saved state)
// ============================================================
export function weatherInit(saved) {
  if (saved) {
    weatherState.current = saved.current ?? WEATHER_CLEAR;
    weatherState.timeRemaining = saved.timeRemaining ?? rollDuration(weatherState.current);
    weatherState.seed = saved.seed ?? Date.now();
    weatherState.devOverride = saved.devOverride ?? -1;
  } else {
    weatherState.current = WEATHER_CLEAR;
    weatherState.timeRemaining = rollDuration(WEATHER_CLEAR);
    weatherState.seed = Date.now();
  }
  _rng = mulberry32(weatherState.seed);
  weatherState.transitioning = false;
  weatherState.transitionProgress = 0;
  weatherState.initialized = true;
}

// ============================================================
// Update — call every frame from the animation loop
// dt = seconds since last frame
// ============================================================
export function weatherUpdate(dt) {
  if (!weatherState.initialized) return;

  // Dev override freezes weather on a single state
  if (weatherState.devOverride >= 0) return;

  // --- Handle active crossfade ---
  if (weatherState.transitioning) {
    weatherState.transitionProgress += dt / weatherState.transitionDuration;
    if (weatherState.transitionProgress >= 1.0) {
      // Crossfade complete
      weatherState.transitionProgress = 1.0;
      weatherState.transitioning = false;
      weatherState.current = weatherState.transitionTo;
      if (_onTransitionEnd) _onTransitionEnd(weatherState.current);
    } else {
      if (_onTransitionTick) {
        _onTransitionTick(
          weatherState.transitionFrom,
          weatherState.transitionTo,
          weatherState.transitionProgress
        );
      }
    }
    return; // don't tick timer during crossfade
  }

  // --- Tick down current state duration ---
  weatherState.timeRemaining -= dt;
  if (weatherState.timeRemaining <= 0) {
    // Time's up — roll next state and start crossfade
    const nextState = rollNextState(weatherState.current);
    _startTransition(weatherState.current, nextState);
  }
}

/** Internal: begin a crossfade from one state to another */
function _startTransition(fromState, toState) {
  weatherState.transitionFrom = fromState;
  weatherState.transitionTo = toState;
  weatherState.transitionProgress = 0;
  weatherState.transitionDuration = rollTransitionDuration();
  weatherState.transitioning = true;

  // Pre-roll the duration for the next state so it's ready when crossfade ends
  weatherState.timeRemaining = rollDuration(toState);

  // Advance the seed so offline catch-up stays in sync
  weatherState.seed = Math.floor(_rng() * 2147483647);

  if (_onStateChange) _onStateChange(fromState, toState);
}

// ============================================================
// Offline catch-up — simulate elapsed time while player was away
// Returns array of weather events that happened for the summary screen
// ============================================================
export function weatherCatchUp(elapsedSeconds) {
  if (elapsedSeconds <= 0) return [];

  // Re-seed RNG from saved seed for deterministic replay
  _rng = mulberry32(weatherState.seed);

  const events = [];
  let remaining = elapsedSeconds;
  let current = weatherState.current;
  let stateTimeLeft = weatherState.timeRemaining;

  while (remaining > 0) {
    if (stateTimeLeft <= remaining) {
      // This state expired during the absence
      remaining -= stateTimeLeft;
      const next = rollNextState(current);
      // Include transition duration in elapsed time
      const transDur = rollTransitionDuration();
      remaining -= transDur;
      events.push({ from: current, to: next, type: 'transition' });
      if (next === WEATHER_RAIN) {
        events.push({ state: WEATHER_RAIN, type: 'rain' });
      }
      current = next;
      stateTimeLeft = rollDuration(current);
    } else {
      // Current state survives the absence
      stateTimeLeft -= remaining;
      remaining = 0;
    }
  }

  // Update state to wherever the simulation landed
  weatherState.current = current;
  weatherState.timeRemaining = Math.max(stateTimeLeft, 0);
  weatherState.seed = Math.floor(_rng() * 2147483647);
  weatherState.transitioning = false;
  weatherState.transitionProgress = 0;

  return events;
}

// ============================================================
// Dev helpers
// ============================================================
export function weatherForceState(stateId) {
  if (stateId < 0) {
    // Resume auto
    weatherState.devOverride = -1;
    weatherState.timeRemaining = rollDuration(weatherState.current);
    weatherState.transitioning = false;
    return;
  }
  weatherState.devOverride = stateId;
  weatherState.current = stateId;
  weatherState.transitioning = false;
  weatherState.transitionProgress = 0;
}

// ============================================================
// Serialization — for save/load
// ============================================================
export function weatherSave() {
  return {
    current: weatherState.current,
    timeRemaining: weatherState.timeRemaining,
    seed: weatherState.seed,
    devOverride: weatherState.devOverride,
  };
}
