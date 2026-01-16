import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setLight: () => void;
  setDark: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Decide the first theme before rendering to avoid a flash of the wrong theme
function getInitialTheme(): Theme {
  // 1) Saved user choice
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  // 2) System preference
  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  // 3) Fallback
  return "light";
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Keep <html> & <body> in sync + persist user choice
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Clear any stale classes first
    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");

    // Apply current theme
    root.classList.add(theme);
    body.classList.add(theme);

    // Optional: helps if you use CSS variables or theming libs
    root.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      setLight: () => setTheme("light"),
      setDark: () => setTheme("dark"),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Optional dev/test toggle component
export function ThemeToggle() {
  const { theme, toggleTheme, setLight, setDark } = useTheme();
  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 p-2 rounded-xl border bg-white/80 dark:bg-gray-900/80 backdrop-blur">
      <span className="text-xs text-gray-700 dark:text-gray-300">Theme: {theme}</span>
      <button
        onClick={toggleTheme}
        className="px-2 py-1 text-xs rounded border hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Toggle
      </button>
      <button
        onClick={setLight}
        className="px-2 py-1 text-xs rounded border hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Light
      </button>
      <button
        onClick={setDark}
        className="px-2 py-1 text-xs rounded border hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Dark
      </button>
    </div>
  );
}
