import { castPath } from "./castPath.js";
import { isKey } from "./isKey.js";
import { toKey } from "./toKey.js";
/**
 * Базовая реализация метода get, без поддержки значений по умолчанию
 * @param obj проверяемый объект
 * @param path проверяемый путь к свойству объекта
 */
export function baseGet(obj, path) {
    const arr_path = isKey(path, obj) ? [path] : castPath(path);
    let index = 0;
    const length = arr_path.length;
    while (obj !== null && index < length)
        obj = obj[toKey(arr_path[index++])];
    return (index && index === length) ? obj : undefined;
}
