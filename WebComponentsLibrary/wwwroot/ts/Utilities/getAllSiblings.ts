




export function getAllSiblings<T>(array: ArrayLike<T>, value: T): Array<T>
{
	let i = Array.from(array).indexOf(value);
	return i >= 0 ? Array.from(array).slice(0, i).concat(Array.from(array).slice(i + 1)) : [];
}