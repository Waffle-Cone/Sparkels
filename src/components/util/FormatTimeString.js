// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// https://github.com/leejaehyup/react-native-timestamp-timer-hooks/blob/master/example/src/util.ts

// -----------------------------------------------------

const FormatTimeString = {};

const counter = (time) => {
  let msecs = time % 1000;

  if (msecs < 10) {
    msecs = `00${msecs}`;
  } else if (msecs < 100) {
    msecs = `0${msecs}`;
  }
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(time / 60000);
  let hours = Math.floor(time / 3600000);
  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;
  let formatted;
  formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;

  return [formatted, seconds];
};

const countdown = (remainingTime) => {
  let breakText = ``;
  let minutes = 0;
  let hours = 0;
  if (remainingTime >= 3600) {
    hours = remainingTime / 3600;
    minutes = (hours % 1) * 60;
    breakText = `${Math.trunc(hours)}H: ${Math.trunc(minutes)}M`;
  } else if (remainingTime >= 60) {
    minutes = remainingTime / 60;
    breakText = `${Math.trunc(minutes)} Minute(s)`;
  } else {
    breakText = `${remainingTime} Seconds`;
  }
  return breakText;
};

const breakTimeText = (value) => {
  const hours = new Date(value).getHours();
  const minutes = new Date(value).getMinutes();
  const breakText = `${hours} Hour(s) and ${minutes} Minute(s)`;

  return breakText;
};

FormatTimeString.counter = counter;
FormatTimeString.countdown = countdown;
FormatTimeString.breakTimeText = breakTimeText;

export default FormatTimeString;
