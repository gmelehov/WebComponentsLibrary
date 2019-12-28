import { ICSSBoundings, ICSSBlockDimensions } from "../Interfaces/interfaces.js";





export function willBleedLeft(boundings: ICSSBoundings, margin?: ICSSBlockDimensions): boolean
{
	return boundings.left < 0;
}