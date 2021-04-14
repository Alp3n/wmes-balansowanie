// Formating two ISOstrings to get difference in time MM-SS
export const durationFromISOFormatter = (start, end) => {
  let seconds;
  let minutes;
  let time;

  if (start || end !== null) {
    seconds = Math.round((Date.parse(end) - Date.parse(start)) / 1000);
  }

  if (seconds >= 60) {
    minutes = seconds / 60;
    minutes = minutes.toString().slice(0, 1);
    seconds = seconds % 60;

    time = `${minutes}m ${seconds}s`;
  } else {
    time = `${seconds}s`;
  }

  return time;
};

export const durationFormatter = (duration) => {
  let seconds;
  let minutes;
  let time;

  if (duration) {
    seconds = Math.round(duration);
    if (seconds >= 60) {
      minutes = seconds / 60;
      minutes = minutes.toString().slice(0, 1);
      seconds = seconds % 60;

      time = `${minutes}m ${seconds}s`;
    } else {
      time = `${seconds}s`;
    }
  }
  return time;
};

// Function for setting default dates
export const setDays = (days, func) => {
  let result = new Date();

  switch (func) {
    case 'add':
      result.setDate(result.getDate() + days);
      break;
    case 'sub':
      result.setDate(result.getDate() - days);
      break;
    default:
      result = 'Problem';
      break;
  }

  return result.toString();
};
