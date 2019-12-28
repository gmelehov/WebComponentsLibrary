/**
 * Возвращает ближайшего соседа справа для первого найденного в списке array элемента value
 *
 * getNext([ 1, 2, 3, 4, 5 ], 3)   ==>>   4
 * getNext([ 1, 2, 3, 4, 5 ], 5)   ==>>   undefined
 *
 * @param array просматриваемый список
 * @param value исходный элемент
 */
export declare function getNext<T>(array: ArrayLike<T>, value: T): T;
