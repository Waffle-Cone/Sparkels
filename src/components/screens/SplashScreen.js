import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
} from "react-native";

const SplashScreen = ({ navigation }) => {
  // Initialisations --------------------------
  console.log(navigation);

  // State ------------------------------------
  // Handlers ---------------------------------
  const gotoProjectScreen = () => navigation.navigate("ProjectListScreen");

  // View -------------------------------------
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/ProgressioSplashScreen.png")}
        style={styles.splash}
      />
      <TouchableOpacity onPress={gotoProjectScreen} style={styles.button}>
        <Text style={styles.textButton}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  splash: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  button: {
    //bottom: 100,
    width: 360,
    height: 58,
    alignSelf: "center",
    borderRadius: 10,
    borderBottomWidth: 6,
    borderTopWidth: 0.2,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: "#484F8A",
    backgroundColor: "#8390FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 100,
  },
  textButton: {
    fontSize: 20,
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default SplashScreen;
