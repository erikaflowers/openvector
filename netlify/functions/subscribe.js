import { checkRateLimit } from './lib/rate-limit.js'

const BUTTONDOWN_ENDPOINT = 'https://api.buttondown.com/v1/subscribers'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const ip = req.headers.get('x-forwarded-for') || req.headers.get('client-ip') || 'unknown'
  const allowed = await checkRateLimit(ip, 'subscribe', 5, 10 * 60 * 1000)
  if (!allowed) {
    return json({ error: 'Too many attempts. Try again in a few minutes.' }, 429)
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY
  if (!apiKey) {
    console.warn('subscribe: BUTTONDOWN_API_KEY is not set')
    return json({ error: 'Subscription temporarily unavailable.' }, 503)
  }

  let payload
  try {
    const body = await req.text()
    if (body.length > 2048) {
      return json({ error: 'Request too large.' }, 400)
    }
    payload = JSON.parse(body)
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }

  const { email, tag } = payload || {}
  if (typeof email !== 'string' || !email.includes('@') || email.length > 254) {
    return json({ error: 'Please enter a valid email address.' }, 400)
  }

  const tags = typeof tag === 'string' && tag.trim() ? [tag.trim()] : []

  try {
    const upstream = await fetch(BUTTONDOWN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, tags }),
    })

    if (upstream.ok) {
      return json({ success: true })
    }

    let detail = null
    try {
      detail = await upstream.json()
    } catch {
      // upstream returned non-JSON
    }

    const code = detail?.code || detail?.detail?.code
    if (upstream.status === 400 && code === 'email_already_exists') {
      return json({ success: true })
    }

    console.error('subscribe: upstream error', upstream.status, detail)
    return json({ error: 'Subscription failed.' }, 502)
  } catch (err) {
    console.error('subscribe: fetch error', err)
    return json({ error: 'Subscription failed.' }, 500)
  }
}
