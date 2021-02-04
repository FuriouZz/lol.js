"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hours = exports.minutes = exports.seconds = exports.milliseconds = void 0;
function milliseconds(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.milliseconds = milliseconds;
function seconds(s) {
    return new Promise(function (resolve) {
        setTimeout(resolve, s * 1000);
    });
}
exports.seconds = seconds;
function minutes(mn) {
    return new Promise(function (resolve) {
        setTimeout(resolve, mn * 60 * 1000);
    });
}
exports.minutes = minutes;
function hours(h) {
    return new Promise(function (resolve) {
        setTimeout(resolve, h * 60 * 60 * 1000);
    });
}
exports.hours = hours;
