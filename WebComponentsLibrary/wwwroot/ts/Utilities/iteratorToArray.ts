






/**
 * Конвертирует итератор в массив
 * 
 * @param iterator исходный итератор
 */
export function iteratorToArray<T>(iterator: Iterator<T>): Array<T>
{
	let data: IteratorResult<T>;
	const result: T[] = [];

	while (!(data = iterator.next()).done)
		result.push(data.value);

	return result;
}