import { setStyle } from "./setStyle.js";
import { ITypedDictionary } from "../Interfaces/interfaces.js";






export function setStyles(element: HTMLElement, styles: ITypedDictionary<string | number | null>): HTMLElement
{
	Object.keys(styles).forEach(name => { setStyle(element, name, styles[name]) });
	return element;
}