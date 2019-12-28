import { ICSSBoundings, ICSSBlockDimensions } from "../Interfaces/interfaces.js";





export function willBleedBottom(boundings: ICSSBoundings, margin: ICSSBlockDimensions): boolean
{
	return boundings.top + margin.top + boundings.height + margin.bottom > Math.floor(window.innerHeight);
}