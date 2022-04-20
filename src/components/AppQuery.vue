<script>
import { mapGetters, mapActions } from 'vuex';
import { strToSec, secToStr } from '../func'

export default {
  name: 'AppQuery',
  data() {
    return {
      projTime: [{ id: 0, projN:'', projT:''}]
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
      'WORKSCHANGE_STATE',
      'STARTDATE_STATE',
      'ENDDATE_STATE'
    ])
  },
  methods: {
    ...mapActions ([
      'CLEAR_FILTERDATES'
    ]),
    updateStartDate(e) {
      this.$store.commit('updateStartDate', e.target.value)
    },
    updateEndDate(e) {
      this.$store.commit('updateEndDate', e.target.value)
    },
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

      var sDate = new Date(this.STARTDATE_STATE)
      var eDate = new Date(this.ENDDATE_STATE)
      var wDate = new Date()

      if (this.STARTDATE_STATE === '' && this.ENDDATE_STATE === ''){
      if (this.WORKS_STATE.length>0) { //count total time in projects
        for (var i=0; i < this.WORKS_STATE.length; i++) {
          for (j=0; j < projNames.length; j++) {
            if (this.WORKS_STATE[i].projName === projNames[j])
              { pr[j]+=strToSec(this.WORKS_STATE[i].time) }
            }
          }
        }
      }

      if (this.STARTDATE_STATE === '' && this.ENDDATE_STATE != ''){
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

      if (this.STARTDATE_STATE != '' && this.ENDDATE_STATE === ''){
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

      if (this.STARTDATE_STATE != '' && this.ENDDATE_STATE != ''){
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
    <p><b>Date filter:<br></b> from&nbsp;
      <input type="date" name="" :value="STARTDATE_STATE" @input="updateStartDate"> to&nbsp;
      <input type="date" name="" :value="ENDDATE_STATE" @input="updateEndDate">&nbsp;
    <button type="button" name="button" @click="updateQuery">Apply</button>&nbsp;
    <button type="button" name="button" @click="{ this.CLEAR_FILTERDATES(); updateQuery() }">Reset</button>  </p>
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
