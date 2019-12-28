import { matches } from "./matches.js";
/**
 * Возвращает ближайшего родителя элемента
 * @param node элемент
 * @param selector селектор искомого родителя
 * @param boundary элемент - верхний ограничитель поиска (искать не выше ограничителя включительно)
 */
export function findParentElement(node, selector, boundary) {
    let result;
    while (node && node !== boundary && !result) {
        if (node.assignedSlot) {
            node = node.assignedSlot.parentElement || node.parentNode || node.host;
        }
        else {
            node = node.host || node.parentNode;
        }
        ;
        result = (node && node.nodeType == 1 && matches(node, selector)) ?
            node
            :
                result;
    }
    ;
    return result;
}
