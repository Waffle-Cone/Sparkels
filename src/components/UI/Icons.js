import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Icons = {};

//Home Screen Icons
const Form = () => (
  <AntDesign name="form" size={40} color="#24325B" marginTop={20} />
);
const LiveChat = () => (
  <Entypo name="chat" size={40} color="#24325B" marginTop={20} />
);
const Call = () => (
  <Ionicons name="call" size={40} color="#24325B" marginTop={20} />
);

//Navigation Bar Icons
const Home = ({ color }) => <FontAwesome name="home" size={30} color={color} />;
const Plane = ({ color }) => (
  <FontAwesome name="plane" size={30} color={color} />
);
const CallSupport = ({ color }) => (
  <Ionicons name="call" size={30} color={color} />
);
const Account = ({ color }) => (
  <MaterialCommunityIcons name="account" size={30} color={color} />
);

//Utility Icons
const Add = () => <MaterialIcons name="add" size={16} />;
const Delete = () => <MaterialIcons name="delete" size={16} />;
const Edit = () => <MaterialIcons name="edit" size={16} />;

const RightArrow = () => (
  <AntDesign name="rightcircle" size={24} color="#24325B" />
);

// Compose
Icons.Account = Account;
Icons.Add = Add;
Icons.Call = Call;
Icons.CallSupport = CallSupport;
Icons.Delete = Delete;
Icons.Edit = Edit;
Icons.Form = Form;
Icons.Home = Home;
Icons.LiveChat = LiveChat;
Icons.Plane = Plane;
Icons.RightArrow = RightArrow;

export default Icons;
