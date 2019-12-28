import { toSource } from "./toSource.js";
export var enumTags;
(function (enumTags) {
    enumTags[enumTags["mapTag"] = 0] = "mapTag";
    enumTags[enumTags["objectTag"] = 1] = "objectTag";
    enumTags[enumTags["promiseTag"] = 2] = "promiseTag";
    enumTags[enumTags["setTag"] = 3] = "setTag";
    enumTags[enumTags["weakMapTag"] = 4] = "weakMapTag";
    enumTags[enumTags["dataViewTag"] = 5] = "dataViewTag";
    enumTags[enumTags["argsTag"] = 6] = "argsTag";
    enumTags[enumTags["arrayTag"] = 7] = "arrayTag";
    enumTags[enumTags["boolTag"] = 8] = "boolTag";
    enumTags[enumTags["dateTag"] = 9] = "dateTag";
    enumTags[enumTags["errorTag"] = 10] = "errorTag";
    enumTags[enumTags["funcTag"] = 11] = "funcTag";
    enumTags[enumTags["genTag"] = 12] = "genTag";
    enumTags[enumTags["numberTag"] = 13] = "numberTag";
    enumTags[enumTags["regexpTag"] = 14] = "regexpTag";
    enumTags[enumTags["stringTag"] = 15] = "stringTag";
    enumTags[enumTags["symbolTag"] = 16] = "symbolTag";
    enumTags[enumTags["arrayBufferTag"] = 17] = "arrayBufferTag";
    enumTags[enumTags["float32Tag"] = 18] = "float32Tag";
    enumTags[enumTags["float64Tag"] = 19] = "float64Tag";
    enumTags[enumTags["int8Tag"] = 20] = "int8Tag";
    enumTags[enumTags["int16Tag"] = 21] = "int16Tag";
    enumTags[enumTags["int32Tag"] = 22] = "int32Tag";
    enumTags[enumTags["uint8Tag"] = 23] = "uint8Tag";
    enumTags[enumTags["uint8ClampedTag"] = 24] = "uint8ClampedTag";
    enumTags[enumTags["uint16Tag"] = 25] = "uint16Tag";
    enumTags[enumTags["uint32Tag"] = 26] = "uint32Tag";
    enumTags[enumTags["htmlElement"] = 27] = "htmlElement";
    enumTags[enumTags["shadowRoot"] = 28] = "shadowRoot";
})(enumTags || (enumTags = {}));
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
const dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
export function str2tag(tag) {
    return tags[tag];
}
function _get_tag(value) {
    return str2tag(objectToString.call(value));
}
export let getTag = function (value) {
    return _get_tag(value);
};
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != enumTags.dataViewTag) ||
    (Map && getTag(new Map) != enumTags.mapTag) ||
    (Promise && getTag(Promise.resolve()) != enumTags.promiseTag) ||
    (Set && getTag(new Set) != enumTags.setTag) ||
    (WeakMap && getTag(new WeakMap) != enumTags.weakMapTag)) {
    getTag = function (value) {
        let result = _get_tag(value), Ctor = result == enumTags.objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : undefined;
        if (ctorString) {
            switch (ctorString) {
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
