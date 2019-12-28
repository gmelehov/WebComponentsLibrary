import { getMargin } from "./getMargin.js";
/**
 * Возвращает высоту элемента в пикселях, включая padding и margin, исключая скроллбары. Если элемент не указан, возвращается текущая высота окна браузера
 * @param element элемент, для которого вычисляется высота
 */
export function getFullHeight(element) {
    let margins = getMargin(element);
    return Math.floor(element ? element.getBoundingClientRect().height + margins.top + margins.bottom : window.innerHeight);
}
