import { isArguments } from "../Utilities/isArguments.js";
/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 * Базовая реализация метода flatten с поддержкой условия выполнения
 *
 * @param array исходный массив
 * @param depth максимальная глубина рекурсии
 * @param predicate вызываемая при выполнении функция
 * @param isStrict выполнять только для значений, удовлетворяющих предикату predicate
 */
export function baseFlatten(array, depth, predicate, isStrict = false) {
    let index = -1, length = array.length;
    predicate || (predicate = isFlattenable);
    let result = [];
    while (++index < length) {
        let value = array[index];
        if (depth > 0 && predicate(value)) {
            result = result.concat(depth > 1 ? baseFlatten(value, depth - 1, predicate, isStrict) : value);
        }
        else if (!isStrict) {
            result[result.length] = value;
        }
        ;
    }
    return result;
}
function isFlattenable(value) {
    return Array.isArray(value) || isArguments(value);
}
