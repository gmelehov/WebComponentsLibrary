/**
 * Находит целевой объект, заданный селектором, ссылкой или глобальной переменной.
 *
 * @param {HTMLElement | Element | Node | string} target селектор, ссылка или глобальная переменная.
 * @returns {HTMLElement | Element | Node}
 */
export function findTarget(target) {
    if (target instanceof HTMLElement || target instanceof Element || target instanceof Node)
        return target;
    return document.getElementById(target) || document.querySelector(target) || window[target] || null;
}
