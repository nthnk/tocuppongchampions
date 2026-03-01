import { NextResponse } from 'next/server';

// Ensure this route is never cached — team count must be live
export const dynamic = 'force-dynamic';

const MAX_TEAMS = 64;

export async function GET() {
  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

  if (!sheetsUrl) {
    console.error('GOOGLE_SHEETS_URL not set');
    // If we can't check, assume not full (fail open for registration)
    return NextResponse.json({ teamCount: 0, maxTeams: MAX_TEAMS, isFull: false });
  }

  try {
    // doGet on the Apps Script returns { teamCount: N }
    // cache: 'no-store' prevents Next.js from caching this fetch
    const response = await fetch(sheetsUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    // Google Apps Script redirects — follow it
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // If redirect returned HTML, try fetching the redirect URL
      console.error('Failed to parse team count response, assuming not full');
      return NextResponse.json({ teamCount: 0, maxTeams: MAX_TEAMS, isFull: false });
    }

    const teamCount = data.teamCount || 0;

    return NextResponse.json({
      teamCount,
      maxTeams: MAX_TEAMS,
      isFull: teamCount >= MAX_TEAMS,
    });
  } catch (error) {
    console.error('Error fetching team count:', error);
    return NextResponse.json({ teamCount: 0, maxTeams: MAX_TEAMS, isFull: false });
  }
}
