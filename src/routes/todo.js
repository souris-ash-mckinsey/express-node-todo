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

todoRoute.get('/tasks', async (req, res) => {
  if (req.query.isCompleted == undefined) {
    res.send(JSON.stringify(getAllTasksController()));
    return;
  }

  res.send(JSON.stringify(
    await getAllTasksController(req.query.isCompleted == 'true' ? true : false)
  ));
});

todoRoute.get('/tasks/:taskId', async (req, res) => {
  res.send(JSON.stringify(await getTaskController(req.params.taskId)));
});

todoRoute.post('/tasks', async (req, res) => {
  const id = await createTaskController(req.body);
  res.status(201);
  res.send(JSON.stringify({ id: id}));
});

todoRoute.put('/tasks/:taskId', async (req, res) => {
  await updateTaskController(req.body, req.params.taskId);
  res.sendStatus(200);
});

todoRoute.patch('/tasks/:taskId', async (req, res) => {
  await partialUpdateTaskController(req.body, req.params.taskId);
  res.sendStatus(200);
});

todoRoute.delete('/tasks/:taskId', async (req, res) => {
  await deleteTaskController(req.params.taskId);
  res.sendStatus(200);
});

module.exports = { todoRoute };