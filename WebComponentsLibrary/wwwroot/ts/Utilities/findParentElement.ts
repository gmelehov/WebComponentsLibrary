import { matches } from "./matches.js";





/**
 * Возвращает ближайшего родителя элемента 
 * @param node элемент
 * @param selector селектор искомого родителя
 * @param boundary элемент - верхний ограничитель поиска (искать не выше ограничителя включительно)
 */
export function findParentElement(node: Node | Element | HTMLElement, selector?: string, boundary?: Node | Element | HTMLElement): HTMLElement
{
	let result: HTMLElement;
  while (node && <HTMLElement>node !== <HTMLElement>boundary && !result)
  {
    if ((node as Element).assignedSlot)
    {
      node = (node as Element).assignedSlot.parentElement || node.parentNode || (node as ShadowRoot).host;
    }
    else
    {
      node = (node as ShadowRoot).host || node.parentNode;
    };

		result = (node && node.nodeType == 1 && matches(node, selector)) ?
			node as HTMLElement
			:
			result;
	};
	return result;
}