import { isVoid } from "./isVoid.js";
import { findElement } from "./findElement.js";
export function getElement(root, selector) {
    if (typeof root === 'string') {
        selector = root;
        root = document;
    }
    if (isVoid(selector)) {
        if (root instanceof HTMLDocument)
            return findElement(root.body, selector);
        if (root instanceof Element)
            return findElement(root, selector);
    }
    ;
    return root[root['queryEffectiveChildren'] ? 'queryEffectiveChildren' : 'querySelector'](selector) || undefined;
}
