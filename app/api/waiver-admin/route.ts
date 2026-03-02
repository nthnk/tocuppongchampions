import { NextRequest, NextResponse } from 'next/server';
import { getAllWaivers, searchWaivers } from '@/lib/waiver-db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, query } = body;

    // Verify admin password
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    // Search or get all
    const waivers = query && query.trim()
      ? searchWaivers(query.trim())
      : getAllWaivers();

    // Strip signature data from response (it's large)
    const sanitized = waivers.map(({ signature_data, ...rest }) => rest);

    return NextResponse.json({ waivers: sanitized, total: sanitized.length });
  } catch (error: any) {
    console.error('[Waiver Admin] Error:', error);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
