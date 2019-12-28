import { isObjectLike } from './isObjectLike.js';
import { isLength } from './isLength.js';




const argsTag = '[object Arguments]',
	arrayTag = '[object Array]',
	boolTag = '[object Boolean]',
	dateTag = '[object Date]',
	errorTag = '[object Error]',
	funcTag = '[object Function]',
	mapTag = '[object Map]',
	numberTag = '[object Number]',
	objectTag = '[object Object]',
	regexpTag = '[object RegExp]',
	setTag = '[object Set]',
	stringTag = '[object String]',
	weakMapTag = '[object WeakMap]';

const arrayBufferTag = '[object ArrayBuffer]',
	dataViewTag = '[object DataView]',
	float32Tag = '[object Float32Array]',
	float64Tag = '[object Float64Array]',
	int8Tag = '[object Int8Array]',
	int16Tag = '[object Int16Array]',
	int32Tag = '[object Int32Array]',
	uint8Tag = '[object Uint8Array]',
	uint8ClampedTag = '[object Uint8ClampedArray]',
	uint16Tag = '[object Uint16Array]',
	uint32Tag = '[object Uint32Array]';

const typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

const objectProto = Object.prototype;

const objectToString = objectProto.toString;









/**
 * Проверяет, является ли значение value типизированным массивом
 * 
 * @param value проверяемое значение
 */
export function isTypedArray(value: any): boolean
{
	return isObjectLike(value) && isLength(value && value.length) && !!typedArrayTags[objectToString.call(value)];
}