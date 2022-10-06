<script setup>
import { useStore } from '@/stores/worktime'
import { computed } from 'vue'

const store = useStore()

const works = computed(() => store.works)
const startDate = computed(() => store.startDate)
const endDate = computed(() => store.endDate)
const period = computed(() => store.period)
const projectTime = computed(() => store.projTime)
const timeSum = computed(() => store.timeSum)

const {
  changeFilterDate,
  resetFilter,
  updatePeriod,
  updateStartDate,
  updateEndDate,
} = store
</script>

<template>
  <div class="AppQuery" v-if="works.length > 0 && works[0].projName !== ''">
		<h3>Total Project Time:</h3>
    <p><b>Date filter:&nbsp;
      <select name="period" @change="updatePeriod($event.target.value)" :value="period">
        <option selected disabled>Choose period</option>
        <option value="Today">Today</option>
        <option value="curWeek">Current week</option>
        <option value="curMonth">Current month</option>
        <option value="curYear">Current year</option>
      </select>
      <br></b> from&nbsp;
      <input type="date" name="" :value="startDate" @input="updateStartDate($event.target.value)" @change="changeFilterDate"> to&nbsp;
      <input type="date" name="" :value="endDate" @input="updateEndDate($event.target.value)" @change="changeFilterDate">&nbsp;
    <button type="button" name="button" @click="resetFilter">Reset</button>  </p>
    <div class="table" style="width: 400px;">
			<div class="row header" v-if="projectTime.length > 0 ">
				<div class="cell table-column">Project Name</div>
				<div class="cell time">Time</div>
			</div>
      <transition-group name="list">
      <template v-for="pTime in projectTime">
      <div class="row" v-if="pTime.projN !== '' " :key="pTime.id">
				<div class="border cell table-column">{{ pTime.projN }}</div>
				<div class="border cell time">{{ pTime.projT }}</div>
			</div>
      </template>
      </transition-group>
    </div>
    <div class="table" style="width: 400px;">
      <div class="row" v-if="projectTime.length > 0 ">
        <div class="border cell table-column"><b>Overall Time:</b></div>
        <div class="border cell time"><b>{{ timeSum }}</b></div>
      </div>
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
.table-column {
  width: 220px;
}
</style>
