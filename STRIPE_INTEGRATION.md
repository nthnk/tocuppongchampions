# 💳 Stripe Payment Integration Guide

This guide will help you add Stripe payment processing to your landing page when you're ready to collect payments instead of just waitlist signups.

## Overview

Currently, the landing page collects waitlist signups. When you're ready to accept payments, you'll:
1. Create a Stripe account
2. Install Stripe SDK
3. Add a payment component
4. Update the form to process payments
5. Store payment confirmations in Google Sheets

## Step 1: Set Up Stripe Account

1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete business verification
3. Get your API keys:
   - Go to Developers → API keys
   - Copy your **Publishable key** (starts with `pk_`)
   - Copy your **Secret key** (starts with `sk_`)

## Step 2: Install Stripe Dependencies

```bash
cd pong-landing
npm install @stripe/stripe-js stripe
```

## Step 3: Add Environment Variables

Add to `.env.local`:

```env
# Existing Google Sheets URL
GOOGLE_SHEETS_URL=your_existing_url

# New Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

## Step 4: Create Stripe Checkout API Route

Create `app/api/create-checkout-session/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, player1Name, player2Name, email } = body;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Toronto Cup Pong Championship - Team Entry',
              description: `Team: ${teamName} | ${player1Name} & ${player2Name}`,
            },
            unit_amount: 4000, // $40.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
      customer_email: email,
      metadata: {
        teamName,
        player1Name,
        player2Name,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

## Step 5: Create Stripe Webhook Handler

Create `app/api/webhooks/stripe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Send data to Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

    if (sheetsUrl) {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          teamName: session.metadata?.teamName,
          player1Name: session.metadata?.player1Name,
          player2Name: session.metadata?.player2Name,
          email: session.customer_email,
          paymentStatus: 'paid',
          paymentId: session.payment_intent,
          amount: session.amount_total ? session.amount_total / 100 : 0,
        }),
      });
    }
  }

  return NextResponse.json({ received: true });
}
```

## Step 6: Update WaitlistForm Component

Replace the form submission logic in `components/WaitlistForm.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    // Create Stripe checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Failed to create checkout session');

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const { error } = await stripe!.redirectToCheckout({ sessionId });

    if (error) {
      throw error;
    }
  } catch (error) {
    setSubmitStatus('error');
    console.error('Error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

Add this import at the top:
```typescript
import { loadStripe } from '@stripe/stripe-js';
```

## Step 7: Create Success Page

Create `app/success/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Your team is officially registered for the Toronto Cup Pong Championship!
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">What's Next?</h2>
          <ul className="text-left text-slate-300 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <span>Check your email for a confirmation receipt</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <span>We'll send venue details 60 days before the event</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <span>Join our Discord community (link in confirmation email)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">4.</span>
              <span>Start training - competition will be fierce!</span>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
```

## Step 8: Update Google Sheets Script

Update your Google Apps Script to handle payment data:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // For paid entries, include payment information
    if (data.paymentStatus === 'paid') {
      sheet.appendRow([
        data.timestamp,
        data.teamName,
        data.player1Name,
        data.player2Name,
        data.email,
        data.paymentStatus,
        data.paymentId,
        data.amount
      ]);
    } else {
      // For waitlist entries (no payment)
      sheet.appendRow([
        data.timestamp,
        data.teamName,
        data.player1Name,
        data.player2Name,
        data.email,
        'waitlist',
        '',
        ''
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Update your Google Sheet headers:
- Column A: `Timestamp`
- Column B: `Team Name`
- Column C: `Player 1 Name`
- Column D: `Player 2 Name`
- Column E: `Email`
- Column F: `Payment Status`
- Column G: `Payment ID`
- Column H: `Amount (CAD)`

## Step 9: Set Up Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events to listen to:
   - `checkout.session.completed`
4. Copy the webhook signing secret
5. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

## Step 10: Testing

### Test Mode
1. Use test API keys (starts with `pk_test_` and `sk_test_`)
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any 3-digit CVC

### Production
1. Switch to live API keys in environment variables
2. Complete Stripe account verification
3. Test with a real small payment first

## Migration Strategy

To switch from waitlist to payments:

1. **Keep both options**:
   - Add a toggle to switch between "Join Waitlist" (free) and "Register Now" ($40)
   - Useful for early bird pricing

2. **Full switch**:
   - Replace the waitlist form entirely with payment flow
   - Update all CTAs to say "Register & Pay"

3. **Gradual rollout**:
   - Keep collecting waitlist signups
   - Email waitlist with payment link when ready
   - Create a separate `/register` page with payment

## Security Checklist

- [ ] Never expose `STRIPE_SECRET_KEY` in client-side code
- [ ] Always verify webhook signatures
- [ ] Use HTTPS in production
- [ ] Validate all form inputs
- [ ] Test refund process
- [ ] Set up Stripe email receipts
- [ ] Configure Stripe Radar for fraud detection

## Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

Need help? Contact Stripe Support or check their extensive documentation.
