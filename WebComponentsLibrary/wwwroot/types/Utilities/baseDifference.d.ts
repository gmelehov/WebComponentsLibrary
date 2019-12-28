/**
 * Базовая реализация метода для поиска отличий между элементами двух массивов
 * Возвращает новый отфмльтрованный массив
 * @param array исходный (проверяемый) массив
 * @param values список исключаемых из первого массива значений
 */
export declare function baseDifference<T>(array: Array<T>, values: Array<T>): Array<T>;
