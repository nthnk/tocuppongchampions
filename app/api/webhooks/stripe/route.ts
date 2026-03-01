import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log('Stripe webhook received');
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log('Stripe webhook event type:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata!;

    const {
      teamName,
      player1FirstName,
      player1LastName,
      player2FirstName,
      player2LastName,
      email,
      division,
      neighbourhood,
      referralCode,
      spectators,
    } = metadata;

    // 1. Save to Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
    if (sheetsUrl) {
      try {
        const sheetsPayload = {
          timestamp: new Date().toISOString(),
          teamName,
          player1FirstName,
          player1LastName,
          player2FirstName,
          player2LastName,
          email,
          spectators: spectators || '0',
          division: division || '',
          neighbourhood: neighbourhood || '',
          code: referralCode || '',
        };
        console.log('Sending to Google Sheets:', JSON.stringify(sheetsPayload));
        console.log('Google Sheets URL:', sheetsUrl);
        const sheetsResponse = await fetch(sheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetsPayload),
        });
        const sheetsResponseText = await sheetsResponse.text();
        console.log('Google Sheets response status:', sheetsResponse.status, 'redirected:', sheetsResponse.redirected);
        console.log('Google Sheets response body:', sheetsResponseText);
        if (!sheetsResponse.ok && !sheetsResponse.redirected) {
          console.error('Google Sheets error:', sheetsResponse.status, sheetsResponseText);
        }
      } catch (sheetsError) {
        console.error('Error submitting to Google Sheets:', sheetsError);
      }
    } else {
      console.error('GOOGLE_SHEETS_URL environment variable is not set!');
    }

    // 2. Send confirmation email to participant
    try {
      await resend.emails.send({
        from: '6cups <noreply@tocuppongchampions.ca>',
        to: email,
        subject: '6CUPS Table Zero - You\'re registered!',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Verdana, Geneva, sans-serif;
      line-height: 1.6;
      color: #fffafa;
      background-color: #020000;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0a0a0a;
    }
    .header {
      background-color: #020000;
      padding: 40px 20px;
      text-align: center;
      border-bottom: 1px solid #141414;
    }
    .header h1 {
      margin: 0;
      color: #fffafa;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: -1px;
    }
    .header span {
      color: #f61813;
    }
    .header p {
      color: #fffafa;
      opacity: 0.5;
      margin: 0 0 10px 0;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .content {
      padding: 40px 30px;
    }
    .success-badge {
      background-color: #22c55e;
      color: #fffafa;
      padding: 15px 20px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 30px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .team-info {
      background-color: #141414;
      padding: 20px;
      margin: 20px 0;
      border-left: 2px solid #f61813;
    }
    .team-info h3 {
      margin-top: 0;
      color: #fffafa;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.7;
    }
    .team-info p {
      margin: 8px 0;
      color: #fffafa;
      opacity: 0.9;
    }
    .info-section {
      background-color: #141414;
      padding: 20px;
      margin: 20px 0;
      border-left: 2px solid #f61813;
    }
    .info-section h3 {
      margin-top: 0;
      color: #fffafa;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .info-section p {
      margin: 8px 0;
      color: #fffafa;
      opacity: 0.8;
      font-size: 14px;
    }
    .next-steps {
      background-color: #141414;
      padding: 20px;
      margin: 20px 0;
      border-left: 2px solid #f61813;
    }
    .next-steps h3 {
      margin-top: 0;
      color: #fffafa;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .next-steps ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin: 8px 0;
      color: #fffafa;
      opacity: 0.8;
      font-size: 14px;
    }
    .social-links {
      text-align: center;
      padding: 20px;
      background-color: #141414;
      margin: 20px 0;
    }
    .social-links p {
      margin: 10px 0;
      color: #fffafa;
      opacity: 0.6;
      font-size: 12px;
    }
    .social-links a {
      color: #f61813;
      text-decoration: none;
      font-weight: 600;
    }
    .footer {
      background-color: #020000;
      padding: 30px;
      text-align: center;
      color: #fffafa;
      font-size: 11px;
      opacity: 0.4;
      border-top: 1px solid #141414;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>6CUPS PRESENTS</p>
      <h1>TABLE <span>ZERO</span></h1>
    </div>

    <div class="content">
      <div class="success-badge">
        Payment confirmed - You're registered!
      </div>

      <p style="color: #fffafa; font-size: 16px; opacity: 0.9;">
        Your spot at Table Zero is locked in. See you on March 22nd!
      </p>

      <div class="team-info">
        <h3>Your Team</h3>
        <p><strong>Team:</strong> ${teamName}</p>
        <p><strong>Player 1:</strong> ${player1FirstName} ${player1LastName}</p>
        <p><strong>Player 2:</strong> ${player2FirstName} ${player2LastName}</p>
        ${Number(spectators) > 0 ? `<p><strong>Spectators:</strong> ${spectators}</p>` : ''}
        <p><strong>Entry paid:</strong> $${((session.amount_total || 1000) / 100).toFixed(2)} CAD</p>
        ${referralCode && referralCode.toUpperCase() === 'DELTAKAPPA' ? '<p style="color: #22c55e; font-weight: bold;">10% referral discount applied</p>' : ''}
      </div>

      <div class="info-section">
        <h3>Event Details</h3>
        <p><strong>Date:</strong> March 22, 2026</p>
        <p><strong>Time:</strong> 12:00 PM – 6:00 PM</p>
        <p><strong>Format:</strong> 32 teams, bracket style</p>
      </div>

      <div class="info-section">
        <h3>Getting There</h3>
        <p><strong>Venue:</strong> Samara Brewing Co.</p>
        <p><strong>Address:</strong> 90 Cawthra Ave, Unit 101, Toronto, ON</p>
        <p style="margin-top: 12px;">
          <a href="https://maps.google.com/?q=90+Cawthra+Ave+Unit+101+Toronto+ON" style="color: #f61813; text-decoration: none; font-weight: 600;">Open in Google Maps →</a>
        </p>
      </div>

      <div class="next-steps">
        <h3>Next Steps</h3>
        <ul>
          <li>Follow <a href="https://www.instagram.com/play6cups" style="color: #f61813; text-decoration: none;">@play6cups on Instagram</a> for updates and announcements</li>
          <li>Invite your friends to sign up at <a href="https://play6cups.com" style="color: #f61813; text-decoration: none;">play6cups.com</a></li>
          <li>We'll send a reminder email closer to the event with final details</li>
        </ul>
      </div>

      <p style="color: #fffafa; opacity: 0.6; margin-top: 30px; font-size: 13px;">
        Questions? Reach us at <a href="mailto:info@tocuppongchampions.ca" style="color: #f61813;">info@tocuppongchampions.ca</a>
      </p>
    </div>

    <div class="footer">
      <img src="https://tocuppongchampions.ca/horizontal_colour.svg" alt="6CUPS" width="120" style="margin-bottom: 15px; display: inline-block;" />
      <p>6cups &bull; Table Zero &bull; March 22, 2026 &bull; Toronto</p>
    </div>
  </div>
</body>
</html>
        `,
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
    }

    // 3. Send admin notification
    try {
      await resend.emails.send({
        from: '6cups <noreply@tocuppongchampions.ca>',
        to: 'nknathankoo@gmail.com',
        subject: `Table Zero - New Paid Signup: ${teamName}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Verdana, Geneva, sans-serif;
      line-height: 1.6;
      color: #fffafa;
      background-color: #020000;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0a0a0a;
    }
    .header {
      background-color: #22c55e;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #fffafa;
      font-size: 20px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
    }
    .team-info {
      background-color: #141414;
      padding: 20px;
      margin: 20px 0;
      border-left: 2px solid #22c55e;
    }
    .team-info h3 {
      margin-top: 0;
      color: #fffafa;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.7;
    }
    .info-row {
      margin: 10px 0;
      color: #fffafa;
    }
    .info-label {
      font-weight: 600;
      color: #fffafa;
      opacity: 0.6;
    }
    .info-value {
      color: #fffafa;
    }
    .footer {
      background-color: #020000;
      padding: 20px;
      text-align: center;
      color: #fffafa;
      font-size: 11px;
      opacity: 0.4;
      border-top: 1px solid #141414;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Paid Signup - $10 CAD</h1>
    </div>

    <div class="content">
      <p style="color: #fffafa; font-size: 14px; margin-bottom: 20px; opacity: 0.8;">
        A new team has paid and registered for Table Zero.
      </p>

      <div class="team-info">
        <h3>Team Details</h3>
        <div class="info-row">
          <span class="info-label">Team:</span>
          <span class="info-value">${teamName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Player 1:</span>
          <span class="info-value">${player1FirstName} ${player1LastName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Player 2:</span>
          <span class="info-value">${player2FirstName} ${player2LastName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Spectators:</span>
          <span class="info-value">${spectators || '0'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Payment:</span>
          <span class="info-value">$${((session.amount_total || 0) / 100).toFixed(2)} CAD</span>
        </div>
        <div class="info-row">
          <span class="info-label">Stripe ID:</span>
          <span class="info-value">${session.id}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Time:</span>
          <span class="info-value">${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto', dateStyle: 'full', timeStyle: 'long' })}</span>
        </div>
      </div>

      <p style="color: #fffafa; font-size: 12px; margin-top: 20px; opacity: 0.5;">
        Added to Google Sheets. Confirmation email sent.
      </p>
    </div>

    <div class="footer">
      <p>6cups Admin</p>
    </div>
  </div>
</body>
</html>
        `,
      });
    } catch (emailError) {
      console.error('Error sending admin email:', emailError);
    }
  }

  return NextResponse.json({ received: true });
}
