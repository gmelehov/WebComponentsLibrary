import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
/**
 * Набор svg-иконок Material Icons
 * @customElement
 * @polymer
 */
export declare class ZIconSet extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /** Идентификатор элемента */
    id: string;
    /** Стандартный размер иконки */
    iconSize: number;
    /**
     * Возвращает копию SVG-иконки по ее идентификатору
     * @param iconId идентификатор SVG-иконки
     */
    prepareSVGClone(iconId: string): SVGSVGElement;
}
