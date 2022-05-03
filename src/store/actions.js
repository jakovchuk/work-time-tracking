import {saveToLS, strToSec } from "@/func";

const INIT_WORKS = context => {
    context.commit('initWorks')
}

const CLEAN_INPUT = (context) => {
    context.commit('CLEAR_INPUT')
}

const CHANGE_INPUT = (context, index) => {
    context.commit('SET_INPUT', index);
}

const ADD_WORK = ({ commit, getters }) => {
    commit('WORKS_PUSH');
    getters.WORKS_STATE.sort((a, b) => a.date > b.date ? 1 : -1);
    saveToLS(getters.WORKS_STATE); //save Works to localStorage
}

const SAVE_WORK = ({ commit, getters }, index) => {
    commit('WORK_SAVE', index);
    saveToLS(getters.WORKS_STATE); //save Works to localStorage
}

const WORK_DEL = ({ commit, getters }, index) => {
    commit('WORK_DEL_ROW', index);
    saveToLS(getters.WORKS_STATE); //save Works to localStorage
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

const UPDATE_QUERY = ({ commit, getters }) => {
    // context.commit('updateQuery')
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
            // state.projTime.push({ id: state.projTime.length+1, projN: projNames[j], projT: secToStr(pr[j]) })
        }
    }
}

const UPDATE_PERIOD = ({ commit, getters, dispatch }, value) => {
    commit('updatePeriod', value)

    let sDateParts = []
    let eDateParts = []
    let sDate = new Date()
    let eDate = new Date()
    let d = new Date()
    if (getters.CUR_PERIOD === 'curWeek') {
        sDate.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1))
        eDate.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1) + 6)
        sDateParts = sDate.toLocaleDateString('uk-UA').split('.')
        eDateParts = eDate.toLocaleDateString('uk-UA').split('.')

        commit('setStartDate', sDateParts);
        commit('setEndDate', eDateParts);
    } else if (getters.CUR_PERIOD === 'curMonth') {
        sDate.setDate(1)
        eDate.setDate((new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).getDate())
        sDateParts = sDate.toLocaleDateString('uk-UA').split('.')
        eDateParts = eDate.toLocaleDateString('uk-UA').split('.')

        commit('setStartDate', sDateParts);
        commit('setEndDate', eDateParts);
    } else if (getters.CUR_PERIOD === 'curYear') {
        sDate = new Date(new Date().getFullYear(), 0, 1)
        eDate = new Date(new Date().getFullYear(), 11, 31)
        sDateParts = sDate.toLocaleDateString('uk-UA').split('.')
        eDateParts = eDate.toLocaleDateString('uk-UA').split('.')

        commit('setStartDate', sDateParts);
        commit('setEndDate', eDateParts);
    } else {
        commit('setStartDate', '');
        commit('setEndDate', '');
    }

    dispatch('UPDATE_QUERY');
}

export default {
    INIT_WORKS,
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
    UPDATE_QUERY,
    UPDATE_PERIOD
}
