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
				'BUTTYPE_STATE',
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
				'INC_WORKSCHANGE'
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
			checkInputs(){
				if (this.TDATE_STATE==='' || this.TPROJNAME_STATE==='' || this.TWORKTYPE_STATE==='' || this.TTIME_STATE==='') {
					alert('Fill ALL inputs, please!');
					return false
				} else return true
			},
			addRec(){
				if (!this.checkInputs()) return false
				if (this.WORKS_STATE.length===1 && this.WORKS_STATE[0].date===''){
					this.WORK_DEL(0); //delete 1st empty row
				}

				this.ADD_WORK();
				this.CLEAN_INPUT();

				this.INC_WORKSCHANGE();

			},
			saveRec() {
				if (!this.checkInputs()) return false

				this.SAVE_WORK(this.CURNUM_STATE);
				this.CLEAN_INPUT();

				this.BUTTYPE_CHANGE(0);
				this.INC_WORKSCHANGE();

			},
			cancelEdit() {
				this.CLEAN_INPUT();

				this.BUTTYPE_CHANGE(0);
			}
		}
	}
</script>

<template>
	<div>
		<h3>Input Form:</h3>
		<table class="my_table">
			<tr class="header">
				<td>Date</td>
				<td>Project Name</td>
				<td>Type of Work</td>
				<td>Elapsed Time</td>
				<td></td>
			</tr>
			<tr>
				<td><input type="date" :value="TDATE_STATE" @input="updateDate"></td>
				<td><input type="text" :value="TPROJNAME_STATE" @input="updateProjName" list="projNameList"></td>
				<td><input type="text" :value="TWORKTYPE_STATE" @input="updateWorkType" list="workTypeList"></td>
				<td><input type="time" :value="TTIME_STATE" @input="updateTime"></td>
				<td v-if="BUTTYPE_STATE==0"><button @click="addRec">+ Add record</button></td>
				<td v-else><button @click="saveRec">Save</button> <button @click="cancelEdit">Cancel</button></td>
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
	</div>
</template>

<style>
.my_table {
	width: 900px;
}
.my_table td{
	width: 160px;
}
</style>
