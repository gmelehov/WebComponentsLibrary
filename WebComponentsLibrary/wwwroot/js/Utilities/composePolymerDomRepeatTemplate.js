/**
 *
 * @param model
 * @param templateContent
 */
export function composePolymerDomRepeatTemplate(model, templateContent) {
    let str = '<template is="dom-repeat" ';
    str += (model.id) ? `id="${model.id}" ` : '';
    str += (model.items) ? `items="{{${model.items}}}" ` : 'items="{{items}}" ';
    str += (model.as) ? `as="${model.as}" ` : '';
    str += (model.filter) ? `filter="${model.filter}" ` : '';
    str += (model.observe) ? `observe="${model.observe}" ` : '';
    str += (model.sort) ? `sort="${model.sort}" ` : '';
    str += (model.indexAs) ? `index-as="${model.indexAs}" ` : '';
    str += (model.itemsIndexAs) ? `items-index-as="${model.itemsIndexAs}" ` : '';
    str += 'mutable-data>';
    str += (templateContent) ? templateContent : '';
    str += '</template>';
    let result = document.createElement('template');
    result.innerHTML = str;
    return result.querySelector('template[is=dom-repeat]');
}
