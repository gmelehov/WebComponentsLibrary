import { toArray } from "./toArray.js";





/**
 * Фильтрует массив в соответствии с заданным предикатом
 * Возвращает новый массив, содержащий отфильтрованные элементы
 * @param array исходный массив/массивоподобный объект
 * @param predicate предикат для фильтрации значений массива
 */
export function findItems<T>(array: ArrayLike<T>, predicate: (...args: any[]) => any): Array<T>
{
	let ret = toArray(array) as Array<T>;
	return ret.filter(predicate);
}