import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { verifyOTP } from '@/lib/otp';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, otpToken } = body;

    if (!email || !code || !otpToken) {
      return NextResponse.json(
        { error: 'Email, code, and verification token are required' },
        { status: 400 }
      );
    }

    // Verify the OTP using the signed token (stateless)
    const verification = verifyOTP(otpToken, email, code);

    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error },
        { status: 400 }
      );
    }

    // OTP is valid — create a Stripe checkout session
    const { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName, division, referralCode, spectators } = verification.formData;
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // If valid referral code, find and apply the coupon
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (referralCode && referralCode.toUpperCase() === 'DELTAKAPPA') {
      try {
        const coupons = await stripe.coupons.list({ limit: 100 });
        const coupon = coupons.data.find(c => c.name === 'DELTAKAPPA Referral');
        if (coupon) {
          discounts.push({ coupon: coupon.id });
        }
      } catch (couponError) {
        console.error('Error looking up coupon:', couponError);
      }
    }

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
            unit_amount: 1000, // $10.00 CAD
          },
          quantity: 1,
        },
      ],
      ...(discounts.length > 0 ? { discounts } : {}),
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
        division,
        referralCode: referralCode || '',
        spectators: String(spectators || 0),
      },
    });

    return NextResponse.json(
      { message: 'Verified', checkoutUrl: session.url },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return NextResponse.json(
      { error: 'Failed to process verification' },
      { status: 500 }
    );
  }
}
