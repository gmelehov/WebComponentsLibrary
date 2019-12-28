import { isElement } from './isElement.js';
import { findParentElement } from './findParentElement.js';
import { findNextElement } from './findNextElement.js';
import { findLastElement } from './findLastElement.js';







/**
 * Перемещает HTML-элемент ниже на одну позицию в списке своих сестринских узлов
 * @param node перемещаемый элемент
 */
export function dropDownElement(node: Node | Element | HTMLElement): void
{
	if (node && isElement(node))
	{
		let parent = findParentElement(node);
		if (parent)
		{
			let next = findNextElement(node as HTMLElement, x => x.tagName === (node as HTMLElement).tagName);
			let last = findLastElement(node as HTMLElement, x => x.tagName === (node as HTMLElement).tagName);
			if (node !== last)
				parent.insertBefore(next, node);
		};
	};
}