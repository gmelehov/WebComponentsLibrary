


const nativeGetPrototype = Object.getPrototypeOf;





/**
 * Gets the `[[Prototype]]` of `value`.
 * @param value исходное значение
 */
export function getPrototype(value: any)
{
	return nativeGetPrototype(Object(value));
}