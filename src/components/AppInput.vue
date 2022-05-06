<script>
import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'AppInput',
    created() {
      this.$watch('FOCUSINPUT_STATE', () => {
        this.$refs.projName.focus()
      })
    },
    computed: {
			...mapGetters([
				'WORKS_STATE',
				'TDATE_STATE',
				'TPROJNAME_STATE',
				'TWORKTYPE_STATE',
				'TTIME_STATE',
        'TSTARTTIME_STATE',
        'TENDTIME_STATE',
        'TEMP_VALUES',
				'BUTTYPE_STATE',
        'TIMERBUTTYPE_STATE',
        'ADDBUTTON_DIS_STATE',
				'CURNUM_STATE',
        'FOCUSINPUT_STATE'
			])
		},
		methods: {
			...mapActions([
				'CLEAN_INPUT',
				'ADD_WORK',
				'SAVE_WORK',
				'WORK_DEL',
				'BUTTYPE_CHANGE',
				'CURNUM_SET',
				'INC_WORKSCHANGE',
        'ADD_RECORD',
        'SAVE_RECORD',
        'CANCEL_EDIT',
        'START_TIMER',
        'STOP_TIMER',
        'FOCUS_OUT'
			]),
			updateDate(e){
				this.$store.commit('updateDate', e.target.value)
			},
			updateProjName(e){
				this.$store.commit('updateProjName', e.target.value)
			},
			updateWorkType(e){
				this.$store.commit('updateWorkType', e.target.value)
			},
			updateTime(e){
				this.$store.commit('updateTime', e.target.value)
			},
      updateStartTime(e){
        this.$store.commit('updateStartTime', e.target.value)
      },
      updateEndTime(e){
        this.$store.commit('updateEndTime', e.target.value)
      }
		}
	}
</script>

<template>
	<div class="AppInput">
		<h3>Input Form:</h3>
		<div class="table">
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
				<div class="cell tablecol"><input type="text" :value="TWORKTYPE_STATE" @input="updateWorkType" list="workTypeList" size="26"></div>
        <div class="cell time"><input type="time" :value="TSTARTTIME_STATE" @input="updateStartTime" :disabled="ADDBUTTON_DIS_STATE"></div>
        <div class="cell time"><input type="time" :value="TENDTIME_STATE" @input="updateEndTime" :disabled="ADDBUTTON_DIS_STATE"></div>
				<div class="cell time"><input type="time" :value="TTIME_STATE" @input="updateTime" :disabled="ADDBUTTON_DIS_STATE"></div>
				<div class="cell date" v-if="BUTTYPE_STATE === 0"><button @click="ADD_RECORD" :disabled="ADDBUTTON_DIS_STATE">+ Add record</button></div>
				<div class="cell date" v-else><button @click="SAVE_RECORD">Save</button> <button @click="CANCEL_EDIT">Cancel</button></div>
        <span v-if="BUTTYPE_STATE === 0">
          <div class="cell tablecol" v-if="TIMERBUTTYPE_STATE === 0"><button id="starttimer" @click="START_TIMER">&#9658; Start Timer</button></div>
          <div class="cell tablecol" v-else><button id="stoptimer" @click="STOP_TIMER">&#8718; Stop Timer</button></div>
        </span>
			</div>
		</div>
		<datalist id="projNameList">
			<option>Project 1</option>
			<option>Project 2</option>
			<option>Project 3</option>
		</datalist>
		<datalist id="workTypeList">
			<option>Coding...</option>
			<option>Testing...</option>
			<option>Finding errors and fixing...</option>
		</datalist>
		<br>
		<hr>
	</div>
</template>

<style>
div .AppInput{
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

.table {
  display: table;
  border: 0px solid black;
  margin: 5px;
  padding: 0px;
  width:100%
}
.cell {
  display: table-cell;
}
.cell {
  display:inline-block;
  padding:3px;
  margin:1px;
}
.row {
  display: table-row;
}
</style>
