import { isVoid } from "./isVoid.js";
export function isUseful(value) {
    return !isVoid(value) && value.toString() !== '';
}
