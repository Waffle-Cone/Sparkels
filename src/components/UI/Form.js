import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormLayout from "../layout/FormLayout";
import { useRef } from "react";
import { useFonts } from "expo-font";
import Icons from "./Icons";

const Form = ({ children, submitType, onSubmit, onCancel, title }) => {
  const [fontsLoaded] = useFonts({
    AnybodyBold: require("./../../../assets/fonts/Anybody-Bold.ttf"),
    AnybodyRegular: require("./../../../assets/fonts/Anybody-Regular.ttf"),
  });
  const scrollRef = useRef();
  return (
    <FormLayout>
      <Text style={styles.title}>{title}</Text>
      <KeyboardAvoidingView
        keyboardVerticalOffset={115}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
        enabled
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.formItems}
          onContentSizeChange={() =>
            scrollRef.current.scrollToEnd({ animated: true })
          }
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonTray}>
        <TouchableOpacity onPress={onCancel} style={styles.button}>
          <Icons.Back />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        {submitType === "Add" ? (
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Icons.AddProject />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Icons.Edit />
            <Text style={styles.buttonText}>Modify</Text>
          </TouchableOpacity>
        )}
      </View>
    </FormLayout>
  );
};

const InputText = ({ label, value, onChange, prompt, keyboardType, error }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      {prompt ? <Text style={styles.itemPrompt}>{prompt}</Text> : null}
      <TextInput
        style={styles.itemTextInput}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const InputSelect = ({ label, prompt, options, value, onChange }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      {Platform.OS === "ios" ? (
        <Text style={styles.itemPrompt}>{prompt}</Text>
      ) : null}

      <Picker
        mode="dropdown"
        selectedValue={value}
        onValueChange={onChange}
        style={styles.itemPicker}
      >
        {!Platform.OS === "ios" ? (
          <Picker.Item
            value={null}
            label={prompt}
            itemStyle={styles.itemPromptPicker}
            enabled={false}
          />
        ) : null}

        {options.map((option) => (
          <Picker.Item
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    padding: 30,
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    fontFamily: "AnybodyBold",
  },
  formItems: {
    gap: 9,
    paddingLeft: 40,
    paddingRight: 40,
    //backgroundColor: "red"
  },
  itemLabel: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
  itemTextInput: {
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    //borderColor: "#407E7A",
    borderColor: "black",
  },
  itemPicker: {
    backgroundColor: "whitesmoke",
    borderRadius: 7,
  },
  itemPromptPicker: {
    color: "grey",
  },
  itemPrompt: {
    fontSize: 15,
    color: "grey",
  },
  error: {
    fontSize: 15,
    color: "red",
  },
  buttonTray: {
    flex: 1,
    gap: 30,
    maxHeight: 0, // use only what is needed for the buttons
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 50,
    paddingBottom: 20,
  },
  button: {
    minHeight: 50,
    width: 160,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRadius: 7,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

Form.InputText = InputText;
Form.InputSelect = InputSelect;

export default Form;
