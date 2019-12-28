import { arrayIncludes } from "./arrayIncludes.js";


const LARGE_ARRAY_SIZE = 200;





/**
 * Базовая реализация метода для поиска отличий между элементами двух массивов
 * Возвращает новый отфмльтрованный массив
 * @param array исходный (проверяемый) массив
 * @param values список исключаемых из первого массива значений
 */
export function baseDifference<T>(array: Array<T>, values: Array<T>): Array<T>
{
	let index = -1;
	let isCommon = true;
	const length = array && array.length;
	let result: Array<T> = [];
	const valuesLength = values.length;
	const vs = new Set<T>(values);

	if (!length)
	{
		return result;
	}
	else if (values.length >= LARGE_ARRAY_SIZE)
	{
		isCommon = false;
	};

	outer:
	while (++index < length)
	{
		const value = array[index];
		if (isCommon)
		{
			if (isCommon && value === value)
			{
				let valuesIndex = valuesLength;
				while (valuesIndex--)
					if (values[valuesIndex] === value)
						continue outer;

				result.push(value);
			}
			else if (!arrayIncludes(values, value))
			{
				result.push(value);
			};
		}
		else if (!vs.has(value))
		{
			result.push(value);
		};
	};

	return result;
}