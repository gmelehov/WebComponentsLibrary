import { isVoid } from "./isVoid.js";
import { isFunction } from "./isFunction.js";
import { toDOMPredicate } from "./toDOMPredicate.js";






export function toDOMIdentity(target: (...args: any[]) => any | HTMLElement | string | void | undefined | null)
{

	if (target instanceof HTMLElement)
	{
		return function (element)
		{
			return element === target;
		};
	};

	if (typeof target === 'string' || isFunction(target))
	{
		return toDOMPredicate(target);
	};

	if (isVoid(target))
	{
		return function () { };
	};

}