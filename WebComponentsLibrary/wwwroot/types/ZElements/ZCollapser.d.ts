import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
export declare class ZCollapser extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    name: string;
    opened: boolean;
    /** Опциональная иконка, отображаемая перед текстом подзаголовка */
    icon: string;
    /** Относительные размеры основной иконки, отображаемой перед текстом опции */
    iconSize: number;
    /** Относительные размеры подзаголовка */
    size: number;
    weight: number;
    /** Высота подзаголовка в пикселях */
    h: number;
    /** Цвет подзаголовка */
    color: string;
    get details(): {
        id: string;
        name: string;
        opened: boolean;
        icon: string;
        iconSize: number;
        size: number;
        h: number;
        color: string;
    };
    openedChanged(newval: boolean, oldval: boolean): void;
    setSubheaderUnderlined(val: boolean): void;
}
