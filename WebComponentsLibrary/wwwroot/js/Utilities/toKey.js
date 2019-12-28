import { isSymbol } from "./isSymbol.js";
const INFINITY = 1 / 0;
/**
 * Конвертирует значение value к строковому ключу, если тип значения value не string и не symbol
 * @param value конвертируемое значение
 */
export function toKey(value) {
    if (typeof value === 'string' || isSymbol(value))
        return value;
    const result = (value + '');
    return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result;
}
