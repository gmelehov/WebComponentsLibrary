import { toSource } from "./toSource.js";




export enum enumTags
{
	mapTag,
	objectTag,
	promiseTag,
	setTag,
	weakMapTag,
	dataViewTag,

	argsTag,
	arrayTag,
	boolTag,
	dateTag,
	errorTag,
	funcTag,
	genTag,
	numberTag,
	regexpTag,
	stringTag,
	symbolTag,

	arrayBufferTag,
	float32Tag,
	float64Tag,
	int8Tag,
	int16Tag,
	int32Tag,
	uint8Tag,
	uint8ClampedTag,
	uint16Tag,
	uint32Tag,


	htmlElement,
	shadowRoot,



}

const tags = {
	'[object Map]': enumTags.mapTag,
	'[object Object]': enumTags.objectTag,
	'[object Promise]': enumTags.promiseTag,
	'[object Set]': enumTags.setTag,
	'[object WeakMap]': enumTags.weakMapTag,
	'[object DataView]': enumTags.dataViewTag,

	'[object Arguments]': enumTags.argsTag,
	'[object Array]': enumTags.arrayTag,
	'[object Boolean]': enumTags.boolTag,
	'[object Date]': enumTags.dateTag,
	'[object Error]': enumTags.errorTag,
	'[object Function]': enumTags.funcTag,
	'[object GeneratorFunction]': enumTags.genTag,
	'[object Number]': enumTags.numberTag,
	'[object RegExp]': enumTags.regexpTag,
	'[object String]': enumTags.stringTag,
	'[object Symbol]': enumTags.symbolTag,

	'[object ArrayBuffer]': enumTags.arrayBufferTag,
	'[object Float32Array]': enumTags.float32Tag,
	'[object Float64Array]': enumTags.float64Tag,
	'[object Int8Array]': enumTags.int8Tag,
	'[object Int16Array]': enumTags.int16Tag,
	'[object Int32Array]': enumTags.int32Tag,
	'[object Uint8Array]': enumTags.uint8Tag,
	'[object Uint8ClampedArray]': enumTags.uint8ClampedTag,
	'[object Uint16Array]': enumTags.uint16Tag,
	'[object Uint32Array]': enumTags.uint32Tag,

	'[object HTMLElement]': enumTags.htmlElement,
	'[object ShadowRoot]': enumTags.shadowRoot,



};



const objectToString = Object.prototype.toString;


const	dataViewCtorString = toSource(DataView),
		mapCtorString = toSource(Map),
		promiseCtorString = toSource(Promise),
		setCtorString = toSource(Set),
		weakMapCtorString = toSource(WeakMap);






export function str2tag(tag: string)
{
	return tags[tag] as enumTags;
}



function _get_tag(value: any)
{
	return str2tag(objectToString.call(value));
}


export let getTag = function (value: any)
{
	return _get_tag(value);
}


if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != enumTags.dataViewTag) ||
	(Map && getTag(new Map) != enumTags.mapTag) ||
	(Promise && getTag(Promise.resolve()) != enumTags.promiseTag) ||
	(Set && getTag(new Set) != enumTags.setTag) ||
	(WeakMap && getTag(new WeakMap) != enumTags.weakMapTag))
{
	getTag = function (value)
	{
		let result = _get_tag(value),
			Ctor = result == enumTags.objectTag ? value.constructor : undefined,
			ctorString = Ctor ? toSource(Ctor) : undefined;

		if (ctorString)
		{
			switch (ctorString)
			{
				case dataViewCtorString: return enumTags.dataViewTag;
				case mapCtorString: return enumTags.mapTag;
				case promiseCtorString: return enumTags.promiseTag;
				case setCtorString: return enumTags.setTag;
				case weakMapCtorString: return enumTags.weakMapTag;
			}
		}
		return result;
	};
}



//export getTag;
