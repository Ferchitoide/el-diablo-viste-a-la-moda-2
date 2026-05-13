"use client";

import CoffeeIcon from "./CoffeeIcon";
import { EventData } from "../lib/event";

interface Props {
  recipientName: string;
  event: EventData;
  onRSVP?: () => void;
  rsvpConfirmed?: boolean;
  className?: string;
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fmtTime(s: string) {
  return (
    new Date(s).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }) + "h"
  );
}

const GOLD   = "rgba(192, 160, 80, 0.55)";
const GOLD_B = "rgba(192, 160, 80, 0.28)";
const DOTS   = Array.from({ length: 18 });

export default function VIPInvitation({
  recipientName,
  event,
  onRSVP,
  rsvpConfirmed,
  className = "max-w-xl w-full mx-auto",
}: Props) {
  return (
    <div
      className={`relative ${className} anim-fade-in d-8`}
      style={{
        background: "linear-gradient(160deg, #1c1c1c 0%, #060606 100%)",
        border: `0.5px solid ${GOLD_B}`,
      }}
    >
      {/* Red accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#E60000]" />

      <div className="px-8 sm:px-12 py-12 sm:py-16">
        {/* Top row */}
        <div className="flex justify-between items-start mb-10">
          <span
            className="font-sans text-[8px] tracking-[0.4em] uppercase"
            style={{ color: GOLD }}
          >
            Invitación exclusiva
          </span>
          <span
            className="font-sans text-[8px] tracking-[0.3em] px-3 py-1"
            style={{ border: `0.5px solid ${GOLD}`, color: GOLD }}
          >
            VIP
          </span>
        </div>

        {/* Dots */}
        <div className="flex gap-[7px] mb-10">
          {DOTS.map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
          ))}
        </div>

        {/* Recipient */}
        <div className="text-center mb-8">
          <p
            className="font-sans text-[9px] tracking-[0.4em] mb-3"
            style={{ color: GOLD }}
          >
            Para
          </p>
          <p className="font-display text-2xl sm:text-3xl tracking-wide text-white">
            {recipientName}
          </p>
          <p
            className="font-sans text-[9px] tracking-[0.35em] mt-2"
            style={{ color: GOLD }}
          >
            a la première de
          </p>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h3 className="font-display font-light text-3xl sm:text-4xl leading-tight text-white">
            EL DIABLO VISTE
            <br />A LA MODA II
          </h3>
        </div>

        {/* Divider */}
        <div
          className="mb-8"
          style={{ borderBottom: `0.5px solid rgba(255,255,255,0.08)` }}
        />

        {/* Event details */}
        <div className="space-y-4">
          {[
            { label: "Fecha",      value: fmtDate(event.date) },
            { label: "Hora",       value: fmtTime(event.date) },
            { label: "Lugar",      value: event.venue          },
            { label: "Dress Code", value: "HAUTE COUTURE"     },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-baseline gap-6">
              <span
                className="font-sans text-[8px] tracking-[0.35em] uppercase shrink-0"
                style={{ color: GOLD }}
              >
                {label}
              </span>
              <span className="font-display text-sm sm:text-base text-right capitalize text-white">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex gap-[7px] mt-10 mb-6">
          {DOTS.map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
          ))}
        </div>

        {/* Coffee icon decoration */}
        <div className="flex justify-end mb-6">
          <CoffeeIcon
            className="w-10 h-10 opacity-20"
            style={{ color: GOLD } as React.CSSProperties}
          />
        </div>

        {/* RSVP */}
        {onRSVP && (
          <div className="text-center">
            {rsvpConfirmed ? (
              <div
                className="py-4 px-8"
                style={{ border: `0.5px solid #00704A` }}
              >
                <p
                  className="font-sans text-[10px] tracking-[0.4em]"
                  style={{ color: "#00704A" }}
                >
                  ASISTENCIA CONFIRMADA ✓
                </p>
              </div>
            ) : (
              <button
                onClick={onRSVP}
                className="w-full py-4 font-sans text-[10px] tracking-[0.4em] bg-white text-black hover:bg-[#E60000] hover:text-white transition-colors duration-300"
              >
                CONFIRMAR ASISTENCIA
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
