import { secToStr, strToSec } from "@/func";

const CLEAR_INPUT = state => {
    state.tdate = '';
    state.tprojName = '';
    state.tworkType = '';
    state.tstarttime = '';
    state.tendtime = '';
    state.ttime = '';
}

const SET_INPUT = (state, index) => {
    state.tdate = state.works[index].date;
    state.tprojName = state.works[index].projName;
    state.tworkType = state.works[index].workType;
    state.tstarttime = state.works[index].starttime;
    state.tendtime = state.works[index].endtime;
    state.ttime = state.works[index].time;
}

const WORKS_PUSH = state => {
    state.works.push({ 			//add row
        id: state.works.length+1,
        date: state.tdate,
        projName: state.tprojName,
        workType: state.tworkType,
        starttime: state.tstarttime,
        endtime: state.tendtime,
        time: state.ttime
    });
}

const PROJNAMELIST_PUSH = state => {
    state.projNameList.push(state.tprojName);
    state.projNameList = Array.from(new Set(state.projNameList)); //remove duplicates
}

const DESCRIPTLIST_PUSH = state => {
    state.descriptList.push(state.tworkType);
    state.descriptList = Array.from(new Set(state.descriptList)); //remove duplicates
}

const WORKS_SORT = state => {
    state.works.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        if (strToSec(a.starttime) < strToSec(b.starttime)) return -1;
        if (strToSec(a.starttime) > strToSec(b.starttime)) return 1;
        return 0;
    });
}

const WORK_SAVE = (state, index) => {
    state.works[index].id = index+1;
    state.works[index].date = state.tdate;
    state.works[index].projName = state.tprojName;
    state.works[index].workType = state.tworkType;
    state.works[index].starttime = state.tstarttime;
    state.works[index].endtime = state.tendtime;
    state.works[index].time = state.ttime;
}

const WORK_DEL_ROW = (state, index) => {
    state.works.splice(index,1)
}

const initWorks = state => {
    state.works = JSON.parse(localStorage.getItem('works'));
}
const initInputOptions = state => {
    if (localStorage.getItem('projNames') === null) state.projNameList = []
        else state.projNameList = JSON.parse(localStorage.getItem('projNames'));
    if (localStorage.getItem('descript') === null) state.descriptList = []
        else state.descriptList = JSON.parse(localStorage.getItem('descript'));
}
const updateDate = (state, tdate) => {
    state.tdate = tdate
}

const updateProjName = (state, tprojName) => {
    state.tprojName = tprojName
}

const updateWorkType = (state, tworkType) => {
    state.tworkType = tworkType
}

const updateTime = (state, ttime) => {
    state.ttime = ttime;
    state.tendtime = secToStr(strToSec(state.tstarttime)+strToSec(state.ttime))
}

const updateStartTime = (state, time) => {
    state.tstarttime = time
    if (strToSec(state.tendtime)-strToSec(state.tstarttime) > 0)
        state.ttime = secToStr(strToSec(state.tendtime)-strToSec(state.tstarttime))
    else { state.tendtime = state.tstarttime; state.ttime = '00:00' }
}

const updateEndTime = (state, time) => {
    state.tendtime = time;
    if (strToSec(state.tendtime)-strToSec(state.tstarttime) > 0)
        state.ttime = secToStr(strToSec(state.tendtime)-strToSec(state.tstarttime))
    else { state.tstarttime = state.tendtime; state.ttime = '00:00' }
}

const updateStartDate = (state, startDate) => {
    state.startDate = startDate
}

const updateEndDate = (state, endDate) => {
    state.endDate = endDate
}

const updatePeriod = (state, period) => {
    state.period = period
}

const setStartDate = (state, sDateParts) => {
    if (sDateParts !== '')
    state.startDate = sDateParts[2] + "-" + sDateParts[1] + "-" + sDateParts[0];
        else state.startDate = ''
}

const setEndDate = (state, eDateParts) => {
    if (eDateParts !== '')
    state.endDate = eDateParts[2] + "-" + eDateParts[1] + "-" + eDateParts[0];
        else state.endDate = ''
}

const clearFilterDates = state => {
    state.startDate = '';
    state.endDate = '';
}

const clearPeriod = state => {
    state.period = 'Choose period'
}

const changeButType = (state, value) => {
    state.butType = value
}

const changeTimerButType = (state, value) => {
    state.timerButType = value
}

const setAddButtonDis = (state, value) => {
    state.addButtonDis = value
}

const setCurNum = (state, value) => {
    state.curNum = value
}

const incWorksChange = state => {
    if (state.worksChange===0) //Change value
        state.worksChange=1
    else state.worksChange=0
}

const clearProjTime = state => {
    state.projTime.splice(0,state.projTime.length)
}

const pushProjTime = (state, j) => {
    state.projTime.push({ id: state.projTime.length+1, projN: state.projNames[j], projT: secToStr(state.pr[j]) })
}

const setProjNames = (state, array) => {
    state.projNames = Array.from(new Set(array));
}

const setCurrentDate = state => {
    let d = new Date()

    d.setDate(d.getDate());
    let DateParts = d.toLocaleDateString('uk-UA').split('.')
    state.tdate = DateParts[2] + "-" + DateParts[1] + "-" + DateParts[0];
}

const changeTime = state => {
    let d = new Date();
    d.setDate(d.getDate());
    let TimeParts = d.toLocaleTimeString('uk-UA').split(':');
    state.tendtime = TimeParts[0] + ':' + TimeParts[1];
    state.ttime = secToStr(strToSec(state.tendtime)-strToSec(state.tstarttime));
}

const clearTable = state => {
    state.works.splice(0, state.works.length)
}

const focusInputChange = state => {
    if (state.focusInput===0) //Change value
        state.focusInput=1
    else state.focusInput=0
}

export default {
    CLEAR_INPUT,
    SET_INPUT,
    WORKS_PUSH,
    PROJNAMELIST_PUSH,
    DESCRIPTLIST_PUSH,
    WORKS_SORT,
    WORK_SAVE,
    WORK_DEL_ROW,
    initWorks,
    initInputOptions,
    updateDate,
    updateProjName,
    updateWorkType,
    updateTime,
    updateStartTime,
    updateEndTime,
    updateStartDate,
    updateEndDate,
    updatePeriod,
    setStartDate,
    setEndDate,
    clearFilterDates,
    clearPeriod,
    changeButType,
    changeTimerButType,
    setAddButtonDis,
    setCurNum,
    incWorksChange,
    clearProjTime,
    pushProjTime,
    setProjNames,
    setCurrentDate,
    changeTime,
    clearTable,
    focusInputChange
}
