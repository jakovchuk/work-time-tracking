<script setup>
import { useStore } from 'vuex';
import { onBeforeMount, watch, ref, computed } from "vue";

const projName = ref(null)

onBeforeMount(() => {
  watch(FOCUSINPUT_STATE, () => {
    projName.value.focus()
  })
});

const store = useStore();

const PROJNAMELIST_STATE = ref(computed(() => store.getters.PROJNAMELIST_STATE));
const DESCRIPTLIST_STATE = ref(computed(() => store.getters.DESCRIPTLIST_STATE));
const TDATE_STATE = ref(computed(() => store.getters.TDATE_STATE));
const TPROJNAME_STATE = ref(computed(() => store.getters.TPROJNAME_STATE));
const TWORKTYPE_STATE = ref(computed(() => store.getters.TWORKTYPE_STATE));
const TTIME_STATE = ref(computed(() => store.getters.TTIME_STATE));
const TSTARTTIME_STATE = ref(computed(() => store.getters.TSTARTTIME_STATE));
const TENDTIME_STATE = ref(computed(() => store.getters.TENDTIME_STATE));
const BUTTYPE_STATE = ref(computed(() => store.getters.BUTTYPE_STATE));
const TIMERBUTTYPE_STATE = ref(computed(() => store.getters.TIMERBUTTYPE_STATE));
const ADDBUTTON_DIS_STATE = ref(computed(() => store.getters.ADDBUTTON_DIS_STATE));
const FOCUSINPUT_STATE = ref(computed(() => store.getters.FOCUSINPUT_STATE));

const ADD_RECORD = () => store.dispatch('ADD_RECORD');
const SAVE_RECORD = () => store.dispatch('SAVE_RECORD');
const CANCEL_EDIT = () => store.dispatch('CANCEL_EDIT');
const START_TIMER = () => store.dispatch('START_TIMER');
const STOP_TIMER = () => store.dispatch('STOP_TIMER');

const updateDate = e => store.commit('updateDate', e.target.value);
const updateProjName = e => store.commit('updateProjName', e.target.value);
const updateWorkType = e => store.commit('updateWorkType', e.target.value);
const updateTime = e => store.commit('updateTime', e.target.value);
const updateStartTime = e => store.commit('updateStartTime', e.target.value);
const updateEndTime = e => store.commit('updateEndTime', e.target.value);
</script>

<template>
	<div class="AppInput">
		<h3>Input Form:</h3>
		<div class="table" style="width: 1230px;">
			<div class="row header">
				<div class="cell date">Date</div>
				<div class="cell tablecol">Project Name</div>
				<div class="cell tablecol">Description</div>
        <div class="cell time">Start Time</div>
        <div class="cell time">End Time</div>
				<div class="cell time">Elap. Time</div>
			</div>
			<div class="row">
				<div class="cell date"><input type="date" :value="TDATE_STATE" @input="updateDate"></div>
				<div class="cell tablecol"><input type="text" :value="TPROJNAME_STATE" @input="updateProjName" list="projNameList" ref="projName" size="26"></div>
				<div class="cell tablecol"><input type="text" :value="TWORKTYPE_STATE" @input="updateWorkType" list="DescriptList" size="26"></div>
        <div class="cell time"><input type="time" :value="TSTARTTIME_STATE" @input="updateStartTime" :disabled="ADDBUTTON_DIS_STATE"></div>
        <div class="cell time"><input type="time" :value="TENDTIME_STATE" @input="updateEndTime" :disabled="ADDBUTTON_DIS_STATE"></div>
				<div class="cell time"><input type="time" :value="TTIME_STATE" @input="updateTime" :disabled="ADDBUTTON_DIS_STATE"></div>
				<div class="cell date" v-if="BUTTYPE_STATE === 0"><button @click="ADD_RECORD" :disabled="ADDBUTTON_DIS_STATE">+ Add record</button></div>
				<div class="cell date" v-else><button @click="SAVE_RECORD">Save</button> <button @click="CANCEL_EDIT">Cancel</button></div>
        <template v-if="BUTTYPE_STATE === 0">
          <div class="cell tablecol" v-if="TIMERBUTTYPE_STATE === 0"><button id="starttimer" @click="START_TIMER">&#9658; Start Timer</button></div>
          <div class="cell tablecol" v-else><button id="stoptimer" @click="STOP_TIMER">&#8718; Stop Timer</button></div>
        </template>
        <div class="cell tablecol" v-else></div>
			</div>
		</div>
		<datalist id="projNameList">
			<option v-for="projName in PROJNAMELIST_STATE" :key="projName.id">{{ projName }}</option>
		</datalist>
		<datalist id="DescriptList">
      <option v-for="descript in DESCRIPTLIST_STATE" :key="descript.id">{{ descript }}</option>
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

.tablecol {
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
button:disabled {
  background-color: #d5d5d5;
  color: black;
  border: 2px solid navy;
  border-radius: 2px;
}
button#starttimer {
  background-color: #53b763;
  color: #ffffff;
  border: 2px solid navy;
  border-radius: 2px;
}
button#stoptimer {
  background-color: #b04a4a;
  color: #ffffff;
  border: 2px solid navy;
  border-radius: 2px;
}
</style>
