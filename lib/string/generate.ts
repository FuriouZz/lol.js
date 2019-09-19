import { iterator } from "../array/iterator"

const vowels = iterator("aeiouy".split(""), { loop: true, random: true })
const consonants = iterator("bcdfghjklmnpqrstvwxz".split(''), { loop: true, random: true })

export function word(min = 2, max = 15) {

  let length = min + (Math.random() * (max - min))
  let isVowel = 0
  let isConsonant = 0

  function generate(letters: Iterator<string>, word: string, is_vowels = false) : string {
    const l = letters.next().value

    if (is_vowels) {
      isVowel++
    } else {
      isConsonant++
    }

    if (isVowel >= 2) {
      isVowel = 0
      letters = consonants
      is_vowels = false
    }

    if (isConsonant >= 2) {
      isConsonant = 0
      letters = vowels
      is_vowels = true
    }

    word += l

    return word.length >= length ? word : generate(letters, word, is_vowels)
  }

  return generate(Math.random() > 0.5 ? vowels : consonants, "")

}