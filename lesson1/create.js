console.log('=== Object.create ===');

let s = Object.create({c : 1});
console.log(s);

let create = function (srcObj) {
    var obj = {};
    obj.__proto__ = srcObj;
    return obj;
}

console.log(create({c : 1}));
