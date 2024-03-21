const handleCountdownText = (remainingTime) => {
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

export default handleCountdownText;
