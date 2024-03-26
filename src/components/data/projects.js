import Project from "../classes/Project";
import Task from "../classes/Task";

const first = new Project(1, "MAD 1", "This is soooo long", "2024-02-22", false);
first.tasks.push(new Task(1.1, "Task", "Helppp", 60, 300, 1598050860000, 1598051100000));
first.tasks.push(new Task(1.2, "Task", "Helppp", 60, 300, 1598050860000, 1598051100000));

const second = new Project(2, "MAD 2", "This is soooo long", "2024-02-22", false);
second.tasks.push(new Task(2.1, "Task", "Helppp", 12000, 2700, 1598062800000, 1598053500000));
second.tasks.push(new Task(2.2, "Task", "Helppp", 12000, 2700, 1598062800000, 1598053500000));

const third = new Project(3, "MAD 3", "This is soooo long", "2024-02-22", false);
third.tasks.push(new Task(3.1, "Task", "Helppp", 60, 300, 1598050860000, 1598051100000));
third.tasks.push(new Task(3.2, "Task", "Helppp", 60, 300, 1598050860000, 1598051100000));
third.tasks.push(new Task(3.3, "Task", "Helppp", 60, 300, 1598050860000, 1598051100000));

const fourth = new Project(4, "MAD 4", "This is soooo long", "2024-02-22", false);
fourth.tasks.push(new Task(4.1, "Task", "Helppp", 12000, 2700, 1598062800000, 1598053500000));
fourth.tasks.push(new Task(4.2, "Task", "Helppp", 12000, 2700, 1598062800000, 1598053500000));
fourth.tasks.push(new Task(4.3, "Task", "Helppp", 12000, 2700, 1598062800000, 1598053500000));

export const initialProjects = [first, second, third, fourth];
