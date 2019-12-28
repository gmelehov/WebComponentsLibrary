import { getTag, enumTags } from "./getTag.js";







export function getEnumTag(value: any): string
{
	let ret = getTag(value);
	return enumTags[ret];
}