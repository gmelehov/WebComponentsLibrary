import { isElement } from './isElement.js';
import { findParentElement } from './findParentElement.js';
import { findElements } from './findElements.js';
import { raiseUpElement } from './raiseUpElement.js';
import { dropDownElement } from './dropDownElement.js';







/**
 * Перемещает HTML-элемент на определенную позицию в списке своих сестринских узлов
 * @param node перемещаемый элемент
 * @param position целевая позиция (номер элемента в списке)
 */
export function moveElementToPosition(node: Node | Element | HTMLElement, position: number): void
{
	if (node && isElement(node) && position >= 0)
	{
		let parent = findParentElement(node);
		let elements = findElements(parent as HTMLElement, x => x.tagName === (node as HTMLElement).tagName);
		let len = elements.length;
		let currIndex = elements.indexOf(node);

		if (currIndex !== -1 && position < len)
			for (let i = 0; i < Math.abs(position - currIndex); i++)
				(currIndex < position) ? dropDownElement(node) : raiseUpElement(node);
	};
}