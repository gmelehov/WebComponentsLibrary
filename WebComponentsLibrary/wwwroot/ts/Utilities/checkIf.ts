import { Primitive, FuncPredicate } from "../Interfaces/interfaces.js";
import { ifEquals } from "./logicUtils.js";







export const checkIf = (el: any, prop: Primitive, val: Primitive, func?: FuncPredicate) =>
{
	if (!func)
		func = ifEquals;

	if (el && el[prop.toString()])
	{
		return func(el[prop.toString()], val) === true
	}
	else if (!el || !(el[prop.toString()]))
	{
		return func(prop, val) === true
	}
	else { return false };
}