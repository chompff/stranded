// ============================================================
// /api/weather — real-weather proxy (Vercel serverless, Node)
// ============================================================
// Resolves the requester's coarse location from Vercel's FREE IP-geo headers
// (no third-party geo service, no API key), fetches Open-Meteo, and caches the
// result by location CELL — so upstream calls scale with the number of distinct
// places, not the number of wallpapers. A whole city collapses to one upstream
// call per refresh window.
//
// Returns { code } (a WMO weather code the client maps to a sky), or
// { mode: 'markov' } whenever real weather isn't available — kill switch,
// no geo, or upstream down/rate-limited. The client treats anything but a
// numeric `code` as "keep running the Markov chain", so this can never break
// the wallpaper and can never cost money: Open-Meteo's free tier is a hard cap
// (not metered), and on Vercel's Hobby plan overages throttle rather than bill.
//
// ── KILL SWITCH ─────────────────────────────────────────────
// Set env  WEATHER_SYNC=off  in the Vercel project and redeploy → every
// wallpaper worldwide falls back to Markov instantly, zero upstream calls.
// Unset (or any value but "off") = real-weather sync on. No env var needed for
// normal operation.
// ============================================================

const WX_URL = 'https://api.open-meteo.com/v1/forecast';
const TTL_MS = 30 * 60 * 1000;  // cache each location cell for 30 min
const CELL   = 0.5;             // ~55 km grid — collapses a city to one upstream call

// Module-level cache: persists across requests on a warm instance. Different
// instances keep their own copy, so upstream calls ≈ (instances × cells / TTL)
// — still tiny, and it self-balances (low traffic = cold = few calls anyway).
const _cache = new Map();       // "lat,lon" → { code, exp }

const snap = (n) => Math.round(n / CELL) * CELL;
const markov = (res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ mode: 'markov' });
};

export default async function handler(req, res) {
  // Global kill switch.
  if (process.env.WEATHER_SYNC === 'off') return markov(res);

  const lat = parseFloat(req.headers['x-vercel-ip-latitude']);
  const lon = parseFloat(req.headers['x-vercel-ip-longitude']);
  // No geo (local dev, bots, privacy proxies) → let the client run Markov.
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return markov(res);

  const key = `${snap(lat)},${snap(lon)}`;
  const now = Date.now();
  const hit = _cache.get(key);
  if (hit && hit.exp > now) {
    res.setHeader('Cache-Control', 'private, max-age=600');
    return res.status(200).json({ code: hit.code, cached: true });
  }

  try {
    const url = `${WX_URL}?latitude=${snap(lat)}&longitude=${snap(lon)}&current=weather_code`;
    const r = await fetch(url);
    if (!r.ok) throw new Error('wx ' + r.status);
    const j = await r.json();
    const code = j && j.current && j.current.weather_code;
    if (!Number.isFinite(code)) throw new Error('wx: no code');
    _cache.set(key, { code, exp: now + TTL_MS });
    res.setHeader('Cache-Control', 'private, max-age=600');
    return res.status(200).json({ code });
  } catch (e) {
    // Upstream down or free cap hit → Markov fallback; client retries later.
    return markov(res);
  }
}
