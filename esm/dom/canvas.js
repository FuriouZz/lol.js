import { PI2 } from "../math";
export function drawEllipse(ctx, centerX, centerY, width, height) {
    ctx.save();
    ctx.scale(width / width, height / width);
    ctx.arc(centerX, centerY, width * 0.5, 0, PI2, false);
    ctx.restore();
}
