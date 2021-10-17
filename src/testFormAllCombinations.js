let formAllCombinations = require('./formAllCombinations');

let numPad = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
let inNum = '225563'; //'54466'; //'35853'; '225563';
let dpad = [];

inNum.split('').forEach(e => dpad.push(numPad[parseInt(e)]));

formAllCombinations.l = inNum.length;
formAllCombinations.run(dpad, 0);

console.log( JSON.stringify( formAllCombinations.res) );