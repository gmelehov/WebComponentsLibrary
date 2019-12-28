import { PolymerElement } from 'lib/@polymer/polymer/polymer-element.js';
import { changePolymerElementTemplate } from './changePolymerElementTemplate.js';





/**
 * 
 * @param base
 * @param templ
 */
export function createPolymerElement<T extends PolymerElement>(base: { new(...args: any[]): T; }, templ: HTMLTemplateElement): T
{
  let ret = new base();
  changePolymerElementTemplate(ret, templ);
  ret.ready();
  return ret;
}