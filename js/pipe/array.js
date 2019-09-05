"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var array_1 = require("../array");
var PipeArray = /** @class */ (function () {
    function PipeArray(items, async) {
        if (async === void 0) { async = false; }
        this.async = async;
        if (async) {
            this.pipeAsync = _1.pipe_async(items);
        }
        else {
            this.pipeSync = _1.pipe_sync(items);
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
            this.pipeAsync.pipe(function (items) { return array_1.sort(items); });
        }
        else {
            this.pipeSync.pipe(function (items) { return array_1.sort(items); });
        }
        return this;
    };
    PipeArray.prototype.shuffle = function () {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return array_1.shuffle(items); });
        }
        else {
            this.pipeSync.pipe(function (items) { return array_1.shuffle(items); });
        }
        return this;
    };
    PipeArray.prototype.inverse = function () {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return array_1.inverse(items); });
        }
        else {
            this.pipeSync.pipe(function (items) { return array_1.inverse(items); });
        }
        return this;
    };
    PipeArray.prototype.unique = function () {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return array_1.unique(items); });
        }
        else {
            this.pipeSync.pipe(function (items) { return array_1.unique(items); });
        }
        return this;
    };
    PipeArray.prototype.similarity = function (arr0) {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return array_1.similarity(items, arr0); });
        }
        else {
            this.pipeSync.pipe(function (items) { return array_1.similarity(items, arr0); });
        }
        return this;
    };
    PipeArray.prototype.difference = function (arr0) {
        if (this.async) {
            this.pipeAsync.pipe(function (items) { return array_1.difference(items, arr0); });
        }
        else {
            this.pipeSync.pipe(function (items) { return array_1.difference(items, arr0); });
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
