import { getAllPrevious } from "./getAllPrevious.js";
export function findPreviousElement(node, identity) {
    return getAllPrevious(node.parentNode.childNodes, node).reverse().find(identity);
}
