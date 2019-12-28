import { toArray } from "./toArray.js";
/**
 * Фильтрует массив в соответствии с заданным предикатом
 * Возвращает новый массив, содержащий отфильтрованные элементы
 * @param array исходный массив/массивоподобный объект
 * @param predicate предикат для фильтрации значений массива
 */
export function findItems(array, predicate) {
    let ret = toArray(array);
    return ret.filter(predicate);
}
