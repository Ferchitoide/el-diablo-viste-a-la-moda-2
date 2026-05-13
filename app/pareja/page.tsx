"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession } from "../lib/auth";
import {
  getEventData,
  confirmRSVP,
  saveCoffeeOrder,
  type EventData,
} from "../lib/event";
import CharacterHero from "../components/CharacterHero";
import Countdown     from "../components/Countdown";
import VIPInvitation from "../components/VIPInvitation";
import NigelSection  from "../components/NigelSection";
import DrinkSelector from "../components/DrinkSelector";
import CoffeeIcon    from "../components/CoffeeIcon";
import Ticker        from "../components/Ticker";

const CERULEAN = "#6B9FB5";

export default function ParejaPage() {
  const router = useRouter();
  const [ready,       setReady]       = useState(false);
  const [event,       setEvent]       = useState<EventData | null>(null);
  const [rsvpDone,    setRsvpDone]    = useState(false);
  const [coffeeOrder, setCoffeeOrder] = useState("");

  useEffect(() => {
    const s = getSession();
    if (s !== "pareja" && s !== "admin") { router.replace("/"); return; }
    getEventData().then((data) => {
      setEvent(data);
      setRsvpDone(data.rsvpPareja);
      setCoffeeOrder(data.coffeeOrders.pareja);
      setReady(true);
    });
  }, [router]);

  const handleRSVP  = async () => { await confirmRSVP("pareja"); setRsvpDone(true); };
  const handleDrink = async (d: string) => { setCoffeeOrder(d); await saveCoffeeOrder("pareja", d); };

  if (!ready || !event) return null;

  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* ── Header ── */}
      <header
        className="px-6 sm:px-10 py-4 flex justify-between items-center anim-fade-in"
        style={{ borderBottom: "0.5px solid black" }}
      >
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-stone-400">
          El Diablo Viste a la Moda II
        </span>
        <button
          onClick={() => { clearSession(); router.push("/"); }}
          className="font-sans text-[9px] tracking-[0.35em] text-stone-400 hover:text-black transition-colors"
        >
          ← SALIR
        </button>
      </header>

      {/* ── 1. CHARACTER HERO — Andy focus ── */}
      <CharacterHero
        imageSrc="/characters/ensemble.png"
        name="Andy Sachs"
        displayName="Celeste"
        message={event.parejaMessage}
        objectPosition="75% top"
      />

      {/* ── 2. COUNTDOWN — cerulean blue ── */}
      <section className="px-6 sm:px-12 py-14 anim-fade-up" style={{ background: CERULEAN }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="font-sans text-[9px] tracking-[0.5em] mb-10"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            CUENTA REGRESIVA
          </p>
          <Countdown targetDate={event.date} light={true} />
        </div>
      </section>

      {/* ── 3. MAGAZINE COLLAGE — VIP card + Nigel ── */}
      <section
        className="anim-fade-up d-3"
        style={{ borderTop: "0.5px solid rgba(0,0,0,0.12)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — Nigel dress code (inverted order for variety) */}
            <div style={{ borderRight: "0.5px solid rgba(0,0,0,0.1)" }}>
              <NigelSection />
            </div>

            {/* Right — Invitation */}
            <div className="px-8 sm:px-12 py-14 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-10">
                <p className="font-sans text-[9px] tracking-[0.5em] text-stone-400">
                  TU INVITACIÓN
                </p>
                <CoffeeIcon className="w-5 h-5 text-stone-300" />
              </div>
              <VIPInvitation
                recipientName="Celeste"
                event={event}
                onRSVP={handleRSVP}
                rsvpConfirmed={rsvpDone}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. COFFEE & STARBUCKS ORDER — deep dark ── */}
      <section
        className="px-6 sm:px-12 py-14 anim-fade-up d-5"
        style={{
          background: "#0a0a0a",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <p
              className="font-sans text-[9px] tracking-[0.5em]"
              style={{ color: "rgba(192,160,80,0.6)" }}
            >
              COFFEE & STARBUCKS ORDER
            </p>
            <CoffeeIcon
              className="w-5 h-5"
              style={{ color: "rgba(192,160,80,0.5)" } as React.CSSProperties}
            />
          </div>
          <p
            className="font-display font-light text-base italic mb-10"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            Elige tu bebida para esta noche especial
          </p>
          <DrinkSelector value={coffeeOrder} onChange={handleDrink} />
        </div>
      </section>

      {/* ── 5. SNACK MENU — white ── */}
      {event.snacks.length > 0 && (
        <section
          className="px-6 sm:px-12 py-14 anim-fade-up d-6"
          style={{ borderTop: "0.5px solid rgba(0,0,0,0.1)" }}
        >
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-[9px] tracking-[0.5em] text-stone-400 mb-8">
              MENÚ DE LA NOCHE
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {event.snacks.map((snack, i) => (
                <div
                  key={i}
                  className="px-4 py-5 text-center"
                  style={{ border: "0.5px solid rgba(0,0,0,0.15)" }}
                >
                  <p className="font-display text-sm sm:text-base">{snack}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. QUOTE — black ── */}
      <section
        className="px-6 sm:px-12 py-20 sm:py-28 anim-fade-up d-7"
        style={{ background: "#000000" }}
      >
        <div className="max-w-4xl mx-auto">
          <blockquote
            className="font-display font-light italic text-[#E60000] leading-tight"
            style={{ fontSize: "clamp(2rem,6vw,4.5rem)" }}
          >
            &ldquo;That&rsquo;s all.&rdquo;
          </blockquote>
          <cite
            className="font-sans text-[9px] tracking-[0.4em] mt-4 block not-italic"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            — Miranda Priestly
          </cite>
          <p
            className="font-display font-light text-xl mt-8 italic"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Y tú lo eres todo.
          </p>
        </div>
      </section>

      <Ticker />
    </main>
  );
}
