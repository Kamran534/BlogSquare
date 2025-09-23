"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-6rem)] flex items-center py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ui px-3 py-1 text-xs text-muted">
              <span className="h-2 w-2 rounded-full gradient-accent" />
              AI-powered blogging for everyone
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Share ideas faster with <span className="text-[var(--accent)]">intelligent tools</span>
            </h1>
            <p className="mt-4 max-w-prose text-base text-muted sm:text-lg">
              Draft, edit, and publish beautiful posts in minutes. Let smart
              suggestions help you find the right words while you stay in
              control.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors gradient-accent hover:brightness-110"
              >
                Get started
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-ui bg-surface px-5 py-2.5 text-sm font-medium text-body hover:bg-surface/70"
              >
                Learn more
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-6 text-xs text-muted">
              <div>No credit card required</div>
              <div className="h-1 w-1 rounded-full gradient-accent" />
              <div>Free tier available</div>
            </div>
          </div>

          <div className="hidden md:block">
            <CardStack />
          </div>
        </div>

        {/* Global centered category bar synced with cards */}
        <div className="mt-6 flex w-full items-center justify-center">
          <CategoryBar />
        </div>
      </div>
    </section>
  );
}

function CardStack() {
  // Use five cards for top categories
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const [outIndex, setOutIndex] = useState<number | null>(null);

  // Visual variants for unique card colors
  const mediaVariants = useMemo(
    () => [
      "gradient-card-1",
      "gradient-card-2",
      "gradient-card-3",
      "gradient-card-4",
      "gradient-card-5",
    ],
    []
  );

  // Representative images per category (royalty-free/stock sources)
  const images = useMemo(
    () => [
      {
        alt: "Technology",
        url:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
      },
      {
        alt: "Design",
        url:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
      },
      {
        alt: "Product",
        url:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      },
      {
        alt: "Culture",
        url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      },
      {
        alt: "Tutorials",
        url:
          "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    []
  );

  // Broadcast current active index to the global category bar
  const dispatchActive = (index: number) => {
    if (typeof window !== "undefined") {
      // Defer to next frame to avoid cross-render setState warnings
      window.requestAnimationFrame(() => {
        window.dispatchEvent(
          new CustomEvent("heroActiveCategory", { detail: { index } })
        );
      });
    }
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    // announce initial active (deferred)
    dispatchActive(order[0]);

    const intervalId = setInterval(() => {
      setOutIndex(order[0]);
      setTimeout(() => {
        setOrder((prev) => {
          const [first, ...rest] = prev;
          const nextOrder = [...rest, first];
          dispatchActive(nextOrder[0]);
          return nextOrder;
        });
        setOutIndex(null);
      }, 700);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [order]);

  return (
    <div className="cards-column" style={{ height: "22rem" }}>
      <ul className="cards">
        {[0, 1, 2, 3, 4].map((id) => {
          const position = order.indexOf(id);
          const isCurrent = position === 0;
          const isNext = position === 1;
          const isOut = outIndex === id;
          const classes = [
            "card",
            isCurrent ? "card--current" : "",
            isNext ? "card--next" : "",
            isOut ? "card--out" : "",
            !isCurrent && !isNext ? "card--back" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={id} className={classes}>
              <div className={`card-media`} style={{ height: "18rem" }}>
                <img src={images[id].url} alt={images[id].alt} />
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
}

function CategoryBar() {
  const categories = useMemo(
    () => ["Technology", "Design", "Product", "Culture", "Tutorials"],
    []
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ index: number }>;
      if (typeof custom.detail?.index === "number") {
        setActive(custom.detail.index);
      }
    };
    window.addEventListener("heroActiveCategory", handler as EventListener);
    return () => window.removeEventListener("heroActiveCategory", handler as EventListener);
  }, []);

  return (
    <div className="chip-bar">
      {categories.map((name, idx) => (
        <span key={name} className={["chip", active === idx ? "chip--active" : ""].join(" ")}>{name}</span>
      ))}
    </div>
  );
}


