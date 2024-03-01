class Project {
  tasks = [];

  //task objects list
  constructor(id, name, description, dueDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
  }
}

export default Project;
