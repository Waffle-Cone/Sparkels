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
const Project = ({ color }) => <FontAwesome5 name="list-alt" size={24} color={color} />;
const Home = ({ color }) => <FontAwesome name="home" size={30} color={color} />;

const Tasks = () => <FontAwesome5 name="tasks" size={24} color="black" />;

const AddProject = ({ color }) => <Ionicons name="add-circle-sharp" size={24} color={color} />;

const Account = ({ color }) => <MaterialCommunityIcons name="account" size={30} color={color} />;

//Utility Icons
const Add = ({ color }) => <MaterialIcons name="add" size={24} color={color} />;
const Delete = () => <MaterialIcons name="delete" size={16} />;
const Edit = () => <MaterialIcons name="edit" size={16} />;

const AddIcon = () => <AntDesign name="pluscircleo" size={24} color="black" />;

const RightArrow = () => <AntDesign name="rightcircle" size={24} color="black" />;

const ArrowRight = () => <EvilIcons name="arrow-right" size={34} color="black" />;
const SearchCancel = () => <MaterialIcons name="cancel" size={25} />;
const Search = () => <MaterialIcons name="search" size={20} />;

// Compose
Icons.Account = Account;
Icons.AddProject = AddProject;
Icons.Add = Add;
Icons.AddIcon = AddIcon;
Icons.ArrowRight = ArrowRight;
Icons.Delete = Delete;
Icons.Edit = Edit;
Icons.Project = Project;
Icons.Home = Home;
Icons.RightArrow = RightArrow;
Icons.Tasks = Tasks;
Icons.SearchCancel = SearchCancel;
Icons.Search = Search;

export default Icons;
