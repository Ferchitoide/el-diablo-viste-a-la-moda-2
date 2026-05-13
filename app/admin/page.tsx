"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, clearSession } from "../lib/auth";
import { getEventData, saveEventData, type EventData } from "../lib/event";
import { DRINKS } from "../components/DrinkSelector";
import CoffeeIcon from "../components/CoffeeIcon";
import Ticker from "../components/Ticker";

type Tab = "evento" | "invitadas" | "snacks";

const TABS: { key: Tab; label: string }[] = [
  { key: "evento",    label: "EVENTO"    },
  { key: "invitadas", label: "INVITADAS" },
  { key: "snacks",    label: "SNACKS"    },
];

function drinkLabel(id: string) {
  return DRINKS.find((d) => d.id === id)?.label ?? "—";
}

export default function AdminPage() {
  const router = useRouter();
  const [ready,    setReady]    = useState(false);
  const [tab,      setTab]      = useState<Tab>("evento");
  const [event,    setEvent]    = useState<EventData | null>(null);
  const [newSnack, setNewSnack] = useState("");
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    if (getSession() !== "admin") { router.replace("/"); return; }
    getEventData().then((data) => {
      setEvent(data);
      setReady(true);
    });
  }, [router]);

  const save = async () => {
    if (!event) return;
    await saveEventData(event);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const addSnack = () => {
    const s = newSnack.trim();
    if (!s || !event) return;
    setEvent({ ...event, snacks: [...event.snacks, s] });
    setNewSnack("");
  };

  const removeSnack = (i: number) => {
    if (!event) return;
    setEvent({ ...event, snacks: event.snacks.filter((_, idx) => idx !== i) });
  };

  const resetRsvp = (role: "rsvpMama" | "rsvpPareja") => {
    if (!event) return;
    setEvent({ ...event, [role]: false });
  };

  if (!ready || !event) return null;

  const guests = [
    {
      name:    "MAMÁ",
      rsvp:    event.rsvpMama,
      rsvpKey: "rsvpMama"    as const,
      coffee:  event.coffeeOrders.mama,
      href:    "/mama",
    },
    {
      name:    "CELESTE",
      rsvp:    event.rsvpPareja,
      rsvpKey: "rsvpPareja"  as const,
      coffee:  event.coffeeOrders.pareja,
      href:    "/pareja",
    },
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-black px-6 sm:px-10 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-display font-light text-sm tracking-[0.15em]">
            El Diablo Viste a la Moda II
          </span>
          <span
            className="font-sans text-[8px] tracking-[0.35em] px-2 py-1"
            style={{ border: "0.5px solid #E60000", color: "#E60000" }}
          >
            ADMIN
          </span>
        </div>
        <button
          onClick={() => { clearSession(); router.push("/"); }}
          className="font-sans text-[9px] tracking-[0.35em] text-stone-400 hover:text-black transition-colors"
        >
          SALIR →
        </button>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 sm:px-10 py-12">

        {/* Title */}
        <div className="mb-10 anim-fade-up">
          <p className="font-sans text-[9px] tracking-[0.5em] text-stone-400 mb-2">
            PANEL DE CONTROL
          </p>
          <h1 className="font-display font-light text-5xl sm:text-7xl">Dashboard</h1>
          <div className="mt-6 anim-scale-x d-2" style={{ borderBottom: "0.5px solid black" }} />
        </div>

        {/* Tabs */}
        <div
          className="flex mb-10 anim-fade-up d-3"
          style={{ border: "0.5px solid black" }}
        >
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-4 font-sans text-[10px] tracking-[0.35em] transition-colors duration-200
                ${tab === key
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-stone-50"
                }`}
              style={{ borderRight: key !== "snacks" ? "0.5px solid black" : "none" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── TAB: EVENTO ── */}
        {tab === "evento" && (
          <div className="space-y-6 anim-fade-up">
            <div className="p-6 sm:p-8" style={{ border: "0.5px solid black" }}>
              <p className="font-sans text-[9px] tracking-[0.4em] text-stone-400 mb-5">
                FECHA Y HORA DE LA PREMIÈRE
              </p>
              <input
                type="datetime-local"
                value={event.date.slice(0, 16)}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
                className="w-full px-4 py-3 font-display text-sm outline-none transition-colors"
                style={{ border: "0.5px solid black" }}
                onFocus={(e) => (e.target.style.borderColor = "#E60000")}
                onBlur={(e) => (e.target.style.borderColor = "black")}
              />
            </div>

            <div className="p-6 sm:p-8" style={{ border: "0.5px solid black" }}>
              <p className="font-sans text-[9px] tracking-[0.4em] text-stone-400 mb-5">
                LUGAR DEL EVENTO
              </p>
              <input
                type="text"
                value={event.venue}
                onChange={(e) => setEvent({ ...event, venue: e.target.value })}
                placeholder="Cine Palacio — Sala de Gala"
                className="w-full px-4 py-3 font-display text-sm outline-none transition-colors"
                style={{ border: "0.5px solid black" }}
                onFocus={(e) => (e.target.style.borderColor = "#E60000")}
                onBlur={(e) => (e.target.style.borderColor = "black")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { key: "mamaMessage",   label: "MENSAJE PARA MAMÁ"      },
                { key: "parejaMessage", label: "MENSAJE PARA MI PAREJA"  },
              ].map(({ key, label }) => (
                <div key={key} className="p-6" style={{ border: "0.5px solid black" }}>
                  <p className="font-sans text-[9px] tracking-[0.4em] text-stone-400 mb-4">
                    {label}
                  </p>
                  <textarea
                    value={event[key as "mamaMessage" | "parejaMessage"]}
                    onChange={(e) => setEvent({ ...event, [key]: e.target.value })}
                    rows={4}
                    className="w-full font-display text-sm leading-relaxed outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: INVITADAS ── */}
        {tab === "invitadas" && (
          <div className="space-y-6 anim-fade-up">
            {guests.map(({ name, rsvp, rsvpKey, coffee, href }) => (
              <div
                key={name}
                className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6"
                style={{ border: "0.5px solid black" }}
              >
                <div className="flex-1">
                  <p className="font-sans text-[9px] tracking-[0.4em] text-stone-400 mb-2">
                    INVITADA
                  </p>
                  <p className="font-display font-light text-2xl">{name}</p>

                  {/* RSVP status */}
                  <div className="flex items-center gap-3 mt-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: rsvp ? "#00704A" : "#d1d5db" }}
                    />
                    <p
                      className="font-sans text-[9px] tracking-[0.35em]"
                      style={{ color: rsvp ? "#00704A" : "#9ca3af" }}
                    >
                      {rsvp ? "CONFIRMADA" : "PENDIENTE"}
                    </p>
                  </div>

                  {/* Coffee order */}
                  <div className="flex items-center gap-3 mt-3">
                    <CoffeeIcon className="w-4 h-4 text-stone-400" />
                    <p className="font-sans text-[9px] tracking-[0.35em] text-stone-400">
                      {coffee ? drinkLabel(coffee) : "Sin pedido"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {rsvp && (
                    <button
                      onClick={() => resetRsvp(rsvpKey)}
                      className="px-5 py-3 font-sans text-[9px] tracking-[0.3em] hover:bg-stone-50 transition-colors"
                      style={{ border: "0.5px solid black" }}
                    >
                      RESETEAR RSVP
                    </button>
                  )}
                  <Link
                    href={href}
                    className="px-5 py-3 font-sans text-[9px] tracking-[0.3em] text-center hover:bg-black hover:text-white transition-colors duration-200"
                    style={{ border: "0.5px solid black" }}
                  >
                    VER INVITACIÓN →
                  </Link>
                </div>
              </div>
            ))}
            <p className="font-sans text-[9px] tracking-[0.35em] text-stone-400 pt-2">
              * Guarda los cambios para persistir el reseteo de RSVP.
            </p>
          </div>
        )}

        {/* ── TAB: SNACKS ── */}
        {tab === "snacks" && (
          <div className="space-y-6 anim-fade-up">

            {/* Coffee orders — fixed section */}
            <div
              className="p-6 sm:p-8"
              style={{ background: "#0a0a0a", border: "0.5px solid rgba(192,160,80,0.25)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <CoffeeIcon className="w-6 h-6" style={{ color: "rgba(192,160,80,0.6)" } as React.CSSProperties} />
                <p
                  className="font-sans text-[9px] tracking-[0.4em]"
                  style={{ color: "rgba(192,160,80,0.6)" }}
                >
                  COFFEE & STARBUCKS ORDER
                </p>
              </div>

              <div className="space-y-4">
                {guests.map(({ name, coffee }) => (
                  <div
                    key={name}
                    className="flex justify-between items-center py-4"
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}
                  >
                    <span className="font-display text-white/80 text-base">{name}</span>
                    <span
                      className="font-sans text-[9px] tracking-[0.3em]"
                      style={{ color: coffee ? "#00704A" : "rgba(255,255,255,0.3)" }}
                    >
                      {coffee ? drinkLabel(coffee) : "PENDIENTE"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regular snacks */}
            <div className="p-6 sm:p-8" style={{ border: "0.5px solid black" }}>
              <p className="font-sans text-[9px] tracking-[0.4em] text-stone-400 mb-6">
                MENÚ DE LA NOCHE
              </p>

              <div className="divide-y divide-stone-100 mb-6">
                {event.snacks.length === 0 && (
                  <p className="font-display text-stone-400 text-lg italic py-4">
                    Sin snacks todavía...
                  </p>
                )}
                {event.snacks.map((snack, i) => (
                  <div key={i} className="flex justify-between items-center py-4">
                    <span className="font-display text-base">{snack}</span>
                    <button
                      onClick={() => removeSnack(i)}
                      className="font-sans text-[9px] tracking-[0.3em] text-stone-400 hover:text-[#E60000] transition-colors"
                    >
                      QUITAR
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex" style={{ border: "0.5px solid black" }}>
                <input
                  type="text"
                  value={newSnack}
                  onChange={(e) => setNewSnack(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSnack(); } }}
                  placeholder="Añadir snack (ej: 🍕 Pizza)"
                  className="flex-1 px-4 py-3 font-display text-sm outline-none"
                  style={{ borderRight: "0.5px solid black" }}
                />
                <button
                  onClick={addSnack}
                  disabled={!newSnack.trim()}
                  className="px-6 bg-black text-white font-sans text-[9px] tracking-[0.3em] hover:bg-[#E60000] transition-colors disabled:opacity-40"
                >
                  + AÑADIR
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save */}
        <div className="mt-10 anim-fade-up d-5">
          <button
            onClick={save}
            className={`w-full py-5 font-display font-light text-base tracking-[0.3em] uppercase transition-all duration-300
              ${saved ? "text-white" : "bg-black text-white hover:bg-[#E60000]"}`}
            style={saved ? { background: "#00704A" } : {}}
          >
            {saved ? "✓ GUARDADO" : "GUARDAR CAMBIOS"}
          </button>
        </div>

      </div>

      <Ticker />
    </main>
  );
}
