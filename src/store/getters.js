const WORKS_STATE = state => state.works;
const PROJTIME_STATE = state => state.projTime;
const TDATE_STATE = state => state.tdate;
const TPROJNAME_STATE = state => state.tprojName;
const TWORKTYPE_STATE = state => state.tworkType;
const TTIME_STATE = state => state.ttime;
const TEMP_VALUES = state => {
  return !(state.tdate === '' || state.tprojName === '' || state.tworkType === '' || state.ttime === '');
}
const STARTDATE_STATE = state => state.startDate;
const ENDDATE_STATE = state => state.endDate;
const CUR_PERIOD = state => state.period;
const BUTTYPE_STATE = state => state.butType;
const CURNUM_STATE = state => state.curNum;
const WORKSCHANGE_STATE = state => state.worksChange;
const PROJNAMES_STATE = state => state.projNames;
const PR_STATE = state => state.pr;

export default {
  WORKS_STATE,
  PROJTIME_STATE,
  TDATE_STATE,
  TPROJNAME_STATE,
  TWORKTYPE_STATE,
  TTIME_STATE,
  TEMP_VALUES,
  STARTDATE_STATE,
  ENDDATE_STATE,
  CUR_PERIOD,
  BUTTYPE_STATE,
  CURNUM_STATE,
  WORKSCHANGE_STATE,
  PROJNAMES_STATE,
  PR_STATE
}
