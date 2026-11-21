"use client";

import React, { useEffect } from "react";

interface AdSenseBannerProps {
  slot?: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

export function AdSenseBanner({
  slot,
  format = "auto",
  className = "",
}: AdSenseBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (clientId && slot) {
      try {
        // @ts-expect-error AdSense global push
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // fail silently if ad blocker is active
      }
    }
  }, [clientId, slot]);

  // If no AdSense ID is configured in the environment, render nothing (no intrusive or fake placeholders)
  if (!clientId || !slot) {
    return null;
  }

  return (
    <div className={`my-8 text-center overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block mb-1">
        Sponsored
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
