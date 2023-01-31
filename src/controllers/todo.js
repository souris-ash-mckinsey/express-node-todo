const { tasksDbService } = require('../services/taskDbService');
const tasksData = tasksDbService;

const createTaskController = async (todoObj) => {
  return await tasksData.add({...todoObj, isCompleted: false});
};

const deleteTaskController = async (taskId) => {
  await tasksData.deleteTask(taskId);
};

const updateTaskController = async (todoObj, taskId) => {
  await tasksData.update({...todoObj, id: Number(taskId)});
};

const partialUpdateTaskController = async (todoObj, taskId) => {
  let task = tasksData.get(taskId);
  await tasksData.update({ ...task, ...todoObj });
};

const getTaskController = async (taskId) => {
  return await tasksData.get(taskId);
};

const getAllTasksController = async (completed) => {
  if (completed === undefined) {
    return await tasksData.getAll();
  }
  else {
    return completed ? await tasksData.getCompleted() : await tasksData.getActive();
  }
};

module.exports = { 
  createTaskController, 
  deleteTaskController, 
  updateTaskController, 
  partialUpdateTaskController, 
  getAllTasksController, 
  getTaskController 
};