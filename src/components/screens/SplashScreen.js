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
      <Image
        source={require("../../../assets/progressioSplashImage.png")}
        style={styles.splash}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.logoText}>Progressio</Text>
        <Text style={styles.descriptionText}>
          Elevate your project management
        </Text>
        <Text style={styles.descriptionText}>
          by breaking down your projects into micro
        </Text>
        <Text style={styles.descriptionText}>
          tasks, and track your progress
        </Text>
      </View>
      <TouchableOpacity onPress={gotoProjectScreen} style={styles.button}>
        <Text style={styles.textButton}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  splash: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 25,
    marginTop: 490,
    paddingBottom: 20,
    fontFamily: "AnybodyRegular",
  },
  logoText: {
    fontSize: 50,
    fontFamily: "AnybodyBold",
    paddingBottom: 40,
  },
  descriptionText: {
    alignItems: "center",
    fontSize: 16,
    fontFamily: "AnybodyRegular",
    paddingVertical: 5,
  },
  button: {
    justifyContent: "flex-end",
    width: "80%",
    height: "6%",
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
    //marginTop: 100,
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
