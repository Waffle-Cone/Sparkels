import Project from "../classes/Project";
import Task from "../classes/Task";

const first = new Project(1, "MAD 888", "This is soooo long", "2024-02-22");
first.tasks.push(new Task(1, "React Native 1", "Helppp"));
first.tasks.push(new Task(1.1, "React Native 1.1", "Helppp"));

const second = new Project(2, "MAD 222", "This is soooo long", "2024-02-22");
second.tasks.push(new Task(2, "React Native 2", "Helppp"));

const third = new Project(3, "MAD 3", "This is soooo long", "2024-02-22");
third.tasks.push(new Task(3, "React Native 3", "Helppp"));

const fourth = new Project(4, "MAD 4", "This is soooo long", "2024-02-22");
fourth.tasks.push(new Task(4, "React Native 4", "Helppp"));

export const initialProjects = [first, second, third, fourth];
