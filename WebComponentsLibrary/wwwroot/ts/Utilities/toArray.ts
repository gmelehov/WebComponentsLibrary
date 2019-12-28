import { isArrayLike } from "./isArrayLike.js";








export function toArray(target: any)
{
	if (Array.isArray(target))
		return target;

	if (isArrayLike(target))
		return Array.from(target);

}