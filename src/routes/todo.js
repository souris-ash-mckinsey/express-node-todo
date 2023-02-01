const express = require('express');
const {  
  createTaskController, 
  deleteTaskController,
  getTaskController, 
  getAllTasksController,
  putTaskController,
  patchTaskController
} = require('../controllers/todo');

const todoRoute = express.Router();

todoRoute.get('/tasks', getAllTasksController);

todoRoute.get('/tasks/:taskId', getTaskController);

todoRoute.post('/tasks', createTaskController);

todoRoute.put('/tasks/:taskId', putTaskController);

todoRoute.patch('/tasks/:taskId', patchTaskController);

todoRoute.delete('/tasks/:taskId', deleteTaskController);

module.exports = { todoRoute };