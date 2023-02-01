const { tasksDbService } = require('../services/taskDbService');

const createTaskController = async (req, res) => {
  const todoObj = req.body;
  const id = await tasksDbService.add({...todoObj, isCompleted: false});
  res.status(201);
  res.send(JSON.stringify({ id: id}));
};

const deleteTaskController = async (req, res) => {
  await tasksDbService.deleteTask(req.params.taskId);
  res.sendStatus(200);
};

const patchTaskController = async (req, res) => {
  const todoObj = req.body;
  const taskId = req.params.taskId;
  let task = tasksDbService.get(taskId);
  await tasksDbService.update({ ...task, ...todoObj });
  res.sendStatus(200);
};

const putTaskController = async (req, res) => {
  const todoObj = req.body;
  const taskId = req.params.taskId;
  await tasksDbService.update({...todoObj, id: Number(taskId)});
  res.sendStatus(200);
};

const getTaskController = async (req, res) => {
  res.send(JSON.stringify(await tasksDbService.get(req.params.taskId)));
};

const getAllTasksController = async (req, res) => {
  if (req.query.isCompleted == undefined) {
    res.send(JSON.stringify(await tasksDbService.getAll()));
    return;
  }

  res.send(JSON.stringify(
    req.query.isCompleted == 'true' 
      ? await tasksDbService.getCompleted() 
      : await tasksDbService.getActive())
  );
};

module.exports = { 
  createTaskController, 
  deleteTaskController, 
  patchTaskController,
  putTaskController,
  getTaskController,
  getAllTasksController 
};