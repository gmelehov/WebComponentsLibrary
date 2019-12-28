import { findElement } from "./findElement.js";






export function hasChildren(node: Node): boolean
{
	return !!findElement(node as Element, node =>
	{
		if (node.nodeType === 1 && node.tagName === 'TEMPLATE')
			return false;

		if (node.nodeType === 3 && !node.textContent.trim('\r\n '))
			return false;

		return true;
	});
}