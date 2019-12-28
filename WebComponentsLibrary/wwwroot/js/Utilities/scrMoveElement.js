import { getBoundings } from "./getBoundings.js";
import { setStyles } from "./setStyles.js";
/**
 * Смещает элемент по экрану на заданное расстояние по горизонтали и вертикали
 * @param el передвигаемый элемент
 * @param dx смещение по горизонтали, в пикселях
 * @param dy смещение по вертикали, в пикселях
 */
export function scrMoveElement(el, dx, dy) {
    let boundings = getBoundings(el);
    let top = boundings.top;
    let left = boundings.left;
    let height = boundings.height;
    let width = boundings.width;
    let newTop = top + dy;
    let newLeft = left + dx;
    let styleObject = { position: 'fixed', top: `${newTop}px`, left: `${newLeft}px`, height: `${height}px`, width: `${width}px` };
    setStyles(el, styleObject);
    return el;
}
