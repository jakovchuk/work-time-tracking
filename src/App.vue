<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import AppInput from './components/AppInput.vue'
import AppQuery from './components/AppQuery.vue'
</script>

<script>
import {mapGetters, mapActions} from 'vuex'

	export default {
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
				'WORK_DEL',
				'CHANGE_INPUT',
				'BUTTYPE_CHANGE',
				'CURNUM_SET',
				'CLEAN_INPUT',
				'INC_WORKSCHANGE'
			]),
			editRec(row){ 	//edit row
				this.CHANGE_INPUT(row)

				this.BUTTYPE_CHANGE(1);
				this.CURNUM_SET(row);
			},
			deleteRec(row){ //delete row
				this.WORK_DEL(row);

				this.CLEAN_INPUT();

				this.BUTTYPE_CHANGE(0);
				this.INC_WORKSCHANGE();
			}
		}
	}
</script>

<template>
	<div id="app">
		<h1 style="color:navy;"><b><u>Work Time Tracking</u></b></h1>
			<AppInput></AppInput>
		<br>
		<hr>
		<div v-if="WORKS_STATE.length>0 && WORKS_STATE[0].date != ''">
		<h3>Data Table:</h3>
		<table class="my_table">
			<tr class="header">
				<td>Date</td>
				<td>Project Name</td>
				<td>Type of Work</td>
				<td>Elapsed Time</td>
				<td></td>
			</tr>
			<template v-for="(work, id) in WORKS_STATE" :key="work.id">
			<tr v-if="WORKS_STATE.date != '' ">
				<td class="my_td">{{work.date}}</td>
				<td class="my_td">{{work.projName}}</td>
				<td class="my_td">{{work.workType}}</td>
				<td class="my_td">{{work.time}}</td>
				<td><button @click="editRec(id)">Edit</button> <button @click="deleteRec(id)">- Delete</button></td>
			</tr>
		</template>
		</table>
		<br>
		<hr>
		</div>
		<AppQuery></AppQuery>
	</div>
</template>

<style>
body { zoom: 120%; }
h3{
    font: bold 1.2em "Fira Sans", sans-serif;
		color: maroon;
		padding: 0;
		margin: 0;
}
.my_table {
	width: 900px;
}
.my_table td{
	width: 160px;
}
.my_td {
	width: 160px;
	border: 1px solid;
	border-collapse: collapse;
}
.header td{
	font: bold 1em "Fira Sans", sans-serif;
	color: teal;
}
button {
  background-color: white;
  color: black;
  border: 2px solid navy;
	border-radius: 2px;
}
</style>
