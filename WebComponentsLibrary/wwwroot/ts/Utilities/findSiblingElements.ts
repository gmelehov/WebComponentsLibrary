import { getAllSiblings } from "./getAllSiblings.js";






export function findSiblingElements(node: Element, predicate: (...args: any[]) => any | string): Array<Element>
{
  return getAllSiblings(node.parentNode.children, node).filter(predicate);
}