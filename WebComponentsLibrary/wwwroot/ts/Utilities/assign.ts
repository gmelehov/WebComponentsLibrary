import mixin from "./mixin.js";






interface ObjectAssignConstructor extends ObjectConstructor
{
	assign<T extends {}, U extends {}>(target: T, ...sources: U[]): T & U;
}






export const assign = !!Object.assign ?

	(<ObjectAssignConstructor>Object).assign
	:
	function <T extends {}, U extends {}>(target: T, ...sources: Array<U>): T & U
	{
		return mixin({
			deep: false,
			inherited: false,
			sources: sources,
			target: target
		});
	};




export default assign;