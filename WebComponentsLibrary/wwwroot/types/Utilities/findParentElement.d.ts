/**
 * Возвращает ближайшего родителя элемента
 * @param node элемент
 * @param selector селектор искомого родителя
 * @param boundary элемент - верхний ограничитель поиска (искать не выше ограничителя включительно)
 */
export declare function findParentElement(node: Node | Element | HTMLElement, selector?: string, boundary?: Node | Element | HTMLElement): HTMLElement;
