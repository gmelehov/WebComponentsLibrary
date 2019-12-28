import { getAllNext } from "./getAllNext.js";
export function findNextElements(node, predicate) {
    return getAllNext(node.parentNode.childNodes, node).filter(predicate);
}
