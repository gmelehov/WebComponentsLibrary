import { changePolymerElementTemplate } from './changePolymerElementTemplate.js';
/**
 *
 * @param base
 * @param templ
 */
export function createPolymerElement(base, templ) {
    let ret = new base();
    changePolymerElementTemplate(ret, templ);
    ret.ready();
    return ret;
}
