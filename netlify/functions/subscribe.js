import { checkRateLimit } from './lib/rate-limit.js'

const BUTTONDOWN_ENDPOINT = 'https://api.buttondown.com/v1/subscribers'

// Only tags the site's forms actually use. Anything else is dropped, so the public endpoint
// cannot be used to write arbitrary tags onto the list.
const ALLOWED_TAGS = ['zerovector', 'workflows', 'enterprise', 'founding-contributor']

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

  const cleanTag = typeof tag === 'string' ? tag.trim().toLowerCase() : ''
  const tags = ALLOWED_TAGS.includes(cleanTag) ? [cleanTag] : []

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
      // Existing subscriber: add the new tag to theirs (tags accumulate, never replace).
      if (tags.length) await addTag(apiKey, email, tags[0])
      return json({ success: true })
    }

    console.error('subscribe: upstream error', upstream.status, detail)
    return json({ error: 'Subscription failed.' }, 502)
  } catch (err) {
    console.error('subscribe: fetch error', err)
    return json({ error: 'Subscription failed.' }, 500)
  }
}

async function addTag(apiKey, email, tag) {
  const headers = { Authorization: `Token ${apiKey}`, 'Content-Type': 'application/json' }
  try {
    const lookup = await fetch(`${BUTTONDOWN_ENDPOINT}/${encodeURIComponent(email)}`, { headers })
    if (!lookup.ok) return
    const subscriber = await lookup.json()
    const existing = (subscriber.tags || []).map((t) => (typeof t === 'string' ? t : t.name || t.id || String(t)))
    if (existing.includes(tag)) return
    const patch = await fetch(`${BUTTONDOWN_ENDPOINT}/${subscriber.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ tags: [...existing, tag] }),
    })
    if (!patch.ok) console.error('subscribe: tag merge failed', patch.status)
  } catch (err) {
    console.error('subscribe: tag merge error', err)
  }
}
