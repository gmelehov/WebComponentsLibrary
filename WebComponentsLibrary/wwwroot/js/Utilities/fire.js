/**
 * Запускает пользовательское событие
 * @param obj элемент, на котором требуется запустить событие
 * @param ev пользовательское событие
 */
export function fire(obj, ev) {
    obj.dispatchEvent(ev);
}
