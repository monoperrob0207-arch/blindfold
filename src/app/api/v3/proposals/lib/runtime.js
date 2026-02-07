/**
 * Blindfold v3 - Proposals Runtime (Vercel-compatible mock)
 */
const MOCK_PROPOSALS = [
  { id: 'prop_1', agent: 'Explorer Agent', agentId: 'explorer_agent', task: 'Investigar nuevas tendencias en IA', reason: 'Mantenerse actualizado', expectedOutcome: 'Reporte de recomendaciones', priority: 'medium', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
  { id: 'prop_2', agent: 'Devops Engineer', agentId: 'devops_engineer', task: 'Revisar infraestructura', reason: 'Tiempos elevados', expectedOutcome: 'Optimización', priority: 'high', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
  { id: 'prop_3', agent: 'Qa Automation Engineer', agentId: 'qa_engineer', task: 'Aumentar cobertura de tests', reason: 'Coverage al 72%', expectedOutcome: '50+ nuevos tests', priority: 'medium', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
];

function getProposals() {
  return MOCK_PROPOSALS;
}

function createProposal(agentName, task, reason, expectedOutcome, priority) {
  const proposal = {
    id: 'prop_' + Date.now(),
    agent: agentName,
    agentId: agentName.toLowerCase().replace(/\s+/g, '_'),
    task,
    reason,
    expectedOutcome,
    priority,
    status: 'pending',
    createdAt: new Date().toISOString(),
    votes: [],
    dependencies: []
  };
  MOCK_PROPOSALS.unshift(proposal);
  return proposal;
}

function approveProposal(proposalId, approved, approvedBy = 'user') {
  const proposal = MOCK_PROPOSALS.find(p => p.id === proposalId);
  if (proposal) {
    proposal.status = approved ? 'approved' : 'rejected';
    proposal.approvedBy = approvedBy;
    proposal.approvedAt = new Date().toISOString();
    return proposal;
  }
  return null;
}

module.exports = { getProposals, createProposal, approveProposal };
