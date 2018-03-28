module.exports = function series() {
    var args = arguments;
    var currentFunctionNumber = 0;

    return new Promise((resolve,reject) => {

        function next(errorMessage) {
            let func = args[currentFunctionNumber];
            let errorMode = (typeof errorMessage === 'string');
            let lastFunc = (currentFunctionNumber === (args.length-1));
            let noMoreFuncs = (currentFunctionNumber > (args.length-1));
            if (errorMode) {
                func = args[args.length-1];
            };

            currentFunctionNumber++;

            let willCall =
                (!noMoreFuncs) ||
                (lastFunc && (currentFunctionNumber === 0));

            if (willCall) {
                func(next);
            };

            if (errorMode) {
                reject(errorMessage);
                return;
            };

            if (lastFunc || noMoreFuncs) {
                resolve();
            };
        }

        let func = args[currentFunctionNumber];
        currentFunctionNumber++;
        if (typeof func !== 'undefined') {
            func(next);
        };
        if (lastFunc) {
            resolve();
        };
    });

}