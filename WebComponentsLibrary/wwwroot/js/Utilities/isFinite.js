import { xnor } from "./xnor.js";
import { isVoid } from "./isVoid.js";
/**
 * Checks if `value` is a finite `number`.
 *
 * @param {*} value The target value
 * @param {boolean} [notNegative] Specifies if `value` must be not negative
 * @returns {boolean} Returns `true` or `false` based on the check
 */
export function isFinite(value, notNegative) {
    return Number.isFinite(value) && (isVoid(notNegative) || xnor(value >= 0, notNegative));
}
