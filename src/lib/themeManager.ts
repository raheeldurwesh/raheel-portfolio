'use client';

export interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  primaryRGB: string;
  secondary: string;
  secondaryRGB: string;
  previewBg: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'indigo',
    name: 'Modern Indigo',
    primary: '#6366F1',
    primaryRGB: '99, 102, 241',
    secondary: '#8B5CF6',
    secondaryRGB: '139, 92, 246',
    previewBg: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  },
  {
    id: 'rose',
    name: 'Rose Sunset',
    primary: '#F43F5E',
    primaryRGB: '244, 63, 94',
    secondary: '#8B5CF6',
    secondaryRGB: '139, 92, 246',
    previewBg: 'linear-gradient(135deg, #F43F5E, #8B5CF6)',
  },
  {
    id: 'emerald',
    name: 'Emerald Minimal',
    primary: '#10B981',
    primaryRGB: '16, 185, 129',
    secondary: '#06B6D4',
    secondaryRGB: '6, 182, 212',
    previewBg: 'linear-gradient(135deg, #10B981, #06B6D4)',
  },
  {
    id: 'blue',
    name: 'Electric Blue',
    primary: '#2563EB',
    primaryRGB: '37, 99, 235',
    secondary: '#06B6D4',
    secondaryRGB: '6, 182, 212',
    previewBg: 'linear-gradient(135deg, #2563EB, #06B6D4)',
  },
  {
    id: 'cyan',
    name: 'Cyberpunk Cyan',
    primary: '#06B6D4',
    primaryRGB: '6, 182, 212',
    secondary: '#3B82F6',
    secondaryRGB: '59, 130, 246',
    previewBg: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
  },
];

export function applyTheme(themeId: string) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-rgb', theme.primaryRGB);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-secondary-rgb', theme.secondaryRGB);

    localStorage.setItem('portfolio_theme', theme.id);
  }
}

export function loadSavedTheme(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved && THEMES.some((t) => t.id === saved)) {
      applyTheme(saved);
      return saved;
    }
  }
  applyTheme(THEMES[0].id);
  return THEMES[0].id;
}
