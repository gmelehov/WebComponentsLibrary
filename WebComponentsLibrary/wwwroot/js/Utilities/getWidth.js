/**
 * Возвращает ширину элемента в пикселях, включая padding и исключая скроллбары.
 * Если элемент не указан, возвращается текущая высота окна браузера.
 *
 * @param {HTMLElement | Element} element элемент, для которого вычисляется ширина
 * @returns {Number}
 */
export function getWidth(element) {
    return Math.floor(element ? element.getBoundingClientRect().width : window.innerWidth);
}
