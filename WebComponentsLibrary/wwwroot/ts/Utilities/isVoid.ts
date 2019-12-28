



/**
 * Проверяет, является ли значение {@link value}
 * {@link undefined}, {@link null} или {@link NaN}
 * 
 * @param value проверяемое значение
 * @returns {Boolean}
 */
export function isVoid(value: any): boolean
{
	return value === undefined || value === null || Number.isNaN(value);
}