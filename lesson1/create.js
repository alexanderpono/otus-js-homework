console.log('=== Object.create ===');

let s = Object.create({c : 1}, { a: { value: 2 } });
console.log(s);

let create = function (srcObj, additionalParamsObj) {
    var f = function() {};
    f.prototype = srcObj;
    var obj = new f;

    if (additionalParamsObj) {
        for (let key in additionalParamsObj) {
            if (additionalParamsObj.hasOwnProperty(key)) {
                let val = additionalParamsObj[key];
                obj[key] = val.value;
            }
        };
    };

    return obj;
}

console.log(create({c : 1}, {a: {value: 2}}));

