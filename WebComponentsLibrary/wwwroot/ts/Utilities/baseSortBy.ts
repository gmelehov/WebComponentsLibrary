import { isNil } from './isNil.js';
import { isDateLike } from './isDateLike.js';
import { toDate } from './toDate.js';







/**
 * Вспомогательная функция сортировки значений a и b по ключу prop
 * @param a первое сравниваемое значение
 * @param b второе сравниваемое значение
 * @param prop сравниваемое свойство (ключ); если параметр не задан, равен null или пустой строке, сравнение будет производиться по значениям a и b
 * @param ascending если true или не указано, то сортируем по возрастанию; если false - сортируем по убыванию
 */
export function baseSortBy(a: any, b: any, prop?: string, ascending?: boolean)
{
	if (isNil(ascending))
		ascending = true;

	let _a = (prop) ? a[prop] : a;
	let _b = (prop) ? b[prop] : b;

	if ((_a === null || _a === undefined) || (_b === null || _b === undefined))
		return;

	if (isFinite(+_a) && isFinite(+_b))
	{
		_a = +_a;
		_b = +_b;
	};

	if (isDateLike(_a) && isDateLike(_b))
	{
		_a = toDate(_a);
		_b = toDate(_b);
	};



	if (_a > _b)
		return (ascending) ? 1 : -1;

	if (_a < _b)
		return (ascending) ? -1 : 1;

	if (_a === _b)
		return 0;
}