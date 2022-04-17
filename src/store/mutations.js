const CLEAR_INPUT = (state) => {
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

const WORKS_PUSH = (state) => {
      state.works.push({ 			//add row
        id: state.works.length+1,
        date: state.tdate,
        projName: state.tprojName,
        workType: state.tworkType,
        time: state.ttime
      })
    }

const WORK_SAVE = (state, index) => {
      state.works[index].id = index+1;
      state.works[index].date = state.tdate;
      state.works[index].projName = state.tprojName;
      state.works[index].workType = state.tworkType;
      state.works[index].time = state.ttime;
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

const changeButType = (state, value) => {
      state.butType = value
    }

const setCurNum = (state, value) => {
      state.curNum = value
    }

const incWorksChange = (state) => {
      state.worksChange++
    }

export default {
  CLEAR_INPUT,
  SET_INPUT,
  WORKS_PUSH,
  WORK_SAVE,
  updateDate,
  updateProjName,
  updateWorkType,
  updateTime,
  changeButType,
  setCurNum,
  incWorksChange
}
