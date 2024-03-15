class Task {
  // ALL TIME IS IN SECONDS !!!!!!!

  constructor(
    id,
    name,
    description,
    goalTime,
    actualTime,
    breakTime,
    goalTimeStamp,
    breakTimeStamp,
    isCompleted
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.goalTime = goalTime; // This is the time you hope to finish the task in
    this.actualTime = actualTime; // This is the actual time they finished in
    this.breakTime = breakTime; // This is how often you want to take a break (Example: if a user sets it to 30 mins then, every 30mins there is a break)
    this.goalTimeStamp = goalTimeStamp;
    this.breakTimeStamp = breakTimeStamp;
    this.isCompleted = isCompleted;
  }
  //methods
}

export default Task;
