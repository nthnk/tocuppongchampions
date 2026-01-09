import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyOTP } from '@/lib/otp';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    // Verify the OTP
    const verification = verifyOTP(email, code);

    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error },
        { status: 400 }
      );
    }

    // OTP is valid, now submit to Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

    if (!sheetsUrl) {
      console.error('GOOGLE_SHEETS_URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    try {
      const response = await fetch(sheetsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...verification.formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Google Sheets');
      }

      // Send confirmation email with payment instructions
      try {
        const { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName } = verification.formData;

        await resend.emails.send({
          from: 'Toronto Cup Pong Championship <noreply@tocuppongchampions.ca>',
          to: email,
          subject: 'Welcome to Toronto Cup Pong Championship! 🏆',
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 28px;
      font-weight: bold;
    }
    .header p {
      color: #e0e7ff;
      margin: 10px 0 0 0;
      font-size: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .success-badge {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .team-info {
      background-color: #f0f9ff;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #2563eb;
    }
    .team-info h3 {
      margin-top: 0;
      color: #1e40af;
      font-size: 18px;
    }
    .team-info p {
      margin: 8px 0;
      color: #1e40af;
    }
    .payment-section {
      background-color: #fef3c7;
      border: 2px solid #f59e0b;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .payment-section h3 {
      margin-top: 0;
      color: #92400e;
      font-size: 20px;
    }
    .payment-option {
      background-color: white;
      padding: 15px;
      border-radius: 6px;
      margin: 15px 0;
      border-left: 4px solid #2563eb;
    }
    .payment-option h4 {
      margin: 0 0 10px 0;
      color: #1e40af;
      font-size: 16px;
    }
    .payment-option p {
      margin: 5px 0;
      color: #4b5563;
    }
    .info-box {
      background-color: #f9fafb;
      border-left: 4px solid #2563eb;
      padding: 15px 20px;
      margin: 20px 0;
    }
    .info-box p {
      margin: 5px 0;
      font-size: 14px;
      color: #4b5563;
    }
    .next-steps {
      background-color: #eff6ff;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .next-steps h3 {
      margin-top: 0;
      color: #1e40af;
    }
    .next-steps ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin: 8px 0;
      color: #4b5563;
    }
    .social-links {
      text-align: center;
      padding: 20px;
      background-color: #f9fafb;
    }
    .social-links p {
      margin: 10px 0;
      color: #6b7280;
    }
    .social-links a {
      color: #2563eb;
      text-decoration: none;
      margin: 0 10px;
      font-weight: 600;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏆 YOU'RE IN!</h1>
      <p>Welcome to the Toronto Cup Pong Championship</p>
    </div>

    <div class="content">
      <div class="success-badge">
        ✓ Registration Confirmed
      </div>

      <p style="color: #4b5563; font-size: 16px;">
        Congratulations! You've successfully registered for Toronto's first cup pong mini-tournament. Get ready for an awesome time!
      </p>

      <div class="team-info">
        <h3>Your Team Details</h3>
        <p><strong>Team Name:</strong> ${teamName}</p>
        <p><strong>Player 1:</strong> ${player1FirstName} ${player1LastName}</p>
        <p><strong>Player 2:</strong> ${player2FirstName} ${player2LastName}</p>
      </div>

      <div class="payment-section">
        <h3>💰 Payment Instructions - $10 Entry Fee</h3>
        <p style="color: #92400e; margin-bottom: 15px;">
          To complete your registration, please pay the $10 entry fee using one of these options:
        </p>

        <div class="payment-option">
          <h4>Option 1: Cash on Event Day</h4>
          <p>Bring $10 cash with you to the event. We'll collect payment when you check in.</p>
        </div>

        <div class="payment-option">
          <h4>Option 2: E-Transfer on Event Day</h4>
          <p>Send $10 via e-transfer to: <strong>nknathankoo@gmail.com</strong></p>
          <p style="font-size: 13px; color: #6b7280;">We'll send e-transfer details closer to the event date.</p>
        </div>

        <p style="margin-top: 15px; font-size: 14px; color: #92400e;">
          <strong>Important:</strong> Payment can be made on the day of the event - no need to pay in advance!
        </p>
      </div>

      <div class="next-steps">
        <h3>What Happens Next?</h3>
        <ul>
          <li>We'll email you the exact <strong>venue location</strong> in the coming weeks</li>
          <li>Event is planned for <strong>late February - March 2026</strong> at a downtown Toronto bar</li>
          <li>Bring your A-game and have fun!</li>
        </ul>
      </div>

      <div class="info-box">
        <p><strong>📍 Event Details</strong></p>
        <p>• <strong>When:</strong> Late February - March 2026</p>
        <p>• <strong>Where:</strong> Somewhere in Downtown Toronto (venue TBD)</p>
        <p>• <strong>Format:</strong> Max 64 teams, 16-team brackets, double elimination</p>
        <p>• <strong>What's Included:</strong> Tournament entry & equipment</p>
        <p>• <strong>Food & Drinks:</strong> Available for purchase at the bar</p>
      </div>

      <div class="social-links">
        <p style="font-weight: 600; color: #1f2937;">Follow us for updates!</p>
        <p>
          <a href="https://www.instagram.com/cuppongdudes/">Instagram: @cuppongdudes</a>
          <br>
          <a href="https://www.tiktok.com/@cuppongguy?_r=1&_t=ZS-92vv1AfUO2B">TikTok: @cuppongguy</a>
        </p>
      </div>

      <p style="color: #4b5563; margin-top: 30px;">
        Questions? Email us at <a href="mailto:info@tocuppongchampions.ca" style="color: #2563eb;">info@tocuppongchampions.ca</a>
      </p>
    </div>

    <div class="footer">
      <p>Toronto Cup Pong Championship • Late February - March 2026 • Downtown Toronto</p>
      <p style="margin-top: 10px;">Where precision meets competition</p>
    </div>
  </div>
</body>
</html>
          `,
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the request if email fails - user is already registered
      }

      return NextResponse.json(
        { message: 'Successfully verified and added to waitlist' },
        { status: 200 }
      );
    } catch (sheetsError) {
      console.error('Error submitting to Google Sheets:', sheetsError);
      return NextResponse.json(
        { error: 'Verification successful but failed to save. Please contact support.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return NextResponse.json(
      { error: 'Failed to process verification' },
      { status: 500 }
    );
  }
}
