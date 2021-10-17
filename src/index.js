/*
    The solution is divided into stages and is easier to maintain. This can be used
    in AWS Lambda also provided we pre-form the dictionary format and supply it to Stage 3.

    Improvement Area: build a logic other than the lineReader below to form dictionary JSON

    Format for dictionary JSON:
    {
        a: { _1: [ 'a' ], _2: [ 'ab', 'ac', 'ad'], _3: [ 'abc', 'def', 'ghi']}...
        b: ...
        ...
        z: ...
    }
        where _1 is _{word length that the array will contain}
        the access then can be simply as dictionary.a['_' + 3] which gives all
        space separated words for beginning with letter a and having length 3.
*/

let fs = require('fs'),
    path = require('path'),
    readline = require('readline'),
    dictionaryFile = path.join(__dirname, 'dictionary.txt'),
    formDPad = require('./formDPad'),
    formAllCombinations = require('./formAllCombinations'),
    formFoundWords = require('./formFoundWords'),
    buildCombo = require('./buildCombo');

let inNum = process.argv[2];

if(!inNum) {
    throw new Error('phone number parameter not supplied');
}

var lineReader = readline.createInterface({
    input: fs.createReadStream(dictionaryFile)
});

lineReader.on('line', function (line) {
    let lenKey = '_' + line.length;
    let alpha = line.charAt(0);
    if (!formFoundWords.dict[alpha][lenKey])
        formFoundWords.dict[alpha][lenKey] = '';

    formFoundWords.dict[alpha][lenKey] += ' ' + line + ' ';
});

lineReader.on('close', () => {
    let inNum_l = inNum.length;

    /* Stage 1: form letter sets for dial pad */
    formDPad.run(inNum);
    let dpad = formDPad.res;

    /* Stage 2: form all possible words for the dpad letters */
    formAllCombinations.l = inNum_l;
    formAllCombinations.run(dpad, 0);
    let fCombo = formAllCombinations.res;

    /* Stage 3: for each of the words, form all possible english dictionary words JSON object */
    formFoundWords.l = inNum_l;
    formFoundWords.run(fCombo);
    let fWords = formFoundWords.res.j;

    /* Stage 4: mix and match the english words to form the combinations */
    buildCombo.fWords = fWords;
    buildCombo.inNum = inNum;
    buildCombo.run();
    
    console.log(buildCombo.res);
});