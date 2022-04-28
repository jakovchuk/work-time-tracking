const INIT_WORKS = context => {
    context.commit('initWorks')
}

const CLEAN_INPUT = (context) => {
    context.commit('CLEAR_INPUT')
}

const CHANGE_INPUT = (context, index) => {
    context.commit('SET_INPUT', index);
}

const ADD_WORK = (context) => {
    context.commit('WORKS_PUSH')
}

const SAVE_WORK = (context, index) => {
    context.commit('WORK_SAVE', index)
}

const WORK_DEL = (context, index) => {
    context.commit('WORK_DEL_ROW', index)
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
}

const CLEAR_PERIOD = (context) => {
    context.commit('clearPeriod')
}

const UPDATE_QUERY = (context) => {
    context.commit('updateQuery')
}

const UPDATE_PERIOD = (context, value) => {
    context.commit('updatePeriod', value)
    context.commit('updateQuery')
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
