import Project from "../classes/Project";
import Task from "../classes/Task";

const first = new Project(1, "MAD 838747", "This is soooo long", "2024-02-22");

const second = new Project(2, "MAD 2", "This is soooo long", "2024-02-22");
const third = new Project(3, "MAD 3", "This is soooo long", "2024-02-22");
const fourth = new Project(4, "MAD 4", "This is soooo long", "2024-02-22");

export const initialProjects = [first, second, third, fourth];
