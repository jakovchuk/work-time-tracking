<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppQuery',
  computed: {
    ...mapGetters([
      'WORKS_STATE',
      'STARTDATE_STATE',
      'ENDDATE_STATE',
      'CUR_PERIOD',
      'PROJTIME_STATE'
    ])
  },
  methods: {
    ...mapActions ([
      'INIT_WORKS',
      'CLEAR_FILTERDATES',
      'CLEAR_PERIOD',
      'CHANGE_FILTERDATE',
      'RESET_FILTER',
      'UPDATE_QUERY',
      'UPDATE_PERIOD',
    ]),
    updateStartDate(e) {
      this.$store.commit('updateStartDate', e.target.value)
    },
    updateEndDate(e) {
      this.$store.commit('updateEndDate', e.target.value)
    }
  }
}
</script>

<template>
  <div class="AppQuery" v-if="this.WORKS_STATE.length>0 && this.WORKS_STATE[0].projName !== ''">
		<h3>Total Project Time:</h3>
    <p><b>Date filter:&nbsp;
      <select name="period" @change="UPDATE_PERIOD($event.target.value)" :value="CUR_PERIOD">
        <option selected disabled>Choose period</option>
        <option value="Today">Today</option>
        <option value="curWeek">Current week</option>
        <option value="curMonth">Current month</option>
        <option value="curYear">Current year</option>
      </select>
      <br></b> from&nbsp;
      <input type="date" name="" :value="STARTDATE_STATE" @input="updateStartDate" @change="CHANGE_FILTERDATE"> to&nbsp;
      <input type="date" name="" :value="ENDDATE_STATE" @input="updateEndDate" @change="CHANGE_FILTERDATE">&nbsp;
    <button type="button" name="button" @click="RESET_FILTER">Reset</button>  </p>
    <div class="table">
			<div class="row header" v-if="PROJTIME_STATE.length > 0 ">
				<div class="cell tablecol">Project Name</div>
				<div class="cell time">Time</div>
			</div>
      <transition-group name="list">
      <template v-for="pTime in PROJTIME_STATE">
      <div class="row" v-if="pTime.projN !== '' " :key="pTime.id">
				<div class="bordercell tablecol">{{pTime.projN}}</div>
				<div class="bordercell time">{{pTime.projT}}</div>
			</div>
      </template>
      </transition-group>
    </div>
    <br>
    <hr>
  </div>
</template>

<style>
p {
  font: 1em "Fira Sans", sans-serif;
}
div .AppQuery{
	background-color: #eec;
  margin-top: -0.5em;
  padding-top: 0.5em;
}
.query_table {
	width: 300px;
}
.tablecol {
  width: 220px;
}
.time {
  width: 80px;
}
.bordercell {
	border: 1px solid;
	border-collapse: collapse;
  background-color: white;
}
</style>
