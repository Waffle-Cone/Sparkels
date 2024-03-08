class Project {
  //task objects list
  constructor(id, name, description, dueDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = [];
  }
}

export default Project;
