// Vercel serverless function: counts unique visitors.
// Each visitor is identified by a salted SHA-256 hash of their IP + user agent
// (no raw IPs are ever stored). Hashes go into an Upstash Redis set
// ("visitors"); the returned count is the set's size, so refreshes and repeat
// visits from the same device never increment it.
// Requires env vars KV_REST_API_URL and KV_REST_API_TOKEN (auto-added when you
// connect a KV store to the project in the Vercel dashboard). Optional
// VISITOR_SALT hardens the hash.
import { createHash } from 'node:crypto';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  // No store configured (e.g. local dev) -> report null so the widget stays hidden.
  if (!url || !token) {
    return res.status(200).json({ views: null });
  }

  try {
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    const ua = String(req.headers['user-agent'] || '');
    const salt = process.env.VISITOR_SALT || 'sidakp.com-visitors';
    const id = createHash('sha256').update(ip + '|' + ua + '|' + salt).digest('hex');

    // One round trip: SADD the visitor hash, then SCARD for the unique total.
    const resp = await fetch(url + '/pipeline', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        ['SADD', 'visitors', id],
        ['SCARD', 'visitors']
      ])
    });
    const data = await resp.json();
    const count = Array.isArray(data) ? data[1] && data[1].result : null;
    return res.status(200).json({ views: typeof count === 'number' ? count : null });
  } catch (err) {
    return res.status(200).json({ views: null });
  }
}
