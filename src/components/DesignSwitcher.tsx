"use client";

import React from "react";
import { useDesign } from "@/context/DesignContext";
import { Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function DesignSwitcher() {
  const { activeDesign, setActiveDesign } = useDesign();
  const [isOpen, setIsOpen] = useState(false);

  const totalDesigns = 25;
  const availableDesigns = [1, 2, 3]; // For now, only 3 are implemented

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex flex-col gap-2 min-w-[200px]"
          >
            <h3 className="text-sm font-semibold text-white mb-2">Select Design</h3>
            <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {Array.from({ length: totalDesigns }).map((_, i) => {
                const id = i + 1;
                const isAvailable = availableDesigns.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => isAvailable && setActiveDesign(id)}
                    disabled={!isAvailable}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all
                      ${
                        activeDesign === id
                          ? "bg-blue-500 text-white ring-2 ring-blue-300 ring-offset-2 ring-offset-transparent"
                          : isAvailable
                          ? "bg-white/20 text-white hover:bg-white/30"
                          : "bg-black/20 text-white/30 cursor-not-allowed"
                      }
                    `}
                  >
                    {id}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 ml-auto block"
      >
        <Settings2 size={24} />
      </button>
    </div>
  );
}
