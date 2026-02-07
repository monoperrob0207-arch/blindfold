import { NextResponse } from 'next/server';
var runtime = require('./lib/runtime');

export const dynamic = 'force-dynamic';

export function GET() {
  try {
    const tasks = runtime.getTasks();
    return NextResponse.json({
      tasks: tasks,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
