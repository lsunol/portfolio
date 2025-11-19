'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatMock } from "./ChatMock";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="neumorphic-surface flex h-16 w-16 items-center justify-center rounded-full text-2xl text-slate-600 shadow-[8px_8px_25px_rgba(163,177,198,0.55),-8px_-8px_25px_rgba(255,255,255,0.95)]"
        aria-label="Open chat"
      >
        💬
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-20 right-0 w-[min(90vw,22rem)]"
          >
            <div className="neumorphic-surface rounded-3xl border border-white/60 p-4 shadow-[15px_15px_30px_rgba(163,177,198,0.45),-15px_-15px_30px_rgba(255,255,255,0.9)]">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Chat</p>
                  <p className="text-base font-semibold text-slate-900">Conversemos</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  Close
                </button>
              </div>
              <ChatMock compact />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
