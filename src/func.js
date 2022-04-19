export function strToSec(str) {
      let myTimeArr = str.split(":");
      return parseInt(myTimeArr[0]) * 3600 + parseInt(myTimeArr[1]) * 60;
    }

export function secToStr(sec) {
      let hours = ~~(sec / 3600) % 24;
      let minutes = ~~(sec / 60) % 60;

      hours = hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      minutes = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

      return hours+':'+minutes;
    }
