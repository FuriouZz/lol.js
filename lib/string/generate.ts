import { createIterator } from "../array/iterator"

export function word(min = 2, max = 15) {
  const vowels = createIterator("aeiouy".split(""), { loop: true, random: true })
  const consonants = createIterator("bcdfghjklmnpqrstvwxz".split(''), { loop: true, random: true })

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

export function phone() {
  const numbers = createIterator("0123456789".split(''), { loop: true, random: true })
  const p = createIterator("123456789".split(''), { loop: true, random: true })

  let phone = [ p.next().value ]

  for (let i = 0; i < 4; i++) {
    phone.push([ numbers.next().value, numbers.next().value ].join(''))
  }

  let prefix = '+'
  const count = 2 + Math.floor(Math.random() * 3)
  for (let j = 0; j < count; j++) {
    prefix += numbers.next().value
  }

  return prefix + '(0)' + phone.join(' ')
}

/**
* Generate version from datetime
*/
export function date(pretty = false) {
 const now = new Date()

 const date = now.getDate().toString().padStart(2, "0")
 const month = (now.getMonth()+1).toString().padStart(2, "0")
 const year = now.getFullYear().toString().padStart(4, "0")
 const hours = now.getHours().toString().padStart(2, "0")
 const minutes = now.getMinutes().toString().padStart(2, "0")
 const seconds = now.getSeconds().toString().padStart(2, "0")

 if (pretty) {
   return `${year}-${month}-${date}_${hours}-${minutes}-${seconds}`
  }
  return `${year}${month}${date}${hours}${minutes}${seconds}`
}
