/**
 * Фильтрует массив в соответствии с заданным предикатом
 * Возвращает новый массив, содержащий отфильтрованные элементы
 * @param array исходный массив/массивоподобный объект
 * @param predicate предикат для фильтрации значений массива
 */
export declare function findItems<T>(array: ArrayLike<T>, predicate: (...args: any[]) => any): Array<T>;
