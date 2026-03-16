const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
};

/**
 * Check + increment rate limit using Supabase rate_limits table.
 * Returns true if under limit, false if rate limited.
 *
 * Uses an RPC function for atomic check-and-increment.
 * Falls back to allowing requests if Supabase is unavailable.
 *
 * @param {string} ip - Client IP address
 * @param {string} endpoint - e.g. 'chat', 'quiz', 'learn-chat'
 * @param {number} limit - Max requests per window
 * @param {number} windowMs - Window size in milliseconds
 */
export async function checkRateLimit(ip, endpoint, limit, windowMs) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return true;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/check_rate_limit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        p_ip: ip,
        p_endpoint: endpoint,
        p_limit: limit,
        p_window_ms: windowMs,
      }),
    });

    if (!res.ok) return true; // fail open

    const result = await res.json();
    return result === true;
  } catch {
    return true; // fail open
  }
}
