import { EventType } from "../Enums/enums.js";
import { IDictionary } from "../Interfaces/interfaces.js";
/**
 * Создает и запускает пользовательское событие
 * @param obj элемент, на котором требуется запустить событие
 * @param evtype тип пользовательского события
 * @param det опциональная информация, передаваемая вместе с событием
 * @param bubbles параметр bubbles
 */
export declare function fireCustomEvent(obj: Document | HTMLElement | Node | EventTarget, evtype: EventType | string, det?: IDictionary, bubbles?: boolean): void;
