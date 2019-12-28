import { isVoid } from "./isVoid.js";





export function isUseful(value: any): boolean
{
	return !isVoid(value) && value.toString() !== '';
}