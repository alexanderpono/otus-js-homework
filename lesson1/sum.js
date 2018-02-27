console.log('=== sum() ===');

const sum = (function() {
    var s = 0;
    const sum2 = function(param) {
        if (typeof param === 'undefined') {
            return s;
        }
        else {
            s += param;
            return sum2;
        };
    };
    return sum2;
})();

console.log(sum(1)(2)(3)(4)(5)(6)());
