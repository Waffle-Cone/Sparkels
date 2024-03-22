const GetCompletedStatus = (completedStatus) => {
  if (completedStatus === 1) {
    return "Not started";
  } else if (completedStatus === 2) {
    return "Started but not completed";
  } else if (completedStatus === 3) {
    return " Completed";
  } else if (completedStatus === 4) {
    return "Overtime";
  }
};

export default GetCompletedStatus;
