import { PolymerElement } from "lib/@polymer/polymer/polymer-element.js";






/**
 * Динамически изменяет шаблон элемента.
 * @param elem элемент Polymer.Element, шаблон которого необходимо изменить
 * @param templ новый шаблон в формате HTMLTemplateElement
 */
export function changeElementTemplate<T extends PolymerElement>(elem: T, templ: HTMLTemplateElement): void
{
	let _instance = elem._stampTemplate(templ);
	if (!elem.shadowRoot)
		elem.attachShadow({ mode: 'open', delegatesFocus: true });

	elem.shadowRoot.innerHTML = '';
	setTimeout(() => { elem.shadowRoot.appendChild(_instance); }, 0);
}