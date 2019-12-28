



/**
 * Проверяет вхождение элемента value в массив array
 * Возвращает true, если элемент найден; возвращает false в обратном случае
 * @param array проверяемый массив
 * @param value искомое значение
 */
export function arrayIncludes<T>(array: T[], value: T): boolean
{
	let length = array ? array.length : 0;
	return !!length && array.indexOf(value, 0) > -1;
}