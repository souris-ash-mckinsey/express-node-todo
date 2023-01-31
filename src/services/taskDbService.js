const { ServerError } = require('../errors');
const db = require('../../database/models');

const tasksDbService = {
  add: async (taskObject) => {
    const task = await db.Task.create(taskObject);
    return task.id;
  },
  getAll: async () => {
    const allUsers = await db.Task.findAll();
    return allUsers;
  },
  get: async (id) => {
    try {
      const task = await db.Task.findOne({
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
    const completedTasks = await db.Task.findAll({
      isCompleted: true
    });

    return completedTasks;
  },
  getActive: async () => {
    const activeTasks = await db.Task.findAll({
      where: {
        isCompleted: false
      }
    });

    return activeTasks;
  },
  removeCompleted: async () => {
    await db.Task.destroy({
      where: {
        isCompleted: true
      }
    });
  },
  deleteTask: async (id) => {
    await db.Task.destroy({
      where: {
        id: Number(id)
      }
    });
  },
  update: async (newTask) => {
    const taskId = newTask.id;
    delete newTask['id'];
    await db.Task.update(newTask, {
      where: {
        id: taskId
      }
    });
  }
};

module.exports = { tasksDbService };