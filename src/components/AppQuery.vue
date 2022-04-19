<script>
import { mapGetters } from 'vuex';
import { strToSec, secToStr } from '../func'

export default {
  name: 'AppQuery',
  data() {
    return {
      projTime: [{ id: 0, projN:'', projT:''}],
      startDate: '', endDate: '', filterVisible: false
    }
  },
  created() {
    this.$watch('WORKSCHANGE_STATE', () => {
      this.updateQuery()
    })
  },
  computed: {
    ...mapGetters([
      'WORKS_STATE',
      'WORKSCHANGE_STATE'
    ])
  },
  methods: {
/*    strToSec: function(str) {
      let myTimeArr = str.split(":");
      return parseInt(myTimeArr[0]) * 3600 + parseInt(myTimeArr[1]) * 60;
      },
    secToStr: function(sec) {
      let hours = ~~(sec / 3600) % 24;
      let minutes = ~~(sec / 60) % 60;

      hours = hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      minutes = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

      return hours+':'+minutes;
    },*/
    updateQuery: function() {
      var pr = [];
      var projNm = [];
      for (var j=0; j < this.WORKS_STATE.length; j++) {
        projNm[j] = this.WORKS_STATE[j].projName        //create array of Project names
        }
      var projNames = Array.from(new Set(projNm)); //remove duplicates in array

      for (j=0; j < projNames.length; j++) {
        pr[j]=0                                    //init array of total time in sec
        }

      this.projTime.splice(0,this.projTime.length)

      var sDate = new Date(this.startDate)
      var eDate = new Date(this.endDate)
      var wDate = new Date()

      if (this.startDate==='' && this.endDate===''){
      if (this.WORKS_STATE.length>0) { //count total time in projects
        for (var i=0; i < this.WORKS_STATE.length; i++) {
          for (j=0; j < projNames.length; j++) {
            if (this.WORKS_STATE[i].projName === projNames[j])
              { pr[j]+=strToSec(this.WORKS_STATE[i].time) }
            }
          }
        }
      }

      if (this.startDate==='' && this.endDate!=''){
      if (this.WORKS_STATE.length>0) { //count total time in projects
        for (i=0; i < this.WORKS_STATE.length; i++) {
          for (j=0; j < projNames.length; j++) {
            wDate = Date.parse(this.WORKS_STATE[i].date)
            if (this.WORKS_STATE[i].projName === projNames[j] &&
                wDate.valueOf() <= eDate.valueOf())
              { pr[j]+=strToSec(this.WORKS_STATE[i].time) }
            }
          }
        }
      }

      if (this.startDate!='' && this.endDate===''){
      if (this.WORKS_STATE.length>0) { //count total time in projects
        for (i=0; i < this.WORKS_STATE.length; i++) {
          for (j=0; j < projNames.length; j++) {
            wDate = Date.parse(this.WORKS_STATE[i].date)
            if (this.WORKS_STATE[i].projName === projNames[j] &&
                wDate.valueOf() >= sDate.valueOf())
              { pr[j]+=strToSec(this.WORKS_STATE[i].time) }
            }
          }
        }
      }

      if (this.startDate!='' && this.endDate!=''){
      if (this.WORKS_STATE.length>0) { //count total time in projects
        for (i=0; i < this.WORKS_STATE.length; i++) {
          for (j=0; j < projNames.length; j++) {
            wDate = Date.parse(this.WORKS_STATE[i].date)
            if (this.WORKS_STATE[i].projName === projNames[j] &&
                wDate.valueOf() >= sDate.valueOf() &&
                wDate.valueOf() <= eDate.valueOf())
              { pr[j]+=strToSec(this.WORKS_STATE[i].time) }
            }
          }
        }
      }

      for (j=0; j < projNames.length; j++) { //fill project time array
        if (pr[j]>0) {this.projTime.push({ id: this.projTime.length+1, projN: projNames[j], projT: secToStr(pr[j]) })}
        }
    }
   }
}
</script>

<template>
  <div v-if="this.WORKS_STATE.length>0 && this.WORKS_STATE[0].projName != ''">
		<h3>Total Project Time:</h3>
    <p><b>Date filter:<br></b> from <input type="date" name="" v-model="startDate"> to <input type="date" name="" v-model="endDate">&nbsp;
    <button type="button" name="button" @click="updateQuery">Apply</button>&nbsp;
    <button type="button" name="button" @click="{ this.startDate=''; this.endDate=''; updateQuery() }">Reset</button>  </p>
    <table class="query_table">
			<tr class="header" v-if="projTime.length > 0 ">
				<td><b>Project Name</b></td>
				<td><b>Time</b></td>
			</tr>
      <template v-for="pTime in projTime">
      <tr class="query" v-if="pTime.projN != '' " :key="pTime.id">
				<td>{{pTime.projN}}</td>
				<td>{{pTime.projT}}</td>
			</tr>
      </template>
    </table>
    <br>
    <hr>
  </div>
</template>

<style>
.query_table {
	width: 360px;
}
.query_table td{
	width: 80px;
}
.query td {
	width: 80px;
	border: 1px solid;
	border-collapse: collapse;
}
</style>
