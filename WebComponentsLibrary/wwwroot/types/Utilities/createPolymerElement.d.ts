import { PolymerElement } from 'lib/@polymer/polymer/polymer-element.js';
/**
 *
 * @param base
 * @param templ
 */
export declare function createPolymerElement<T extends PolymerElement>(base: {
    new (...args: any[]): T;
}, templ: HTMLTemplateElement): T;
