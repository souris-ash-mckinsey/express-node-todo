const { tasksData } = require('../services/inMemoryDatastore');

const createTaskController = (todoObj) => {
  tasksData.add({...todoObj.body, isCompleted: false});
};

const deleteTaskController = (taskId) => {
  tasksData.deleteTask(taskId);
};

const updateTaskController = (todoObj, taskId) => {
  tasksData.update({...todoObj.body, id: Number(taskId)});
};

const partialUpdateTaskController = (todoObj, taskId) => {
  let task = tasksData.get(taskId);
  tasksData.update({ ...task, ...todoObj.body });
};

const getTaskController = (taskId) => {
  return tasksData.get(taskId);
};

const getAllTasksController = (completed) => {
  if (completed === undefined) {
    return tasksData.getAll();
  }
  else {
    return completed ? tasksData.getCompleted() : tasksData.getActive();
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