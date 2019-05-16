const series = require('../series');

describe('check that series() works with different number of parameters', () => {
    let calls = [];
    let f1=function(next) {
        calls.push('f1');
        next();
    };
    let f2=function(next) {
        calls.push('f2');
        next();
    };
    let f3=function(next) {
        calls.push('f3');
        next();
    };

    it('works without parameters', () => {
        let calls = [];
        series().then(()=>{}).catch(()=>{});
        expect(calls.join('')).toEqual('');
    });

    it('works with 1 parameters', () => {
        calls = [];
        series(f1).then(()=>{}).catch(()=>{});
        expect(calls).toEqual(expect.arrayContaining(['f1']));
    });

    it('works with 2 parameters', () => {
        calls = [];
        series(f1, f2).then(()=>{}).catch(()=>{});
        expect(calls).toEqual(expect.arrayContaining(['f2', 'f1']));
    });

    it('works with 3 parameters', () => {
        calls = [];
        series(f1, f2, f3).then(()=>{}).catch(()=>{});
        expect(calls).toEqual(expect.arrayContaining(['f2', 'f1', 'f3']));
    });

    it('is PROMISE.state == OK on series(f1-ok, f2-ok, f3-ok)', () => {
        var code = false;
        series(f1).then(()=>{
            code = true;
            expect(code).toBe(true);
        }).catch(()=>{
            code = false;
            expect(code).toBe(true);
        });
    });

});



describe('check that call of next(param) leads to call of last parameter', () => {
    let calls = [];
    let f1=function(next) {
        calls.push('f1');
        next('error');
    };
    let f2=function(next) {
        calls.push('f2');
        next();
    };
    let f3=function(next) {
        calls.push('f3');
        next();
    };


    it('is f1 on series(f1-error) ', () => {
        calls = [];
        series(f1).then(()=>{}).catch(()=>{});
        expect(calls.join('')).toEqual('f1');
    });

    it('is f1,f2 on series(f1-error, f2) ', () => {
        calls = [];
        series(f1, f2).then(()=>{}).catch(()=>{});
        expect(calls).toEqual(expect.arrayContaining(['f1', 'f2']));
        expect(calls).not.toEqual(expect.arrayContaining(['f3']));
    });

    it('is f1,f3 on series(f1-error, f2, f3) ', () => {
        calls = [];
        series(f1, f2, f3).then(()=>{}).catch(()=>{});
        expect(calls).toEqual(expect.arrayContaining(['f1', 'f3']));
        expect(calls).not.toEqual(expect.arrayContaining(['f2']));
    });

    it('is PROMISE.state == REJECTED on series(f1-error, f2, f3) ', () => {
        calls = [];
        series(f1, f2, f3).then(()=>{
            let code = true;
            expect(code).toBe(false);

        }).catch(()=>{
            let code = false;
            expect(code).toBe(false);
        });
    });

});


