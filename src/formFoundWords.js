
let formFoundWords = {
    res: {
        s: '',
        j: {}
    },
    l: 0,
    dict: {
        a: {}, b: {}, c: {}, d: {}, e: {}, f: {}, g: {}, h: {}, i: {},
        j: {}, k: {}, l: {}, m: {}, n: {}, o: {}, p: {}, q: {}, r: {},
        s: {}, t: {}, u: {}, v: {}, w: {}, x: {}, y: {}, z: {}
    },
    run: (fCombo) => {
        fCombo.forEach(w => {
            formFoundWords._process(w, 1, 0, 1);
        });
    },

    _formatString: (str, s, l) => {
        let w = '';
        for (let i = 0; i < s; i++) {
            w += '-';
        }
    
        w += str;
    
        for (let i = 0; i < l - s - str.length; i++) {
            w += '-';
        }
    
        return w;
    },
    _process: (s, dl, c, e) => {
        if(!formFoundWords.l) {
            throw new Error('length must be set...');
        }

        if (c >= formFoundWords.l) {
            return;
        }
        
        if(e > formFoundWords.l) {
            formFoundWords._process(s, 1, c + 1, c + 2);
            return;
        }
    
        if(!formFoundWords.dict[s.charAt(c)]['_' + dl]) {
            formFoundWords._process(s, dl + 1, c, e + 1);
            return;
        }
    
        if (formFoundWords.dict[s.charAt(c)]['_' + dl].indexOf(' ' + s.substring(c, e)) != -1) {
            if (formFoundWords.dict[s.charAt(c)]['_' + dl].indexOf(' ' + s.substring(c, e) + ' ') != -1) { //found a word
                let w = formFoundWords._formatString(s.substring(c, e), c, formFoundWords.l + 1);
    
                if(formFoundWords.res.s.indexOf(' ' + w + ' ') == -1) { //not inserted yet
                    formFoundWords.res.s += ' ' + w + ' ';

                    let rec = {};
                    if(formFoundWords.res.j['_' + c] == null) {
                        formFoundWords.res.j['_' + c] = [];
                    }

                    rec = formFoundWords.res.j['_' + c];
                    rec.push(s.substring(c, e));
                }
    
                //fork for longer word
                formFoundWords._process(s, dl + 1, c, e + 1);
    
                //fork for another word
                formFoundWords._process(s, 1, c, c + 2);
                return;
            }
        }
    
        formFoundWords._process(s, dl + 1, c, e + 1);
    }
}

module.exports = formFoundWords;