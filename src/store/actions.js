import {saveToLS, strToSec } from "@/func";

var interval = null;

const INIT_WORKS = context => {
    context.commit('initWorks')
}

const INIT_INPUTOPTIONS = context => {
    context.commit('initInputOptions')
}

const CLEAN_INPUT = context => {
    context.commit('CLEAR_INPUT')
}

const CHANGE_INPUT = (context, index) => {
    context.commit('SET_INPUT', index);
}

const ADD_WORK = ({ commit, getters }) => {
    commit('WORKS_PUSH');
    commit('WORKS_SORT');
    commit('PROJNAMELIST_PUSH');
    commit('DESCRIPTLIST_PUSH');
    saveToLS('projNames', getters.PROJNAMELIST_STATE); //save projNamesList to localStorage
    saveToLS('descript', getters.DESCRIPTLIST_STATE); //save descriptList to localStorage
    saveToLS('works', getters.WORKS_STATE); //save Works to localStorage
}

const SAVE_WORK = ({ commit, getters }, index) => {
    commit('WORK_SAVE', index);
    saveToLS('works', getters.WORKS_STATE); //save Works to localStorage
}

const WORK_DEL = ({ commit, getters }, index) => {
    commit('WORK_DEL_ROW', index);
    saveToLS('works', getters.WORKS_STATE); //save Works to localStorage
}

const BUTTYPE_CHANGE = (context, value) => {
    context.commit('changeButType', value)
}

const CURNUM_SET = (context, value) => {
    context.commit('setCurNum', value)
}

const INC_WORKSCHANGE = (context) => {
    context.commit('incWorksChange')
}

const CLEAR_FILTERDATES = (context) => {
    context.commit('clearFilterDates')
    context.commit('clearPeriod')
}

const CLEAR_PERIOD = (context) => {
    context.commit('clearPeriod')
}

const CHANGE_FILTERDATE = ({ dispatch }) => {
    dispatch('CLEAR_PERIOD');
    dispatch('UPDATE_QUERY')
}

const RESET_FILTER = ({ dispatch }) => {
    dispatch('CLEAR_FILTERDATES');
    dispatch('UPDATE_QUERY')
}

const UPDATE_QUERY = ({ commit, getters }) => {
    let projNm = [];
    for (let j=0; j < getters.WORKS_STATE.length; j++) {
        projNm[j] = getters.WORKS_STATE[j].projName        //create array of Project names
    }
    commit('setProjNames', projNm); //remove duplicates in array

    for (let j=0; j < getters.PROJNAMES_STATE.length; j++) {
        getters.PR_STATE[j]=0                                    //init array of total time in sec
    }

    commit('clearProjTime');

    let sDate = new Date(getters.STARTDATE_STATE)
    let eDate = new Date(getters.ENDDATE_STATE)
    let wDate = new Date()

    if (getters.STARTDATE_STATE === '' && getters.ENDDATE_STATE === ''){
        if (getters.WORKS_STATE.length>0) { //count total time in projects
            for (let i=0; i < getters.WORKS_STATE.length; i++) {
                for (let j=0; j < getters.PROJNAMES_STATE.length; j++) {
                    if (getters.WORKS_STATE[i].projName === getters.PROJNAMES_STATE[j])
                    { getters.PR_STATE[j]+=strToSec(getters.WORKS_STATE[i].time) }
                }
            }
        }
    }

    if (getters.STARTDATE_STATE === '' && getters.ENDDATE_STATE !== ''){
        if (getters.WORKS_STATE.length>0) { //count total time in projects
            for (let i=0; i < getters.WORKS_STATE.length; i++) {
                for (let j=0; j < getters.PROJNAMES_STATE.length; j++) {
                    wDate = Date.parse(getters.WORKS_STATE[i].date)
                    if (getters.WORKS_STATE[i].projName === getters.PROJNAMES_STATE[j] &&
                        wDate.valueOf() <= eDate.valueOf())
                    { getters.PR_STATE[j]+=strToSec(getters.WORKS_STATE[i].time) }
                }
            }
        }
    }

    if (getters.STARTDATE_STATE !== '' && getters.ENDDATE_STATE === ''){
        if (getters.WORKS_STATE.length>0) { //count total time in projects
            for (let i=0; i < getters.WORKS_STATE.length; i++) {
                for (let j=0; j < getters.PROJNAMES_STATE.length; j++) {
                    wDate = Date.parse(getters.WORKS_STATE[i].date)
                    if (getters.WORKS_STATE[i].projName === getters.PROJNAMES_STATE[j] &&
                        wDate.valueOf() >= sDate.valueOf())
                    { getters.PR_STATE[j]+=strToSec(getters.WORKS_STATE[i].time) }
                }
            }
        }
    }

    if (getters.STARTDATE_STATE !== '' && getters.ENDDATE_STATE !== ''){
        if (getters.WORKS_STATE.length>0) { //count total time in projects
            for (let i=0; i < getters.WORKS_STATE.length; i++) {
                for (let j=0; j < getters.PROJNAMES_STATE.length; j++) {
                    wDate = Date.parse(getters.WORKS_STATE[i].date)
                    if (getters.WORKS_STATE[i].projName === getters.PROJNAMES_STATE[j] &&
                        wDate.valueOf() >= sDate.valueOf() &&
                        wDate.valueOf() <= eDate.valueOf())
                    { getters.PR_STATE[j]+=strToSec(getters.WORKS_STATE[i].time) }
                }
            }
        }
    }

    //fill projectTime array
    for (let j=0; j < getters.PROJNAMES_STATE.length; j++) {
        if (getters.PR_STATE[j]>0){
            commit('pushProjTime', j)
        }
    }
    commit('countTimeSum')
}

