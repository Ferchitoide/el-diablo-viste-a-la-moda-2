export interface EventData {
  date: string;
  venue: string;
  mamaMessage: string;
  parejaMessage: string;
  snacks: string[];
  rsvpMama: boolean;
  rsvpPareja: boolean;
  coffeeOrders: {
    mama: string;
    pareja: string;
  };
}

const DEFAULTS: EventData = {
  date: "2026-05-14T20:55:00",
  venue: "Cinemark Trujillo - Mall Plaza",
  mamaMessage:
    "Porque sé lo mucho que te gusta poder compartir conmigo y yo amo verte disfrutar de las cosas, te amo mamá.",
  parejaMessage:
    "Para mi corazón que no merece menos y adoro poder cumplir las cosas con las que incluso sueñas tener, te amo amor de mi vida.",
  snacks: [
    "🍿 Popcorn de mantequilla",
    "🍫 Chocolate negro",
    "🥂 Vino espumoso",
    "🧃 Bebidas especiales",
  ],
  rsvpMama: false,
  rsvpPareja: false,
  coffeeOrders: { mama: "", pareja: "" },
};

const LS_KEY = "dvlm_event";

function lsRead(): EventData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as EventData) : null;
  } catch {
    return null;
  }
}

function lsWrite(data: EventData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {}
}

/* localStorage is the primary store — always fast, always available.
   Redis (via /api/event) is synced in the background for cross-device access. */
export async function getEventData(): Promise<EventData> {
  const local = lsRead();
  if (local) return local;

  // No local data yet — try Redis (e.g. first load on a guest's phone)
  try {
    const res = await fetch("/api/event", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as EventData;
      lsWrite(data);
      return data;
    }
  } catch {}

  return DEFAULTS;
}

export async function saveEventData(data: Partial<EventData>): Promise<void> {
  const current = lsRead() ?? DEFAULTS;
  const merged: EventData = {
    ...current,
    ...data,
    coffeeOrders: data.coffeeOrders
      ? { ...current.coffeeOrders, ...data.coffeeOrders }
      : current.coffeeOrders,
  };

  // Persist locally — immediate, no network required
  lsWrite(merged);

  // Background sync to Redis — enables cross-device access when configured
  fetch("/api/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(merged),
  }).catch(() => {});
}

export async function confirmRSVP(role: "mama" | "pareja"): Promise<void> {
  await saveEventData(
    role === "mama" ? { rsvpMama: true } : { rsvpPareja: true }
  );
}

export async function saveCoffeeOrder(
  role: "mama" | "pareja",
  drink: string
): Promise<void> {
  await saveEventData({ coffeeOrders: { [role]: drink } as EventData["coffeeOrders"] });
}
