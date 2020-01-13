import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
import { ZExpander } from './ZExpander.js';
import { EventType } from '../Enums/enums.js';
/**
 * Группа связанных раскрывающихся панелей-аккордеонов
 * @customElement
 * @polymer
 */
export declare class ZExpanders extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** Возможность раскрытия нескольких дочерних панелей-аккордеонов */
    multi: boolean;
    /** Если true, то каждая раскрываемая дочерняя панель-аккордеон будет занимать все доступное ей по высоте место */
    fullHeight: boolean;
    /** Индексы раскрытых дочерних панелей-аккордеонов, в одну строку, через пробел */
    selIndices: string;
    /** Текущее количество раскрытых дочерних панелей-аккордеонов */
    selCount: number;
    /** Селектор, определяющий стандартный дочерний элемент - панель-аккордеон */
    childSelector: string;
    /** Тип всплывающего события, генерируемого дочерними панелями-аккордеонами при их раскрытии/закрытии */
    childEvent: EventType;
    /** Ссылка на коллекцию дочерних панелей-аккордеонов */
    get expanders(): ZExpander[];
    /** Ссылка на коллекцию раскрытых дочерних панелей-аккордеонов */
    get openedChildren(): ZExpander[];
    /** Подключает прослушиватель событий от дочерних элементов */
    listenMyExpanders(): void;
    /** Отключает прослушиватель событий от дочерних элементов */
    unlistenMyExpanders(): void;
    /**
     *
     * @param now
     * @param before
     */
    fullHeightChanged(now: boolean, before: boolean): void;
    /**
     *
     * @param ev
     */
    handleExpanderToggled(ev: CustomEvent): void;
    /** Закрывает все раскрытые дочерние панели-аккордеоны */
    closeAll(): void;
    /**  */
    computeSelCount(): void;
    /** Возвращает список индексов раскрытых в данный момент дочерних панелей-аккордеонов */
    getSelIndicesArray(): number[];
    /**
     * Возвращает коллекцию всех раскрытых дочерних панелей-аккордеонов,
     * за исключением дочерней панели, свойство id которой равно указанному
     * @param id идентификатор раскрытой дочерней панели, которую необходимо исключить из возвращаемой коллекции
     */
    getOpenedExceptOne(id: string): ZExpander[];
    /**  */
    getComputedSelIndices(): string;
    /**
     *
     * @param newval
     * @param oldval
     */
    multiChanged(newval: boolean, oldval: boolean): void;
    getFullHeight(): number;
}
