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
        day: 23,
        lastSolved: 10,
        lastTotal: 25,
        accuracy: 80
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
        return storageVal
    }
}
