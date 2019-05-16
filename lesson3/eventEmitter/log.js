const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('request', (request) => {
    console.log('myEmitter.on(): request url', request.url)
});

exports.emitter = myEmitter;
