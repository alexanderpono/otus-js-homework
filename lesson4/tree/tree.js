var fs = require('fs');
var argv = require('optimist').argv;
var path = require('path');

console.log('run me with parameters:');
console.log('$ npm run tree -- --folder=foo');
console.log('$ node tree --folder=foo');

let dirName = './';
if (typeof argv.folder != "undefined") {
    dirName = argv.folder;
}

let resultDirs = [];
let resultFiles = [];
let processedDirs = [];

var p = new Promise((resolve2, fail2) => {
    function allDirsAreProcessed() {
        for (let key in resultDirs) {
            let dirName = resultDirs[key];
            if (processedDirs.indexOf(dirName) == -1) {
                return false;
            }
        }
        return true;
    }

    function readDir(dirName2) {
        return new Promise((resolve,b) => {
            let curDirs = [];
            let curFiles = [];
            fs.readdir(dirName2, (err, files) => {
                for (let key in files) {
                    let fullPath = path.join(dirName2, files[key]);
                    let isDir = fs.lstatSync(fullPath).isDirectory();
                    if (isDir) {
                        curDirs.push(fullPath);
                    }
                    else {
                        curFiles.push(fullPath);
                    };
                };
                resolve({dirs: curDirs, files: curFiles, dir: dirName2})
            });
        });
    }

    function processResults(code)
    {
        let dir = code.dir;
        processedDirs.push(dir);

        resultDirs = resultDirs.concat(code.dirs);
        resultFiles= resultFiles.concat(code.files);
        for (var i=0; i<code.dirs.length; i++) {
            readDir(code.dirs[i]).then(processResults);
        }

        if (allDirsAreProcessed()) {
            resolve2({
                'files': resultFiles,
                'folders' : resultDirs
            });
        }
    }

    resultDirs.push(dirName);
    readDir(dirName).then(processResults);

}).then((result) => {
    console.log('\nresult.files=\n' + result.files.join("\n"));
    console.log('\nresult.folders=\n' + result.folders.join("\n"));
});

