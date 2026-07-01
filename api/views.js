// Vercel serverless function: increments and returns a persistent page-view count.
// Backed by Vercel KV / Upstash Redis via its REST API.
// Requires env vars KV_REST_API_URL and KV_REST_API_TOKEN (auto-added when you
// connect a KV store to the project in the Vercel dashboard).
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  // No store configured (e.g. local dev) -> report null so the widget stays hidden.
  if (!url || !token) {
    return res.status(200).json({ views: null });
  }

  try {
    const resp = await fetch(url + '/incr/pageviews', {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await resp.json();
    return res.status(200).json({ views: data.result });
  } catch (err) {
    return res.status(200).json({ views: null });
  }
}
