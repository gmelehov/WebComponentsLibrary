export function setStyle(element, name, value) {
    element.style[name] = (value) ? value.toString() : null;
    return element;
}
