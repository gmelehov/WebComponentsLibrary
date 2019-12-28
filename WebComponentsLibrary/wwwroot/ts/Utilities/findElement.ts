import { getNodes } from "./getNodes.js";





export function findElement(node: Element, identity: (...args: any[]) => any | HTMLElement | string): Node
{
	return getNodes(node.parentNode).find(identity);
}