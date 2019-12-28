import { stringToPath } from "./stringToPath.js";
/**
 * Приводит значение value к path array
 * @param value приводимое значение
 */
export function castPath(value) {
    return Array.isArray(value) ? value : stringToPath(value);
}
