import { useState } from 'react';

/**
 * NotifyForm — Email signup via the in-repo /.netlify/functions/subscribe proxy.
 * Supports multiple tags (zerovector, enterprise, founding-contributor, etc.)
 *
 * @param {string} variant - 'dark' (white text on dark/blue bg) or 'light' (dark text on light bg)
 * @param {string} tag - Buttondown tag to apply (default: 'zerovector')
 * @param {string} [source] - where the form sits (e.g. 'lesson-end'), sent to Plausible for attribution
 * @param {string} [buttonLabel] / [successText] - copy overrides
 */
function NotifyForm({ variant = 'dark', tag = 'zerovector', source = 'page', buttonLabel = 'Get Notified', successText = "You're in. We'll let you know when it's live." }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setEmail('');
        // Plausible goal "Signup": which form, which page.
        try { window.plausible?.('Signup', { props: { tag, source, page: window.location.pathname } }); } catch { /* analytics is optional */ }
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const cls = `zv-notify zv-notify--${variant}`;

  if (status === 'success') {
    return (
      <div className={`${cls} zv-notify--success`}>
        <span className="zv-notify-check">&#10003;</span>
        <span className="zv-notify-success-text">{successText}</span>
      </div>
    );
  }

  return (
    <div className={cls}>
      <form className="zv-notify-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="zv-notify-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className="zv-notify-btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : buttonLabel}
        </button>
      </form>
      {status === 'error' && (
        <p className="zv-notify-error">{errorMessage}</p>
      )}
    </div>
  );
}

export default NotifyForm;
