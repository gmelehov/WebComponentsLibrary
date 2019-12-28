import { OverlayPosition } from "../Enums/enums.js";
import { getHeight } from './getHeight.js';
import { getWidth } from './getWidth.js';
import { getMargin } from './getMargin.js';
import { getBoundings } from './getBoundings.js';
import { setStyles } from './setStyles.js';
import { willBleedRight } from './willBleedRight.js';
import { willBleedLeft } from './willBleedLeft.js';
import { willBleedHorizontally } from './willBleedHorizontally.js';
import { willBleedBottom } from './willBleedBottom.js';
import { willBleedTop } from './willBleedTop.js';
/**
 * Выравнивает элемент {@link element} относительно целевого элемента {@link target}
 *
 * @param element элемент, который необходимо выровнять относительно цели
 * @param target целевой элемент, относительно которого выравнивается {@link element}
 * @param position тип позиционирования
 * @param autoCenter true для дополнительного осевого центрирования элемента {@link element}
 * @param xBias опциональный дополнительный сдвиг элемента {@link element} по горизонтали
 * @param yBias опциональный дополнительный сдвиг элемента {@link element} по вертикали
 * @returns {HTMLElement}
 */
export function alignElement(element, target, position, autoCenter, xBias, yBias) {
    setStyles(element, { contain: 'layout', position: 'fixed', bottom: null, left: 0, right: null, top: 0 });
    let domHeight = getHeight(), domWidth = getWidth(), margin = getMargin(element), boundings = getBoundings(element), targetBoundings = getBoundings(target || document.documentElement), newBoundings = null, xbias = xBias || 0, ybias = yBias || 0;
    boundings.left = targetBoundings.left + (position === OverlayPosition.aside ? targetBoundings.width : (autoCenter || !target ? (targetBoundings.width / 2) - (boundings.width / 2) : 0)) - margin.left;
    boundings.top = targetBoundings.top + (position === OverlayPosition.baseline ? targetBoundings.height : (!target ? (targetBoundings.height / 2) - (boundings.height / 2) : 0)) - margin.top;
    if (willBleedRight(boundings, margin))
        boundings.left = position === OverlayPosition.aside ? boundings.left - (targetBoundings.width + boundings.width) : domWidth - (margin.left + boundings.width + margin.right + targetBoundings.width);
    if (willBleedLeft(boundings, margin))
        boundings.left = position === OverlayPosition.aside && !willBleedHorizontally(boundings, margin) ? domWidth - (margin.left + boundings.width + margin.right) : 0;
    if (willBleedBottom(boundings, margin))
        boundings.top = domHeight - (margin.top + boundings.height + margin.bottom);
    if (willBleedTop(boundings, margin))
        boundings.top = 0;
    setStyles(element, { left: Math.round(boundings.left + xbias) + 'px', right: willBleedRight(boundings, margin) ? '0px' : null });
    setStyles(element, { top: Math.round(boundings.top + ybias) + 'px', bottom: willBleedBottom(boundings, margin) ? '0px' : null });
    newBoundings = getBoundings(element);
    if ((newBoundings.left -= margin.left) !== boundings.left)
        setStyles(element, { left: Math.round(((boundings.left * 2) - newBoundings.left) + xbias) + 'px', right: willBleedRight(boundings, margin) ? (boundings.left - newBoundings.left) + 'px' : null });
    if ((newBoundings.top -= margin.top) !== boundings.top)
        setStyles(element, { top: Math.round(((boundings.top * 2) - newBoundings.top) + ybias) + 'px', bottom: willBleedBottom(boundings, margin) ? (boundings.top - newBoundings.top) + 'px' : null });
    return element;
}
