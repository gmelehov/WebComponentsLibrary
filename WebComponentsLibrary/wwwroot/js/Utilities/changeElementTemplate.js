/**
 * Динамически изменяет шаблон элемента.
 * @param elem элемент Polymer.Element, шаблон которого необходимо изменить
 * @param templ новый шаблон в формате HTMLTemplateElement
 */
export function changeElementTemplate(elem, templ) {
    let _instance = elem._stampTemplate(templ);
    if (!elem.shadowRoot)
        elem.attachShadow({ mode: 'open', delegatesFocus: true });
    elem.shadowRoot.innerHTML = '';
    setTimeout(() => { elem.shadowRoot.appendChild(_instance); }, 0);
}
