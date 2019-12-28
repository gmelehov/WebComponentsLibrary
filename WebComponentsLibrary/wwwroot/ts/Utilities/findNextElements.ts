import { getAllNext } from "./getAllNext.js";





export function findNextElements(node: Element, predicate: (...args: any[]) => any | string): Array<Node>
{
	return getAllNext(node.parentNode.childNodes, node).filter(predicate);
}