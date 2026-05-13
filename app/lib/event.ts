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

/* Defaults match the API route — used as fallback if API is unreachable */
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

export async function getEventData(): Promise<EventData> {
  try {
    const res = await fetch("/api/event", { cache: "no-store" });
    if (!res.ok) return DEFAULTS;
    return await res.json();
  } catch {
    return DEFAULTS;
  }
}

export async function saveEventData(data: Partial<EventData>): Promise<void> {
  await fetch("/api/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
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
