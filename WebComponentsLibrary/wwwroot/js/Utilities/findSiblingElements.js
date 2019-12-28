import { getAllSiblings } from "./getAllSiblings.js";
export function findSiblingElements(node, predicate) {
    return getAllSiblings(node.parentNode.children, node).filter(predicate);
}
