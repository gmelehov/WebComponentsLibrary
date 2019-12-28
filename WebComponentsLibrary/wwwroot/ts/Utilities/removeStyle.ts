




export function removeStyle(element: HTMLElement, name: string): HTMLElement
{
	element.style[name] = null;
	return element;
}