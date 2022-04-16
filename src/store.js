import { createStore } from 'vuex'

const store = createStore({
  state: {
    works: [{ id: 0,
          date: '',
          projName: '',
          workType: '',
          time: ''}],
    tdate: '',
    tprojName: '',
    tworkType: '',
    ttime: '',
    butType: 0,
    curNum: 0,
    worksChange: 0
    },
  mutations: {
    CLEAR_INPUT: (state) => {
      state.tdate = '';
      state.tprojName = '';
      state.tworkType = '';
      state.ttime = '';
    },
    SET_INPUT: (state, index) => {
      state.tdate = state.works[index].date;
      state.tprojName = state.works[index].projName;
      state.tworkType = state.works[index].workType;
      state.ttime = state.works[index].time;
    },
    WORKS_PUSH: (state) => {
      state.works.push({ 			//add row
        id: state.works.length+1,
        date: state.tdate,
        projName: state.tprojName,
        workType: state.tworkType,
        time: state.ttime
      })
    },
    WORK_SAVE: (state, index) => {
      state.works[index].id = index+1;
      state.works[index].date = state.tdate;
      state.works[index].projName = state.tprojName;
      state.works[index].workType = state.tworkType;
      state.works[index].time = state.ttime;
    },
    updateDate (state, tdate){
      state.tdate = tdate
    },
    updateProjName (state, tprojName){
      state.tprojName = tprojName
    },
    updateWorkType (state, tworkType){
      state.tworkType = tworkType
    },
    updateTime (state, ttime){
      state.ttime = ttime
    },
    changeButType (state, value){
      state.butType = value
    },
    setCurNum (state, value){
      state.curNum = value
    },
    incWorksChange (state){
      state.worksChange++
    }
  },
  actions: {
    CLEAN_INPUT({commit}) {
      commit('CLEAR_INPUT')
    },
    CHANGE_INPUT({commit}, index) {
      commit('SET_INPUT',index);
    },
    ADD_WORK({commit}){
      commit('WORKS_PUSH')
    },
    SAVE_WORK({commit}, index) {
      commit('WORK_SAVE', index)
    },
    BUTTYPE_CHANGE({commit}, value){
      commit('changeButType', value)
    },
    CURNUM_SET({commit}, value){
      commit('setCurNum', value)
    },
    INC_WORKSCHANGE({commit}){
      commit('incWorksChange')
    }
  },
  getters: {
    WORKS_STATE(state){
      return state.works;
    },
    TDATE_STATE(state){
      return state.tdate;
    },
    TPROJNAME_STATE(state){
      return state.tprojName;
    },
    TWORKTYPE_STATE(state){
      return state.tworkType;
    },
    TTIME_STATE(state){
      return state.ttime;
    },
    BUTTYPE_STATE(state){
      return state.butType;
    },
    CURNUM_STATE(state){
      return state.curNum;
    },
    WORKSCHANGE_STATE(state){
      return state.worksChange;
    }
  }
})

export default store;
