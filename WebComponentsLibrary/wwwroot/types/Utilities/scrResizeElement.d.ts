import { ResizerType } from "../Interfaces/interfaces.js";
/**
 * Изменяет визуальную высоту и/или ширину элемента на заданное количество пикселей
 * @param el изменяемый элемент
 * @param resizer направление растяжения/сжатия элемента
 * @param dx изменение ширины элемента, в пикселях
 * @param dy изменение высоты элемента, в пикселях
 */
export declare function scrResizeElement(el: Element | HTMLElement, resizer: ResizerType, dx: number, dy: number): Element | HTMLElement;
