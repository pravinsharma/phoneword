let formAllCombinations = {
    res: [],
    l: 0,
    run: (arr, currPos) => {
        if(!arr) {
            throw new Error('input dpad array not given...');
        }

        formAllCombinations._process(arr, currPos);
    },
    
    _collate: (arr, currPos) => {
        let _res = [];
        arr[currPos].split('').forEach(a => {
            formAllCombinations.res.forEach(r => {
                _res.push(r + a);
            });
        });

        return _res;
    },
    _process: (arr, currPos) => {
        if(!formAllCombinations.l) {
            throw new Error('length must be set...');
        }

        //terminating check
        if (currPos == formAllCombinations.l) {
            if (arr[currPos])
                formAllCombinations.res = formAllCombinations._collate(arr, currPos);
            return;
        }

        if (!formAllCombinations.res.length) {
            arr[currPos].split('').forEach(a => {
                formAllCombinations.res.push(a);
            });
        } else {
            if (arr[currPos])
                formAllCombinations.res = formAllCombinations._collate(arr, currPos);
        }

        //recursively call self
        formAllCombinations._process(arr, currPos + 1);
    }
}

module.exports = formAllCombinations;