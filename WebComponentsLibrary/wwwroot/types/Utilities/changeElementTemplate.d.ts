import { PolymerElement } from "lib/@polymer/polymer/polymer-element.js";
/**
 * Динамически изменяет шаблон элемента.
 * @param elem элемент Polymer.Element, шаблон которого необходимо изменить
 * @param templ новый шаблон в формате HTMLTemplateElement
 */
export declare function changeElementTemplate<T extends PolymerElement>(elem: T, templ: HTMLTemplateElement): void;
