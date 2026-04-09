import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const line_items = items.map((item: any) => ({
      quantity: item.quantity || 1,
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          description: item.metadata
            ? Object.entries(item.metadata).map(([k, v]) => `${k}: ${v}`).join(" • ")
            : item.category || "PetBox item"
        },
        unit_amount: Math.round((item.price || 0) * 100),
        recurring: item.type === "plan" || item.type === "custom-box"
          ? { interval: item.cadence === "quarterly" ? "month" : "month", interval_count: item.cadence === "quarterly" ? 3 : 1 }
          : undefined
      }
    }));

    const containsSubscription = items.some((item: any) => item.type === "plan" || item.type === "custom-box");

    const session = await stripe.checkout.sessions.create({
      mode: containsSubscription ? "subscription" : "payment",
      line_items,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      billing_address_collection: "auto",
      allow_promotion_codes: true
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create checkout session." }, { status: 500 });
  }
}
