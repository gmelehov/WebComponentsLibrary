import { isFinite } from "./isFinite.js";
/**
 * Возвращает конечное числовое представление объекта.
 *
 * @param target значение объекта
 * @param strict
 */
export function toFinite(target, strict) {
    let result = parseFloat(target);
    if (isFinite(result) && (!strict || result === target * 1)) {
        return result;
    }
    ;
}
