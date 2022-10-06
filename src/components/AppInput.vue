<script setup>
import { useInputStore } from '@/stores/input'
import { onBeforeMount, watch, ref, computed } from 'vue'

const projName = ref(null)

const inputStore = useInputStore()

const projNameList = computed(() => inputStore.projNameList)
const descriptList = computed(() => inputStore.descriptList)

const tDate = computed(() => inputStore.tdate)
const tProjName = computed(() => inputStore.tprojName)
const tWorkType = computed(() => inputStore.tworkType)
const tStartTime = computed(() => inputStore.tstarttime)
const tEndTime = computed(() => inputStore.tendtime)
const tTime = computed(() => inputStore.ttime)

const buttonType = computed(() => inputStore.buttonType)
const timerButtonType = computed(() => inputStore.timerButtonType)
const addButtonDisabled = computed(() => inputStore.addButtonDisabled)
const focusInput = computed(() => inputStore.focusInput)

const {
  addRecord,
  saveRecord,
  cancelEdit,
  startTimer,
  stopTimer,
  pressEnter,
  clearProjNameList,
  clearDescriptList,
  clearInput,
  updateDate,
  updateProjName,
  updateWorkType,
  updateTime,
  updateStartTime,
  updateEndTime,
} = inputStore

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
				<div class="cell table-column">Project Name <button class="clear" @click="clearProjNameList">Clear</button></div>
				<div class="cell table-column">Description <button class="clear" @click="clearDescriptList">Clear</button></div>
        <div class="cell time">Start Time</div>
        <div class="cell time">End Time</div>
				<div class="cell time">Elap. Time</div>
        <div class="cell time"><button class="clear" @click="clearInput" :disabled="addButtonDisabled">Clear Input</button></div>
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
  background-color: #f9e79f;
  color: black;
}
button.clear {
  border: 2px solid #b04a4a;
  background-color: #fadbd8;
  font: .8em "Tahoma";
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
