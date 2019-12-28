import { toFinite } from "./toFinite.js";
import { ICSSBlockDimensions } from "../Interfaces/interfaces.js";



/**
 * Возвращает значения padding для указанного элемента
 * @param element элемент, для которого вычисляются значения padding
 */
export function getPadding(element: HTMLElement | Element): ICSSBlockDimensions
{
	let keys = ['bottom', 'left', 'right', 'top'],
		style = window.getComputedStyle(element),
		ret: ICSSBlockDimensions = {
			bottom: 0,
			left: 0,
			right: 0,
			top: 0
		};
	return keys.reduce((result, key) => { result[key] = toFinite(style[`padding-${key}`]); return result; }, ret);
}