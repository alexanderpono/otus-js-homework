export default {
    name: 'State',
    defaults: {
        length: 6,
        difficulty: 5,
        sum: false,
        sub: false,
        mul: false,
        div: false,
        pwr: false,
        day: 1,
        lastSolved: 10,
        lastTotal: 25,
        quizesAccuracy: [],
        lastSessionQuizNumber: 0,
        lastSessionQuizSolved: 0
    },

    setVal: function (key, val) {
        window.localStorage.setItem(key, val)
    },

    getVal: function (key) {
        let storageVal = window.localStorage.getItem(key)
        if ((typeof storageVal === 'undefined') || (storageVal === null)) {
            if (typeof (this.defaults[key]) !== 'undefined') {
                return this.defaults[key]
            }
        }
        if (storageVal === 'true') {
            return true
        }
        if (storageVal === 'false') {
            return false
        }
        if (key === 'quizesAccuracy') {
            storageVal = storageVal.split(',')
        }
        if (key === 'quizesNumber') {
            let quizesAccuracy = this.getVal('quizesAccuracy')
            storageVal = quizesAccuracy.length
        }

        if (key === 'accuracy') {
            let quizesAccuracy = this.getVal('quizesAccuracy')
            let accuracySum = 0
            for (let i = 0; i < quizesAccuracy.length; i++) {
                let accuracy = parseInt(quizesAccuracy[i])
                if (isNaN(accuracy)) {
                    accuracy = 0
                }
                accuracySum += accuracy
            }

            if (quizesAccuracy.length > 0) {
                storageVal = Math.round(accuracySum / quizesAccuracy.length)
            } else {
                storageVal = 0
            }
        }
        return storageVal
    }
}
