import { isElement } from './isElement.js';
import { findParentElement } from './findParentElement.js';
import { findPreviousElement } from './findPreviousElement.js';
import { findFirstElement } from './findFirstElement.js';
/**
 * Перемещает HTML-элемент выше на одну позицию в списке своих сестринских узлов
 * @param node перемещаемый элемент
 */
export function raiseUpElement(node) {
    if (node && isElement(node)) {
        let parent = findParentElement(node);
        if (parent) {
            let prev = findPreviousElement(node, x => x.tagName === node.tagName);
            let first = findFirstElement(node, x => x.tagName === node.tagName);
            if (node !== first)
                parent.insertBefore(node, prev);
        }
        ;
    }
    ;
}
