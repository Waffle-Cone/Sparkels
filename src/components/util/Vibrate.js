// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// React Native Documentation for Vibration, https://reactnative.dev/docs/vibration

// -----------------------------------------------------
import { Vibration } from "react-native";

const Vibrate = {};

const pulse = () => {
  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [1 * ONE_SECOND_IN_MS, 1 * ONE_SECOND_IN_MS, 1 * ONE_SECOND_IN_MS];
  Vibration.vibrate(PATTERN);
};

Vibrate.pulse = pulse;

export default Vibrate;
