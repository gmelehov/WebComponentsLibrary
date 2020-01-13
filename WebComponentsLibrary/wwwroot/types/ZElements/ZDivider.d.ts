import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
/**
 * Элемент-разделитель
 * @customElement
 * @polymer
 */
export declare class ZDivider extends PolymerElement {
    private static get _styleTemplate();
    private static get _htmlTemplate();
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /**
     * Толщина разделительной линии
     */
    size: number;
    /**
     * Цвет разделительной линии
     */
    color: string;
    /**
     * Признак выравнивания разделителя по базовой линии
     * Если true, то разделитель выровнен по базовой линии
     */
    baseline: boolean;
    /**
     * Признак выравнивания разделителя по высоте
     * Если true, то разделитель выровнен по высоте
     */
    cap: boolean;
    /**
     * Обозреватель изменения свойства color
     * @param newval новое значение свойства
     * @param oldval предыдущее значение свойства
     */
    colorChanged(newval: string, oldval: string): void;
    /**
     * Обозреватель изменения свойства baseline
     * @param newVal новое значение свойства
     * @param oldVal предыдущее значение свойства
     */
    baselineChanged(newVal: boolean, oldVal: boolean): void;
    /**
     * Обозреватель изменения свойства cap
     * @param newVal новое значение свойства
     * @param oldVal предыдущее значение свойства
     */
    capChanged(newVal: boolean, oldVal: boolean): void;
}
