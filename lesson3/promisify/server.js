console.log('=== promisify ===')
const fs = require('fs')

function promisify(f) {
    return function(param1, param2) {
        let param2Undefined = (arguments.length === 1);
        return new Promise(function(resolve, reject) {
            if (param2Undefined) {
                let defaultCallback = f;
                defaultCallback(param1, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }
            else {
                let singleCallback = f;
                singleCallback(param1, param2, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve('');
                    }
                });
            }

        });
    };
}

let readFilePromise = promisify(fs.readFile);
readFilePromise('/etc/passwd')
    .then((data)=>console.log('readFilePromise(/etc/passwd) ' + data.toString()))
    .catch((err)=>{console.log('readFilePromise(/etc/passwd) error...')})
;

readFilePromise('./1.txt')
    .then((data)=>console.log('readFilePromise(./1.txt) ' + data.toString()))
    .catch((err)=>{console.log('readFilePromise(./1.txt) error...')})
;

let accessPromise = promisify(fs.access);
accessPromise('/etc/passwd', fs.constants.R_OK)
    .then((data)=>console.log('accessPromise(/etc/passwd) read access' + data.toString()))
    .catch((err)=>{console.log('accessPromise(/etc/passwd) no access!')})
;

accessPromise('./1.txt', fs.constants.R_OK)
    .then((data)=>console.log('accessPromise(./1.txt) read access ' + data.toString()))
    .catch((err)=>{console.log('accessPromise(./1.txt) no access!')})
;

