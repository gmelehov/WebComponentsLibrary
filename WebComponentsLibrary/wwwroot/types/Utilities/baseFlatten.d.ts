/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 * Базовая реализация метода flatten с поддержкой условия выполнения
 *
 * @param array исходный массив
 * @param depth максимальная глубина рекурсии
 * @param predicate вызываемая при выполнении функция
 * @param isStrict выполнять только для значений, удовлетворяющих предикату predicate
 */
export declare function baseFlatten(array: any[], depth: number, predicate?: (value: any) => boolean, isStrict?: boolean): Array<any>;
