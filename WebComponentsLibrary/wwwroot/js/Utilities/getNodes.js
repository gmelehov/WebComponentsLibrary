export function getNodes(node) {
    return Array.from(node.assignedNodes ? node.assignedNodes({ flatten: true }) : (node.getEffectiveChildNodes ? node.getEffectiveChildNodes() : node.childNodes));
}
