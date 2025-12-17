import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';

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
