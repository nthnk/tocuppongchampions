import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateOTP, storeOTP, checkRateLimit } from '@/lib/otp';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName, email } = body;

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
    storeOTP(email, otpCode, { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName, email });

    // Send OTP email via Resend
    try {
      await resend.emails.send({
        from: 'Toronto Cup Pong Championship <noreply@tocuppongchampions.ca>',
        to: email,
        subject: 'Your Toronto Cup Pong Championship Verification Code',
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
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 40px 30px;
    }
    .otp-box {
      background: linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%);
      border: 2px solid #2563eb;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
    }
    .otp-code {
      font-size: 42px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #2563eb;
      font-family: 'Courier New', monospace;
    }
    .otp-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 10px;
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
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    .team-info {
      background-color: #f0f9ff;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
    }
    .team-info strong {
      color: #1e40af;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏆 TORONTO CUP PONG CHAMPIONSHIP</h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">The Inaugural Fall Classic</p>
    </div>

    <div class="content">
      <h2 style="color: #1f2937; margin-top: 0;">Verify Your Waitlist Registration</h2>

      <p style="color: #4b5563; font-size: 16px;">
        Welcome to the waitlist! Enter this verification code to complete your registration for <strong>${teamName}</strong>.
      </p>

      <div class="team-info">
        <p style="margin: 5px 0;"><strong>Team Name:</strong> ${teamName}</p>
        <p style="margin: 5px 0;"><strong>Player 1:</strong> ${player1FirstName} ${player1LastName}</p>
        <p style="margin: 5px 0;"><strong>Player 2:</strong> ${player2FirstName} ${player2LastName}</p>
      </div>

      <div class="otp-box">
        <div class="otp-code">${otpCode}</div>
        <div class="otp-label">Your Verification Code</div>
      </div>

      <div class="info-box">
        <p><strong>⏱️ This code expires in 10 minutes</strong></p>
        <p>If you didn't request this code, you can safely ignore this email.</p>
      </div>

      <p style="color: #4b5563; margin-top: 30px;">
        Questions? Reply to this email or contact us at <a href="mailto:info@tocuppongchampions.ca" style="color: #2563eb;">info@tocuppongchampions.ca</a>
      </p>
    </div>

    <div class="footer">
      <p>Toronto Cup Pong Championship • September 2026 • Downtown Toronto</p>
      <p style="margin-top: 10px;">Where precision meets competition</p>
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
