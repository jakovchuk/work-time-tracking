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
        buttonType: 0,
        timerButType: 0,
        addButtonDis: false,
        curNum: 0,
        worksChange: 0,
        focusInput: 0,
        interval: null,
    }),

    getters: {
        inputIsEmpty: (state) => {
           return state.tdate === '' ||
                state.tprojName === '' ||
                state.tworkType === '' ||
                state.tstarttime === '' ||
                state.tendtime === '' ||
                state.ttime === ''
        },
    },

    actions: {
        initializeInput() {
            this.inputState = JSON.parse(localStorage.getItem('input'));
            this.tdate = this.inputState.date
            this.tprojName = this.inputState.projName
            this.tworkType = this.inputState.workType
            this.tstarttime = this.inputState.startTime
            this.tendtime = this.inputState.endTime

            this.updateStartTime(this.tstarttime)
            this.updateEndTime(this.tendtime)
            this.initInput = true
            if (this.inputState.timer === 1) {
                this.startTimer()
            }
            this.initInput = false
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
            this.timerButType = 1
            this.inputState.timer = 1

            let d = new Date()
            d.setDate(d.getDate())
            let timeParts = d.toLocaleTimeString('uk-UA').split(':')
            if (!this.tstarttime || strToSec(this.tstarttime) > strToSec(d.toLocaleTimeString('uk-UA'))) {
                this.updateStartTime(timeParts[0] + ':' + timeParts[1])
            }

            this.changeTime()
            this.interval = setInterval(() => this.changeTime(), 5000);
            this.focusInput = this.focusInput === 0 ? 1 : 0
        },
        stopTimer() {
            this.timerButType = 0
            this.inputState.timer = 0
            saveToLS('input', this.inputState)
            this.addButtonDis = false
            clearInterval(this.interval)

            if (confirm('Do you want to save this RECORD?')) {
                this.addRecord()
            }
        },
        changeTime() {
            let d = new Date()
            d.setDate(d.getDate())
            let timeParts = d.toLocaleTimeString('uk-UA').split(':')
            this.tendtime = timeParts[0] + ':' + timeParts[1]
            this.inputState.endTime = this.tendtime
            this.countTime()
            saveToLS('input', this.inputState)
        },

        clearInput() {
            this.tdate = ''
            this.tprojName = ''
            this.tworkType = ''
            this.tstarttime = ''
            this.tendtime = ''
            this.ttime = ''
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

        initInputOptions() {
            this.projNameList = localStorage.getItem('projNames') ? JSON.parse(localStorage.getItem('projNames')) : []
            this.descriptList = localStorage.getItem('descript') ? JSON.parse(localStorage.getItem('descript')) : []
        },

        initWorks() {
            this.works = JSON.parse(localStorage.getItem('works'))
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
            this.tendtime = secToStr(strToSec(this.tstarttime) + strToSec(this.ttime))
        },

        setCurrentDate() {
            let d = new Date()
            d.setDate(d.getDate());
            let DateParts = d.toLocaleDateString('uk-UA').split('.')
            this.tdate = DateParts[2] + "-" + DateParts[1] + "-" + DateParts[0]
            this.inputState.date = this.tdate
        },

        updateStartTime(time) {
            this.tstarttime = time
            this.inputState.startTime = this.tstarttime
            this.countTime()
            saveToLS('input', this.inputState)
        },
        updateEndTime(time) {
            this.tendtime = time;
            this.inputState.endTime = this.tendtime
            this.countTime()
            saveToLS('input', this.inputState)
        },
        countTime() {
            if (this.tstarttime !== '' && this.tendtime !== '') {
                if (strToSec(this.tendtime) >= strToSec(this.tstarttime)) {
                    this.ttime = secToStr(strToSec(this.tendtime) - strToSec(this.tstarttime))
                } else { //add 24 hours
                    this.ttime = secToStr(86400 + strToSec(this.tendtime) - strToSec(this.tstarttime))
                }
            }
        },

        updateStartDate(startDate) {
            this.startDate = startDate
        },
        updateEndDate(endDate) {
            this.endDate = endDate
        },

        addRecord() {
            if (this.inputIsEmpty ||
                this.ttime === '00:00' ||
                this.tendtime === '00:00') {
                alert('Fill ALL input fields, please!')
                return false
            }
            if (this.works.length === 1 && this.works[0].date === '') {
                this.works.splice(0, 1) //delete 1st empty row
                saveToLS('works', this.works) //save Works to localStorage
            }

            //Round time to 15 minutes
            this.updateStartTime(quarterTime(this.tstarttime))
            this.updateEndTime(quarterTime(this.tendtime))

            this.works.push({ 			//add row
                id: this.works.length + 1,
                date: this.tdate,
                projName: this.tprojName,
                workType: this.tworkType,
                starttime: this.tstarttime,
                endtime: this.tendtime,
                time: this.ttime
            })

            this.works.sort((a, b) => {
                if (a.date < b.date) return -1
                if (a.date > b.date) return 1
                if (strToSec(a.starttime) < strToSec(b.starttime)) return -1
                if (strToSec(a.starttime) > strToSec(b.starttime)) return 1
                return 0
            })

            this.projNameList.push(this.tprojName);
            this.projNameList = Array.from(new Set(this.projNameList)) //remove duplicates

            this.descriptList.push(this.tworkType);
            this.descriptList = Array.from(new Set(this.descriptList)) //remove duplicates

            saveToLS('projNames', this.projNameList) //save projNamesList to localStorage
            saveToLS('descript', this.descriptList) //save descriptList to localStorage
            saveToLS('works', this.works) //save Works to localStorage

            this.clearInput()

            this.worksChange = this.worksChange === 0 ? 1 : 0
        },
        editRecord(row) {
            this.tdate = this.works[row].date
            this.tprojName = this.works[row].projName
            this.tworkType = this.works[row].workType
            this.tstarttime = this.works[row].starttime
            this.tendtime = this.works[row].endtime
            this.ttime = this.works[row].time

            this.buttonType = 1
            this.curNum = row
        },
        deleteRecord(row) {
            if (confirm('Do you want to DELETE record?')) {
                this.works.splice(row, 1)
                saveToLS('works', this.works) //save Works to localStorage

                this.clearInput()

                this.buttonType = 0
                this.worksChange = this.worksChange === 0 ? 1 : 0
            }
        },
        saveRecord() {
            if (this.inputIsEmpty ||
                this.ttime === '00:00' ||
                this.tendtime === '00:00') {
                alert('Fill ALL input fields, please!');
                return false
            }

            //Round time to 15 minutes
            this.updateStartTime(quarterTime(this.tstarttime))
            this.updateEndTime(quarterTime(this.tendtime))

            this.works[this.curNum].id = this.curNum + 1
            this.works[this.curNum].date = this.tdate
            this.works[this.curNum].projName = this.tprojName
            this.works[this.curNum].workType = this.tworkType
            this.works[this.curNum].starttime = this.tstarttime
            this.works[this.curNum].endtime = this.tendtime
            this.works[this.curNum].time = this.ttime
            saveToLS('works', this.works) //save Works to localStorage
            this.clearInput()

            this.buttonType = 0
            this.worksChange = this.worksChange === 0 ? 1 : 0
        },
        cancelEdit() {
            this.clearInput()
            this.buttonType = 0
        },
        clearTable() {
            if (confirm('Do you want to CLEAR TABLE?')) {
                this.works.splice(0, this.works.length)
                saveToLS('works', this.works) //save Works to localStorage
            }
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
        updateQuery() {
            let projNm = []
            for (let j = 0; j < this.works.length; j++) {
                projNm[j] = this.works[j].projName        //create array of Project names
            }
            this.projNames = Array.from(new Set(projNm)) //remove duplicates in array

            for (let j = 0; j < this.projNames.length; j++) {
                this.pr[j] = 0                              //init array of total time in sec
            }

            this.projTime.splice(0, this.projTime.length)

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
                                wDate.valueOf() <= eDate.valueOf()) {
                                this.pr[j] += strToSec(this.works[i].time)
                            }
                        }
                    }
                }
            }

            //fill projectTime array
            for (let j = 0; j < this.projNames.length; j++) {
                if (this.pr[j] > 0) {
                    this.projTime.push({
                        id: this.projTime.length + 1,
                        projN: this.projNames[j],
                        projT: secToStr(this.pr[j])
                    })
                }
            }

            let timeSum = 0
            this.projTime.forEach(obj => timeSum += strToSec(obj.projT))
            this.timeSum = secToStr(timeSum)
        },

        setStartDate(sDateParts) {
            this.startDate = sDateParts !== '' ? sDateParts[2] + "-" + sDateParts[1] + "-" + sDateParts[0] : ''
        },
        setEndDate(eDateParts) {
            this.endDate = eDateParts !== '' ? eDateParts[2] + "-" + eDateParts[1] + "-" + eDateParts[0] : ''
        },

        changeFilterDate() {
            this.period = 'Choose period'
            this.updateQuery()
        },
        resetFilter() {
            this.startDate = ''
            this.endDate = ''
            this.period = 'Choose period'
            this.updateQuery()
        },

        pressEnter() {
            if (this.buttonType === 0) {
                if (!this.addButtonDis) {
                    this.addRecord()
                }
            } else {
                this.saveRecord()
            }
        },
    },
})
