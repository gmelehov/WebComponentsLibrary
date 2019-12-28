import { composeCustomEvent } from "./composeCustomEvent.js";
import { fire } from "./fire.js";
/**
 * Создает и запускает пользовательское событие
 * @param obj элемент, на котором требуется запустить событие
 * @param evtype тип пользовательского события
 * @param det опциональная информация, передаваемая вместе с событием
 * @param bubbles параметр bubbles
 */
export function fireCustomEvent(obj, evtype, det, bubbles) {
    if (det === undefined || det === null)
        det = {};
    if (bubbles === undefined || bubbles === null)
        bubbles = true;
    fire(obj, composeCustomEvent(evtype, det, bubbles));
}
