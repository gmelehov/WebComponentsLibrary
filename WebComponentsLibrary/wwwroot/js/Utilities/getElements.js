import { isVoid } from "./isVoid.js";
import { findElement } from "./findElement.js";
export function getElements(root, selector) {
    let arr = new Array();
    if (typeof root === 'string') {
        selector = root;
        root = document;
    }
    if (isVoid(selector)) {
        if (root instanceof HTMLDocument) {
            arr.push(findElement(root.body, selector));
            return arr;
        }
        ;
        if (root instanceof Element) {
            arr.push(findElement(root, selector));
            return arr;
        }
        ;
    }
    ;
    root["queryAllEffectiveChildren"] ? arr.push(...root["queryAllEffectiveChildren"](selector)) : arr.push(...root.querySelectorAll(selector));
    return arr;
}
