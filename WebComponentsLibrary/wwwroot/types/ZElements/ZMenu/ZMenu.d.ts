import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
import { OverlayPosition } from '../../Enums/enums.js';
/**
 * Меню
 * @customElement
 * @polymer
 */
export declare class ZMenu extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    id: string;
    target: string;
    /** box-shadow */
    z: number;
    /** максимальная высота элемента, измеряемая в количестве отображаемых опций */
    size: number;
    /** состояние элемента "отображается"/"не отображается" */
    showed: boolean;
    overlay: OverlayPosition;
    hAlign: string;
    /** Позиционирует элемент относительно своего переключателя */
    align(): void;
    /** Скрывает элемент */
    hide(): void;
    /** Отображает элемент */
    show(): void;
    /** Переключает режим видимости элемента */
    toggle(): void;
    /**
     *
     * @param now
     * @param before
     */
    zChanged(now: number, before: number): void;
    /**
     *
     * @param now
     * @param before
     */
    sizeChanged(now: number, before: number): void;
    /**
     *
     * @param now
     * @param before
     */
    showedChanged(now: boolean, before: boolean): void;
    handleHide(e: Event): void;
    handleResize(event: Event): void;
    handleOptionActivated(ev: CustomEvent): void;
}
