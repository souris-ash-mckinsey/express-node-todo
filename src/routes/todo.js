const express = require('express');
const { 
  getAllTasksController, 
  createTaskController, 
  deleteTaskController, 
  updateTaskController, 
  partialUpdateTaskController, 
  getTaskController 
} = require('../controllers/todo');

const todoRoute = express.Router();

todoRoute.get('/tasks', (req, res) => {
  if (req.query.isCompleted == undefined) {
    res.send(JSON.stringify(getAllTasksController()));
    return;
  }

  res.send(JSON.stringify(
    getAllTasksController(req.query.isCompleted == 'true' ? true : false)
  ));
});

todoRoute.get('/tasks/:taskId', (req, res) => {
  res.send(JSON.stringify(getTaskController(req.params.taskId)));
});

todoRoute.post('/tasks', (req, res) => {
  createTaskController(req.body);
  res.sendStatus(201);
});

todoRoute.put('/tasks/:taskId', (req, res) => {
  updateTaskController(req.body, req.params.taskId);
  res.sendStatus(200);
});

todoRoute.patch('/tasks/:taskId', (req, res) => {
  partialUpdateTaskController(req.body, req.params.taskId);
  res.sendStatus(200);
});

todoRoute.delete('/tasks/:taskId', (req, res) => {
  deleteTaskController(req.params.taskId);
  res.sendStatus(200);
});

module.exports = { todoRoute };