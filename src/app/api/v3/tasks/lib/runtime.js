/**
 * Blindfold v3 - Tasks Runtime (Vercel-compatible mock)
 */
const MOCK_TASKS = [
  { id: 'task_1', agent: 'Frontend Specialist', task: 'Dashboard UI', status: 'in_progress', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), progress: 75, comments: 3 },
  { id: 'task_2', agent: 'Backend Specialist', task: 'API REST', status: 'completed', completedAt: new Date(Date.now() - 3600000).toISOString(), result: 'API deployed' },
  { id: 'task_3', agent: 'Devops Engineer', task: 'Docker setup', status: 'completed', completedAt: new Date(Date.now() - 7200000).toISOString(), result: 'Dockerfile y compose' },
];

function getTasks() {
  return MOCK_TASKS;
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

module.exports = { getTasks, completeTask };
