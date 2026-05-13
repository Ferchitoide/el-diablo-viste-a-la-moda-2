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
  date: "2026-10-01T20:00:00",
  venue: "Cine Palacio — Sala de Gala",
  mamaMessage:
    "Porque eres la primera persona con quien quiero vivir esta magia.",
  parejaMessage:
    "Para la persona que hace que cada momento sea extraordinario.",
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

function ok(): boolean {
  return typeof window !== "undefined";
}

export function getEventData(): EventData {
  if (!ok()) return DEFAULTS;
  try {
    const raw = localStorage.getItem("dvlm_event");
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function saveEventData(data: Partial<EventData>): void {
  if (!ok()) return;
  localStorage.setItem(
    "dvlm_event",
    JSON.stringify({ ...getEventData(), ...data })
  );
}

export function confirmRSVP(role: "mama" | "pareja"): void {
  if (!ok()) return;
  saveEventData(role === "mama" ? { rsvpMama: true } : { rsvpPareja: true });
}

export function saveCoffeeOrder(role: "mama" | "pareja", drink: string): void {
  if (!ok()) return;
  const current = getEventData();
  saveEventData({
    coffeeOrders: { ...current.coffeeOrders, [role]: drink },
  });
}
