<script>
import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'AppInput',
		computed: {
			...mapGetters([
				'WORKS_STATE',
				'TDATE_STATE',
				'TPROJNAME_STATE',
				'TWORKTYPE_STATE',
				'TTIME_STATE',
        'TEMP_VALUES',
				'BUTTYPE_STATE',
        'TIMERBUTTYPE_STATE',
        'ADDBUTTON_DIS_STATE',
				'CURNUM_STATE'
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
        'STOP_TIMER'
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
			}
		}
	}
</script>

<template>
	<div class="AppInput">
		<h3>Input Form:</h3>
		<table class="my_inputtable">
			<tr class="header">
				<td>Date</td>
				<td>Project Name</td>
				<td>Type of Work</td>
				<td>Elapsed Time</td>
				<td></td>
        <td></td>
			</tr>
			<tr>
				<td><input type="date" :value="TDATE_STATE" @input="updateDate"></td>
				<td><input type="text" :value="TPROJNAME_STATE" @input="updateProjName" list="projNameList"></td>
				<td><input type="text" :value="TWORKTYPE_STATE" @input="updateWorkType" list="workTypeList"></td>
				<td><input type="time" :value="TTIME_STATE" @input="updateTime" :disabled="ADDBUTTON_DIS_STATE"></td>
				<td v-if="BUTTYPE_STATE === 0"><button @click="ADD_RECORD" :disabled="ADDBUTTON_DIS_STATE">+ Add record</button></td>
				<td v-else><button @click="SAVE_RECORD">Save</button> <button @click="CANCEL_EDIT">Cancel</button></td>
        <span v-if="BUTTYPE_STATE === 0">
        <td v-if="TIMERBUTTYPE_STATE === 0"><button id="starttimer" @click="START_TIMER">> Start Timer</button></td>
        <td v-else><button id="stoptimer" @click="STOP_TIMER">|| Stop Timer</button></td>
        </span>
			</tr>
		</table>
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

.my_inputtable {
	width: 1080px;
}
.my_inputtable td{
	width: 160px;
}
</style>
