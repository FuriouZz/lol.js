"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var index_2 = require("../array/index");
var PipeArray = /** @class */ (function () {
    function PipeArray(items, async) {
        if (async === void 0) { async = false; }
        this.async = async;
        if (async) {
            this.pipeAsync = index_1.pipe_async(items);
        }
        else {
            this.pipeSync = index_1.pipe_sync(items);
        }
    }
    PipeArray.prototype.filter = function (cb) {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return items.filter(cb); });
        }
        else {
            this.pipeSync.pipe(function (items) { return items.filter(cb); });
        }
        return this;
    };
    PipeArray.prototype.sort = function () {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return index_2.sort(items); });
        }
        else {
            this.pipeSync.pipe(function (items) { return index_2.sort(items); });
        }
        return this;
    };
    PipeArray.prototype.shuffle = function () {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return index_2.shuffle(items); });
        }
        else {
            this.pipeSync.pipe(function (items) { return index_2.shuffle(items); });
        }
        return this;
    };
    PipeArray.prototype.inverse = function () {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return index_2.inverse(items); });
        }
        else {
            this.pipeSync.pipe(function (items) { return index_2.inverse(items); });
        }
        return this;
    };
    PipeArray.prototype.unique = function () {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return index_2.unique(items); });
        }
        else {
            this.pipeSync.pipe(function (items) { return index_2.unique(items); });
        }
        return this;
    };
    PipeArray.prototype.similarity = function (arr0) {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return index_2.similarity(items, arr0); });
        }
        else {
            this.pipeSync.pipe(function (items) { return index_2.similarity(items, arr0); });
        }
        return this;
    };
    PipeArray.prototype.difference = function (arr0) {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return index_2.difference(items, arr0); });
        }
        else {
            this.pipeSync.pipe(function (items) { return index_2.difference(items, arr0); });
        }
        return this;
    };
    PipeArray.prototype.value = function () {
        if (this.async) {
            return this.pipeAsync.value();
        }
        return this.pipeSync.value();
    };
    return PipeArray;
}());
exports.PipeArray = PipeArray;
