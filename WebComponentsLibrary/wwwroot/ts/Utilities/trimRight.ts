


/**
 * Удаляет все конечные пробельные символы из строки, заданной параметром str.
 * Возвращает результирующую строку.
 * @param str исходная строка
 */
export function trimRight(str: string): string
{
	return str.replace(/\s+$/, '');
}