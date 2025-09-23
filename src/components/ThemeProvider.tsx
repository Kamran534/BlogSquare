"use client";

import { useEffect, useState, type PropsWithChildren } from "react";

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (prefersDark ? "dark-theme" : "light-theme");
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(initial);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}


