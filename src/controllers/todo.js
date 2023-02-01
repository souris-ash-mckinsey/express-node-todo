const { tasksDbService } = require('../services/taskDbService');

const createTaskController = async (req, res) => {
  const todoObj = req.body;
  const newObj = {...todoObj, isCompleted: false};
  const id = await tasksDbService.add(newObj);
  res.status(201);
  res.send(JSON.stringify({ id: id, ...newObj}));
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
  res.send(JSON.stringify({ id: taskId, ...todoObj}));
};

const putTaskController = async (req, res) => {
  const todoObj = req.body;
  const taskId = req.params.taskId;
  await tasksDbService.update({...todoObj, id: Number(taskId)});
  res.send(JSON.stringify({ id: taskId, ...todoObj }));
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