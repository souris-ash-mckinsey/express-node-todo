const { ServerError } = require('./errors');

const tasksData = {
  data: [
    {
      id: 0,
      name: 'Lorem ipsum',
      isCompleted: false
    }
  ],
  add(taskObject) {
    const nextId = this.data.length;
    this.data.push({ id: nextId, ...taskObject });
    return nextId;
  },
  getAll() {
    return this.data;
  },
  get(id) {
    const result = this.data.filter((entry) => entry.id == Number(id))[0];
    if (result == undefined) {
      throw new ServerError(`No task found with id = ${id}`, 404);
    }
    
    return result;
  },
  getCompleted() {
    return this.data.filter((entry) => entry.isCompleted);
  },
  getActive() {
    return this.data.filter((entry) => !entry.isCompleted);
  },
  removeCompleted() {
    this.data = this.data.filter((entry) => !entry.isCompleted);
  },
  deleteTask(id) {
    this.data = this.data.filter((entry) => entry.id != Number(id));
  },
  update(newTask) {
    this.data.splice(newTask.id, 1, newTask);
  }
};

module.exports = { tasksData };