export function removeStyle(element, name) {
    element.style[name] = null;
    return element;
}
