import { baseGet } from "./baseGet.js";







/**
 * Возвращает значение свойства объекта по заданному пути
 * @param obj проверяемый объект
 * @param path проверяемый путь
 * @param defaultValue значение по умолчанию, возвращаемое для найденных значений undefined
 */
export function get(obj: any, path: string | string[], defaultValue?: any)
{
	const result = obj === null ? undefined : baseGet(obj, path);

	return result === undefined ? defaultValue : result;
}