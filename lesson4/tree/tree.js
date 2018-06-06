var fs = require('fs');
var path = require('path');

console.log('run me with parameters:');
console.log('$ npm run tree -- --folder=foo');
console.log('$ node tree --folder=foo');

let dirName = getFolderToProcess();

let resultDirs = [];
let resultFiles = [];
let processedDirs = [];

var p = new Promise((filesAndFoldersListReady) => {
    const ErrDirIsNotProcessed = {
        code: 'DIR_IS_NOT_PROCESSED'
    };
    function allDirsAreProcessed() {
        let allDirsAreProcessed = true;
        try {
            resultDirs.forEach(function(dirName) {
                if (!processedDirs.includes(dirName)) {
                    throw ErrDirIsNotProcessed;
                };
            });
        }
        catch (err) {
            allDirsAreProcessed = false;
        };
        return allDirsAreProcessed;
    }

    function readDir(dirName) {
        return new Promise((resolve) => {
            let curDirs = [];
            let curFiles = [];
            fs.readdir(dirName, (err, files) => {
                if (err !== null) {
                    console.log('err', err);
                    return;
                };

                files.forEach(function(file) {
                    let fullPath = path.join(dirName, file);
                    let isDir = fs.lstatSync(fullPath).isDirectory();
                    if (isDir) {
                        curDirs.push(fullPath);
                    }
                    else {
                        curFiles.push(fullPath);
                    };

                });
                resolve({dirs: curDirs, files: curFiles, dir: dirName})
            });
        });
    }

    function processResults(readDirData)
    {
        processedDirs.push(readDirData.dir);

        resultDirs = resultDirs.concat(readDirData.dirs);
        resultFiles= resultFiles.concat(readDirData.files);
        readDirData.dirs.forEach(function(dir) {
            readDir(dir).then(processResults);
        });

        if (allDirsAreProcessed()) {
            filesAndFoldersListReady({
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

function getFolderToProcess()
{
    let folder = './';
    process.argv.forEach(function (val, index, array) {
        if (val.includes('--folder=')) {
            let ar = val.split('=');
            folder = ar[1];
            folder = folder.trim();
        };
    });

    return folder;
}

