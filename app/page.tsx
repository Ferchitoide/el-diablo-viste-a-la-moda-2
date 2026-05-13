"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROLES, type Role, setSession, getSession } from "./lib/auth";
import Ticker from "./components/Ticker";

const LABELS: Record<Role, string> = {
  admin:  "ADMIN",
  mama:   "MAMÁ",
  pareja: "MI PAREJA",
};

export default function LoginPage() {
  const router = useRouter();
  const [mounted,  setMounted]  = useState(false);
  const [selected, setSelected] = useState<Role | null>(null);
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState(false);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    setMounted(true);
    const session = getSession();
    if (session) router.replace(ROLES[session].path);
  }, [router]);

  const pick = (role: Role) => {
    setSelected(role);
    setPassword("");
    setError(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !password) return;
    setLoading(true);
    setTimeout(() => {
      if (password.toUpperCase() === ROLES[selected].password) {
        setSession(selected);
        router.push(ROLES[selected].path);
      } else {
        setError(true);
        setLoading(false);
        setPassword("");
      }
    }, 700);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* ── Top bar ── */}
      <header className="border-b border-black px-6 sm:px-10 py-4 flex justify-between items-center anim-fade-in">
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-stone-400">
          El Diablo Viste a la Moda
        </span>
        <span className="font-display font-light text-base tracking-widest">II</span>
        <span className="font-sans text-[9px] tracking-[0.4em] text-stone-400">2026</span>
      </header>

      {/* ── Hero ── */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-5xl">

          {/* Giant editorial title */}
          <div className="text-center anim-fade-up">
            <h1 className="font-display font-light leading-[0.83] tracking-tight select-none">
              <span className="block text-[clamp(2.8rem,12vw,9rem)]">
                EL DIABLO
              </span>
              <span
                className="block text-[clamp(2.8rem,12vw,9rem)] text-[#E60000]"
                style={{ paddingLeft: "8%" }}
              >
                VISTE A
              </span>
              <span className="block text-[clamp(2.8rem,12vw,9rem)]">
                LA MODA II
              </span>
            </h1>
          </div>

          {/* Divider + subtitle */}
          <div className="mt-10 anim-fade-up d-3">
            <div className="h-px bg-black anim-scale-x d-4" />
            <p className="text-center font-sans text-[9px] tracking-[0.5em] text-stone-400 my-5 uppercase">
              Première Exclusiva — Temporada 2026
            </p>
            <div className="h-px bg-black anim-scale-x d-5" />
          </div>

          {/* Access section */}
          <div className="mt-12 anim-fade-up d-6">
            <p className="text-center font-sans text-[9px] tracking-[0.45em] text-stone-400 mb-5 uppercase">
              Selecciona tu acceso
            </p>

            {/* Role buttons */}
            <div className="border border-black flex">
              {(Object.keys(ROLES) as Role[]).map((role) => (
                <button
                  key={role}
                  onClick={() => pick(role)}
                  className={`flex-1 py-5 font-display font-light text-sm tracking-[0.25em] uppercase border-r last:border-r-0 border-black transition-colors duration-300
                    ${selected === role
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-stone-50"
                    }`}
                >
                  {LABELS[role]}
                </button>
              ))}
            </div>

            {/* Password form — slides in */}
            {selected && (
              <form
                onSubmit={submit}
                className="anim-slide-down border-x border-b border-black"
              >
                <div className="flex">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="CÓDIGO DE ACCESO"
                    autoFocus
                    className="flex-1 px-6 py-4 font-sans text-[11px] tracking-[0.35em] uppercase placeholder:text-stone-300 outline-none bg-white border-r border-black"
                  />
                  <button
                    type="submit"
                    disabled={loading || !password}
                    className="px-8 bg-black text-white font-display text-sm tracking-[0.2em] hover:bg-[#E60000] transition-colors duration-300 disabled:opacity-40 whitespace-nowrap"
                  >
                    {loading ? "···" : "ENTRAR →"}
                  </button>
                </div>
                {error && (
                  <div className="bg-[#E60000] px-6 py-3 anim-fade-in">
                    <p className="text-white font-sans text-[10px] tracking-[0.3em] uppercase">
                      Código incorrecto — inténtalo de nuevo
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>

        </div>
      </div>

      <Ticker />
    </main>
  );
}
