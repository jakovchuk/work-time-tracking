import { defineStore } from 'pinia'
import {saveToLS, secToStr, strToSec} from '@/func'
import { useInputStore } from '@/stores/input'

export const useMainStore = defineStore('main', {
    state: () => ({
        works: [{
            id: 0,
            date: '',
            projName: '',
            workType: '',
            startTime: '',
            endTime: '',
            time: ''
        }],
        projTime: [{
            id: 0,
            projN: '',
            projT: ''
        }],
        startDate: '',
        endDate: '',
        timeSum: '',
        period: 'Choose period',
        curNum: 0,
    }),

    actions: {
        initWorks() {
            this.works = JSON.parse(localStorage.getItem('works'))
        },

        editRecord(row) {
            const inputStore = useInputStore()
            inputStore.tdate = this.works[row].date
            inputStore.tprojName = this.works[row].projName
            inputStore.tworkType = this.works[row].workType
            inputStore.tstarttime = this.works[row].startTime
            inputStore.tendtime = this.works[row].endTime
            inputStore.ttime = this.works[row].time

            inputStore.buttonType = 1
            this.curNum = row
        },
        deleteRecord(row) {
            const inputStore = useInputStore()
            if (confirm('Do you want to DELETE record?')) {
                this.works.splice(row, 1)
                saveToLS('works', this.works) //save Works to localStorage

                inputStore.clearInput()

                inputStore.buttonType = 0
                inputStore.worksChange = inputStore.worksChange === 0 ? 1 : 0
            }
        },

        clearTable() {
            if (confirm('Do you want to CLEAR TABLE?')) {
                this.works.splice(0, this.works.length)
                saveToLS('works', this.works) //save Works to localStorage
            }
        },

        updateStartDate(startDate) {
            this.startDate = startDate
        },
        updateEndDate(endDate) {
            this.endDate = endDate
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
            let projNames = []
            this.works.forEach((work, index) => projNames[index] = work.projName)
            projNames = Array.from(new Set(projNames)) //remove duplicates in array

            let projTimeSec = [] //init array of total time in sec
            projNames.forEach((projName, index) => projTimeSec[index] = 0)

            this.projTime.splice(0, this.projTime.length)

            let sDate = new Date(this.startDate)
            let eDate = new Date(this.endDate)
            let wDate = new Date()

            if (this.startDate === '' && this.endDate === ''){
                if (this.works.length > 0) { //count total time in projects
                    for (let i = 0; i < this.works.length; i++) {
                        for (let j = 0; j < projNames.length; j++) {
                            if (this.works[i].projName === projNames[j]) {
                                projTimeSec[j] += strToSec(this.works[i].time)
                            }
                        }
                    }
                }
            }

            if (this.startDate === '' && this.endDate !== ''){
                if (this.works.length > 0) { //count total time in projects
                    for (let i = 0; i < this.works.length; i++) {
                        for (let j = 0; j < projNames.length; j++) {
                            wDate = Date.parse(this.works[i].date)
                            if (this.works[i].projName === projNames[j] &&
                                wDate.valueOf() <= eDate.valueOf()) {
                                projTimeSec[j] += strToSec(this.works[i].time)
                            }
                        }
                    }
                }
            }

            if (this.startDate !== '' && this.endDate === ''){
                if (this.works.length > 0) { //count total time in projects
                    for (let i = 0; i < this.works.length; i++) {
                        for (let j = 0; j < projNames.length; j++) {
                            wDate = Date.parse(this.works[i].date)
                            if (this.works[i].projName === projNames[j] &&
                                wDate.valueOf() >= sDate.valueOf()) {
                                projTimeSec[j] += strToSec(this.works[i].time)
                            }
                        }
                    }
                }
            }

            if (this.startDate !== '' && this.endDate !== ''){
                if (this.works.length > 0) { //count total time in projects
                    for (let i = 0; i < this.works.length; i++) {
                        for (let j = 0; j < projNames.length; j++) {
                            wDate = Date.parse(this.works[i].date)
                            if (this.works[i].projName === projNames[j] &&
                                wDate.valueOf() >= sDate.valueOf() &&
                                wDate.valueOf() <= eDate.valueOf()) {
                                projTimeSec[j] += strToSec(this.works[i].time)
                            }
                        }
                    }
                }
            }

            //fill projectTime array
            for (let j = 0; j < projNames.length; j++) {
                if (projTimeSec[j] > 0) {
                    this.projTime.push({
                        id: this.projTime.length + 1,
                        projN: projNames[j],
                        projT: secToStr(projTimeSec[j])
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
    },
})
