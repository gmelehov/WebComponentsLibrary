import { ITargeterReady } from "../../Interfaces/targeting.js";
import { OverlayPosition } from "../../Enums/enums.js";
import { Targeter } from "../../Classes/Targeter.js";
import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
declare const ZOverlay_base: typeof PolymerElement & import("../../../lib/@polymer/polymer/lib/legacy/legacy-element-mixin.js").LegacyElementMixinConstructor & import("../../../lib/@polymer/polymer/lib/mixins/element-mixin.js").ElementMixinConstructor & import("../../../lib/@polymer/polymer/lib/mixins/property-effects.js").PropertyEffectsConstructor & import("../../../lib/@polymer/polymer/lib/mixins/template-stamp.js").TemplateStampConstructor & import("../../../lib/@polymer/polymer/lib/mixins/property-accessors.js").PropertyAccessorsConstructor & import("../../../lib/@polymer/polymer/lib/mixins/properties-changed.js").PropertiesChangedConstructor & import("../../../lib/@polymer/polymer/lib/mixins/properties-mixin.js").PropertiesMixinConstructor & import("../../../lib/@polymer/polymer/lib/mixins/gesture-event-listeners.js").GestureEventListenersConstructor;
/**
 * Условия закрытия оверлея:
 *
 * (1) - нажата клавиша Esc, ИЛИ
 * (2) - активирована опция, переключающая подменю оверлея, ИЛИ
 * (3) - активирована дочерняя опция в оверлее, имеющая свойство hideMenu, равное {@link MenuBehaviourOnClick.hideParent}.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
/**
 *
 * @customElement
 * @polymer
 */
export declare class ZOverlay extends ZOverlay_base implements ITargeterReady {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** box-shadow */
    z: number;
    /** максимальная высота элемента, измеряемая в количестве отображаемых опций */
    size: number;
    /** признак выравнивания элемента по центру */
    autoCenter: boolean;
    /** выравнивание элемента относительно родительского элемента */
    position: OverlayPosition;
    /** дополнительное смещение элемента по горизонтали, в пикселях */
    xBias: number;
    /** дополнительное смещение элемента по вертикали, в пикселях */
    yBias: number;
    /** состояние элемента "отображается"/"не отображается" */
    showed: boolean;
    triggers: string;
    targeter: Targeter;
    /** Позиционирует элемент относительно своего переключателя */
    align(): void;
    /** Скрывает элемент */
    hide(): void;
    /** Отображает элемент */
    show(): void;
    /** Переключает режим видимости элемента */
    toggle(): void;
    /**
     * Обозреватель изменения визуальной высоты подъема элемента
     * @param newVal новое значение
     * @param oldVal предыдущее значение
     */
    zChanged(newVal: number, oldVal: number): void;
    /**
     * Обозреватель изменения максимальной высоты прокручиваемой области элемента
     * @param newSize новое значение
     * @param oldSize предыдущее значение
     */
    sizeChanged(newSize: number, oldSize: number): void;
    /**
     * Обозреватель изменения видимости элемента
     * @param newValue новое значение
     * @param oldValue предыдущее значение
     */
    showedChanged(newValue: boolean, oldValue: boolean): void;
    /**
     * Обозреватель изменения типа выравнивания элемента
     * Пересчитывает позиционирование элемента относительно своего переключателя
     * @param now новый тип выравнивания
     * @param before предыдущий тип выравнивания
     */
    positionChanged(now: OverlayPosition, before: OverlayPosition): void;
    handleHide(e: Event): void;
    handleResize(event: Event): void;
    handleOptionActivated(ev: CustomEvent): void;
    triggersChanged(now: string, before: string): void;
    exec(): void;
}
export {};
