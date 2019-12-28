/**
 * Сортирует дочерние HTML-элементы узла node, соответствующие заданному предикату, по возрастанию/убыванию значения ключа (свойства) prop
 * @param node HTML-узел (элемент), чьи дочерние элементы необходимо отсортировать
 * @param predicate предикат, которому должны соответствовать дочерние HTML-элементы для включения их в сортировку
 * @param prop свойство HTML-элемента, по которому необходимо провести сортировку
 * @param ascending если true или не указано, сортировка будет производиться по возрастанию; если false - сортировка будет производиться по убыванию
 */
export declare function sortElementsBy(node: Node | HTMLElement | Element, predicate: (...args: any[]) => any | string, prop: string, ascending?: boolean): void;
