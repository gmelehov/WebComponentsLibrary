import { getTag, enumTags } from "./getTag.js";
export function getEnumTag(value) {
    let ret = getTag(value);
    return enumTags[ret];
}
