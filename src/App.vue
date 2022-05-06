<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import AppInput from './components/AppInput.vue'
import AppQuery from './components/AppQuery.vue'
</script>

<script>
import {mapGetters, mapActions} from 'vuex'

	export default {
    created() {
      this.$watch('WORKSCHANGE_STATE', () => {
        this.UPDATE_QUERY()
      })
    },
    mounted(){
      if(localStorage.works) {
        this.INIT_WORKS();
        this.UPDATE_QUERY()
      }
    },
    computed: {
			...mapGetters([
          'WORKS_STATE',
          'TDATE_STATE',
          'TPROJNAME_STATE',
          'TWORKTYPE_STATE',
          'TTIME_STATE',
          'BUTTYPE_STATE',
          'CURNUM_STATE',
          'WORKSCHANGE_STATE',
          'ADDBUTTON_DIS_STATE'
			])
		},
		methods: {
			...mapActions([
          'WORK_DEL',
          'CHANGE_INPUT',
          'BUTTYPE_CHANGE',
          'CURNUM_SET',
          'CLEAN_INPUT',
          'INC_WORKSCHANGE',
          'UPDATE_QUERY',
          'INIT_WORKS',
          'EDIT_RECORD',
          'DELETE_RECORD',
          'CLEAR_TABLE'
			])
		}
	}
</script>

<template>
	<div id="app">
		<h1 style="color:navy;"><b><u>Work Time Tracking</u></b></h1>
		<AppInput></AppInput>
		<transition name="fade">
		<div v-if="WORKS_STATE.length>0 && WORKS_STATE[0].date !== ''">
		<h3>Data Table:</h3>
      <br>
      <button @click="CLEAR_TABLE">Clear Table</button>
		<table class="my_table">
			<tr class="header">
				<td class="date">Date</td>
				<td class="tablecol">Project Name</td>
				<td class="tablecol">Type of Work</td>
				<td class="time">Elapsed Time</td>
				<td class="tablerow"></td>
			</tr>
			<transition-group name="list">
			<template v-for="(work, id) in WORKS_STATE" :key="work.id">
			<tr v-if="WORKS_STATE.date !== '' ">
				<td class="date bordercell">{{ work.date }}</td>
				<td class="tablecol bordercell">{{ work.projName }}</td>
				<td class="tablecol bordercell">{{ work.workType }}</td>
				<td class="time bordercell">{{ work.time }}</td>
				<td><button @click="EDIT_RECORD(id)" :disabled="ADDBUTTON_DIS_STATE">Edit</button> <button @click="DELETE_RECORD(id)">- Delete</button></td>
			</tr>
      </template>
		</transition-group>
		</table>
		<br>
		<hr>
		</div>
		</transition>
		<transition name="query"><AppQuery></AppQuery></transition>
	</div>
</template>

<style>
body { zoom: 115%; }
h3{
    font: bold 1.2em "Fira Sans", sans-serif;
		color: maroon;
		padding: 0;
		margin: 0;
}
.my_table {
	width: 900px;
}
.bordercell {
	border: 1px solid;
	border-collapse: collapse;
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
.fade-enter-active {
	transition: opacity .5s ease;
}
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.query-enter-active {
	transition: opacity 1s ease;
}
.query-leave-active {
  transition: opacity .5s ease;
}
.query-enter-from, .query-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.8s ease;
}
</style>
