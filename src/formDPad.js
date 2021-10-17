let dPad = {
    res: [],
    numPad: ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'],
    run: (phone) => {
        if(!phone) {
            throw new Error('input phone number not given...');
        }

        dPad._process(phone);
    },
    _process: (numStr) => {
        numStr.split('').forEach(e => dPad.res.push(dPad.numPad[parseInt(e)]));
    }
}

module.exports = dPad;