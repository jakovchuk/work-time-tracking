export function strToSec(str) {
    let myTimeArr = str.split(":");
    return parseInt(myTimeArr[0]) * 3600 + parseInt(myTimeArr[1]) * 60;
}

export function secToStr(sec) {
    let hours = ~~(sec / 3600) % 24;
    let minutes = ~~(sec / 60) % 60;

    hours = hours.toLocaleString('uk-UA', { minimumIntegerDigits: 2, useGrouping: false });
    minutes = minutes.toLocaleString('uk-UA', { minimumIntegerDigits: 2, useGrouping: false });

    return hours+':'+minutes;
}

export function saveToLS(name, array) {
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(array));
}

export function quarterTime(time) {
    let myTimeArr = time.split(":");
    if (myTimeArr[1] <= 7) myTimeArr[1] = '00'
    else if (myTimeArr[1] >= 8 && myTimeArr[1] <= 22) myTimeArr[1] = '15'
    else if (myTimeArr[1] >= 23 && myTimeArr[1] <= 37) myTimeArr[1] = '30'
    else if (myTimeArr[1] >= 38 && myTimeArr[1] <= 52) myTimeArr[1] = '45'
    else if (myTimeArr[1] >= 53) { myTimeArr[1] = '00'; myTimeArr[0] = parseInt(myTimeArr[0]) + 1 }
    return myTimeArr[0]+':'+myTimeArr[1]
}