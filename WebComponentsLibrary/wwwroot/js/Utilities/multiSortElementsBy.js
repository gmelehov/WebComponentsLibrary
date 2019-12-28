import { isElement } from './isElement.js';
import { findElements } from './findElements.js';
import { multiSortBy } from './multiSortBy.js';
import { moveElementToPosition } from './moveElementToPosition.js';
export function multiSortElementsBy(node, predicate, props, directions) {
    if (node && isElement(node)) {
        if (!directions)
            directions = new Array();
        if (directions.length < props.length) {
            let dlen = directions.length;
            let plen = props.length;
            for (let i = 0; i < (plen - dlen - 1); i++)
                directions.push(true);
        }
        ;
        let elements = [...findElements(node, predicate)];
        let len = elements.length;
        let sortedElements = multiSortBy(elements, props, directions);
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
