import { ICSSBoundings, ICSSBlockDimensions } from "../Interfaces/interfaces.js";





export function willBleedRight(boundings: ICSSBoundings, margin: ICSSBlockDimensions): boolean
{
	return Math.floor(boundings.left + margin.left + boundings.width + margin.right) >= Math.floor(window.innerWidth);
}