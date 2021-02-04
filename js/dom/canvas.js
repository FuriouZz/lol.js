"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawEllipse = void 0;
var math_1 = require("../math");
function drawEllipse(ctx, centerX, centerY, width, height) {
    ctx.save();
    ctx.scale(width / width, height / width);
    ctx.arc(centerX, centerY, width * 0.5, 0, math_1.PI2, false);
    ctx.restore();
}
exports.drawEllipse = drawEllipse;
