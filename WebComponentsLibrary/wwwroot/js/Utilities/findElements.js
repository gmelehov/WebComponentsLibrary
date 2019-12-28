import { getNodes } from "./getNodes.js";
export function findElements(node, predicate) {
    return getNodes(node).filter(predicate);
}
