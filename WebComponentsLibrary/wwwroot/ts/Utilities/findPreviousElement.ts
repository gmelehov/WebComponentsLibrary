import { getAllPrevious } from "./getAllPrevious.js";





export function findPreviousElement(node: Element, identity: (...args: any[]) => any | HTMLElement | string): Node
{
	return getAllPrevious(node.parentNode.childNodes, node).reverse().find(identity);
}