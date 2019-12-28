import { ICSSBoundings, ICSSBlockDimensions } from "../Interfaces/interfaces.js";





export function willBleedHorizontally(boundings: ICSSBoundings, margin: ICSSBlockDimensions): boolean
{
	return margin.left + boundings.width + margin.right > Math.floor(window.innerWidth);
}