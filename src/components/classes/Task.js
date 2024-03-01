class Task {
  //task objects list
  tasks = [];

  constructor(id, name, description, goalTime, actualTime, breakTime) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.goalTime = goalTime; // This is the time you hope to finish the task in
    this.actualTime = actualTime; // This is the actual time they finished in
    this.breakTime = breakTime; // This is how often you want to take a break (Example: if a user sets it to 30 mins then, every 30mins there is a break)
  }
  //methods
}

export default Task;
