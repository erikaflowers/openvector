import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useUser } from './UserContext';
import { supabase } from '../lib/supabase';

const ProgressContext = createContext(null);
const STORAGE_KEY = 'ovl-progress';

function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw).completed || [] : [];
  } catch {
    return [];
  }
}

function saveLocal(completed) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed }));
}

export function ProgressProvider({ children }) {
  const { user, isLoggedIn } = useUser();
  const [completed, setCompleted] = useState(loadLocal);
  const hasSynced = useRef(false);

  // Sync with Supabase on login
  useEffect(() => {
    if (!isLoggedIn || !user?.id || !supabase) {
      hasSynced.current = false;
      return;
    }

    async function sync() {
      try {
        // Fetch server progress
        const { data: serverRows, error } = await supabase
          .from('progress')
          .select('lesson_key')
          .eq('user_id', user.id);

        if (error) {
          console.error('Progress fetch error:', error);
          return;
        }

        const serverKeys = (serverRows || []).map(r => r.lesson_key);
        const localKeys = loadLocal();

        // Merge: union of local + server
        const merged = [...new Set([...localKeys, ...serverKeys])];

        // Push any local-only keys to Supabase
        const localOnly = localKeys.filter(k => !serverKeys.includes(k));
        if (localOnly.length > 0) {
          const rows = localOnly.map(key => ({ user_id: user.id, lesson_key: key }));
          await supabase.from('progress').upsert(rows, { onConflict: 'user_id,lesson_key' });
        }

        // Update local state and storage with merged set
        saveLocal(merged);
        setCompleted(merged);
        hasSynced.current = true;
      } catch (err) {
        console.error('Progress sync error:', err);
      }
    }

    sync();
  }, [isLoggedIn, user?.id]);

  // Clear in-memory progress on sign out (keep localStorage as cache)
  useEffect(() => {
    if (!isLoggedIn) {
      setCompleted(loadLocal());
    }
  }, [isLoggedIn]);

  const markComplete = useCallback((levelSlug, lessonSlug) => {
    const key = `${levelSlug}/${lessonSlug}`;
    setCompleted(prev => {
      if (prev.includes(key)) return prev;
      const next = [...prev, key];
      saveLocal(next);
      return next;
    });

    // Fire-and-forget Supabase write
    if (supabase && user?.id) {
      supabase.from('progress')
        .upsert({ user_id: user.id, lesson_key: `${levelSlug}/${lessonSlug}` }, { onConflict: 'user_id,lesson_key' })
        .then(({ error }) => { if (error) console.error('Progress save error:', error); });
    }
  }, [user?.id]);

  const markIncomplete = useCallback((levelSlug, lessonSlug) => {
    const key = `${levelSlug}/${lessonSlug}`;
    setCompleted(prev => {
      const next = prev.filter(k => k !== key);
      saveLocal(next);
      return next;
    });

    // Fire-and-forget Supabase delete
    if (supabase && user?.id) {
      supabase.from('progress')
        .delete()
        .match({ user_id: user.id, lesson_key: `${levelSlug}/${lessonSlug}` })
        .then(({ error }) => { if (error) console.error('Progress delete error:', error); });
    }
  }, [user?.id]);

  const isComplete = useCallback((levelSlug, lessonSlug) => {
    return completed.includes(`${levelSlug}/${lessonSlug}`);
  }, [completed]);

  const getLevelProgress = useCallback((levelSlug, lessons) => {
    const total = lessons.length;
    const done = lessons.filter(l => completed.includes(`${levelSlug}/${l.slug}`)).length;
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  }, [completed]);

  return (
    <ProgressContext.Provider value={{
      progress: { completed },
      markComplete,
      markIncomplete,
      isComplete,
      getLevelProgress,
      enabled: isLoggedIn,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
