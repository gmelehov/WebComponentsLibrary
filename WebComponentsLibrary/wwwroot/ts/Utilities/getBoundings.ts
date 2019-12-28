import { ICSSBoundings } from "../Interfaces/interfaces.js";
import { pick } from "./pick.js";





export function getBoundings(element: HTMLElement | Element): ICSSBoundings
{
	return pick(element.getBoundingClientRect(), ['bottom', 'height', 'left', 'right', 'top', 'width']);
}