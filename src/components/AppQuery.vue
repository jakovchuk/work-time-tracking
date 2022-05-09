<script setup>
import { ref, computed } from "vue";
import { useStore } from 'vuex';

const store = useStore();

const WORKS_STATE = ref(computed(() => store.getters.WORKS_STATE));
const STARTDATE_STATE = ref(computed(() => store.getters.STARTDATE_STATE));
const ENDDATE_STATE = ref(computed(() => store.getters.ENDDATE_STATE));
const CUR_PERIOD = ref(computed(() => store.getters.CUR_PERIOD));
const PROJTIME_STATE = ref(computed(() => store.getters.PROJTIME_STATE));

const CHANGE_FILTERDATE = () => store.dispatch('CHANGE_FILTERDATE');
const RESET_FILTER = () => store.dispatch('RESET_FILTER');
const UPDATE_PERIOD = (e) => store.dispatch('UPDATE_PERIOD', e);

const updateStartDate = e => store.commit('updateStartDate', e.target.value);
const updateEndDate = e => store.commit('updateEndDate', e.target.value);
</script>

<template>
  <div class="AppQuery" v-if="WORKS_STATE.length>0 && WORKS_STATE[0].projName !== ''">
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
div.AppQuery{
	background-color: #eec;
  margin-top: -0.5em;
  padding-top: 0.5em;
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
