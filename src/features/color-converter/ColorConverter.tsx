"use client";

import React, { useState, useMemo } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

export function ColorConverter() {
  const [hex, setHex] = useState("#4F46E5");
  const [alpha, setAlpha] = useState(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cleanHex = useMemo(() => {
    let h = hex.trim().replace(/^#/, "");
    if (h.length === 3) {
      h = h.split("").map((c) => c + c).join("");
    }
    if (/^[0-9a-fA-F]{6}$/.test(h)) {
      return h.toUpperCase();
    }
    return "4F46E5";
  }, [hex]);

  const { r, g, b } = useMemo(() => {
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }, [cleanHex]);

  const { h, s, l } = useMemo(() => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let hue = 0;
    let sat = 0;
    const light = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      sat = light > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm:
          hue = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          hue = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          hue = (rNorm - gNorm) / d + 4;
          break;
      }
      hue /= 6;
    }

    return {
      h: Math.round(hue * 360),
      s: Math.round(sat * 100),
      l: Math.round(light * 100),
    };
  }, [r, g, b]);

  const flutterAlphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  const flutterCode = `const Color(0x${flutterAlphaHex}${cleanHex})`;

  const formats = [
    { label: "Flutter Color", value: flutterCode, key: "flutter" },
    { label: "HEX", value: `#${cleanHex}`, key: "hex" },
    {
      label: "RGB / RGBA",
      value: alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})` : `rgb(${r}, ${g}, ${b})`,
      key: "rgb",
    },
    {
      label: "HSL / HSLA",
      value: alpha < 1 ? `hsla(${h}, ${s}%, ${l}%, ${alpha.toFixed(2)})` : `hsl(${h}, ${s}%, ${l}%)`,
      key: "hsl",
    },
  ];

  const copyVal = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // fallback
    }
  };

  const presetColors = [
    { name: "Indigo", hex: "#4F46E5" },
    { name: "Flutter Blue", hex: "#02569B" },
    { name: "Cyan", hex: "#06B6D4" },
    { name: "Emerald", hex: "#10B981" },
    { name: "Violet", hex: "#8B5CF6" },
    { name: "Rose", hex: "#F43F5E" },
    { name: "Amber", hex: "#F59E0B" },
    { name: "Slate", hex: "#0F172A" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Color Picker Card */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row items-center gap-6">
        {/* Color Swatch */}
        <div
          className="w-full md:w-48 h-36 rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner flex items-end p-3 transition-colors shrink-0"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})` }}
        >
          <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono text-xs font-bold backdrop-blur-xs">
            #{cleanHex}
          </span>
        </div>

        {/* Inputs */}
        <div className="flex-1 w-full space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Color Value (HEX):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${cleanHex}`}
                  onChange={(e) => setHex(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => setHex(e.target.value)}
                  placeholder="#4F46E5"
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                <span>Opacity / Alpha:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  {Math.round(alpha * 100)}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                className="w-full h-2 mt-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              Presets:
            </span>
            {presetColors.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setHex(p.hex)}
                className="px-2 py-0.5 rounded text-xs font-medium border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: p.hex }}
                />
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Converted Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formats.map((f) => (
          <div
            key={f.key}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between gap-3"
          >
            <div>
              <span className="text-xs text-slate-400 block font-medium">
                {f.label}
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5 block">
                {f.value}
              </span>
            </div>

            <button
              type="button"
              onClick={() => copyVal(f.value, f.key)}
              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer shrink-0"
              title={`Copy ${f.label}`}
            >
              {copiedKey === f.key ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

