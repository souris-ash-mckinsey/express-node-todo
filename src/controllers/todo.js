const { tasksDbService } = require('../services/taskDbService');

const createTaskController = async (todoObj) => {
  return await tasksDbService.add({...todoObj, isCompleted: false});
};

const deleteTaskController = async (taskId) => {
  await tasksDbService.deleteTask(taskId);
};

const updateTaskController = async (todoObj, taskId) => {
  await tasksDbService.update({...todoObj, id: Number(taskId)});
};

const partialUpdateTaskController = async (todoObj, taskId) => {
  let task = tasksDbService.get(taskId);
  await tasksDbService.update({ ...task, ...todoObj });
};

const getTaskController = async (taskId) => {
  return await tasksDbService.get(taskId);
};

const getAllTasksController = async (completed) => {
  if (completed === undefined) {
    return await tasksDbService.getAll();
  }
  else {
    return completed ? await tasksDbService.getCompleted() : await tasksDbService.getActive();
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