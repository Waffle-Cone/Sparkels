import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";

const SplashScreen = ({ navigation }) => {
  // Initialisations --------------------------
  console.log(navigation);
  const useFonts = async () => {
    await Font.loadAsync({
      AnybodyBold: require("./../../../assets/fonts/Anybody-Bold.ttf"),
      AnybodyRegular: require("./../../../assets/fonts/Anybody-Regular.ttf"),
      AnybodySemiBold: require("./../../../assets/fonts/Anybody-SemiBold.ttf"),
    });
  };


  // State ------------------------------------
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await useFonts();
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  // Handlers ---------------------------------
  const gotoProjectScreen = () => navigation.navigate("ProjectListScreen");

  // View -------------------------------------
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/ProgressioSplashScreen.png")} style={styles.splash} />
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
    fontSize: 16,
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontFamily: "AnybodySemiBold",
  },
});

export default SplashScreen;
