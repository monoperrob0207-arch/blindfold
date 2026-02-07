import { NextResponse } from 'next/server';
var runtime = require('./lib/runtime');

export const dynamic = 'force-dynamic';

export function GET() {
  try {
    const proposals = runtime.getProposals();
    return NextResponse.json({
      proposals: proposals,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    var body = await request.json();
    var agentName = body.agentName;
    var task = body.task;
    var reason = body.reason || '';
    var expectedOutcome = body.expectedOutcome || '';
    var priority = body.priority || 'medium';
    
    if (!agentName || !task) {
      return NextResponse.json(
        { error: 'agentName and task are required' },
        { status: 400 }
      );
    }
    
    var proposal = runtime.createProposal(agentName, task, reason, expectedOutcome, priority);
    
    return NextResponse.json({
      proposal: proposal,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
