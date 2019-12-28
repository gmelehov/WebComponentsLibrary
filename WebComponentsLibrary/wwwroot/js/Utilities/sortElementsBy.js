import { isElement } from './isElement.js';
import { findElements } from './findElements.js';
import { sortBy } from './sortBy.js';
import { moveElementToPosition } from './moveElementToPosition.js';
/**
 * Сортирует дочерние HTML-элементы узла node, соответствующие заданному предикату, по возрастанию/убыванию значения ключа (свойства) prop
 * @param node HTML-узел (элемент), чьи дочерние элементы необходимо отсортировать
 * @param predicate предикат, которому должны соответствовать дочерние HTML-элементы для включения их в сортировку
 * @param prop свойство HTML-элемента, по которому необходимо провести сортировку
 * @param ascending если true или не указано, сортировка будет производиться по возрастанию; если false - сортировка будет производиться по убыванию
 */
export function sortElementsBy(node, predicate, prop, ascending) {
    if (node && isElement(node)) {
        let elements = [...findElements(node, predicate)];
        let len = elements.length;
        let sortedElements = sortBy(elements, prop, ascending);
        if (len)
            for (let i = len - 1; i >= 0; i--) {
                let curr = elements[i];
                let indx = sortedElements.indexOf(curr);
                moveElementToPosition(curr, indx);
            }
        ;
    }
    ;
}
