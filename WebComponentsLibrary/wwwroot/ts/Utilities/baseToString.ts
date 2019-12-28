import { isSymbol } from "./isSymbol.js";


const INFINITY = 1 / 0;

const	symbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : undefined,
		symbolToString = symbolProto ? symbolProto.toString : undefined;






/**
 * Базовая реализация метода toString
 * Не конвертирует значения null в пустые строки
 * @param value конвертируемое значение
 */
export function baseToString(value: any): string
{
	if (typeof value === 'string')
		return value;

	if (isSymbol(value))
		return symbolToString ? symbolToString.call(value) : '';

	const result = (value + '');

	return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result;
}
