/**
 * Blindfold v3 - Agent Runtime System
 * Agentes proactivos con comunicación, propuestas y colaboración
 * Compatible con Vercel (usa mock data si no hay archivos locales)
 */

const fs = require('fs');
const path = require('path');

// ============ MOCK DATA ============
const MOCK_AGENTS = [
  { id: 'orchestrator', name: 'Orchestrator', role: 'AI Orchestrator', status: 'active', color: '#ff3366', capabilities: ['coordination', 'planning', 'delegation'], currentTask: 'Coordinando equipos', lastActive: new Date().toISOString(), suggestionCount: 3 },
  { id: 'frontend_specialist', name: 'Frontend Specialist', role: 'Frontend Developer', status: 'active', color: '#00d4ff', capabilities: ['react', 'vue', 'css', 'ui_ux'], currentTask: 'Desarrollo UI', lastActive: new Date().toISOString(), suggestionCount: 2 },
  { id: 'backend_specialist', name: 'Backend Specialist', role: 'Backend Developer', status: 'thinking', color: '#00d4ff', capabilities: ['node', 'python', 'apis', 'databases'], currentTask: 'API Design', lastActive: new Date().toISOString(), suggestionCount: 1 },
  { id: 'database_architect', name: 'Database Architect', role: 'Database Designer', status: 'idle', color: '#10b981', capabilities: ['sql', 'nosql', 'optimization', 'schema'], currentTask: null, lastActive: new Date().toISOString(), suggestionCount: 0 },
  { id: 'devops_engineer', name: 'Devops Engineer', role: 'DevOps Specialist', status: 'active', color: '#f59e0b', capabilities: ['docker', 'kubernetes', 'ci_cd', 'cloud'], currentTask: 'CI/CD Pipeline', lastActive: new Date().toISOString(), suggestionCount: 2 },
  { id: 'penetration_tester', name: 'Penetration Tester', role: 'Security Expert', status: 'collaborating', color: '#ff3366', capabilities: ['security', 'penetration', 'audit', 'compliance'], currentTask: 'Security Audit', lastActive: new Date().toISOString(), suggestionCount: 1 },
];

const MOCK_PROPOSALS = [
  { id: 'prop_1', agent: 'Explorer Agent', agentId: 'explorer_agent', task: 'Investigar nuevas tendencias en IA', reason: 'Es importante mantenernos actualizados', expectedOutcome: 'Reporte de recomendaciones', priority: 'medium', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
  { id: 'prop_2', agent: 'Devops Engineer', agentId: 'devops_engineer', task: 'Revisar infraestructura', reason: 'Tiempos de build elevados', expectedOutcome: 'Optimización de pipeline', priority: 'high', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
  { id: 'prop_3', agent: 'Qa Automation Engineer', agentId: 'qa_engineer', task: 'Aumentar cobertura de tests', reason: 'Coverage al 72%', expectedOutcome: '50+ nuevos tests', priority: 'medium', status: 'pending', createdAt: new Date().toISOString(), votes: [], dependencies: [] },
];

const MOCK_TASKS = [
  { id: 'task_1', proposalId: 'prop_1', agent: 'Frontend Specialist', task: 'Dashboard UI', reason: 'Rediseño', expectedOutcome: 'UI moderna', status: 'in_progress', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), progress: 75, comments: 3 },
  { id: 'task_2', agent: 'Backend Specialist', task: 'API REST', reason: 'Nuevos endpoints', expectedOutcome: 'API funcional', status: 'completed', completedAt: new Date(Date.now() - 3600000).toISOString(), updatedAt: new Date(Date.now() - 3600000).toISOString(), result: 'API deployed' },
  { id: 'task_3', agent: 'Devops Engineer', task: 'Docker setup', reason: 'Contenedores', expectedOutcome: 'Setup completo', status: 'completed', completedAt: new Date(Date.now() - 7200000).toISOString(), updatedAt: new Date(Date.now() - 7200000).toISOString(), result: 'Dockerfile y compose' },
];

const MOCK_MESSAGES = {
  messages: [
    { id: 'msg_1', from: 'Orchestrator', type: 'system', content: 'Nueva sesión iniciada', timestamp: new Date().toISOString() },
    { id: 'msg_2', from: 'Frontend Specialist', type: 'task_completed', content: 'Dashboard completado', timestamp: new Date().toISOString() },
  ],
  feedbacks: [],
  updatedAt: new Date().toISOString()
};

// ============ VERCEL-COMPATIBLE FUNCTIONS ============
function getAgentState() {
  return MOCK_AGENTS.map(a => ({
    ...a,
    lastActive: a.lastActive || new Date().toISOString()
  }));
}

function getProposals() {
  return MOCK_PROPOSALS;
}

function getTasks() {
  return MOCK_TASKS;
}

function getMessages() {
  return MOCK_MESSAGES;
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

function generateAutoProposals() {
  return MOCK_PROPOSALS;
}

// ============ EXPORTS ============
module.exports = {
  getAgentState,
  getProposals,
  getTasks,
  getMessages,
  createProposal,
  approveProposal,
  completeTask,
  generateAutoProposals
};
