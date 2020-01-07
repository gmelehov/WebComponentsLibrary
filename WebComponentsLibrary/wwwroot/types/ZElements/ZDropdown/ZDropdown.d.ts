import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
import { OverlayPosition } from '../../Enums/enums.js';
/** Выпадающий список */
export declare class ZDropdown extends PolymerElement {
    static get template(): HTMLTemplateElement;
    static get styleTemplate(): HTMLTemplateElement;
    static get domTemplate(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /** Идентификатор элемента */
    id: string;
    /** Текстовая метка, относящаяся к элементу */
    label: string;
    /** Наименование выбранной в настоящий момент опции */
    name: string;
    /** Значение выбранной в настоящий момент опции */
    val: string;
    /** Иконка выбранной в настоящий момент опции */
    icon: string;
    /** Цвет иконки выбранной в настоящий момент опции */
    color: string;
    /** Максимальная высота раскрывающегося списка опций (максимальное количество одновременно отображаемых опций в списке выбора) */
    size: number;
    /** Визуальный размер элементов-опций, содержащихся в элементе dropdown */
    optSize: number;
    /** Если true, элемент dropdown недоступен/отключен; если false - элемент доступен/включен */
    disabled: boolean;
    /** Если true, элемент dropdown допускает множественный выбор опций; если false (по умолчанию) - элемент допускает выбор только одной опции из списка */
    multi: boolean;
    /** Если true - элемент dropdown получил фокус ввода */
    focused: boolean;
    /** Если true - список опций элемента dropdown открыт; если false - список опций закрыт */
    showed: boolean;
    /** Краткое описание элемента */
    descr: string;
    /** Свойство элементов-опций, привязанное к свойству val элемента dropdown */
    indexAttr: string;
    /** Свойство элементов-опций, привязанное к свойству val элемента dropdown */
    overPos: OverlayPosition;
    handleFocused(ev: Event): void;
    handleBlurred(ev: Event): void;
    toggleOverlay(): void;
    handleOptionActivated(ev: CustomEvent): void;
    valChanged(now: string, before: string): void;
    computeName(): void;
    multiChanged(now: boolean, before: boolean): void;
    /**
     * Обозреватель изменения стандартного визуального размера элементов-опций
     * Применяет новый визуальный размер ко всем элементам-опциям, содержащимся в элементе dropdown
     * @param now новое значение визуального размера
     * @param before предыдущее значение визуального размера
     */
    optSizeChanged(now: number, before: number): void;
}