const UPDATE_PERIOD = ({ commit, getters, dispatch }, value) => {
    commit('updatePeriod', value)

    let sDateParts = []
    let eDateParts = []
    let sDate = new Date()
    let eDate = new Date()
    let d = new Date()
    if (getters.CUR_PERIOD === 'Today') {
        sDate.setDate(d.getDate());
        eDate.setDate(d.getDate());
        sDateParts = sDate.toLocaleDateString('uk-UA').split('.');
        eDateParts = eDate.toLocaleDateString('uk-UA').split('.');

        commit('setStartDate', sDateParts);
        commit('setEndDate', eDateParts);
    } else if (getters.CUR_PERIOD === 'curWeek') {
        sDate.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1));
        eDate.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1) + 6);
        sDateParts = sDate.toLocaleDateString('uk-UA').split('.');
        eDateParts = eDate.toLocaleDateString('uk-UA').split('.');

        commit('setStartDate', sDateParts);
        commit('setEndDate', eDateParts);
    } else if (getters.CUR_PERIOD === 'curMonth') {
        sDate.setDate(1);
        eDate.setDate((new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).getDate());
        sDateParts = sDate.toLocaleDateString('uk-UA').split('.');
        eDateParts = eDate.toLocaleDateString('uk-UA').split('.');

        commit('setStartDate', sDateParts);
        commit('setEndDate', eDateParts);
    } else if (getters.CUR_PERIOD === 'curYear') {
        sDate = new Date(new Date().getFullYear(), 0, 1);
        eDate = new Date(new Date().getFullYear(), 11, 31);
        sDateParts = sDate.toLocaleDateString('uk-UA').split('.');
        eDateParts = eDate.toLocaleDateString('uk-UA').split('.');

        commit('setStartDate', sDateParts);
        commit('setEndDate', eDateParts);
    } else {
        commit('setStartDate', '');
        commit('setEndDate', '');
    }

    dispatch('UPDATE_QUERY');
}

