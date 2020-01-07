import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
/**
 * SVG-иконка Material Icons.
 * @customElement
 * @polymer
 */
export declare class ZIcon extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /** Название иконки */
    name: string;
    /** Цвет иконки */
    color: string;
    /** Прозрачность иконки */
    opacity: number;
    /** Визуальные размеры иконки в пикселях */
    size: number;
    /** Признак отключенной/недоступной иконки */
    disabled: boolean;
    /** Ссылка на внутренний html-элемент div */
    get innerDiv(): HTMLDivElement;
    opacityChanged(newVal: number, oldVal: number): void;
    /**
       * Обозреватель изменения свойства name.
       *
       * Запрашивает SVG-элемент с идентификатором, равным новому значению свойства name,
       * в репозитории SVG-иконок (элемент z-icon-set).
       *
       * В случае успешного выполнения запроса удаляет существующий дочерний SVG-элемент
       * (если таковой имеется) с идентификатором, равным предыдущему значению свойства name,
       * затем добавляет полученный SVG-элемент к своему содержимому.
       *
       *
       * @param newName новое значение свойства
       * @param oldName предыдущее значение свойства
       */
    nameChanged(newName: string, oldName: string): void;
    colorChanged(newVal: string, oldVal: string): void;
}
