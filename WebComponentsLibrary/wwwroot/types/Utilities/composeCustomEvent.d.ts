import { EventType } from "../Enums/enums.js";
import { IDictionary } from "../Interfaces/interfaces.js";
/**
 * Создает и возвращает расширенное пользовательское событие, заданное параметрами.
 * Дальнейшие решения о запуске и маршрутизации события принимает объект-"заказчик"
 *
 * @param evtype тип пользовательского события
 * @param det опциональная информация, передаваемая вместе с событием
 * @param bubbles параметр bubbles
 */
export declare function composeCustomEvent(evtype: EventType | string, det?: IDictionary, bubbles?: boolean, cancelable?: boolean): CustomEvent;
