import "mocha";
import * as assert from "assert";
import { pipe } from "../lib/pipe";
import { toUnderscore } from "../lib/string"

describe('Pipe', () => {

  it('pipe', async () => {

    const hello = pipe('Hello World')

    assert.equal(
      await hello
      .pipe(toUnderscore)
      .value(),
      'hello_world'
    )

    assert.equal(
      await hello
      .pipe((v) => v.toLowerCase())
      .value(),
      'hello world'
    )

    assert.deepEqual(
      await hello
      .pipe((v) => v.toLowerCase())
      .pipe((v) => { return { value: v } })
      .value(),
      {
        value: 'hello world'
      }
    )
  })

})