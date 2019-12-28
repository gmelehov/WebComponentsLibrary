import { clamp } from "./clamp.js";





export function isBetween(value: number, min: number, max: number): boolean
{
	return value === clamp(value, min, max);
}