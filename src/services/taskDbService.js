const { ServerError } = require('../errors');
const { Task } = require('../../database/models');

const tasksDbService = {
  add: async (taskObject) => {
    const task = await Task.create(taskObject);
    return task.id;
  },
  getAll: async () => {
    const allUsers = await Task.findAll();
    return allUsers;
  },
  get: async (id) => {
    try {
      const task = await Task.findOne({
        where: {
          id: Number(id)
        }
      });

      return task;
    } catch (err) {
      throw new ServerError(err, 500);
    }
  },
  getCompleted: async () => {
    const completedTasks = await Task.findAll({
      isCompleted: true
    });

    return completedTasks;
  },
  getActive: async () => {
    const activeTasks = await Task.findAll({
      where: {
        isCompleted: false
      }
    });

    return activeTasks;
  },
  removeCompleted: async () => {
    await Task.destroy({
      where: {
        isCompleted: true
      }
    });
  },
  deleteTask: async (id) => {
    await Task.destroy({
      where: {
        id: Number(id)
      }
    });
  },
  update: async (newTask) => {
    const taskId = newTask.id;
    delete newTask['id'];
    await Task.update(newTask, {
      where: {
        id: taskId
      }
    });
  }
};

module.exports = { tasksDbService };