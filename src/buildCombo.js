let buildCombo = {
    res: '',
    fWords: null,
    inNum: '',
    l: 0,
    run: () => {
        if(!buildCombo.fWords) {
            throw new Error('fWords must be set...');
        }

        if(!buildCombo.inNum) {
            throw new Error('inNum must be set...');
        }

        buildCombo.l = buildCombo.inNum.length;

        buildCombo._process('', 0); //build all result
        buildCombo._process(buildCombo.inNum.charAt(0), 1); //skip first and build all result
    },

    _process: (r, i) => {

        if (i == buildCombo.l) {
            if (buildCombo.res.indexOf(r + ',') == -1) { //perfect match
                let res = (r.charAt(0) == '-'? r.substring(1): r).toUpperCase() + ',';
                
                if(buildCombo.res.indexOf(res) == -1) {
                    buildCombo.res += res;
                }
                
                return;
            }
        }
    
        if (!buildCombo.fWords['_' + i]) { //1 skip allowed
            i++;

            if (i != buildCombo.l && !buildCombo.fWords['_' + i]) { //2 skips not allowed, hence return
                return;
            }
    
            buildCombo._process(r + '-' + buildCombo.inNum.charAt(i - 1), i);
            return;
        }
    
        buildCombo.fWords['_' + i].forEach(e => {
            buildCombo._process(r + '-' + e, i + e.length);
        });
    }
}

module.exports = buildCombo;