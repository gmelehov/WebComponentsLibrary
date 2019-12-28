import { findTarget } from "./findTarget.js";
import { pick } from "./pick.js";





/**
 * Возвращает значения определенных CSS-свойств элемента
 * @param element элемент, свойства которого необходимо вернуть
 * @param styleNames список CSS-свойств элемента; если этот параметр не задан, возвращает все имеющиеся CSS-свойства элемента
 */
export function getStyles(element: Node | HTMLElement | Element | string, styleNames?: Array<string>)
{
	let elem = element;

	if (typeof element === 'string')
		elem = findTarget(element);

	let styles = window.getComputedStyle(elem as Element);
	let ret = (styleNames) ? pick(styles, styleNames) : Object.assign(Object.create(null), styles);
	return ret;
}