"use client";

export const DRINKS = [
  { id: "caffè-latte",   label: "Caffè Latte",               note: "Hot"        },
  { id: "cappuccino",    label: "Cappuccino",                note: "Hot"        },
  { id: "cold-brew",     label: "Cold Brew",                 note: "Iced"       },
  { id: "matcha",        label: "Matcha Latte",              note: "Hot · Iced" },
  { id: "frappe-cara",   label: "Frappuccino Caramelo",      note: "Blended"    },
  { id: "americano",     label: "Americano",                 note: "Hot"        },
  { id: "pink-drink",    label: "Pink Drink",                note: "Iced"       },
  { id: "vanilla-latte", label: "Vanilla Sweet Cream Latte", note: "Iced"       },
] as const;

interface Props {
  value: string;
  onChange: (drink: string) => void;
}

export default function DrinkSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {DRINKS.map((drink) => {
        const active = value === drink.id;
        return (
          <button
            key={drink.id}
            onClick={() => onChange(active ? "" : drink.id)}
            className="p-4 text-left transition-all duration-300"
            style={{
              border: active
                ? "0.5px solid #00704A"
                : "0.5px solid rgba(255,255,255,0.12)",
              background: active ? "rgba(0,112,74,0.08)" : "rgba(255,255,255,0.03)",
            }}
          >
            <p
              className="font-display text-sm leading-snug"
              style={{ color: active ? "#00704A" : "rgba(255,255,255,0.85)" }}
            >
              {drink.label}
            </p>
            <p
              className="font-sans text-[8px] tracking-[0.3em] mt-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {drink.note}
            </p>
            {active && (
              <p
                className="font-sans text-[8px] tracking-[0.3em] mt-2"
                style={{ color: "#00704A" }}
              >
                ✓ ELEGIDA
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