const ADD_RECORD = ({ getters, dispatch }) => {
        if (!getters.TEMP_VALUES ||
            getters.TTIME_STATE=== '00:00' ||
            getters.TENDTIME_STATE === '00:00') {
            alert('Fill ALL inputs, please!');
            return false
        }
        if (getters.WORKS_STATE.length===1 && getters.WORKS_STATE[0].date==='')
            dispatch('WORK_DEL', 0); //delete 1st empty row

        dispatch('ADD_WORK');
        dispatch('CLEAN_INPUT');

        dispatch('INC_WORKSCHANGE');
}

const EDIT_RECORD = ({ dispatch }, row) => { 	//edit row
    dispatch('CHANGE_INPUT', row);

    dispatch('BUTTYPE_CHANGE', 1);
    dispatch('CURNUM_SET', row);
}

const DELETE_RECORD = ({ dispatch }, row) => { //delete row
    if (confirm('Do you want to DELETE record?')) {
        dispatch('WORK_DEL', row);

        dispatch('CLEAN_INPUT');

        dispatch('BUTTYPE_CHANGE', 0);
        dispatch('INC_WORKSCHANGE');
    }
}

const SAVE_RECORD = ({ getters, dispatch }) => {
    if (!getters.TEMP_VALUES ||
        getters.TTIME_STATE=== '00:00' ||
        getters.TENDTIME_STATE === '00:00') {
        alert('Fill ALL inputs, please!');
        return false
    }

    dispatch('SAVE_WORK', getters.CURNUM_STATE);
    dispatch('CLEAN_INPUT');

    dispatch('BUTTYPE_CHANGE', 0);
    dispatch('INC_WORKSCHANGE');
}

const CANCEL_EDIT = ({ dispatch }) => {
    dispatch('CLEAN_INPUT');
    dispatch('BUTTYPE_CHANGE', 0);
}

const START_TIMER = ({ commit, getters }) => {
    if (getters.TTIME_STATE !== '')
        if (!confirm("Do you want to RESET 'End Time' & 'Elap.Time' fields?"))
            return false;

    commit('setCurrentDate');
    commit('changeTimerButType', 1);
    commit('setAddButtonDis', true);

    if (!getters.TSTARTTIME_STATE) {
        let d = new Date();
        d.setDate(d.getDate());
        let TimeParts = d.toLocaleTimeString('uk-UA').split(':');
        commit('updateStartTime', TimeParts[0]+':'+TimeParts[1]);
    }

    commit('changeTime');
    interval = setInterval(() => { commit('changeTime') }, 1000);
    commit('focusInputChange');
}

const STOP_TIMER = ({ commit, dispatch }) => {
    commit('changeTimerButType', 0);
    commit('setAddButtonDis', false);
    clearInterval(interval);
    if (confirm('Do you want to save this RECORD?'))
        dispatch('ADD_RECORD');
}

const CLEAR_TABLE = ({ commit, getters }) => {
    if (confirm('Do you want to CLEAR TABLE?')) {
        commit('clearTable');
        saveToLS('works', getters.WORKS_STATE); //save Works to localStorage
    }
}

const PRESS_ENTER = ({ getters, dispatch }) => {
    if (getters.BUTTYPE_STATE === 0) {
        if (!getters.ADDBUTTON_DIS_STATE) dispatch('ADD_RECORD')
    } else dispatch('SAVE_RECORD')
}

export default {
    INIT_WORKS,
    INIT_INPUTOPTIONS,
    CLEAN_INPUT,
    CHANGE_INPUT,
    ADD_WORK,
    SAVE_WORK,
    WORK_DEL,
    BUTTYPE_CHANGE,
    CURNUM_SET,
    INC_WORKSCHANGE,
    CLEAR_FILTERDATES,
    CLEAR_PERIOD,
    CHANGE_FILTERDATE,
    RESET_FILTER,
    UPDATE_QUERY,
    UPDATE_PERIOD,
    ADD_RECORD,
    EDIT_RECORD,
    DELETE_RECORD,
    SAVE_RECORD,
    CANCEL_EDIT,
    START_TIMER,
    STOP_TIMER,
    CLEAR_TABLE,
    PRESS_ENTER
}
