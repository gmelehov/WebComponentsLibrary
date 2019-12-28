import { isObjectLike } from './isObjectLike.js';
import { isHostObject } from './isHostObject.js';
import { getPrototype } from './getPrototype.js';





const objectTag = '[object Object]';
const objectProto = Object.prototype;
const funcToString = Function.prototype.toString;
const hasOwnProperty = objectProto.hasOwnProperty;
const objectCtorString = funcToString.call(Object);
const objectToString = objectProto.toString;






/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 * 
 * @param value исходное значение
 */
export function isPlainObject(value: any): boolean
{
	if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value))
		return false;

	let proto = getPrototype(value);
	if (proto === null)
		return true;

	let Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;

	return (typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}