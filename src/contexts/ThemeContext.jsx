import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { THEMES, DEFAULT_THEME } from '../content/learn/themes';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'ovl-theme';

function loadTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && THEMES[saved] ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function applyTheme(themeName) {
  const theme = THEMES[themeName];
  if (!theme) return;

  const root = document.documentElement;
  const { colors } = theme;

  root.style.setProperty('--ovl-bg', colors.bg);
  root.style.setProperty('--ovl-bg-elevated', colors.bgElevated);
  root.style.setProperty('--ovl-bg-surface', colors.bgSurface);
  root.style.setProperty('--ovl-bg-hover', colors.bgHover);
  root.style.setProperty('--ovl-text', colors.text);
  root.style.setProperty('--ovl-text-secondary', colors.textSecondary);
  root.style.setProperty('--ovl-text-tertiary', colors.textTertiary);
  root.style.setProperty('--ovl-accent', colors.accent);
  root.style.setProperty('--ovl-accent-hover', colors.accentHover);
  root.style.setProperty('--ovl-accent-subtle', colors.accentSubtle);
  root.style.setProperty('--ovl-accent-medium', colors.accentMedium);
  root.style.setProperty('--ovl-border', colors.border);
  root.style.setProperty('--ovl-border-strong', colors.borderStrong);
  root.style.setProperty('--ovl-success', colors.success);
  root.style.setProperty('--ovl-nav-bg', colors.navBg);

  // Set body background directly for full-bleed coverage
  document.body.style.background = colors.bg;
  document.body.style.color = colors.text;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(loadTheme);

  // Apply theme on mount
  useEffect(() => {
    applyTheme(theme);
  }, []);

  const setTheme = useCallback((newTheme) => {
    if (!THEMES[newTheme]) return;
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
