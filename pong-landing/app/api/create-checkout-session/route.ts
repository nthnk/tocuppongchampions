import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName, email, spectators } = body;

    if (!teamName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Table Zero Entry - Duo',
              description: `Team: ${teamName} | ${player1FirstName} ${player1LastName} & ${player2FirstName} ${player2LastName}`,
            },
            unit_amount: 1000, // $10.00 CAD in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#register`,
      metadata: {
        teamName,
        player1FirstName,
        player1LastName,
        player2FirstName,
        player2LastName,
        email,
        spectators: String(spectators || 0),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
