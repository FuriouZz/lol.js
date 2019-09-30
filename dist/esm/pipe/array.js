import { pipe_sync, pipe_async } from "./index";
import { sort, shuffle, inverse, unique, similarity, difference } from "../array/index";
export class PipeArray {
    constructor(items, async = false) {
        this.async = async;
        if (async) {
            this.pipeAsync = pipe_async(items);
        }
        else {
            this.pipeSync = pipe_sync(items);
        }
    }
    filter(cb) {
        if (this.async) {
            this.pipeAsync.pipe((items) => items.filter(cb));
        }
        else {
            this.pipeSync.pipe((items) => items.filter(cb));
        }
        return this;
    }
    sort() {
        if (this.async) {
            this.pipeAsync.pipe((items) => sort(items));
        }
        else {
            this.pipeSync.pipe((items) => sort(items));
        }
        return this;
    }
    shuffle() {
        if (this.async) {
            this.pipeAsync.pipe((items) => shuffle(items));
        }
        else {
            this.pipeSync.pipe((items) => shuffle(items));
        }
        return this;
    }
    inverse() {
        if (this.async) {
            this.pipeAsync.pipe((items) => inverse(items));
        }
        else {
            this.pipeSync.pipe((items) => inverse(items));
        }
        return this;
    }
    unique() {
        if (this.async) {
            this.pipeAsync.pipe((items) => unique(items));
        }
        else {
            this.pipeSync.pipe((items) => unique(items));
        }
        return this;
    }
    similarity(arr0) {
        if (this.async) {
            this.pipeAsync.pipe((items) => similarity(items, arr0));
        }
        else {
            this.pipeSync.pipe((items) => similarity(items, arr0));
        }
        return this;
    }
    difference(arr0) {
        if (this.async) {
            this.pipeAsync.pipe((items) => difference(items, arr0));
        }
        else {
            this.pipeSync.pipe((items) => difference(items, arr0));
        }
        return this;
    }
    value() {
        if (this.async) {
            return this.pipeAsync.value();
        }
        return this.pipeSync.value();
    }
}
