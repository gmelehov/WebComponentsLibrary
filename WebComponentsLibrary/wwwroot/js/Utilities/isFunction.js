import { isVoid } from "./isVoid.js";
import { xor } from "./xor.js";
import { isObject } from "./isObject.js";
export function isFunction(value, notBound) {
    let funcTag = '[object Function]';
    let genTag = '[object GeneratorFunction]';
    let asyncTag = '[object AsyncFunction]';
    let objectProto = Object.prototype;
    let objectToString = objectProto.toString;
    let tag = isObject(value) ? objectToString.call(value) : '';
    let _isFunc = (tag === funcTag || tag === genTag || tag === asyncTag);
    return _isFunc && (isVoid(notBound) || xor(value.name.startsWith('bound '), notBound));
}
