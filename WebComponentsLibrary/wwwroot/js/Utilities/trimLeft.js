/**
 * Удаляет все начальные пробельные символы из строки, заданной параметром str.
 * Возвращает результирующую строку.
 * @param str исходная строка
 */
export function trimLeft(str) {
    return str.replace(/^\s+/, '');
}
