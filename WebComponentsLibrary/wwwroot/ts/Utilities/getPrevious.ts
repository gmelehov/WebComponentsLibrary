






export function getPrevious<T>(array: ArrayLike<T>, value: T): T
{
	let i = Array.from(array).indexOf(value);
	return i >= 0 ? array[i - 1] : undefined;
}