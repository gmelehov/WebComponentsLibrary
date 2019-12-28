import { getNodes } from "./getNodes.js";





export function findLastElement(node: Element, identity: (...args: any[]) => any | HTMLElement | string): Node
{
	return getNodes(node.parentNode).reverse().find(identity);
}