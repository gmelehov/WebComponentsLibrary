




export function setStyle(element: HTMLElement, name: string, value?: string | number | null): HTMLElement
{
	element.style[name] = (value) ? value.toString() : null;
	return element;
}