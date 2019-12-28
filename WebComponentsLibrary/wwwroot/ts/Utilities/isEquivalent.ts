import { isObject } from "./isObject.js";
import { isUseful } from "./isUseful.js";







export function isEquivalent(value: any, other: any): boolean
{
	function polish(key, val)
	{
		if (val === false || !isUseful(val))
			return;

		if (isObject(val))
			return Object.keys(val).sort().reduce((obj, key) => { obj[key] = val[key]; return obj; }, {});

		return val;
	};

	return JSON.stringify(value, polish) === JSON.stringify(other, polish);
}