"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full bg-page/80 backdrop-blur">
      <div className="page-container">
        <nav className="flex h-16 items-center justify-between gap-3 md:grid md:grid-cols-3 md:gap-0">
          <div className={`flex items-center gap-3 ${open ? 'md:opacity-100 opacity-0' : ''} md:justify-start`}>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="BlogSquare logo" width={32} height={32} />
              <span className="text-xl font-bold tracking-tight">BlogSquare</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-5 text-sm font-medium md:flex md:justify-center md:col-start-2">
            <Link href="/" className={`nav-underline rounded-md px-3 py-2 hover:bg-surface/60 transition-colors ${pathname === "/" ? "nav-link-active" : ""}`}>Home</Link>
            <Link href="/contact" className={`nav-underline rounded-md px-3 py-2 hover:bg-surface/60 transition-colors ${pathname === "/contact" ? "nav-link-active" : ""}`}>Contact</Link>
            <Link href="/about" className={`nav-underline rounded-md px-3 py-2 hover:bg-surface/60 transition-colors ${pathname === "/about" ? "nav-link-active" : ""}`}>About</Link>
            <Link href="/login" className={`nav-underline rounded-md px-3 py-2 hover:bg-surface/60 transition-colors ${pathname === "/login" ? "nav-link-active" : ""}`}>Login</Link>
          </div>

          <div className="flex items-center gap-2 md:justify-end md:col-start-3">
            <ThemeToggleButton />
            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-md border text-body md:hidden ${
                open
                  ? "fixed top-6 right-4 z-[60] bg-surface/50 backdrop-blur ring-1 ring-white/10 border-transparent shadow-lg"
                  : "border-ui"
              }`}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile full-screen overlay menu */}
        <div
          id="mobile-nav"
          className={`fixed inset-0 z-[55] transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } bg-page md:hidden w-screen h-screen`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <nav className="flex flex-col items-center gap-8 text-xl font-semibold text-body text-center">
              <Link href="/" onClick={() => setOpen(false)} className="nav-underline rounded-md px-8 py-3">Home</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="nav-underline rounded-md px-8 py-3">Contact</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="nav-underline rounded-md px-8 py-3">About</Link>
              <Link href="/login" onClick={() => setOpen(false)} className="nav-underline rounded-md px-8 py-3">Login</Link>
            </nav>
          </div>
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center text-xs text-muted">
            © Kamran
          </div>
        </div>
      </div>
    </header>
  );
}


