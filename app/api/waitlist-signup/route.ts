import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, player1FirstName, player1LastName, player2FirstName, player2LastName, email } = body;

    if (!teamName || !player1FirstName || !player1LastName || !player2FirstName || !player2LastName || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
    if (!sheetsUrl) {
      console.error('GOOGLE_SHEETS_URL not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send to Google Sheets with waitlist flag
    const sheetsPayload = {
      waitlist: true,
      timestamp: new Date().toISOString(),
      teamName,
      player1FirstName,
      player1LastName,
      player2FirstName,
      player2LastName,
      email,
    };

    const sheetsResponse = await fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetsPayload),
    });

    if (!sheetsResponse.ok && !sheetsResponse.redirected) {
      console.error('Google Sheets waitlist error:', sheetsResponse.status);
    }

    return NextResponse.json(
      { message: 'Added to waitlist successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in waitlist-signup:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
