import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
/**
 * Элемент-подзаголовок
 * @customElement
 * @polymer
 */
export declare class ZSubheader extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /** Текст подзаголовка */
    label: string;
    /** Опциональная иконка, отображаемая перед текстом подзаголовка */
    icon: string;
    /** Визуальные размеры подзаголовка */
    size: number;
    weight: number;
    /** Размер иконки, отображаемой слева от текста подзаголовка */
    iconSize: number;
    /** Высота подзаголовка в пикселях */
    h: number;
    /** Цвет подзаголовка */
    color: string;
    underlined: boolean;
    /**
     * Обозреватель изменения цвета подзаголовка
     * @param newVal новое значение цвета
     * @param oldVal предыдущее значение цвета
     */
    colorChanged(newVal: string, oldVal: string): void;
}
