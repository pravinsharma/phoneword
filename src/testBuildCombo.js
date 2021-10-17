let buildCombo = require('./buildCombo');

let arr = {
    _0: ['a', 'ball', 'call'],
    _1: ['a', 'all'],
    _4: ['me', 'of']
};

buildCombo.fWords = arr;
buildCombo.inNum = '225563';
buildCombo.run();

console.log(buildCombo.res);