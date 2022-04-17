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
const BUTTYPE_CHANGE = (context, value) => {
      context.commit('changeButType', value)
    }
const CURNUM_SET = (context, value) => {
      context.commit('setCurNum', value)
    }
const INC_WORKSCHANGE = (context) => {
      context.commit('incWorksChange')
    }

export default {
  CLEAN_INPUT,
  CHANGE_INPUT,
  ADD_WORK,
  SAVE_WORK,
  BUTTYPE_CHANGE,
  CURNUM_SET,
  INC_WORKSCHANGE
}
