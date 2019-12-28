import { getNodes } from "./getNodes.js";
export function findElement(node, identity) {
    return getNodes(node.parentNode).find(identity);
}
