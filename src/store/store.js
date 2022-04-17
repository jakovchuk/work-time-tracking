import { createStore } from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

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
  mutations,
  actions,
  getters
})

export default store;
