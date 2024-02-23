class Project {
  //task objects list
  tasks = [];

  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
  //methods

  getId = () => {
    return this.id;
  };

  getName = () => {
    return this.name;
  };

  getDescription = () => {
    return this.description;
  };

  addTask = (task) => {
    this.tasks.push(task);
  };

  getTasks = () => {
    return this.tasks;
  };
}

export default Project;
