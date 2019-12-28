import { toFinite } from './toFinite.js';
/**
 * Конвертирует значение value в число integer
 *
 * @param value исходное значение
 */
export function toInteger(value) {
    const result = toFinite(value), remainder = result % 1;
    return result === result ? (remainder ? result - remainder : result) : 0;
}
