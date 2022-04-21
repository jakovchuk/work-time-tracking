<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppQuery',
  created() {
    this.$watch('WORKSCHANGE_STATE', () => {
      this.UPDATE_QUERY()
    })
  },
  computed: {
    ...mapGetters([
      'WORKS_STATE',
      'WORKSCHANGE_STATE',
      'STARTDATE_STATE',
      'ENDDATE_STATE',
      'CUR_PERIOD',
      'PROJTIME_STATE'
    ])
  },
  methods: {
    ...mapActions ([
      'CLEAR_FILTERDATES',
      'UPDATE_QUERY',
      'CHOOSE_PERIOD'
    ]),
    updateStartDate(e) {
      this.$store.commit('updateStartDate', e.target.value)
    },
    updateEndDate(e) {
      this.$store.commit('updateEndDate', e.target.value)
    },
    updatePeriod(e) {
      this.$store.commit('updatePeriod', e.target.value)
    }
  }
}
</script>

<template>
  <div v-if="this.WORKS_STATE.length>0 && this.WORKS_STATE[0].projName != ''">
		<h3>Total Project Time:</h3>
    <p><b>Date filter:&nbsp;
      <select name="period" @change="updatePeriod" :value="CUR_PERIOD">
        <option selected disabled>Choose period</option>
        <option value="curWeek">Current week</option>
        <option value="curMonth">Current month</option>
        <option value="curYear">Current year</option>
      </select>&nbsp;
      <button type="button" name="button" @click="CHOOSE_PERIOD">Apply</button>
      <br></b> from&nbsp;
      <input type="date" name="" :value="STARTDATE_STATE" @input="updateStartDate" @change="UPDATE_QUERY"> to&nbsp;
      <input type="date" name="" :value="ENDDATE_STATE" @input="updateEndDate" @change="UPDATE_QUERY">&nbsp;
    <button type="button" name="button" @click="{ this.CLEAR_FILTERDATES(); this.UPDATE_QUERY() }">Reset</button>  </p>
    <table class="query_table">
			<tr class="header" v-if="PROJTIME_STATE.length > 0 ">
				<td><b>Project Name</b></td>
				<td><b>Time</b></td>
			</tr>
      <template v-for="pTime in PROJTIME_STATE">
      <tr class="query" v-if="pTime.projN != '' " :key="pTime.id">
				<td>{{pTime.projN}}</td>
				<td>{{pTime.projT}}</td>
			</tr>
      </template>
    </table>
    <br>
    <hr>
  </div>
</template>

<style>
p {
  font: 1em "Fira Sans", sans-serif;
}
.query_table {
	width: 360px;
}
.query_table td{
	width: 80px;
}
.query td {
	width: 80px;
	border: 1px solid;
	border-collapse: collapse;
}
</style>
