console.log('=== promisify ===')
const fs = require('fs')


function promisify(f, param1, param2) {
    var param2Undefined = (arguments.length === 2);
    var promise = new Promise(function(resolve, reject) {
        if (param2Undefined) {
            let defaultCallback = f;
            defaultCallback(param1, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                };
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

    return promise;
}


promisify(fs.readFile, '/etc/passwd')
    .then((data)=>console.log('promisify-fs.readFile(/etc/passwd) ' + data.toString()))
    .catch((err)=>{console.log('promisify-fs.readFile(/etc/passwd) error...')})
;

promisify(fs.readFile, './1.txt')
    .then((data)=>console.log('promisify-fs.readFile(./1.txt) ' + data.toString()))
    .catch((err)=>{console.log('promisify-fs.readFile(./1.txt) error...')})
;


promisify(fs.access, '/etc/passwd', fs.constants.R_OK)
    .then((data)=>console.log('promisify-fs.access(/etc/passwd) read access' + data.toString()))
    .catch((err)=>{console.log('promisify-fs.access(/etc/passwd) no access!')})
;

promisify(fs.access, './1.txt', fs.constants.R_OK)
    .then((data)=>console.log('promisify-fs.access(./1.txt) read access ' + data.toString()))
    .catch((err)=>{console.log('promisify-fs.access(./1.txt) no access!')})
;
