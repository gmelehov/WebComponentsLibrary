



/**
 * Добавляет элементы массива values к массиву array
 * Возвращает исходный массив array, дополненный элементами из массива values
 * @param array исходный массив
 * @param values добавляемый массив
 */
export function arrayPush<T>(array: Array<T>, values: Array<T>): Array<T>
{
	let index = -1,
		length = values.length,
		offset = array.length;

	while (++index < length)
		array[offset + index] = values[index];

	return array;
}