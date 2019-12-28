import { Primitive, FuncPredicate } from "../Interfaces/interfaces.js";
import { ifEquals } from "./logicUtils.js";






export const checkComplexRegexp = (input: string, mustMatch: Array<string>, mustNotMatch?: Array<string>): boolean =>
{

	let _matches = mustMatch.every(m => { return new RegExp(m).test(input) });

	let _notMatches = (mustNotMatch && mustNotMatch.length) ? mustNotMatch.every(n => { return !(new RegExp(n).test(input)) }) : true;

	return (_matches && _notMatches);
}