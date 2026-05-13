"use client";

import { useState } from "react";
import Image from "next/image";

const CERULEAN = "#6B9FB5";

export default function NigelSection() {
  const [hovered,   setHovered]   = useState(false);
  const [imgError,  setImgError]  = useState(false);

  return (
    <div className="flex flex-col h-full" style={{ background: "#0a0a0a" }}>

      {/* Nigel image */}
      <div
        className="relative overflow-hidden flex-1"
        style={{ minHeight: "320px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!imgError ? (
          <>
            <Image
              src="/characters/nigel.png"
              alt="Nigel"
              fill
              className="object-cover object-top"
              onError={() => setImgError(true)}
              style={{
                filter: hovered
                  ? "grayscale(0%) sepia(0%) brightness(1)"
                  : "grayscale(65%) sepia(10%) brightness(0.75)",
                transition: "filter 0.8s ease",
              }}
            />
            {/* Cerulean color overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `rgba(107,159,181,0.2)`,
                mixBlendMode: "color",
                opacity: hovered ? 0 : 1,
                transition: "opacity 0.8s ease",
              }}
            />
          </>
        ) : (
          /* Fallback — CSS silhouette */
          <div
            className="absolute inset-0 flex items-end p-8"
            style={{
              background: `linear-gradient(135deg, #0d0d0d 0%, ${CERULEAN}22 100%)`,
            }}
          >
            <div>
              <p
                className="font-display font-light text-6xl"
                style={{ color: "rgba(255,255,255,0.07)" }}
              >
                Nigel
              </p>
            </div>
          </div>
        )}

        {/* Bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 45%, rgba(10,10,10,0.9) 100%)",
          }}
        />

        {/* Overlay label */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
          <p
            className="font-sans text-[8px] tracking-[0.45em] mb-1"
            style={{ color: "rgba(192,160,80,0.6)" }}
          >
            DIRECTOR DE ARTE
          </p>
          <p className="font-display text-white text-xl font-light">Nigel</p>
        </div>
      </div>

      {/* Dress code info */}
      <div
        className="p-8"
        style={{ borderTop: `0.5px solid rgba(192,160,80,0.15)` }}
      >
        <p
          className="font-sans text-[8px] tracking-[0.5em] mb-5"
          style={{ color: "rgba(192,160,80,0.55)" }}
        >
          CÓDIGO DE VESTIMENTA
        </p>

        <h3
          className="font-display font-light text-white leading-tight mb-5"
          style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}
        >
          Haute Couture
        </h3>

        {/* Cerulean rule */}
        <div
          style={{
            width: "3rem",
            height: "0.5px",
            background: `linear-gradient(to right, ${CERULEAN}, transparent)`,
            marginBottom: "1.5rem",
          }}
        />

        <blockquote
          className="font-display font-light italic leading-relaxed mb-4"
          style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.95rem" }}
        >
          &ldquo;La moda es la armadura con la que afrontamos la realidad de cada día.&rdquo;
        </blockquote>
        <cite
          className="font-sans text-[8px] tracking-[0.35em] not-italic block"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          — Nigel, Director de Arte
        </cite>

        {/* Starbucks green accent detail */}
        <div
          className="mt-6 flex items-center gap-3"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00704A" }}
          />
          <span
            className="font-sans text-[8px] tracking-[0.4em]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            ACCESSORIZE TO IMPRESS
          </span>
        </div>
      </div>
    </div>
  );
}
