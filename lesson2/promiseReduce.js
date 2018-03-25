console.log('=== promiseReduce ===');


function promiseReduce(ar2, callback, initialValue)
{
    let result = initialValue;
    let resultPromise = new Promise((resolve,b) => {
        ar2.reduce(
            (previousValue, prom, index, array) => {
                prom.then((promiseCode) => {
                    result = callback(result, promiseCode);
                    if (index == (array.length-1)) {
                        resolve(result);
                    };
                });
                return previousValue;
            },
            initialValue
        );

    });

    return resultPromise;
}


var promise0 = Promise.resolve(0),
    promise1 = Promise.resolve(1),
    promise2 = Promise.resolve(2)

promiseReduce(
    [promise0, promise1, promise2],
    (a, b) => a + b,
    0
)
.then((result) => console.log('promiseReduce result=', result));


