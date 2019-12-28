import { getNodes } from "./getNodes.js";
export function findFirstElement(node, identity) {
    return getNodes(node.parentNode).find(identity);
}
