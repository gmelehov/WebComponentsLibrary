import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
import { ZOverlay } from '../ZOverlay/ZOverlay.js';
import { ZOption } from '../ZOption/ZOption.js';
/**
 * Вложенное (подчиненное) меню
 * @customElement
 * @polymer
 */
export declare class ZSubmenu extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /** Основная иконка, отображаемая перед текстом подменю */
    icon: string;
    /** Отображаемый текст подменю */
    name: string;
    /** состояние элемента "отображается"/"не отображается" */
    showed: boolean;
    get zopt(): ZOption;
    get zolay(): ZOverlay;
    /** Позиционирует элемент относительно своего переключателя */
    align(): void;
    /** Скрывает элемент */
    hide(): void;
    /** Отображает элемент */
    show(): void;
    /** Переключает режим видимости элемента */
    toggle(): void;
    handleShow(ev: CustomEvent): void;
}
