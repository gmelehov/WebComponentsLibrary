




/**
 * Возвращает ближайшего соседа справа для первого найденного в списке array элемента value
 * 
 * getNext([ 1, 2, 3, 4, 5 ], 3)   ==>>   4
 * getNext([ 1, 2, 3, 4, 5 ], 5)   ==>>   undefined
 * 
 * @param array просматриваемый список
 * @param value исходный элемент
 */
export function getNext<T>(array: ArrayLike<T>, value: T): T
{
	let i = Array.from(array).indexOf(value);
	return i >= 0 ? array[i + 1] : undefined;
}