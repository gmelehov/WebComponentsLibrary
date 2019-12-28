




/**
 * Возвращает высоту элемента в пикселях, включая padding и исключая скроллбары. 
 * Если элемент не указан, возвращается текущая высота окна браузера.
 * 
 * @param {HTMLElement | Element} element элемент, для которого вычисляется высота
 * @returns {Number}
 */
export function getHeight(element?: HTMLElement | Element): number
{
	return Math.floor(element ? element.getBoundingClientRect().height : window.innerHeight);
}