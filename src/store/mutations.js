import { strToSec, secToStr } from '../func'

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
      state.works.sort((a, b) => a.date > b.date ? 1 : -1);
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

      var sDate = new Date()
      var eDate = new Date()
      var d = new Date()
      switch (state.period) {
        case 'curWeek':
          sDate.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6:1))
          eDate.setDate(sDate.getDate() + 6)
          state.startDate = sDate.toISOString().split('T')[0]
          state.endDate = eDate.toISOString().split('T')[0]
          break;
        case 'curMonth':
          sDate.setDate(1)
          eDate.setDate((new Date(new Date().getFullYear(), new Date().getMonth()+1, 0)).getDate())
          state.startDate = sDate.toISOString().split('T')[0]
          state.endDate = eDate.toISOString().split('T')[0]
          break;
        case 'curYear':
          sDate = new Date(new Date().getFullYear(), 0, 1)
          sDate.setDate(sDate.getDate()+1)
          eDate = new Date(new Date().getFullYear()+1, 0, 1)
          state.startDate = sDate.toISOString().split('T')[0]
          state.endDate = eDate.toISOString().split('T')[0]
          break;
        default:
          state.startDate = ''
          state.endDate = ''
      }
    }

const clearFilterDates = state => {
      state.startDate = '';
      state.endDate = '';
      state.period = 'Choose period'
    }

const clearPeriod = state => {
      state.period = 'Choose period'
    }

const changeButType = (state, value) => {
      state.butType = value
    }

const setCurNum = (state, value) => {
      state.curNum = value
    }

const incWorksChange = state => {
      state.worksChange++
    }

const updateQuery = state => {
      var pr = [];
      var projNm = [];
      for (var j=0; j < state.works.length; j++) {
        projNm[j] = state.works[j].projName        //create array of Project names
        }
      var projNames = Array.from(new Set(projNm)); //remove duplicates in array

      for (j=0; j < projNames.length; j++) {
        pr[j]=0                                    //init array of total time in sec
        }

      state.projTime.splice(0,state.projTime.length)

      var sDate = new Date(state.startDate)
      var eDate = new Date(state.endDate)
      var wDate = new Date()

      if (state.startDate === '' && state.endDate === ''){
      if (state.works.length>0) { //count total time in projects
        for (var i=0; i < state.works.length; i++) {
          for (j=0; j < projNames.length; j++) {
            if (state.works[i].projName === projNames[j])
              { pr[j]+=strToSec(state.works[i].time) }
            }
          }
        }
      }

      if (state.startDate === '' && state.endDate !== ''){
      if (state.works.length>0) { //count total time in projects
        for (i=0; i < state.works.length; i++) {
          for (j=0; j < projNames.length; j++) {
            wDate = Date.parse(state.works[i].date)
            if (state.works[i].projName === projNames[j] &&
                wDate.valueOf() <= eDate.valueOf())
              { pr[j]+=strToSec(state.works[i].time) }
            }
          }
        }
      }

      if (state.startDate !== '' && state.endDate === ''){
      if (state.works.length>0) { //count total time in projects
        for (i=0; i < state.works.length; i++) {
          for (j=0; j < projNames.length; j++) {
            wDate = Date.parse(state.works[i].date)
            if (state.works[i].projName === projNames[j] &&
                wDate.valueOf() >= sDate.valueOf())
              { pr[j]+=strToSec(state.works[i].time) }
            }
          }
        }
      }

      if (state.startDate !== '' && state.endDate !== ''){
      if (state.works.length>0) { //count total time in projects
        for (i=0; i < state.works.length; i++) {
          for (j=0; j < projNames.length; j++) {
            wDate = Date.parse(state.works[i].date)
            if (state.works[i].projName === projNames[j] &&
                wDate.valueOf() >= sDate.valueOf() &&
                wDate.valueOf() <= eDate.valueOf())
              { pr[j]+=strToSec(state.works[i].time) }
            }
          }
        }
      }

      for (j=0; j < projNames.length; j++) { //fill project time array
        if (pr[j]>0) {state.projTime.push({ id: state.projTime.length+1, projN: projNames[j], projT: secToStr(pr[j]) })}
        }
    }

export default {
  CLEAR_INPUT,
  SET_INPUT,
  WORKS_PUSH,
  WORK_SAVE,
  WORK_DEL_ROW,
  updateDate,
  updateProjName,
  updateWorkType,
  updateTime,
  updateStartDate,
  updateEndDate,
  updatePeriod,
  clearFilterDates,
  clearPeriod,
  changeButType,
  setCurNum,
  incWorksChange,
  updateQuery
}
