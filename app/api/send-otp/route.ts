import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateOTP, storeOTP, checkRateLimit } from '@/lib/otp';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName, email, referredBy } = body;

    // Validate required fields
    if (!teamName || !player1FirstName || !player1LastName || !player2FirstName || !player2LastName || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check rate limit
    const rateLimit = checkRateLimit(email);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: rateLimit.error },
        { status: 429 }
      );
    }

    // Generate OTP
    const otpCode = generateOTP();

    // DEV: Log OTP code to console for testing
    console.log(`🔐 OTP CODE for ${email}: ${otpCode}`);

    // Store OTP with form data
    storeOTP(email, otpCode, { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName, email, referredBy: referredBy || '' });

    // Send OTP email via Resend
    try {
      await resend.emails.send({
        from: '6cups <noreply@tocuppongchampions.ca>',
        to: email,
        subject: 'Table Zero - Verification Code',
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
    .otp-box {
      background-color: #141414;
      border: 1px solid #141414;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
    }
    .otp-code {
      font-size: 42px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #f61813;
      font-family: 'Courier New', monospace;
    }
    .otp-label {
      font-size: 11px;
      color: #fffafa;
      opacity: 0.5;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 15px;
    }
    .team-info {
      background-color: #141414;
      padding: 20px;
      margin: 20px 0;
      border-left: 2px solid #f61813;
    }
    .team-info p {
      margin: 8px 0;
      font-size: 14px;
      color: #fffafa;
      opacity: 0.8;
    }
    .team-info strong {
      color: #fffafa;
    }
    .info-box {
      background-color: #141414;
      border-left: 2px solid #f61813;
      padding: 15px 20px;
      margin: 20px 0;
    }
    .info-box p {
      margin: 5px 0;
      font-size: 13px;
      color: #fffafa;
      opacity: 0.7;
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
      <p style="color: #fffafa; font-size: 16px; margin-top: 0;">
        Enter this code to complete your registration for <strong>${teamName}</strong>.
      </p>

      <div class="team-info">
        <p><strong>Team:</strong> ${teamName}</p>
        <p><strong>Player 1:</strong> ${player1FirstName} ${player1LastName}</p>
        <p><strong>Player 2:</strong> ${player2FirstName} ${player2LastName}</p>
      </div>

      <div class="otp-box">
        <div class="otp-code">${otpCode}</div>
        <div class="otp-label">Verification Code</div>
      </div>

      <div class="info-box">
        <p><strong>This code expires in 10 minutes.</strong></p>
        <p>If you didn't request this, ignore this email.</p>
      </div>

      <p style="color: #fffafa; opacity: 0.6; margin-top: 30px; font-size: 13px;">
        Questions? <a href="mailto:info@tocuppongchampions.ca" style="color: #f61813;">info@tocuppongchampions.ca</a>
      </p>
    </div>

    <div class="footer">
      <p>6cups • Table Zero • March 2026 • Toronto</p>
    </div>
  </div>
</body>
</html>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'OTP sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in send-otp:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
