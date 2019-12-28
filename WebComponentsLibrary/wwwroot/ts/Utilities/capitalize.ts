




/**
 * Делает заглавной первую букву указанной строки
 * @param str исходная строка
 */
export function capitalize(str: string): string
{
	let _str = (str) ? `${str.trim()} ` : ' ';
	let ret = `${_str.substr(0, 1).toUpperCase()}${_str.substr(1)}`;
	return ret;
}