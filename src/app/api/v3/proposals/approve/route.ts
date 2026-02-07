import { NextResponse } from 'next/server';
var runtime = require('./lib/runtime');

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    var body = await request.json();
    var proposalId = body.proposalId;
    var approved = body.approved;
    var approvedBy = body.approvedBy || 'user';
    
    if (!proposalId) {
      return NextResponse.json(
        { error: 'proposalId is required' },
        { status: 400 }
      );
    }
    
    var proposal = runtime.approveProposal(proposalId, approved, approvedBy);
    
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }
    
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
