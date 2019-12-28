/**
 * Возвращает ширину элемента в пикселях, включая padding и исключая скроллбары.
 * Если элемент не указан, возвращается текущая высота окна браузера.
 *
 * @param {HTMLElement | Element} element элемент, для которого вычисляется ширина
 * @returns {Number}
 */
export declare function getWidth(element?: HTMLElement | Element): number;
