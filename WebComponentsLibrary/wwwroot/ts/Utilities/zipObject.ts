


/**
 * Возвращает объект, ключи которого перечислены в первом списке, а значения - во втором
 * @param props список ключей
 * @param values список значений
 */
export function zipObject(props: ArrayLike<any>, values: ArrayLike<any>)
{
	return Array.from(props).reduce((result, key, i) => { result[key] = values[i]; return result; }, Object.create(null));
}