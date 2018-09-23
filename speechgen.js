//https://cs.nyu.edu/grishman/jet/guide/PennPOS.html
const tagger = require('wink-pos-tagger')()
const wordlist = require('fs').readFileSync(require('word-list'), 'utf8').split('\n');
function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}
function capFirstLtr(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function extraWords(frontorend, POS) {
    if (frontorend == 'front') {
        if (POS.slice(0, 2) == 'NN') {
            var prefix = ['a', 'the', 'another', 'this', 'that', 'these', 'those']
            var adjectives = ['attractive', 'bald', 'beautiful', 'chubby', 'clean', 'dazzling', 'drab', 'elegant', 'fancy', 'fit', 'flabby', 'glamorous', 'gorgeous', 'handsome', 'long', 'magnificent', 'muscular', 'plain', 'plump', 'quaint', 'scruffy', 'shapely', 'short', 'skinny', 'stocky', 'ugly', 'unkempt', 'unsightly', 'alive', 'better', 'careful', 'clever', 'dead', 'easy', 'famous', 'gifted', 'hallowed', 'helpful', 'important', 'inexpensive', 'mealy', 'mushy', 'odd', 'poor', 'powerful', 'rich', 'shy', 'tender', 'unimportant', 'uninterested', 'vast', 'wrong']
            var ranPre = prefix[Math.floor(Math.random() * prefix.length)]
            var ranAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
            return `${ranPre} ${ranAdj} `
        } else {
            return ''
        }
    } else if (frontorend == 'end') {
        return ''
    } else {
        return
    }
}

function wordwPOS(POS, nonspecific) {
    var posloop;
    var poslooppos;
    var returner;
    if (nonspecific) { wantPOS = POS.slice(0, 2) } else { wantPOS = POS }
    while (wantPOS != poslooppos) {
        posloop = tagger.tagSentence(wordlist[Math.floor(Math.random() * wordlist.length)])[0]
        if (nonspecific) { poslooppos = posloop.pos.slice(0, 2) } else { poslooppos = posloop.pos }
        if (wantPOS == poslooppos) { returner = posloop }
    }
    return returner.value
}

function isWordPOS(word, POS) {
    var realpos = tagger.tagSentence(word)[0].pos
    if (realpos == POS) { return true } else { return false }
}

module.exports = {

    speak: function speak() {
        var wordcount = 1
        var c = 0
        while (c < 100) {
            var r = Math.random() * 100
            if (r < 80) {
                wordcount = wordcount + 1
                c = c + 1
            } else if (r < 100) {
                c = c + 100
                console.log('word count: ' + wordcount)
            } else {
                c = c + 100
                console.log('word count: ' + wordcount)
            }
        }
        var wordpos = null;
        var prevpos = null;
        var msgstring = [];
        for (i = 0; i < wordcount; i++) {
            var randword = wordlist[Math.floor(Math.random() * wordlist.length)]
            var wordpos = tagger.tagSentence(randword)[0].pos
            if (wordpos.slice(0, 2) == prevpos) {
                console.log(`POS Matches, finding new word for #${i}...`)
                var loopstop = false
                while (!loopstop) {
                    var randword = wordlist[Math.floor(Math.random() * wordlist.length)]
                    var wordpos = tagger.tagSentence(randword)[0].pos
                    if (wordpos.slice(0, 2) != prevpos) {
                        console.log('Found new word.')
                        console.log(prevpos + ' now ' + wordpos)
                        prevpos = wordpos.slice(0, 2)
                        console.log(`Word #${i} is ${randword}`)
                        frontx = extraWords('front', wordpos)
                        endx = extraWords('end', wordpos)
                        "use strict";
                        msgstring[i] = frontx + randword + endx
                        loopstop = true
                    } else {
                        console.log('still searching...')
                    }
                }
            } else {
                console.log(prevpos + ' now ' + wordpos)
                prevpos = wordpos.slice(0, 2)
                console.log(`Word #${i} is ${randword}`)
                frontx = extraWords('front', wordpos)
                endx = extraWords('end', wordpos)
                "use strict";
                msgstring[i] = frontx + randword + endx
            }
        }
        var cleanmsgstring = cleanArray(msgstring)
        return capFirstLtr(cleanmsgstring.join(' ').toLowerCase()).replace('undefined', '').replace('Undefined', '') + '.'
    },

    speakV2: function speakV2() {
        'use strict';
        var sentence;
        var noun = wordwPOS('NN', true)
        if (isWordPOS(noun, 'NNP')) { //proper
            var newnoun = 'ha';
            console.log('proper, remaking')
            while (isWordPOS(newnoun, 'NNP')) {
                newnoun = wordwPOS('NN', true)
                if (!isWordPOS(newnoun, 'NNP')) {
                    noun = newnoun
                }
            }
            if (isWordPOS(noun, 'NNS')) { //plural
                console.log('plural')
                var adj = wordwPOS('JJ', true)
                sentence = `${adj} ${noun}`
            } else {
                console.log('general')
                var Determiner = wordwPOS('DT')
                var adj = wordwPOS('JJ')
                var sadj = wordwPOS('JJS')
                if (Determiner == 'the') {
                    adj = sadj
                    console.log('determined the')
                }
                sentence = `${Determiner} ${adj} ${noun}`
            }
        } else if (isWordPOS(noun, 'NNS')) { //plural
            console.log('plural')
            var adj = wordwPOS('JJ', true)
            sentence = `${adj} ${noun}`
        } else {
            console.log('general')
            var Determiner = wordwPOS('DT')
            var adj = wordwPOS('JJ')
            var sadj = wordwPOS('JJS')
            if (Determiner == 'the') {
                adj = sadj
                console.log('determined the')
            }
            sentence = `${Determiner} ${adj} ${noun}`
        }
        return sentence
    }

}