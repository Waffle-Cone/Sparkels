import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const Icons = {};

//Navigation Bar Icons
const Project = ({ color }) => (
  <FontAwesome5 name="tasks" size={24} color={color} />
);
const Home = ({ color }) => <FontAwesome name="home" size={30} color={color} />;

const Tasks = () => <FontAwesome5 name="tasks" size={24} color="black" />;

const AddProject = ({ color }) => (
  <Ionicons name="add-circle-sharp" size={24} color={color} />
);

const Account = ({ color }) => (
  <MaterialCommunityIcons name="account" size={30} color={color} />
);

//Utility Icons
const Add = ({ color }) => <MaterialIcons name="add" size={24} color={color} />;
const Delete = ({ color }) => (
  <AntDesign name="delete" size={24} color={color} />
);
const Edit = () => <AntDesign name="edit" size={24} color="black" />;
const Back = () => <AntDesign name="back" size={24} color="black" />;

const AddIcon = () => <AntDesign name="pluscircleo" size={24} color="black" />;

const RightArrow = () => (
  <AntDesign name="rightcircle" size={24} color="black" />
);

const ArrowRight = () => (
  <EvilIcons name="arrow-right" size={34} color="black" />
);

const Check = () => (
  <FontAwesome name="check-circle" size={40} color="#41C37D" />
);
const CheckComplete = ({ color }) => (
  <AntDesign name="checkcircleo" size={24} color={color} />
);
const Minus = ({ color }) => (
  <AntDesign name="minuscircleo" size={24} color={color} />
);
const SearchCancel = () => <MaterialIcons name="cancel" size={25} />;
const Search = () => <MaterialIcons name="search" size={20} />;
const PlayArrow = ({ color }) => (
  <MaterialIcons name="play-arrow" size={50} color={color} />
);
const Play = () => <FontAwesome5 name="play" size={24} color="black" />;
const Pause = ({ color }) => (
  <MaterialIcons name="pause" size={50} color={color} />
);

// Compose
Icons.Account = Account;
Icons.AddProject = AddProject;
Icons.Add = Add;
Icons.AddIcon = AddIcon;
Icons.ArrowRight = ArrowRight;
Icons.Back = Back;
Icons.Check = Check;
Icons.CheckComplete = CheckComplete;
Icons.Delete = Delete;
Icons.Edit = Edit;
Icons.Home = Home;
Icons.Minus = Minus;
Icons.Pause = Pause;
Icons.Play = Play;
Icons.PlayArrow = PlayArrow;
Icons.Project = Project;
Icons.RightArrow = RightArrow;
Icons.Search = Search;
Icons.SearchCancel = SearchCancel;
Icons.Tasks = Tasks;

export default Icons;
