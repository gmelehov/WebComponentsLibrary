import { getAllNext } from "./getAllNext.js";
export function findNextElement(node, identity) {
    return getAllNext(node.parentNode.childNodes, node).find(identity);
}
