/**
 * Конвертирует итератор в массив
 *
 * @param iterator исходный итератор
 */
export function iteratorToArray(iterator) {
    let data;
    const result = [];
    while (!(data = iterator.next()).done)
        result.push(data.value);
    return result;
}
