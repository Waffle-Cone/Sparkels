import { Platform, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormLayout from "../layout/FormLayout";

const Form = ({ children, submitType, onSubmit, onCancel }) => {
  return (
    <FormLayout>
      <KeyboardAvoidingView keyboardVerticalOffset={115} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formContainer} enabled>
        <ScrollView contentContainerStyle={styles.formItems}>{children}</ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonTray}>
        <Pressable onPress={onCancel} style={styles.button}>
          <Text style={styles.buttonText}> cancel</Text>
        </Pressable>
        {submitType === "Add" ? (
          <Pressable onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText}> Add</Text>
          </Pressable>
        ) : (
          <Pressable onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText}> Modify</Text>
          </Pressable>
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
      <TextInput style={styles.itemTextInput} value={value} onChangeText={onChange} keyboardType={keyboardType} />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const InputSelect = ({ label, prompt, options, value, onChange }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      {Platform.OS === "ios" ? <Text style={styles.itemPrompt}>{prompt}</Text> : null}

      <Picker mode="dropdown" selectedValue={value} onValueChange={onChange} style={styles.itemPicker}>
        {!Platform.OS === "ios" ? <Picker.Item value={null} label={prompt} itemStyle={styles.itemPromptPicker} enabled={false} /> : null}

        {options.map((option) => (
          <Picker.Item key={option.value} value={option.value} label={option.label} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    //backgroundColor: "blue",
  },
  formItems: {
    gap: 9,
  },
  itemLabel: {
    color: "grey",
    fontSize: 16,
    marginBottom: 5,
  },
  itemTextInput: {
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  itemPicker: {
    backgroundColor: "whitesmoke",
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
    gap: 100,
    maxHeight: 0, // use only what is needed for the buttons
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 50,
  },
  button: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "grey",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

Form.InputText = InputText;
Form.InputSelect = InputSelect;

export default Form;
