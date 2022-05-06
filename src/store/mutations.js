import { secToStr } from "@/func";

const CLEAR_INPUT = state => {
    state.tdate = '';
    state.tprojName = '';
    state.tworkType = '';
    state.ttime = '';
}

const SET_INPUT = (state, index) => {
    state.tdate = state.works[index].date;
    state.tprojName = state.works[index].projName;
    state.tworkType = state.works[index].workType;
    state.ttime = state.works[index].time;
}

const WORKS_PUSH = state => {
    state.works.push({ 			//add row
        id: state.works.length+1,
        date: state.tdate,
        projName: state.tprojName,
        workType: state.tworkType,
        time: state.ttime
    });
}

const WORK_SAVE = (state, index) => {
    state.works[index].id = index+1;
    state.works[index].date = state.tdate;
    state.works[index].projName = state.tprojName;
    state.works[index].workType = state.tworkType;
    state.works[index].time = state.ttime;
}

const WORK_DEL_ROW = (state, index) => {
    state.works.splice(index,1)
}

const initWorks = state => {
    state.works = JSON.parse(localStorage.getItem('works'));
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
    state.ttime = ttime
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
    state.worksChange++
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
    state.curTime ++;
    state.ttime = secToStr(state.curTime)
}

const resetCurTime = state => {
    state.curTime = 0;
}

const clearTable = state => {
    state.works.splice(0, state.works.length)
}

const focusIn = state => {
    state.focusInput = true;
}

const focusOut = state => {
    state.focusInput = false;
}

export default {
    CLEAR_INPUT,
    SET_INPUT,
    WORKS_PUSH,
    WORK_SAVE,
    WORK_DEL_ROW,
    initWorks,
    updateDate,
    updateProjName,
    updateWorkType,
    updateTime,
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
    resetCurTime,
    clearTable,
    focusIn,
    focusOut
}
