let MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Проверяет, является ли значение value допустимым индексом массива
 * @param value проверяемое значение
 */
export function isLength(value) {
    return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
