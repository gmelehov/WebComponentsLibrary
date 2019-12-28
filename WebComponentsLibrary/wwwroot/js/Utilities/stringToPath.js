import { toString } from './toString.js';
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
const reEscapeChar = /\\(\\)?/g;
/**
 * Конвертирует строку в массив property path
 * @param str исходная строка
 */
export function stringToPath(str) {
    let result = [];
    toString(str).replace(rePropName, function (match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
        return '';
    });
    return result;
}
