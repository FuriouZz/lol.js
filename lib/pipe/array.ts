import { PipeSync, pipe_sync, PipeAsync, pipe_async } from "./index";
import { sort, shuffle, inverse, unique, similarity, difference } from "../array/index";

export class PipeArray<T> {

  pipeSync!: PipeSync<T[]>
  pipeAsync!: PipeAsync<T[]>

  constructor(items: T[], private async = false) {
    if (async) {
      this.pipeAsync = pipe_async(items)
    } else {
      this.pipeSync = pipe_sync(items)
    }
  }

  filter(cb: (value: T, index: number, array: T[]) => boolean) {
    if (this.async) {
      this.pipeAsync.pipe((items: T[]) => items.filter(cb))
    } else {
      this.pipeSync.pipe((items: T[]) => items.filter(cb))
    }
    return this
  }

  sort() {
    if (this.async) {
      this.pipeAsync.pipe((items: T[]) => sort(items))
    } else {
      this.pipeSync.pipe((items: T[]) => sort(items))
    }
    return this
  }

  shuffle() {
    if (this.async) {
      this.pipeAsync.pipe((items: T[]) => shuffle(items))
    } else {
      this.pipeSync.pipe((items: T[]) => shuffle(items))
    }
    return this
  }

  inverse() {
    if (this.async) {
      this.pipeAsync.pipe((items: T[]) => inverse(items))
    } else {
      this.pipeSync.pipe((items: T[]) => inverse(items))
    }
    return this
  }

  unique() {
    if (this.async) {
      this.pipeAsync.pipe((items: T[]) => unique(items))
    } else {
      this.pipeSync.pipe((items: T[]) => unique(items))
    }
    return this
  }

  similarity(arr0: T[]) {
    if (this.async) {
      this.pipeAsync.pipe((items: T[]) => similarity(items, arr0))
    } else {
      this.pipeSync.pipe((items: T[]) => similarity(items, arr0))
    }
    return this
  }

  difference(arr0: T[]) {
    if (this.async) {
      this.pipeAsync.pipe((items: T[]) => difference(items, arr0))
    } else {
      this.pipeSync.pipe((items: T[]) => difference(items, arr0))
    }
    return this
  }

  value() {
    if (this.async) {
      return this.pipeAsync.value()
    }
    return this.pipeSync.value()
  }

}