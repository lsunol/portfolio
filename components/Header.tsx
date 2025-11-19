'use client';

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Ask Me", href: "#ask-me" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-1/2 top-4 z-40 w-full max-w-5xl -translate-x-1/2 px-4">
      <div className="blurred-panel flex items-center justify-between rounded-full border border-white/60 px-6 py-3 shadow-[10px_10px_30px_rgba(163,177,198,0.45),-10px_-10px_30px_rgba(255,255,255,0.9)]">
        <Link href="#hero" className="text-lg font-semibold text-slate-900">
          Lluís Suñol
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-6 rounded-full bg-slate-900" />
            <span className="h-0.5 w-6 rounded-full bg-slate-900" />
            <span className="h-0.5 w-6 rounded-full bg-slate-900" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-3 rounded-3xl border border-white/50 bg-white/90 p-4 text-sm font-semibold shadow-[10px_10px_25px_rgba(163,177,198,0.45),-10px_-10px_25px_rgba(255,255,255,0.9)] md:hidden"
          >
            <ul className="flex flex-col gap-3 text-slate-600">
              {links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-2xl px-3 py-2 transition-colors hover:bg-slate-900/5 hover:text-slate-900"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
