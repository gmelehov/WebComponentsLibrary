


/**
 * Удаляет все начальные пробельные символы из строки, заданной параметром str.
 * Возвращает результирующую строку.
 * @param str исходная строка
 */
export function trimLeft(str: string): string
{
	return str.replace(/^\s+/, '');
}