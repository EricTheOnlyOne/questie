export const calculateTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      milliseconds: milliseconds,
      totalSeconds: totalSeconds,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      formattedMilliseconds: milliseconds.toString().padStart(2, '0'),
      formattedMinutes: minutes.toString().padStart(2, '0'),
      formattedSeconds: seconds.toString().padStart(2, '0')
    }
  };

export const formatTime = ({ hours, minutes, seconds, milliseconds }) => {
  return hours > 0
    ? `${hours}h ${minutes}m ${seconds}.${milliseconds}s`
    : minutes > 0
      ? `${minutes}m ${seconds}.${milliseconds}s`
      : `${seconds}.${milliseconds}s`;
};

  export const parseTime = (formattedTime) => {
    const timeParts = formattedTime.split(/[hms]/).map(part => part.trim()).filter(part => part !== '');
    let totalMilliseconds = 0;

    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts;
      totalMilliseconds = (parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseFloat(seconds)) * 1000;
    } else if (timeParts.length === 2) {
      const [minutes, seconds] = timeParts;
      totalMilliseconds = (parseInt(minutes, 10) * 60 + parseFloat(seconds)) * 1000;
    } else if (timeParts.length === 1) {
      const [seconds] = timeParts;
      totalMilliseconds = parseFloat(seconds) * 1000;
    }

    return totalMilliseconds;
  };

  export const combineTimes = (oldTime, newTime) => {
    const oldMilliseconds = parseTime(oldTime);
    const newMilliseconds = parseTime(newTime);
    const totalMilliseconds = oldMilliseconds + newMilliseconds;
    console.log(formatTime(totalMilliseconds));
    return formatTime(totalMilliseconds);
  };