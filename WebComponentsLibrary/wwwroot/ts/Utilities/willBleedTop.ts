import { ICSSBoundings, ICSSBlockDimensions } from "../Interfaces/interfaces.js";





export function willBleedTop(boundings: ICSSBoundings, margin?: ICSSBlockDimensions): boolean
{
	return boundings.top < 0;
}