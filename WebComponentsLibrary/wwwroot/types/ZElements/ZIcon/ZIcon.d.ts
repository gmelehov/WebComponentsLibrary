import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
/** SVG-иконка Material Icons. */
export declare class ZIcon extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /** Название иконки */
    name: string;
    /** Цвет элемента */
    color: string;
    /** Прозрачность элемента */
    opacity: number;
    /** Относительные размеры иконки */
    size: number;
    /**  */
    disabled: boolean;
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
