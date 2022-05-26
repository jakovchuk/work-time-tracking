const WORKS_STATE = state => state.works;
const PROJNAMELIST_STATE = state => state.projNameList;
const DESCRIPTLIST_STATE = state => state.descriptList;
const PROJTIME_STATE = state => state.projTime;
const TDATE_STATE = state => state.tdate;
const TPROJNAME_STATE = state => state.tprojName;
const TWORKTYPE_STATE = state => state.tworkType;
const TSTARTTIME_STATE = state => state.tstarttime;
const TENDTIME_STATE = state => state.tendtime;
const TTIME_STATE = state => state.ttime;
const INPUT_STATE = state => state.inputState;
const INIT_INPUT = state => state.initInput;
const TEMP_VALUES = state => {
  return !(state.tdate === '' ||
      state.tprojName === '' ||
      state.tworkType === '' ||
      state.starttime === '' ||
      state.endtime === '' ||
      state.ttime === '')
}
const STARTDATE_STATE = state => state.startDate;
const ENDDATE_STATE = state => state.endDate;
const TIMESUM_STATE = state => state.timeSum;
const CUR_PERIOD = state => state.period;
const BUTTYPE_STATE = state => state.butType;
const TIMERBUTTYPE_STATE = state => state.timerButType;
const ADDBUTTON_DIS_STATE = state => state.addButtonDis;
const CURNUM_STATE = state => state.curNum;
const WORKSCHANGE_STATE = state => state.worksChange;
const PROJNAMES_STATE = state => state.projNames;
const PR_STATE = state => state.pr;
const FOCUSINPUT_STATE = state => state.focusInput;

export default {
  WORKS_STATE,
  PROJNAMELIST_STATE,
  DESCRIPTLIST_STATE,
  PROJTIME_STATE,
  TDATE_STATE,
  TPROJNAME_STATE,
  TWORKTYPE_STATE,
  TTIME_STATE,
  TSTARTTIME_STATE,
  TENDTIME_STATE,
  INPUT_STATE,
  INIT_INPUT,
  TEMP_VALUES,
  STARTDATE_STATE,
  ENDDATE_STATE,
  TIMESUM_STATE,
  CUR_PERIOD,
  BUTTYPE_STATE,
  TIMERBUTTYPE_STATE,
  ADDBUTTON_DIS_STATE,
  CURNUM_STATE,
  WORKSCHANGE_STATE,
  PROJNAMES_STATE,
  PR_STATE,
  FOCUSINPUT_STATE
}
