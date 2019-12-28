





/**
 * Запускает пользовательское событие
 * @param obj элемент, на котором требуется запустить событие
 * @param ev пользовательское событие
 */
export function fire(obj: Document | HTMLElement | Node | EventTarget, ev: CustomEvent): void
{
	obj.dispatchEvent(ev);
}