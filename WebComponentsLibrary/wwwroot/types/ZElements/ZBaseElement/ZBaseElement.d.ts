import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
/** Базовый компонент с поддержкой динамического обновления собственного шаблона */
export declare class ZBaseElement extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /** Путь к файлу, содержащему определения стилей для этого компонента. */
    stylesSrc: string;
    /** Путь к файлу, содержащему HTML-разметку для этого элемента. */
    domSrc: string;
    updateSelfTemplate(styles?: string, dom?: string): Promise<void>;
}
