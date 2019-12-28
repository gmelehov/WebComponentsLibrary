import { isNumber } from "./isNumber.js";
/**
 * Проверяет, является ли значение value NaN
 * @param value проверяемое значение
 */
export function isNaN(value) {
    return isNumber(value) && value !== +value;
}
