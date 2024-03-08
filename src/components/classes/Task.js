class Task {
  // ALL TIME IS IN SECONDS !!!!!!!

  constructor(id, name, description, goalTime, actualTime, breakTime, goalTimeStamp, breakTimeStamp) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.goalTime = goalTime; // This is the time you hope to finish the task in
    this.actualTime = actualTime; // This is the actual time they finished in
    this.breakTime = breakTime; // This is how often you want to take a break (Example: if a user sets it to 30 mins then, every 30mins there is a break)
    this.goalTimeStamp = goalTimeStamp;
    this.breakTimeStamp = breakTimeStamp;
  }
  //methods
}

export default Task;
