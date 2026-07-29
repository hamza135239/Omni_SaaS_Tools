"use client";

import React from "react";

interface AdUnitProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "leaderboard";
  style?: React.CSSProperties;
  className?: string;
  position?: number;
}

export function AdUnit({
  slot = "1234567890",
  format = "auto",
  style,
  className = "",
  position,
}: AdUnitProps) {
  return (
    <div className={`w-full my-4 text-center overflow-hidden min-h-[90px] flex items-center justify-center ${className}`}>
      {/* Clean Production Google AdSense Ins Tag */}
      <ins
        className="adsbygoogle"
        style={style || { display: "block", minHeight: "90px" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function HeaderAd() {
  return <AdUnit slot="1000000001" format="leaderboard" className="max-w-7xl mx-auto" />;
}

export function FooterAd() {
  return <AdUnit slot="1000000002" format="leaderboard" className="max-w-7xl mx-auto" />;
}

export function SidebarAd({ position }: { position?: number }) {
  return <AdUnit slot="2000000001" format="rectangle" className="w-full" position={position} />;
}

export function InArticleAd({ position }: { position?: number }) {
  return <AdUnit slot="3000000001" format="fluid" className="w-full my-6" position={position} />;
}
