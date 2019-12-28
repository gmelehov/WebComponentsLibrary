import { toFinite } from "./toFinite.js";
/**
 * Возвращает значения padding для указанного элемента
 * @param element элемент, для которого вычисляются значения padding
 */
export function getPadding(element) {
    let keys = ['bottom', 'left', 'right', 'top'], style = window.getComputedStyle(element), ret = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    };
    return keys.reduce((result, key) => { result[key] = toFinite(style[`padding-${key}`]); return result; }, ret);
}
