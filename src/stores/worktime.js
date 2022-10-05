import { defineStore } from 'pinia'
import { quarterTime, saveToLS, secToStr, strToSec } from "@/func";

export const useStore = defineStore('worktime', {
    state: () => ({
        works: [{
            id: 0,
            date: '',
            projName: '',
            workType: '',
            starttime: '',
            endtime: '',
            time: ''
        }],
        projTime: [{
            id: 0,
            projN: '',
            projT: ''
        }],
        projNameList: [],
        descriptList: [],
        projNames: [],
        pr: [],
        tdate: '',
        tprojName: '',
        tworkType: '',
        tstarttime: '',
        tendtime: '',
        ttime: '',
        inputState: {
            date: '',
            projName: '',
            workType: '',
            startTime: '',
            endTime: '',
            timer: 0
        },
        initInput: false,
        startDate: '',
        endDate: '',
        timeSum: '',
        period: 'Choose period',
        butType: 0,
        timerButType: 0,
        addButtonDis: false,
        curNum: 0,
        worksChange: 0,
        focusInput: 0,
        interval: null,
    }),

    getters: {
        tempValues: (state) => {
           return !(state.tdate === '' ||
                state.tprojName === '' ||
                state.tworkType === '' ||
                state.starttime === '' ||
                state.endtime === '' ||
                state.ttime === '')
        },
    },
    actions: {
        initializeInput() {
            this.initInputState()
            this.updateStartTime(this.tstarttime)
            this.updateEndTime(this.tendtime)
            this.initInputChange(true)
            if (this.inputState.timer === 1) {
                this.startTimer()
            }
            this.initInputChange(false)
        },

        addWork() {
            //Round time to 15 minutes
            this.updateStartTime(quarterTime(this.tstarttime))
            this.updateEndTime(quarterTime(this.tendtime))

            this.worksPush()
            this.worksSort()
            this.projNameListPush()
            this.descriptListPush()

            saveToLS('projNames', this.projNameList) //save projNamesList to localStorage
            saveToLS('descript', this.descriptList) //save descriptList to localStorage
            saveToLS('works', this.works) //save Works to localStorage
        },
        saveWork(index) {
            //Round time to 15 minutes
            this.updateStartTime(quarterTime(this.tstarttime))
            this.updateEndTime(quarterTime(this.tendtime))

            this.worksSave(index)
            saveToLS('works', this.works) //save Works to localStorage
        },
        deleteWork(index) {
            this.worksDelRow(index)
            saveToLS('works', this.works) //save Works to localStorage
        },

        startTimer() {
            if (!this.initInput) {
                if (this.ttime !== '') {
                    if (!confirm("Do you want to RESET 'End Time' & 'Elap.Time' fields?")) {
                        return false
                    }
                }
            }

            this.setCurrentDate()
            saveToLS('input', this.inputState)
            this.changeTimerButType(1)

            let d = new Date()
            d.setDate(d.getDate())
            let timeParts = d.toLocaleTimeString('uk-UA').split(':')
            if (!this.tstarttime || strToSec(this.tstarttime) > strToSec(d.toLocaleTimeString('uk-UA'))) {
                this.updateStartTime(timeParts[0] + ':' + timeParts[1])
            }

            this.changeTime()
            this.interval = setInterval(() => this.changeTime(), 5000);
            this.focusInputChange()
        },
        stopTimer() {
            this.changeTimerButType(0)
            saveToLS('input', this.inputState)
            this.setAddButDis(false)
            clearInterval(this.interval)

            if (confirm('Do you want to save this RECORD?')) {
                this.addRecord()
            }
        },

        initInputState() {
            this.inputState = JSON.parse(localStorage.getItem('input'));
            this.tdate = this.inputState.date
            this.tprojName = this.inputState.projName
            this.tworkType = this.inputState.workType
            this.tstarttime = this.inputState.startTime
            this.tendtime = this.inputState.endTime
        },
        initInputChange(value) {
            this.initInput = value
        },
        clearInput() {
            this.tdate = '';
            this.tprojName = '';
            this.tworkType = '';
            this.tstarttime = '';
            this.tendtime = '';
            this.ttime = '';
            this.inputState = {
                date: '',
                projName: '',
                workType: '',
                startTime: '',
                endTime: '',
                timer: 0
            }
            saveToLS('input',this.inputState)
        },
        setInput(index) {
            this.tdate = this.works[index].date;
            this.tprojName = this.works[index].projName;
            this.tworkType = this.works[index].workType;
            this.tstarttime = this.works[index].starttime;
            this.tendtime = this.works[index].endtime;
            this.ttime = this.works[index].time;
        },

        initInputOptions() {
            if (localStorage.getItem('projNames') === null)  {
                this.projNameList = []
            } else {
                this.projNameList = JSON.parse(localStorage.getItem('projNames'));
            }

            if (localStorage.getItem('descript') === null) {
                this.descriptList = []
            } else {
                this.descriptList = JSON.parse(localStorage.getItem('descript'));
            }
        },
        projNameListPush() {
            this.projNameList.push(this.tprojName);
            this.projNameList = Array.from(new Set(this.projNameList)); //remove duplicates
        },
        descriptListPush() {
            this.descriptList.push(this.tworkType);
            this.descriptList = Array.from(new Set(this.descriptList)); //remove duplicates
        },

        initWorks() {
            this.works = JSON.parse(localStorage.getItem('works'));
        },
        worksPush() {
            this.works.push({ 			//add row
                id: this.works.length+1,
                date: this.tdate,
                projName: this.tprojName,
                workType: this.tworkType,
                starttime: this.tstarttime,
                endtime: this.tendtime,
                time: this.ttime
            });
        },
        worksSort() {
            this.works.sort((a, b) => {
                if (a.date < b.date) return -1;
                if (a.date > b.date) return 1;
                if (strToSec(a.starttime) < strToSec(b.starttime)) return -1;
                if (strToSec(a.starttime) > strToSec(b.starttime)) return 1;
                return 0;
            });
        },
        worksSave(index) {
            this.works[index].id = index+1;
            this.works[index].date = this.tdate;
            this.works[index].projName = this.tprojName;
            this.works[index].workType = this.tworkType;
            this.works[index].starttime = this.tstarttime;
            this.works[index].endtime = this.tendtime;
            this.works[index].time = this.ttime;
        },
        worksDelRow(index) {
            this.works.splice(index,1)
        },

        updateDate(tdate) {
            this.tdate = tdate
            this.inputState.date = this.tdate
            saveToLS('input', this.inputState)
        },
        updateProjName(tprojName) {
            this.tprojName = tprojName
            if (this.tdate === '') {
                this.setCurrentDate()
            }
            this.inputState.projName = this.tprojName
            saveToLS('input', this.inputState)
        },
        updateWorkType(tworkType) {
            this.tworkType = tworkType
            if (this.tdate === '') {
                this.setCurrentDate()
            }
            this.inputState.workType = this.tworkType
            saveToLS('input', this.inputState)
        },
        updateTime(ttime) {
            this.ttime = ttime;
            this.tendtime = secToStr(strToSec(this.tstarttime)+strToSec(this.ttime))
        },

        setCurrentDate() {
            let d = new Date()
            d.setDate(d.getDate());
            let DateParts = d.toLocaleDateString('uk-UA').split('.')
            this.tdate = DateParts[2] + "-" + DateParts[1] + "-" + DateParts[0];
            this.inputState.date = this.tdate
        },

        updateStartTime(time) {
            this.tstarttime = time
            this.inputState.startTime = this.tstarttime
            saveToLS('input', this.inputState)

            if (this.starttime !== '' && this.tendtime !== '') {
                if (strToSec(this.tendtime) >= strToSec(this.tstarttime)) {
                    this.ttime = secToStr(strToSec(this.tendtime) - strToSec(this.tstarttime))
                } else {
                    this.ttime = secToStr(86400 + strToSec(this.tendtime)-strToSec(this.tstarttime))
                }
            }
        },
        updateEndTime(time) {
            this.tendtime = time;
            this.inputState.endTime = this.tendtime
            saveToLS('input', this.inputState)

            if (this.starttime !== '' && this.tendtime !== '') {
                if (strToSec(this.tendtime) >= strToSec(this.tstarttime)) {
                    this.ttime = secToStr(strToSec(this.tendtime)-strToSec(this.tstarttime))
                } else {
                    this.ttime = secToStr(86400 + strToSec(this.tendtime)-strToSec(this.tstarttime))
                }
            }
        },
        updateStartDate(startDate) {
            this.startDate = startDate
        },
        updateEndDate(endDate) {
            this.endDate = endDate
        },

        setStartDate(sDateParts) {
            if (sDateParts !== '') {
                this.startDate = sDateParts[2] + "-" + sDateParts[1] + "-" + sDateParts[0];
            } else {
                this.startDate = ''
            }
        },
        setEndDate(eDateParts) {
            if (eDateParts !== '') {
                this.endDate = eDateParts[2] + "-" + eDateParts[1] + "-" + eDateParts[0];
            } else {
                this.endDate = ''
            }
        },

        countTimeSum() {
            let timeSum = 0
            this.projTime.forEach(obj => timeSum += strToSec(obj.projT))
            this.timeSum = secToStr(timeSum)
        },

        clearFilterDates() {
            this.startDate = ''
            this.endDate = ''
            this.period = 'Choose period'
        },
        clearPeriod() {
            this.period = 'Choose period'
        },
        changeFilterDate() {
            this.clearPeriod()
            this.updateQuery()
        },
        resetFilter() {
            this.clearFilterDates()
            this.updateQuery()
        },

        updateQuery() {
            let projNm = [];
            for (let j = 0; j < this.works.length; j++) {
                projNm[j] = this.works[j].projName        //create array of Project names
            }
            this.setProjNames(projNm) //remove duplicates in array

            for (let j = 0; j < this.projNames.length; j++) {
                this.pr[j] = 0                              //init array of total time in sec
            }

            this.clearProjTime()

            let sDate = new Date(this.startDate)
            let eDate = new Date(this.endDate)
            let wDate = new Date()

            if (this.startDate === '' && this.endDate === ''){
                if (this.works.length > 0) { //count total time in projects
                    for (let i = 0; i < this.works.length; i++) {
                        for (let j = 0; j < this.projNames.length; j++) {
                            if (this.works[i].projName === this.projNames[j]) {
                                this.pr[j] += strToSec(this.works[i].time)
                            }
                        }
                    }
                }
            }

            if (this.startDate === '' && this.endDate !== ''){
                if (this.works.length > 0) { //count total time in projects
                    for (let i = 0; i < this.works.length; i++) {
                        for (let j = 0; j < this.projNames.length; j++) {
                            wDate = Date.parse(this.works[i].date)
                            if (this.works[i].projName === this.projNames[j] &&
                                wDate.valueOf() <= eDate.valueOf()) {
                                this.pr[j] += strToSec(this.works[i].time)
                            }
                        }
                    }
                }
            }

            if (this.startDate !== '' && this.endDate === ''){
                if (this.works.length > 0) { //count total time in projects
                    for (let i = 0; i < this.works.length; i++) {
                        for (let j = 0; j < this.projNames.length; j++) {
                            wDate = Date.parse(this.works[i].date)
                            if (this.works[i].projName === this.projNames[j] &&
                                wDate.valueOf() >= sDate.valueOf()) {
                                this.pr[j] += strToSec(this.works[i].time)
                            }
                        }
                    }
                }
            }

            if (this.startDate !== '' && this.endDate !== ''){
                if (this.works.length > 0) { //count total time in projects
                    for (let i = 0; i < this.works.length; i++) {
                        for (let j = 0; j < this.projNames.length; j++) {
                            wDate = Date.parse(this.works[i].date)
                            if (this.works[i].projName === this.projNames[j] &&
                                wDate.valueOf() >= sDate.valueOf() &&
                                wDate.valueOf() <= eDate.valueOf())
                            { this.pr[j] += strToSec(this.works[i].time) }
                        }
                    }
                }
            }

            //fill projectTime array
            for (let j=0; j < this.projNames.length; j++) {
                if (this.pr[j] > 0) {
                    this.pushProjTime(j)
                }
            }
            this.countTimeSum()
        },

        updatePeriod(value) {
            this.period = value

            let sDate = new Date()
            let eDate = new Date()
            let d = new Date()
            if (this.period === 'Today') {
                sDate.setDate(d.getDate())
                eDate.setDate(d.getDate())
            } else if (this.period === 'curWeek') {
                sDate.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1))
                eDate.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1) + 6)
            } else if (this.period === 'curMonth') {
                sDate.setDate(1)
                eDate.setDate((new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).getDate())
            } else if (this.period === 'curYear') {
                sDate = new Date(new Date().getFullYear(), 0, 1)
                eDate = new Date(new Date().getFullYear(), 11, 31)
            }

            this.setStartDate(sDate.toLocaleDateString('uk-UA').split('.'))
            this.setEndDate(eDate.toLocaleDateString('uk-UA').split('.'))
            this.updateQuery()
        },

        addRecord() {
            if (!this.tempValues ||
                this.ttime === '00:00' ||
                this.tendtime === '00:00') {
                alert('Fill ALL input fields, please!')
                return false
            }
            if (this.works.length === 1 && this.works[0].date === '') {
                this.deleteWork(0) //delete 1st empty row
            }

            this.addWork()
            this.clearInput()

            this.incWorksChange()
        },
        editRecord(row) {
            this.setInput(row)

            this.butType = 1
            this.curNum = row
        },
        deleteRecord(row) {
            if (confirm('Do you want to DELETE record?')) {
                this.deleteWork(row)

                this.clearInput()

                this.butType = 0
                this.incWorksChange()
            }
        },
        saveRecord() {
            if (!this.tempValues ||
                this.ttime === '00:00' ||
                this.tendtime === '00:00') {
                alert('Fill ALL input fields, please!');
                return false
            }

            this.saveWork(this.curNum)
            this.clearInput()

            this.butType = 0
            this.incWorksChange()
        },

        cancelEdit() {
            this.clearInput()
            this.butType = 0
        },
        clearTable() {
            if (confirm('Do you want to CLEAR TABLE?')) {
                this.works.splice(0, this.works.length)
                saveToLS('works', this.works) //save Works to localStorage
            }
        },

        pressEnter() {
            if (this.butType === 0) {
                if (!this.addButtonDis) {
                    this.addRecord()
                }
            } else {
                this.saveRecord()
            }
        },

        changeButType(value) {
            this.butType = value
        },
        changeTimerButType(value) {
            this.timerButType = value
            this.inputState.timer = value
        },

        setAddButDis(value) {
            this.addButtonDis = value
        },
        setCurNum(value) {
            this.curNum = value
        },

        incWorksChange() {
            if (this.worksChange === 0) { //Change value
                this.worksChange = 1
            } else {
                this.worksChange = 0
            }
        },

        clearProjTime() {
            this.projTime.splice(0, this.projTime.length)
        },
        pushProjTime(j) {
            this.projTime.push({ id: this.projTime.length + 1, projN: this.projNames[j], projT: secToStr(this.pr[j]) })
        },
        setProjNames(array) {
            this.projNames = Array.from(new Set(array));
        },

        changeTime() {
            let d = new Date();
            d.setDate(d.getDate());
            let timeParts = d.toLocaleTimeString('uk-UA').split(':');
            this.tendtime = timeParts[0] + ':' + timeParts[1];
            this.inputState.endTime = this.tendtime
            saveToLS('input', this.inputState)

            if (strToSec(this.tendtime) >= strToSec(this.tstarttime)) {
                this.ttime = secToStr(strToSec(this.tendtime) - strToSec(this.tstarttime))
            } else {
                this.ttime = secToStr(86400 + strToSec(this.tendtime) - strToSec(this.tstarttime))
            } //add 24-hours
        },

        focusInputChange() {
            if (this.focusInput === 0) { //Change value
                this.focusInput = 1
            } else {
                this.focusInput = 0
            }
        }

    },
})
