







/**
 * Конвертирует набор в массив
 * 
 * @param set исходный набор значений
 */
export function setToArray<T>(set: Set<T>): Array<T>
{
	let index = -1;
	const result: T[] = Array(set.size);

	set.forEach(function (value)
	{
		result[++index] = value;
	});

	return result;
}