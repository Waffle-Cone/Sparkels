import Project from "../classes/Project";
import Task from "../classes/Task";

const first = new Project(1, "MAD 888", "This is soooo long", "2024-02-22");
first.tasks.push(new Task(1, "React Native", "Helppp", 900, false, 300, 1598051100000, 1598051100000));
first.tasks.push(new Task(1.1, "React Native", "Helppp", 4500, false, 2700, 1598055300000, 1598053500000));

const second = new Project(2, "MAD 222", "This is soooo long", "2024-02-22");
second.tasks.push(new Task(2, "React Native", "Helppp", 12000, false, 2700, 1598062800000, 1598053500000));

const third = new Project(3, "MAD 3", "This is soooo long", "2024-02-22");
third.tasks.push(new Task(3, "React Native", "Helppp", 900, false, 300, 1598051700000, 1598051100000));

const fourth = new Project(4, "MAD 4", "This is soooo long", "2024-02-22");
fourth.tasks.push(new Task(4, "React Native", "Helppp", 12000, false, 2700, 1598062800000, 1598053500000));

export const initialProjects = [first, second, third, fourth];
