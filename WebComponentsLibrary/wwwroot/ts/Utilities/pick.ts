import { isObject } from "./isObject.js";




/**
 * Возвращает объект, состоящий из указанных свойств исходного объекта
 * 
 * @param obj исходный объект, содержащий искомые свойства
 * @param keys список свойств исходного объекта, которые необходимо включить в результирующий объект
 */
export function pick(obj: any, keys: Array<string>): any
{
	let res = Object.create(null);

	if (!isObject(obj) && typeof obj !== 'function')
		return Object.create(null);

	if (typeof keys === 'string')
	{
		if (keys in obj)
			res[keys] = obj[keys];

		return res;
	};

	let len = keys.length;
	let idx = -1;

	while (++idx < len)
	{
		let key = keys[idx];
		if (key in obj)
			res[key] = obj[key];
	};
	return res;
}