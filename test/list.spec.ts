import "mocha";
import * as assert from "assert";
import { List } from "../lib/list"

describe("List", () => {

  it('Insert and count', () => {
    const l = new List<string>()

    l.push("l")

    assert.equal(l.length, 1)

    l.unshift("h")

    assert.equal(l.length, 2)

    l.insertAt(1, "e")

    assert.equal(l.length, 3)

    l.add("l")

    assert.equal(l.length, 4)

    assert.deepEqual(l.toArray(), [ "h", "e", "l", "l" ])
  })

  it('Remove and count', () => {
    const l = new List<number>()

    l.push(0)
    l.push(1)
    l.push(2)
    l.push(3)
    l.push(4)

    assert.equal(l.length, 5)

    l.shift()
    l.pop()

    assert.equal(l.length, 3)

    l.remove(2)
    l.removeAt(0)

    assert.equal(l.length, 1)

    l.pop()

    assert.equal(l.length, 0)

    l.pop()

    assert.equal(l.length, 0)
  })

  it('Insert and Remove', () => {
    const l = new List<string>()

    l.push("l")
    l.push("l")
    l.push("o")

    assert.deepEqual(l.toArray(), [ "l", "l", "o" ])

    l.unshift("h")

    assert.deepEqual(l.toArray(), [ "h", "l", "l", "o" ])

    l.insertAt(1, "e")

    assert.deepEqual(l.toArray(), [ "h", "e", "l", "l", "o" ])

    l.pop()

    assert.deepEqual(l.toArray(), [ "h", "e", "l", "l" ])

    l.shift()

    assert.deepEqual(l.toArray(), [ "e", "l", "l" ])

    l.removeAt(1)

    assert.deepEqual(l.toArray(), [ "e", "l" ])
  })

  it('IndexOf', () => {
    const l = new List<string>()

    l.push("l")
    l.push("l")
    l.push("o")

    assert.deepEqual(l.indexOf("l"), 0)

    l.unshift("h")
    l.insertAt(1, "e")

    assert.deepEqual(l.indexOf("l"), 2)
    assert.deepEqual(l.indexOf("o"), 4)
  })

  it('Inverse', () => {
    const l = new List<string>()
    l.add("h")
    l.add("e")
    l.add("l")
    l.add("l")
    l.add("o")

    l.inverse()
    assert.deepEqual(l.toArray(), [ 'o', 'l', 'l', 'e', 'h' ]);
  })

  it('Iterator', () => {
    const l = new List("hello".split(''));

    const it = l.values()
    assert.deepEqual(it.next(), { done: false, value: "h" })
    assert.deepEqual(it.next(), { done: false, value: "e" })
    assert.deepEqual(it.next(), { done: false, value: "l" })
    assert.deepEqual(it.next(), { done: false, value: "l" })
    assert.deepEqual(it.next(), { done: false, value: "o" })
    assert.deepEqual(it.next(), { done: true, value: null })
    assert.deepEqual(it.next(), { done: true, value: null })

    for (const value of l) {
      console.log(value)
    }

    for (const value of l.values()) {
      console.log(value)
    }
  })

})