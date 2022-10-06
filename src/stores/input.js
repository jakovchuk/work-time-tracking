import { defineStore } from 'pinia'
import {quarterTime, saveToLS, secToStr, strToSec} from '@/func'
import { useMainStore } from '@/stores/main'

export const useInputStore = defineStore('input', {
    state: () => ({
        projNameList: [],
        descriptList: [],
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
            timer: 0,
        },
        initInput: false,
        buttonType: 0,
        timerButtonType: 0,
        addButtonDisabled: false,
        focusInput: 0,
        interval: null,
        worksChange: 0,
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
        initInputOptions() {
            this.projNameList = localStorage.getItem('projNames') ? JSON.parse(localStorage.getItem('projNames')) : []
            this.descriptList = localStorage.getItem('descript') ? JSON.parse(localStorage.getItem('descript')) : []
        },

        startTimer() {
            if (!this.initInput) {
                if (this.ttime !== '') {
                    if (!confirm("Do you want to RESET 'End Time' & 'Elap.Time' fields?")) {
                        return false
                    }
                }
            }

            this.addButtonDisabled = true
            this.timerButtonType = 1
            this.inputState.timer = 1

            this.setCurrentDate()
            saveToLS('input', this.inputState)

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
            this.timerButtonType = 0
            this.inputState.timer = 0
            saveToLS('input', this.inputState)
            this.addButtonDisabled = false
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

        addRecord() {
            const mainStore = useMainStore()

            if (!this.validateInputFields()) {
                return false
            }

            if (mainStore.works.length === 1 && mainStore.works[0].date === '') {
                mainStore.works.splice(0, 1) //delete 1st empty row
            }

            mainStore.works.push({ 			//add row
                id: mainStore.works.length + 1,
                date: this.tdate,
                projName: this.tprojName,
                workType: this.tworkType,
                startTime: this.tstarttime,
                endTime: this.tendtime,
                time: this.ttime
            })

            mainStore.works.sort((a, b) => {
                if (a.date < b.date) return -1
                if (a.date > b.date) return 1
                if (strToSec(a.startTime) < strToSec(b.startTime)) return -1
                if (strToSec(a.startTime) > strToSec(b.startTime)) return 1
                return 0
            })
            saveToLS('works', mainStore.works) //save Works to localStorage

            this.projNameList.push(this.tprojName);
            this.projNameList = Array.from(new Set(this.projNameList)) //remove duplicates

            this.descriptList.push(this.tworkType);
            this.descriptList = Array.from(new Set(this.descriptList)) //remove duplicates

            saveToLS('projNames', this.projNameList) //save projNamesList to localStorage
            saveToLS('descript', this.descriptList) //save descriptList to localStorage

            this.clearInput()

            this.worksChange = this.worksChange === 0 ? 1 : 0
        },

        saveRecord() {
            const mainStore = useMainStore()

            if (!this.validateInputFields()) {
                return false
            }

            mainStore.works[mainStore.curNum].id = mainStore.curNum + 1
            mainStore.works[mainStore.curNum].date = this.tdate
            mainStore.works[mainStore.curNum].projName = this.tprojName
            mainStore.works[mainStore.curNum].workType = this.tworkType
            mainStore.works[mainStore.curNum].startTime = this.tstarttime
            mainStore.works[mainStore.curNum].endTime = this.tendtime
            mainStore.works[mainStore.curNum].time = this.ttime
            saveToLS('works', mainStore.works) //save Works to localStorage
            this.clearInput()

            this.buttonType = 0
            this.worksChange = this.worksChange === 0 ? 1 : 0
        },
        validateInputFields() {
            //Round time to 15 minutes
            this.updateStartTime(quarterTime(this.tstarttime))
            this.updateEndTime(quarterTime(this.tendtime))

            if (this.inputIsEmpty ||
                this.tendtime === '00:00') {
                alert('Fill ALL input fields, please!');
                return false
            }

            if (this.ttime === '00:00') {
                alert('Elapsed Time cannot be "00:00"');
                return false
            }
            return true
        },

        cancelEdit() {
            this.clearInput()
            this.buttonType = 0
        },

        pressEnter() {
            if (this.buttonType === 0) {
                if (!this.addButtonDisabled) {
                    this.addRecord()
                }
            } else {
                this.saveRecord()
            }
        },
    },
})