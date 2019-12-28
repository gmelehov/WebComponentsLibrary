import { isNil } from './isNil.js';
import { baseSortBy } from './baseSortBy.js';







/**
 * Сортирует элементы массива array по возрастанию/убыванию значения свойства prop
 * @param array сортируемый массив
 * @param prop сравниваемое свойство (ключ)
 * @param ascending если true или не указано, то сортируем по возрастанию; если false - сортируем по убыванию
 */
export function sortBy<T>(array: Array<T>, prop: string, ascending?: boolean): Array<T>
{
	if (isNil(ascending))
		ascending = true;

	if (Array.isArray(array))
		array.sort((a, b) => baseSortBy(a, b, prop, ascending));

	return array;
}