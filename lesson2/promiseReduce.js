console.log('=== promiseReduce ===');


function sum(a, b) {
    return a + b;
};


function promiseReduce(ar2, callback, initialValue)
{
    let ar = ar2;
    let prom = ar.shift();
    prom.then((a)=> {
        let result = callback(initialValue, a);
    console.log('result=', result);
    if (ar.length !== 0) {
        promiseReduce(ar, callback, result)
    };
});
}


var ar2 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
promiseReduce(ar2, sum, 0);


