<script>
import { mapGetters } from 'vuex';
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
      'WORKSCHANGE_STATE'
    ])
  },
  methods: {
    strToSec: function(str) {
      let myTimeArr = str.split(":");
      return parseInt(myTimeArr[0]) * 3600 + parseInt(myTimeArr[1]) * 60;
      },
    secToStr: function(sec) {
      let hours = ~~(sec / 3600) % 24;
      let minutes = ~~(sec / 60) % 60;

      hours = hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      minutes = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

      return hours+':'+minutes;
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

      if (this.WORKS_STATE.length>0) {
        for (var i=0; i < this.WORKS_STATE.length; i++) {
          for (j=0; j < projNames.length; j++) {
            if (this.WORKS_STATE[i].projName == projNames[j]) {pr[j]+=this.strToSec(this.WORKS_STATE[i].time)}
          }
        }
      }

      this.projTime.splice(0,this.projTime.length)

      for (j=0; j < projNames.length; j++) {
        if (pr[j]>0) {this.projTime.push({id: this.projTime.length+1, projN: projNames[j], projT: this.secToStr(pr[j])})}
      }
    }
   }
}
</script>

<template>
  <div v-if="projTime.length>0 && projTime[0].projN != ''">
		<h3>Total Project Time:</h3>
    <table class="query_table">
			<tr class="header">
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
