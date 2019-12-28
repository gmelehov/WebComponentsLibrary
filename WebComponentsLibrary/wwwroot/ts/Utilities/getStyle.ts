import { findTarget } from "./findTarget.js";




/**
 * Возвращает значение CSS-свойства элемента
 * @param element элемент, свойство которого необходимо вернуть
 * @param styleName наименование CSS-свойства элемента
 */
export function getStyle(element: Node | HTMLElement | Element | string, styleName: string)
{
	let elem = element;

	if (typeof element === 'string')
		elem = findTarget(element);

	return window.getComputedStyle(elem as Element)[styleName];
}