const express = require('express');
const { tasksData } = require('./src/inMemoryDatastore');

const app = express();
app.use(express.json());

const port = process.env.PORT || 8002;

app.get('/tasks', (req, res) => {
  if (req.query.isCompleted == undefined) {
    res.send(JSON.stringify(tasksData.getAll()));
    return;
  }

  res.send(JSON.stringify(
    req.query.isCompleted == 'true' ? tasksData.getCompleted() : tasksData.getActive()
  ));
});

app.get('/tasks/:taskId', (req, res) => {
  res.send(JSON.stringify(tasksData.get(req.params.taskId)));
});

app.post('/tasks', (req, res) => {
  tasksData.add({...req.body, isCompleted: false});
  res.sendStatus(201);
});

app.put('/tasks/:taskId', (req, res) => {
  tasksData.update({...req.body, id: Number(req.params.taskId)});
  res.sendStatus(200);
});

app.patch('/tasks/:taskId', (req, res) => {
  let task = tasksData.get(req.params.taskId);
  tasksData.update({ ...task, ...req.body });
  res.sendStatus(200);
});

app.delete('/tasks/:taskId', (req, res) => {
  tasksData.deleteTask(req.params.taskId);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`TODO app listening on port ${port}`);
});