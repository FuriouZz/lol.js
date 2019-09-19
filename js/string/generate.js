"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("../array/iterator");
var vowels = iterator_1.iterator("aeiouy".split(""), { loop: true, random: true });
var consonants = iterator_1.iterator("bcdfghjklmnpqrstvwxz".split(''), { loop: true, random: true });
function word(min, max) {
    if (min === void 0) { min = 2; }
    if (max === void 0) { max = 15; }
    var length = min + (Math.random() * (max - min));
    var isVowel = 0;
    var isConsonant = 0;
    function generate(letters, word, is_vowels) {
        if (is_vowels === void 0) { is_vowels = false; }
        var l = letters.next().value;
        if (is_vowels) {
            isVowel++;
        }
        else {
            isConsonant++;
        }
        if (isVowel >= 2) {
            isVowel = 0;
            letters = consonants;
            is_vowels = false;
        }
        if (isConsonant >= 2) {
            isConsonant = 0;
            letters = vowels;
            is_vowels = true;
        }
        word += l;
        return word.length >= length ? word : generate(letters, word, is_vowels);
    }
    return generate(Math.random() > 0.5 ? vowels : consonants, "");
}
exports.word = word;
