<script setup>
import AppInput from './components/AppInput.vue'
import AppQuery from './components/AppQuery.vue'
import { useMainStore } from '@/stores/main'
import { useInputStore } from '@/stores/input'
import { onBeforeMount, onMounted, computed, watch } from 'vue'

const mainStore = useMainStore()
const inputStore = useInputStore()

const works = computed(() => mainStore.works)
const worksChange = computed(() => inputStore.worksChange)
const addButtonDisabled = computed(() => inputStore.addButtonDisabled)

const {
  updateQuery,
  initWorks,
  editRecord,
  deleteRecord,
  clearTable,
} = mainStore

const {
  initInputOptions,
  initializeInput,
} = inputStore

onBeforeMount(() => {
  watch(worksChange, () => {
    updateQuery()
  })
})

onMounted(() => {
  if (localStorage.works) {
    initWorks()
    initInputOptions()
    initializeInput()
    updateQuery()
  }
})
</script>

<template>
	<div id="app">
		<h1>Work Time Tracking</h1>
		<AppInput></AppInput>
		<transition name="fade">
		<div v-if="works.length>0 && works[0].date !== ''">
		<h3>Data Table:</h3>
		<div class="table">
			<div class="row header">
				<div class="cell date">Date</div>
				<div class="cell table-column">Project Name</div>
				<div class="cell table-column">Description</div>
        <div class="cell time">Start Time</div>
        <div class="cell time">End Time</div>
				<div class="cell time">Elap. Time</div>
				<div class="cell time"><button @click="clearTable">Clear Table</button></div>
			</div>
			<transition-group name="list">
			<template v-for="(work, row) in works" :key="work.id">
        <div class="row" v-if="work.date !== '' ">
          <div class="border cell date">{{ work.date }}</div>
          <div class="border cell table-column-col">{{ work.projName }}</div>
          <div class="border cell table-column">{{ work.workType }}</div>
          <div class="border cell time">{{ work.startTime }}</div>
          <div class="border cell time">{{ work.endTime }}</div>
          <div class="border cell time">{{ work.time }}</div>
          <div class="cell date">
            <button class="primary" @click="editRecord(row)" :disabled="addButtonDisabled">Edit</button> <button @click="deleteRecord(row)">- Delete</button>
          </div>
        </div>
      </template>
		</transition-group>
		</div>
		<br>
		<hr>
		</div>
		</transition>
		<transition name="query"><AppQuery></AppQuery></transition>
	</div>
</template>

<style>
body { zoom: 115%; }
h1{
  color: navy;
  font: bold 1.8em "Tahoma";
  text-decoration: underline;
}
h3{
    font: bold 1.2em "Tahoma", sans-serif;
		color: maroon;
		padding: 0;
		margin: 0;
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
.header {
	font: bold .9em "Tahoma", sans-serif;
	color: teal;
}
.table {
  display: table;
  border: 0 solid black;
  margin: 5px;
  padding: 0;
  width:1000px;
  border-spacing:2px;
}
.cell {
  display: table-cell;
  padding:3px;
  margin:0 1px;
  border: 1px solid transparent;
  border-collapse: collapse;
  border-radius: 2px;
}
.border {
  border: 1px solid;
  background-color: white;
}
.row {
  display: table-row;
}
button {
  background-color: white;
  color: black;
  border: 2px solid navy;
	border-radius: 3px;
  padding: 1px 7px;
  cursor: pointer;
}
button.primary {
  background-color: #f5e67a;
  color: black;
}
button:disabled {
  background-color: #ececec;
  color: #595959;
  border: 2px solid #8f8f8f;
  border-radius: 3px;
  cursor: default;
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
