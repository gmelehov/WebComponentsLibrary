import { isElement } from './isElement.js';
import { findParentElement } from './findParentElement.js';
import { findNextElement } from './findNextElement.js';
import { findLastElement } from './findLastElement.js';
/**
 * Перемещает HTML-элемент ниже на одну позицию в списке своих сестринских узлов
 * @param node перемещаемый элемент
 */
export function dropDownElement(node) {
    if (node && isElement(node)) {
        let parent = findParentElement(node);
        if (parent) {
            let next = findNextElement(node, x => x.tagName === node.tagName);
            let last = findLastElement(node, x => x.tagName === node.tagName);
            if (node !== last)
                parent.insertBefore(next, node);
        }
        ;
    }
    ;
}
