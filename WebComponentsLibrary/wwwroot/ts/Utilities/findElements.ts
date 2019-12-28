import { getNodes } from "./getNodes.js";






export function findElements(node: Node | HTMLElement | Element, predicate: (...args: any[]) => any | string): Array<Node>
{
	return getNodes(node).filter(predicate);
}