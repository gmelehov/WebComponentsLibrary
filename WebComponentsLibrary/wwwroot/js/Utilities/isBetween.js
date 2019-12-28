import { clamp } from "./clamp.js";
export function isBetween(value, min, max) {
    return value === clamp(value, min, max);
}
