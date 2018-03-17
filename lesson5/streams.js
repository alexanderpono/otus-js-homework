const stream = require('stream');

function rnd()
{
    let num = Math.round(Math.random() * 10);
    return num;
}

const readable = (function(){
    const data = [];
    const $ = new stream.Readable({
        objectMode : true,
        highWaterMark : 3,
        read : function() {}
    });

    var calls = 10;

    function f()
    {
        let num = rnd();
        let toPush = {a:num};
        console.log(`\npush №${calls} into readable=` + JSON.stringify(toPush));
        let code = $.push(toPush);
        calls--;
        if (calls <=0) {
            clearInterval(t);
        }
    }

    var t = setInterval(f, 1000);
    return $
})();


const transformable = (function(){
    const $ = new stream.Transform({
        objectMode : true,
        highWaterMark : 3,
        transform : function(chunk, encoding, callback) {
            console.log('transform received=' + JSON.stringify(chunk));
            let addition = rnd();
            console.log('transform to add=' + addition);
            chunk.a += addition;
            console.log('transform to push=' + JSON.stringify(chunk));
            this.push(chunk);
            callback();
        }
    });
    return $
})();



const writable = (function(){
    const $ = new stream.Writable({
        objectMode : true,
        highWaterMark : 3,
        write : function(chunk, encoding, callback) {
            console.log('writable received=' + JSON.stringify(chunk));
            callback();
        }
    });
    return $
})();


readable.pipe(transformable);
transformable.pipe(writable);
