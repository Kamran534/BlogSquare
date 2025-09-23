"use client";

import { useCallback, useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light-theme");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "light-theme" ? "dark-theme" : "light-theme"));
  }, []);

  return (
    <button className="btn btn-primary" onClick={toggle} aria-label="Toggle theme">
      {theme === "light-theme" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
}

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 24 }}>
      <ThemeToggle />
      <div className="surface" style={{ padding: 24 }}>
        <h1 style={{ marginBottom: 8 }}>BlogSquare</h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Themeable scaffold using CSS custom properties.
        </p>
      </div>
    </div>
  );
}
