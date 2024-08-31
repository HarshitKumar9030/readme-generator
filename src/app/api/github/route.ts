import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  return NextResponse.json(data);
}