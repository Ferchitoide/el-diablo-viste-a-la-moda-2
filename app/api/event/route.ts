import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import type { EventData } from "../../lib/event";

const redis = Redis.fromEnv();
const KEY = "dvlm:event";

export const DEFAULTS: EventData = {
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

export async function GET() {
  try {
    const data = await redis.get<EventData>(KEY);
    return NextResponse.json(data ?? DEFAULTS);
  } catch {
    return NextResponse.json(DEFAULTS);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<EventData>;
    const current = (await redis.get<EventData>(KEY)) ?? DEFAULTS;

    const merged: EventData = {
      ...current,
      ...body,
      coffeeOrders: body.coffeeOrders
        ? { ...current.coffeeOrders, ...body.coffeeOrders }
        : current.coffeeOrders,
    };

    await redis.set(KEY, merged);
    return NextResponse.json(merged);
  } catch (err) {
    console.error("Failed to save event:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
