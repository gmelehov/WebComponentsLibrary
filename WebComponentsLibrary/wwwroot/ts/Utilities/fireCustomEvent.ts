import { EventType } from "../Enums/enums.js";
import { IDictionary } from "../Interfaces/interfaces.js";
import { composeCustomEvent } from "./composeCustomEvent.js";
import { fire } from "./fire.js";




/**
 * Создает и запускает пользовательское событие
 * @param obj элемент, на котором требуется запустить событие
 * @param evtype тип пользовательского события
 * @param det опциональная информация, передаваемая вместе с событием
 * @param bubbles параметр bubbles
 */
export function fireCustomEvent(obj: Document | HTMLElement | Node | EventTarget, evtype: EventType | string, det?: IDictionary, bubbles?: boolean): void
{
	if (det === undefined || det === null)
		det = {};

	if (bubbles === undefined || bubbles === null)
		bubbles = true;

	fire(obj, composeCustomEvent(evtype, det, bubbles));
}