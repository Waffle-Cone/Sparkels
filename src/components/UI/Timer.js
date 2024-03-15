import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTimer } from "react-native-timestamp-timer-hooks";
import { formatTimeString } from "./util";

const Timer = ({ loadTime }) => {
  const { counter, start, stop, reset, isStart } = useTimer({
    from: loadTime,
  });

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.defaultText, { alignSelf: "center" }]}>Timer</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          onPress={() => {
            if (isStart) stop();
            else start();
          }}
        >
          <Text style={styles.defaultText}>{isStart ? "stop" : "start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => reset()}>
          <Text style={styles.defaultText}>reset</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={[styles.defaultText, { fontSize: 24, fontWeight: "bold" }]}>{formatTimeString(counter)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: "black",
  },
});

export default Timer;
