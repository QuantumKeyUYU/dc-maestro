// UiSettingsContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import type { Language, ThemeMode } from './types';

interface UiSettingsContextValue {
  theme: ThemeMode;
  language: Language;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
}

const UiSettingsContext = createContext<UiSettingsContextValue | undefined>(
  undefined,
);

const THEME_KEY = 'dcmaestro.theme';
const LANGUAGE_KEY = 'dcmaestro.language';

interface ProviderProps {
  children: ReactNode;
}

export const UiSettingsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [language, setLanguageState] = useState<Language>('ru');

  // загрузка из localStorage
  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem(
        THEME_KEY,
      ) as ThemeMode | null;
      const storedLang = window.localStorage.getItem(
        LANGUAGE_KEY,
      ) as Language | null;

      if (storedTheme === 'dark' || storedTheme === 'light' || storedTheme === 'system') {
        setThemeState(storedTheme);
      }

      if (storedLang === 'ru' || storedLang === 'en') {
        setLanguageState(storedLang);
      }
    } catch {
      // молча игнорируем
    }
  }, []);

  // применение темы к html (для CSS)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      window.localStorage.setItem(THEME_KEY, mode);
    } catch {
      //
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANGUAGE_KEY, lang);
    } catch {
      //
    }
  };

  return (
    <UiSettingsContext.Provider
      value={{
        theme,
        language,
        setTheme,
        setLanguage,
      }}
    >
      {children}
    </UiSettingsContext.Provider>
  );
};

export const useUiSettings = (): UiSettingsContextValue => {
  const ctx = useContext(UiSettingsContext);
  if (!ctx) {
    throw new Error('useUiSettings must be used within UiSettingsProvider');
  }
  return ctx;
};
