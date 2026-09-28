import { useState } from 'react';

const KEY = 'ov:lastVisit';
const SESSION_KEY = 'ov:previousVisit';

// Returns the date (YYYY-MM-DD) of the visitor's previous visit, or null on a first visit.
// The value is fixed for the whole browser session, so "since your last visit" does not
// empty itself the moment the page loads. Storage can be unavailable; then it returns null.
export default function useLastVisit() {
  const [previous] = useState(() => {
    try {
      let prev = sessionStorage.getItem(SESSION_KEY);
      if (prev === null) {
        prev = localStorage.getItem(KEY) || '';
        sessionStorage.setItem(SESSION_KEY, prev);
      }
      localStorage.setItem(KEY, new Date().toISOString().slice(0, 10));
      return prev || null;
    } catch {
      return null;
    }
  });
  return previous;
}
