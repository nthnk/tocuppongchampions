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
        const { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName, referredBy } = verification.formData;

        // Send confirmation email to participant
        await resend.emails.send({
          from: '6cups <noreply@tocuppongchampions.ca>',
          to: email,
          subject: 'Table Zero - You\'re on the list',
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
      margin: 10px 0 0 0;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .content {
      padding: 40px 30px;
    }
    .success-badge {
      background-color: #f61813;
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
      <h1>TABLE <span>ZERO</span></h1>
      <p>6cups presents</p>
    </div>

    <div class="content">
      <div class="success-badge">
        You're on the list
      </div>

      <p style="color: #fffafa; font-size: 16px; opacity: 0.9;">
        You've signed up for Table Zero. Your spot isn't guaranteed yet - we'll be in touch to confirm.
      </p>

      <div class="team-info">
        <h3>Your Team</h3>
        <p><strong>Team:</strong> ${teamName}</p>
        <p><strong>Player 1:</strong> ${player1FirstName} ${player1LastName}</p>
        <p><strong>Player 2:</strong> ${player2FirstName} ${player2LastName}</p>
        ${referredBy ? `<p><strong>Referred by:</strong> ${referredBy}</p>` : ''}
      </div>

      <div class="next-steps">
        <h3>Want to improve your chances?</h3>
        <ul>
          <li>Invite friends - if they sign up and mention your name, you both move up</li>
          <li>Tag us on socials (@cuppongdudes on Instagram)</li>
          <li>Send us a trick shot video</li>
        </ul>
      </div>

      <div class="info-section">
        <h3>Event Details</h3>
        <p><strong>When:</strong> April 2026</p>
        <p><strong>Where:</strong> Toronto (venue TBD)</p>
        <p><strong>Cost:</strong> $10 per duo (payment details sent once your spot is confirmed)</p>
        <p><strong>Format:</strong> 32 teams, bracket style</p>
      </div>

      <div class="social-links">
        <p>Follow for updates</p>
        <p>
          <a href="https://www.instagram.com/cuppongdudes/">@cuppongdudes</a>
        </p>
      </div>

      <p style="color: #fffafa; opacity: 0.6; margin-top: 30px; font-size: 13px;">
        Questions? <a href="mailto:info@tocuppongchampions.ca" style="color: #f61813;">info@tocuppongchampions.ca</a>
      </p>
    </div>

    <div class="footer">
      <p>6cups • Table Zero • April 2026 • Toronto</p>
    </div>
  </div>
</body>
</html>
          `,
        });

        // Send admin notification email
        await resend.emails.send({
          from: '6cups <noreply@tocuppongchampions.ca>',
          to: 'nknathankoo@gmail.com',
          subject: 'Table Zero - New Signup',
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
      background-color: #f61813;
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
      <h1>New Table Zero Signup</h1>
    </div>

    <div class="content">
      <p style="color: #fffafa; font-size: 14px; margin-bottom: 20px; opacity: 0.8;">
        A new team has joined the Table Zero waitlist.
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
        ${referredBy ? `
        <div class="info-row">
          <span class="info-label">Referred by:</span>
          <span class="info-value">${referredBy}</span>
        </div>
        ` : ''}
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
