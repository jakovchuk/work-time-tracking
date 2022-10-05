<script setup>
import { useStore } from '@/stores/worktime'
import { onBeforeMount, watch, ref, computed } from 'vue'

const projName = ref(null)

const store = useStore()

const projNameList = computed(() => store.projNameList)
const descriptList = computed(() => store.descriptList)

const tDate = computed(() => store.tdate)
const tProjName = computed(() => store.tprojName)
const tWorkType = computed(() => store.tworkType)
const tStartTime = computed(() => store.tstarttime)
const tEndTime = computed(() => store.tendtime)
const tTime = computed(() => store.ttime)

const buttonType = computed(() => store.butType)
const timerButtonType = computed(() => store.timerButType)
const addButtonDisabled = computed(() => store.addButtonDis)
const focusInput = computed(() => store.focusInput)

const {
  addRecord,
  saveRecord,
  cancelEdit,
  startTimer,
  stopTimer,
  pressEnter,
  clearInput,
  updateDate,
  updateProjName,
  updateWorkType,
  updateTime,
  updateStartTime,
  updateEndTime,
} = store

onBeforeMount(() => {
  watch(focusInput, () => {
    projName.value.focus()
  })
})
</script>

<template>
	<div class="AppInput">
		<h3>Input Form:</h3>
		<div class="table" style="width: 1230px;">
			<div class="row header">
				<div class="cell date">Date</div>
				<div class="cell table-column">Project Name</div>
				<div class="cell table-column">Description</div>
        <div class="cell time">Start Time</div>
        <div class="cell time">End Time</div>
				<div class="cell time">Elap. Time</div>
        <div class="cell time"><button @click="clearInput" :disabled="addButtonDisabled">Clear Input</button></div>
			</div>
			<div class="row">
				<div class="cell date">
          <input type="date"
                 :value="tDate"
                 @input="updateDate($event.target.value)"
          >
        </div>
				<div class="cell table-column">
          <input type="text"
                 :value="tProjName"
                 @input="updateProjName($event.target.value)"
                 @keyup.enter="pressEnter"
                 list="projNameList"
                 ref="projName"
                 size="26"
          >
        </div>
				<div class="cell table-column">
          <input type="text"
                 :value="tWorkType"
                 @input="updateWorkType($event.target.value)"
                 @keyup.enter="pressEnter"
                 list="DescriptList"
                 size="26"
          >
        </div>
        <div class="cell time">
          <input
              type="time"
              :value="tStartTime"
              @input="updateStartTime($event.target.value)"
              :disabled="addButtonDisabled"
          >
        </div>
        <div class="cell time">
          <input type="time"
                 :value="tEndTime"
                 @input="updateEndTime($event.target.value)"
                 :disabled="addButtonDisabled"
          >
        </div>
				<div class="cell time">
          <input type="time"
                 :value="tTime"
                 @input="updateTime($event.target.value)"
                 :disabled="addButtonDisabled"
          >
        </div>
				<div class="cell date" v-if="buttonType === 0">
          <button class="primary" @click="addRecord" :disabled="addButtonDisabled">+ Add record</button>
        </div>
				<div class="cell date" v-else>
          <button class="primary" @click="saveRecord">Save</button> <button @click="cancelEdit">Cancel</button>
        </div>
        <template v-if="buttonType === 0">
          <div class="cell table-column" v-if="timerButtonType === 0">
            <button id="start-timer" @click="startTimer">&#9658; Start Timer</button>
          </div>
          <div class="cell table-column" v-else>
            <button id="stop-timer" @click="stopTimer">&#8718; Stop Timer</button>
          </div>
        </template>
        <div class="cell table-column" v-else></div>
			</div>
		</div>
		<datalist id="projNameList">
			<option v-for="projName in projNameList" :key="projName.id">{{ projName }}</option>
		</datalist>
		<datalist id="DescriptList">
      <option v-for="descript in descriptList" :key="descript.id">{{ descript }}</option>
		</datalist>
		<br>
		<hr>
	</div>
</template>

<style>
div.AppInput{
	background-color: #eee;
	margin-top: -0.5em;
	padding-top: 0.5em;
}

.header {
  font: bold .9em "Tahoma", sans-serif;
  color: teal;
}

.table-column {
	width: 220px;
}

.date {
  width: 120px;
}

.time {
  width: 80px;
}

.cell {
  display:inline-block;
  padding:3px;
  margin:1px;
}
.row {
  display: table-row;
}
button {
  background-color: white;
  color: black;
  border: 2px solid navy;
  border-radius: 2px;
  padding: 1px 7px;
}
button.primary {
  background-color: #f5e67a;
  color: black;
}
button:disabled {
  background-color: #d5d5d5;
  color: black;
  border: 2px solid navy;
  border-radius: 2px;
}
button#start-timer {
  background-color: #33ad4b;
  color: #ffffff;
  border: 2px solid navy;
  border-radius: 2px;
}
button#stop-timer {
  background-color: #b04a4a;
  color: #ffffff;
  border: 2px solid navy;
  border-radius: 2px;
}
</style>
