import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
export declare class ZExpandable extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    opened: boolean;
    toggle(): void;
}
