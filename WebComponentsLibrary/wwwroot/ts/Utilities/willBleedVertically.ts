import { ICSSBoundings, ICSSBlockDimensions } from "../Interfaces/interfaces.js";





export function willBleedVertically(boundings: ICSSBoundings, margin: ICSSBlockDimensions): boolean
{
	return margin.top + boundings.height + margin.bottom > Math.floor(window.innerHeight);
}