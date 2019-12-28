import { html } from '../../lib/@polymer/polymer/polymer-element.js';





/**
 * Читает содержимое HTML-шаблонов из указанного массива,
 * объединяет его в один HTML-шаблон и возвращает его в качестве результата
 * 
 * @param array массив HTML-шаблонов, который необходимо объединить в один шаблон
 * @returns {HTMLTemplateElement}
 */
export function mergeHTMLTemplates(array: HTMLTemplateElement[]): HTMLTemplateElement
{
  let result = html``;
  array.forEach(f => result.content.appendChild(f.content));
  return result;
}