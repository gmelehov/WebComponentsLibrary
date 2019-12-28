import { isNil } from "./isNil.js";
/**
 * Создает и возвращает расширенное пользовательское событие, заданное параметрами.
 * Дальнейшие решения о запуске и маршрутизации события принимает объект-"заказчик"
 *
 * @param evtype тип пользовательского события
 * @param det опциональная информация, передаваемая вместе с событием
 * @param bubbles параметр bubbles
 */
export function composeCustomEvent(evtype, det, bubbles, cancelable) {
    if (!det)
        det = {};
    if (bubbles === undefined || bubbles === null)
        bubbles = true;
    let ev = new CustomEvent(evtype.toString(), { bubbles: bubbles, detail: det });
    Object.defineProperty(ev, "composed", { value: true });
    if (!isNil(cancelable))
        Object.defineProperty(ev, "cancelable", { value: cancelable });
    return ev;
}
