import { getBoundings } from "./getBoundings.js";
import { ResizerType } from "../Interfaces/interfaces.js";
import { setStyles } from "./setStyles.js";






/**
 * Изменяет визуальную высоту и/или ширину элемента на заданное количество пикселей
 * @param el изменяемый элемент
 * @param resizer направление растяжения/сжатия элемента
 * @param dx изменение ширины элемента, в пикселях
 * @param dy изменение высоты элемента, в пикселях
 */
export function scrResizeElement(el: Element | HTMLElement, resizer: ResizerType, dx: number, dy: number): Element | HTMLElement
{
	let boundings = getBoundings(el);
	let top = boundings.top;
	let left = boundings.left;
	let height = boundings.height;
	let width = boundings.width;

	let isTop = ['top', 'top-right', 'top-left'].some(s => { return s === resizer });
	let isLeft = ['left', 'top-left', 'bottom-left'].some(s => { return s === resizer });
	let isWidth = ['left', 'right', 'bottom-right', 'bottom-left', 'top-right', 'top-left'].some(s => { return s === resizer });
	let	isHeight = ['top', 'bottom', 'top-right', 'bottom-right', 'bottom-left', 'top-left'].some(s => { return s === resizer });

	let newLeft = left + ((isLeft) ? dx : 0);
	let newTop = top + ((isTop) ? dy : 0);

	let newWidth = width + (isLeft ? -dx : dx);
	let newHeight = height + (isTop ? -dy : dy);

	let styleObject = { position: 'fixed', top: `${newTop}px`, left: `${newLeft}px`, height: `${newHeight}px`, width: `${newWidth}px` };

	setStyles(el as HTMLElement, styleObject);

	return el;
}