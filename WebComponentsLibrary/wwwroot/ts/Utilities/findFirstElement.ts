import { getNodes } from "./getNodes.js";





export function findFirstElement(node: Element, identity: (...args: any[]) => any | HTMLElement | string): Node
{
	return getNodes(node.parentNode).find(identity);
}