"use client";

import { useCallback, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === "undefined") return "light-theme";
    const stored = localStorage.getItem("theme");
    if (stored === "light-theme" || stored === "dark-theme") return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? "dark-theme" : "light-theme";
  });
  const [spinning, setSpinning] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setSpinning(true);
    setTheme((prev) => (prev === "light-theme" ? "dark-theme" : "light-theme"));
    window.setTimeout(() => setSpinning(false), 800);
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark-theme"}
      className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ui shadow-sm transition-colors duration-200 ${
        theme === "dark-theme" ? "gradient-accent text-white" : "bg-surface text-muted hover:text-body"
      }`}
      title={theme === "dark-theme" ? "Switch to light" : "Switch to dark"}
    >
      {theme === "dark-theme" ? (
        <Moon size={18} className={spinning ? "animate-spin" : ""} />
      ) : (
        <Sun size={18} className={spinning ? "animate-spin" : ""} />
      )}
    </button>
  );
}


