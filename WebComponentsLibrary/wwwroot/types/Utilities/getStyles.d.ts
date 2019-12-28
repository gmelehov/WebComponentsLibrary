/**
 * Возвращает значения определенных CSS-свойств элемента
 * @param element элемент, свойства которого необходимо вернуть
 * @param styleNames список CSS-свойств элемента; если этот параметр не задан, возвращает все имеющиеся CSS-свойства элемента
 */
export declare function getStyles(element: Node | HTMLElement | Element | string, styleNames?: Array<string>): any;
