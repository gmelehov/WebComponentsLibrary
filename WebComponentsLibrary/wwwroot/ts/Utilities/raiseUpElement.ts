import { isElement } from './isElement.js';
import { findParentElement } from './findParentElement.js';
import { findPreviousElement } from './findPreviousElement.js';
import { findFirstElement } from './findFirstElement.js';






/**
 * Перемещает HTML-элемент выше на одну позицию в списке своих сестринских узлов
 * @param node перемещаемый элемент
 */
export function raiseUpElement(node: Node | Element | HTMLElement): void
{
	if (node && isElement(node))
	{
		let parent = findParentElement(node);
		if (parent)
		{
			let prev = findPreviousElement(node as HTMLElement, x => x.tagName === (node as HTMLElement).tagName);
			let first = findFirstElement(node as HTMLElement, x => x.tagName === (node as HTMLElement).tagName);
			if (node !== first)
				parent.insertBefore(node, prev);
		};
	};	
}