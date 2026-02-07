/**
 * Blindfold v3 - Communication Runtime (Vercel-compatible mock)
 */
const MOCK_MESSAGES = {
  messages: [
    { id: 'msg_1', from: 'Orchestrator', type: 'system', content: 'Sistema iniciado', timestamp: new Date().toISOString() },
    { id: 'msg_2', from: 'Frontend Specialist', type: 'task_completed', content: 'Dashboard UI completado', timestamp: new Date().toISOString() },
    { id: 'msg_3', from: 'Devops Engineer', type: 'proposal', content: 'Nueva propuesta: Revisar infraestructura', timestamp: new Date().toISOString() },
  ],
  feedbacks: [],
  updatedAt: new Date().toISOString()
};

function getMessages() {
  return MOCK_MESSAGES;
}

module.exports = { getMessages };
