import { setStyle } from "./setStyle.js";
export function setStyles(element, styles) {
    Object.keys(styles).forEach(name => { setStyle(element, name, styles[name]); });
    return element;
}
