import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Prices — update these amounts (in cents) to match your Stripe dashboard
const PRODUCTS = {
  guide: {
    name: "VoIP Setup Guide",
    description: "Step-by-step setup instructions, network checklist, SIP provisioning walkthrough, and testing guide for your NeedIT VoIP kit.",
    amount: 1900, // $19.00
  },
  service: {
    name: "NeedIT Professional Setup Service",
    description: "NeedIT handles the full setup remotely — phone provisioning, SIP credentials, platform configuration, and live testing. Most setups completed same business day.",
    amount: 14900, // $149.00
  },
};

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { product, kitName } = await req.json() as { product: "guide" | "service"; kitName: string };

    const item = PRODUCTS[product];
    if (!item) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: kitName ? `${item.name} — ${kitName}` : item.name,
              description: item.description,
            },
            unit_amount: item.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/voip-kits/setup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/voip-kits/setup/cancel`,
      metadata: { product, kitName: kitName ?? "" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
