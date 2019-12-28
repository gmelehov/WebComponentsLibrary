import { getAllNext } from "./getAllNext.js";




export function findNextElement(node: Element, identity: (...args: any[]) => any | HTMLElement | string): Node
{
	return getAllNext(node.parentNode.childNodes, node).find(identity);
}