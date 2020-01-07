import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
import { RippleDensity } from '../../Interfaces/interfaces.js';
/**
 *
 * @customElement
 * @polymer
 */
export declare class ZRipple extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    ready(): void;
    disconnectedCallback(): void;
    /**
     * При установке в true распространение эффекта ripple будет происходить волнообразно от центра элемента
     * При установке в false (по умолчанию) распространение эффекта ripple будет происходить волнообразно от точки контакта (прикосновения, клика мышкой и т.п.) с элементом
     */
    autoCenter: boolean;
    /**
     * Значение, равное true показывает, что эффект в данный момент визуализируется
     * Значение, равное false (по умолчанию) показывает, что эффект в данный момент не визуализируется
     */
    active: boolean;
    pressed: boolean;
    /**
     * При установке в true отключает эффект
     * При установке в false (по умолчанию) включает эффект
     */
    noTap: boolean;
    /** Цвет элемента */
    color: string;
    /** Интенсивность эффекта, применяемого к элементу */
    density: RippleDensity;
    /** Timestamp последнего расчета эффекта */
    rippleTs: number;
    /**
     * Обозреватель изменения цвета элемента
     * @param newVal новое значение цвета
     * @param oldVal предыдущее значение цвета
     */
    colorChanged(newVal: string, oldVal: string): void;
    ripple(startX: number, startY: number): void;
    smooth(force?: boolean): void;
    /**
     * Обработчик touch-событий
     * @param event touch-событие
     */
    handleTouch(event: MouseEvent): void;
}
