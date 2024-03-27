class Project {
  //task objects list
  constructor(id, name, description, dueDate, isCompleted) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = [];
    this.isCompleted = isCompleted;
    this.selectedColor = ["#D8DCFF", "#484F8A"]; // [backgroundColor, borderColor]
  }
}

export default Project;
