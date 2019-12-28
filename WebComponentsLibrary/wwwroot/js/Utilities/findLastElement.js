import { getNodes } from "./getNodes.js";
export function findLastElement(node, identity) {
    return getNodes(node.parentNode).reverse().find(identity);
}
