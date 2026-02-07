import { NextResponse } from 'next/server';
var runtime = require('./lib/runtime');

export const dynamic = 'force-dynamic';

export function GET() {
  try {
    const communication = runtime.getMessages();
    return NextResponse.json(communication);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
