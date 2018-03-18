process.on('uncaughtException', (err) => {
    console.log('========= uncaughtException handler =========');
    console.log(err.code);
    console.log(err.stack);
});

const myError = {code: 'MY_SUPER_ERROR'};
Error.captureStackTrace(myError);
throw myError;


