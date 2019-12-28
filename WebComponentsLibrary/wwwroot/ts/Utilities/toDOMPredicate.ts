import { isVoid } from "./isVoid.js";
import { isFunction } from "./isFunction.js";







export function toDOMPredicate(target: (...args: any[]) => any | string | void | undefined | null)
{

	if (isFunction(target))
	{
		return function (element)
		{
			return (element instanceof HTMLElement) && target(...arguments);
		};
	};

	if (typeof target === 'string')
	{
		return function (element)
		{
			return (element instanceof HTMLElement) && element.matches(target)
		};
	};

	if (isVoid(target))
	{
		return function (element)
		{
			return element instanceof HTMLElement;
		};
	};

}