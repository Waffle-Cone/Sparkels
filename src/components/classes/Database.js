import Project from "./Project";

// an array that holds project items
const first = new Project(1, "MAD 1", "This is soooo long");
const second = new Project(1, "MAD 2", "This is soooo long");
const third = new Project(1, "MAD 3", "This is soooo long");
const fourth = new Project(1, "MAD 4", "This is soooo long");

export const Database = [first, second, third, fourth];

/*import { useState } from "react";

const Database = () => {
  const [database, setDatabase] = useState([]);
};

export default Database;*/
