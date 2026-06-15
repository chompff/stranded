// ============================================================
// WEATHER SYNC — mirror the user's REAL local weather
// ============================================================
// Companion to the device-clock day/night sync: the island's sky reflects the
// player's actual sky. Talks to our own /api/weather proxy (same origin — no
// third-party service, no API key): the proxy resolves location from Vercel's
// free IP-geo headers and caches Open-Meteo by location cell, so cost scales
// with places, not players. See api/weather.js.
//
// OFFLINE-SAFE: any failure, or the proxy's { mode: 'markov' } signal (kill
// switch / no geo / upstream limit), silently leaves the Markov chain running
// as the fallback and retries later. A wallpaper must never break. The only
// timer is the refresh poll — no per-frame work.
// ============================================================

import {
  weatherSyncTo,
  WEATHER_CLEAR, WEATHER_CLOUDY, WEATHER_MIST, WEATHER_RAIN,
} from './weather.js';

const API_URL    = '/api/weather';
const REFRESH_MS = 30 * 60 * 1000;   // re-check real weather every 30 min
const RETRY_MS   = 5  * 60 * 1000;   // sooner retry after a failed / not-yet fetch

let _timer = null;
let _active = false;

// WMO weather code (Open-Meteo) → game weather state.
// Snow/ice fall back to Mist — there's no snow visual on a palm island.
function wmoToState(code) {
  if (code <= 1) return WEATHER_CLEAR;                 // 0 clear, 1 mainly clear
  if (code === 2 || code === 3) return WEATHER_CLOUDY; // partly cloudy / overcast
  if (code === 45 || code === 48) return WEATHER_MIST; // fog
  if (code >= 71 && code <= 77) return WEATHER_MIST;   // snow / snow grains
  if (code === 85 || code === 86) return WEATHER_MIST; // snow showers
  return WEATHER_RAIN; // drizzle 51–57, rain 61–67, showers 80–82, thunder 95–99
}

async function fetchState() {
  const res = await fetch(API_URL, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error('weather ' + res.status);
  const j = await res.json();
  // Anything but a numeric code (incl. { mode:'markov' }) → stay on Markov.
  if (!j || typeof j.code !== 'number') throw new Error('markov');
  return wmoToState(j.code);
}

async function poll() {
  if (!_active) return;
  let nextMs = REFRESH_MS;
  try {
    const state = await fetchState();
    if (_active) weatherSyncTo(state);
  } catch (e) {
    // Stay on the Markov fallback and try again soon.
    nextMs = RETRY_MS;
  }
  if (_active) _timer = setTimeout(poll, nextMs);
}

/** Begin mirroring real local weather (idempotent). */
export function weatherSyncStart() {
  if (_active) return;
  _active = true;
  poll();   // first check immediately; the Markov chain runs until it returns
}

/** Stop mirroring (the caller picks the next mode: Auto or a fixed sky). */
export function weatherSyncStop() {
  _active = false;
  if (_timer) { clearTimeout(_timer); _timer = null; }
}
