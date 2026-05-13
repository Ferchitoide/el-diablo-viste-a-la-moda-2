"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  imageSrc: string;
  name: string;
  displayName: string;
  message: string;
  objectPosition?: string;
}

/* ─────────────────────────────────────────────────────────
   CSS Editorial Art — luxury magazine spread fallback
───────────────────────────────────────────────────────── */
function EditorialArt({
  displayName,
  message,
}: {
  displayName: string;
  message: string;
}) {
  return (
    <div
      className="relative w-full flex flex-col justify-between overflow-hidden select-none"
      style={{ height: "92vh", background: "#050505" }}
    >
      {/* Diagonal watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: "rotate(-10deg)" }}
      >
        <span
          className="font-display font-light whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem,22vw,20rem)",
            color: "rgba(255,255,255,0.022)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          HAUTE COUTURE
        </span>
      </div>

      {/* Left red accent */}
      <div
        className="absolute"
        style={{
          left: "2.25rem",
          top: "18%",
          height: "52%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent 0%, #E60000 15%, #E60000 85%, transparent 100%)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-start px-12 sm:px-20 pt-10 sm:pt-14">
        <span
          className="font-sans text-[8px] tracking-[0.55em] uppercase"
          style={{ color: "rgba(192,160,80,0.45)" }}
        >
          El Diablo Viste a la Moda II
        </span>
        <span
          className="font-display font-light text-sm"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          No. II
        </span>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-12 sm:px-20 pl-16 sm:pl-24">
        <p
          className="font-sans text-[9px] tracking-[0.55em] mb-8"
          style={{ color: "rgba(192,160,80,0.5)" }}
        >
          INVITACIÓN EXCLUSIVA
        </p>
        <h2
          className="font-display font-light leading-[0.82] tracking-tight mb-8"
          style={{ fontSize: "clamp(4rem,14vw,10.5rem)", color: "#FFFFFF" }}
        >
          {displayName}
        </h2>
        <div
          style={{
            width: "5rem",
            height: "0.5px",
            background: "linear-gradient(to right, rgba(192,160,80,0.6), transparent)",
            marginBottom: "2rem",
          }}
        />
        <p
          className="font-display font-light italic leading-relaxed max-w-sm"
          style={{ fontSize: "clamp(1rem,1.5vw,1.2rem)", color: "rgba(255,255,255,0.4)" }}
        >
          {message}
        </p>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-10 flex justify-between items-center px-12 sm:px-20 py-6"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <span className="font-sans text-[8px] tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.12)" }}>
          TEMPORADA 2026
        </span>
        <span style={{ color: "rgba(226,0,0,0.55)", fontSize: "1.5rem" }}>✦</span>
        <span className="font-sans text-[8px] tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.12)" }}>
          PRADA · VOGUE · RUNWAY
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main — real image with cinematic overlay + CSS filters.
   Grayscale + cerulean tint lifts on hover (desktop).
───────────────────────────────────────────────────────── */
export default function CharacterHero({ imageSrc, name, displayName, message, objectPosition = "center top" }: Props) {
  const [imgError, setImgError] = useState(false);
  const [hovered,  setHovered]  = useState(false);

  if (imgError) {
    return <EditorialArt displayName={displayName} message={message} />;
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "92vh" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Character image */}
      <Image
        src={imageSrc}
        alt={name}
        fill
        className="object-cover"
        priority
        onError={() => setImgError(true)}
        style={{
          objectPosition,
          filter: hovered
            ? "grayscale(0%) sepia(0%) brightness(1)"
            : "grayscale(55%) sepia(12%) brightness(0.82)",
          transition: "filter 0.85s ease",
        }}
      />

      {/* Cerulean tint overlay — dissolves on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(107,159,181,0.22)",
          mixBlendMode: "color",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.85s ease",
        }}
      />

      {/* Cinematic gradient — bottom fade to black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.94) 88%, #000 100%)",
        }}
      />

      {/* Left red accent line */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "2.25rem",
          top: "18%",
          height: "45%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent 0%, #E60000 15%, #E60000 85%, transparent 100%)",
        }}
      />

      {/* Top badge */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-10 sm:px-20 pt-10 pointer-events-none">
        <span
          className="font-sans text-[8px] tracking-[0.5em] uppercase"
          style={{ color: "rgba(192,160,80,0.65)" }}
        >
          Invitación exclusiva
        </span>
        <span className="font-display font-light text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          No. II
        </span>
      </div>

      {/* Hover hint */}
      <div
        className="absolute top-6 right-10 sm:right-20 flex items-center gap-2 pointer-events-none"
        style={{
          opacity: hovered ? 0 : 0.5,
          transition: "opacity 0.5s ease",
          transitionDelay: hovered ? "0s" : "1.5s",
        }}
      >
        <div className="w-3 h-3 rounded-full border border-white/40 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white/60" />
        </div>
        <span className="font-sans text-[7px] tracking-[0.35em] text-white/40">HOVER</span>
      </div>

      {/* Bottom text overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-10 sm:px-20 pb-14 pl-14 sm:pl-24 pointer-events-none">
        <h2
          className="font-display font-light leading-[0.84] tracking-tight mb-6 text-white"
          style={{ fontSize: "clamp(3.5rem,12vw,9rem)" }}
        >
          {displayName}
        </h2>
        <div
          style={{
            width: "4rem",
            height: "0.5px",
            background: "linear-gradient(to right, rgba(192,160,80,0.7), transparent)",
            marginBottom: "1.5rem",
          }}
        />
        <p
          className="font-display font-light italic max-w-md"
          style={{ fontSize: "clamp(1rem,1.4vw,1.15rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
