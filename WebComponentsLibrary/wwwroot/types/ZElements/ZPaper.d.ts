import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
/**
 * Material Paper
 * @customElement
 * @polymer
 */
export declare class ZPaper extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    padding: number;
    bColor: string;
    z: number;
    bColorChanged(now: string, before: string): void;
}
