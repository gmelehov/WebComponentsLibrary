import { OverlayPosition } from "../Enums/enums.js";
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
export declare function alignElement(element: HTMLElement, target?: HTMLElement, position?: OverlayPosition, autoCenter?: boolean, xBias?: number, yBias?: number): HTMLElement;
