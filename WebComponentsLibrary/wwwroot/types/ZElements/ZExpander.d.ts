import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
import { ZExpandable } from './ZExpandable.js';
import { ZCollapser } from './ZCollapser.js';
/**
 * Раскрывающийся контейнер
 * @customElement
 * @polymer
 */
export declare class ZExpander extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    /** Заголовок панели */
    name: string;
    /** Опциональная иконка, отображаемая перед текстом заголовка панели */
    icon: string;
    /** Размер опциональной иконки, в пикселях */
    iconSize: number;
    /** Цвет заголовка панели */
    color: string;
    /** Если true, содержимое панели раскрыто. Если false (по умолчанию), содержимое панели закрыто */
    opened: boolean;
    /** Если true, то открытая панель имеет верхние и нижние отступы. Если false (по умолчанию), то открытая панель не имеет верхних и нижних отступов */
    popout: boolean;
    /** Относительная высота (поднятие) панели над плоскостью */
    z: number;
    /**
     * Настройка режима подчеркивания заголовка панели
     * always = заголовок подчеркнут всегда
     * opened = заголовок подчеркнут только при раскрытой панели
     * never = заголовок никогда не подчеркивается
     */
    underline: 'always' | 'opened' | 'never';
    get details(): {
        id: string;
        name: string;
        icon: string;
        color: string;
        opened: boolean;
        popout: boolean;
        z: number;
        underline: "opened" | "always" | "never";
        isFirstOrLast: boolean;
    };
    /** Возвращает true, если эта панель является первым/последним дочерним элементом в своем родительском контейнере */
    get isFirstOrLast(): boolean;
    get computeUnderline(): boolean;
    /** Ссылка на внутренний элемент z-collapser */
    get myCollapser(): ZCollapser;
    /** Ссылка на внутренний элемент z-expandable */
    get myExpandable(): ZExpandable;
    /**
       * Раскрывает/скрывает содержимое панели
       * @param ev событие click
       */
    toggleOpened(ev: MouseEvent): void;
    /**
     * Обозреватель изменения свойства opened
     * @param newval новое значение свойства
     * @param oldval предыдущее значение свойства
     */
    openedChanged(newval: boolean, oldval: boolean): void;
    /**  */
    getCollapserHeight(): number;
}
