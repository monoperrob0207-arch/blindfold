/**
 * Blindfold v3 - Proposals Approve Runtime (Vercel-compatible mock)
 */
const MOCK_PROPOSALS = [
  { id: 'prop_1', agent: 'Explorer Agent', agentId: 'explorer_agent', task: 'Investigar nuevas tendencias en IA', reason: 'Mantenerse actualizado', expectedOutcome: 'Reporte de recomendaciones', priority: 'medium', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
  { id: 'prop_2', agent: 'Devops Engineer', agentId: 'devops_engineer', task: 'Revisar infraestructura', reason: 'Tiempos elevados', expectedOutcome: 'Optimización', priority: 'high', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
  { id: 'prop_3', agent: 'Qa Automation Engineer', agentId: 'qa_engineer', task: 'Aumentar cobertura de tests', reason: 'Coverage al 72%', expectedOutcome: '50+ nuevos tests', priority: 'medium', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
];

const MOCK_TASKS = [
  { id: 'task_1', agent: 'Frontend Specialist', task: 'Dashboard UI', status: 'in_progress', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), progress: 75, comments: 3 },
  { id: 'task_2', agent: 'Backend Specialist', task: 'API REST', status: 'completed', completedAt: new Date(Date.now() - 3600000).toISOString(), result: 'API deployed' },
];

function getProposals() {
  return MOCK_PROPOSALS;
}

function getTasks() {
  return MOCK_TASKS;
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
    
    if (approved) {
      const task = {
        id: 'task_' + Date.now(),
        proposalId,
        agent: proposal.agent,
        task: proposal.task,
        reason: proposal.reason,
        expectedOutcome: proposal.expectedOutcome,
        status: 'in_progress',
        startedAt: new Date().toISOString()
      };
      MOCK_TASKS.unshift(task);
    }
    return proposal;
  }
  return null;
}

function completeTask(taskId, result) {
  const task = MOCK_TASKS.find(t => t.id === taskId);
  if (task) {
    task.status = 'completed';
    task.completedAt = new Date().toISOString();
    task.result = result;
    return task;
  }
  return null;
}

module.exports = { getProposals, getTasks, createProposal, approveProposal, completeTask };
