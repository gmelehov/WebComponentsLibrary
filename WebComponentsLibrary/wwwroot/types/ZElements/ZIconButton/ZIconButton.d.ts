import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
import { ITargeterReady } from '../../Interfaces/targeting.js';
import { Targeter } from '../../Classes/Targeter.js';
/** Кнопка-иконка */
export declare class ZIconButton extends PolymerElement implements ITargeterReady {
    private static get _styleTemplate();
    private static get _htmlTemplate();
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    color: string;
    aIcon: string;
    aColor: string;
    iIcon: string;
    iColor: string;
    /** Состояние элемента "отмечено/не отмечено" */
    active: boolean;
    /** Конфигурация для командного хелпера */
    triggers: string;
    /** Относительные размеры кнопки */
    size: number;
    /**
     * При установке в true элемент не может быть выбран/активирован/задействован
     * При установке в false (по умолчанию) элемент может быть выбран/активирован/задействован
     */
    disabled: boolean;
    hide: boolean;
    /** Командный хелпер для взаимодействия с целевыми элементами */
    targeter: Targeter;
    /** Основные свойства элемента */
    get details(): {
        id: string;
        color: string;
        aIcon: string;
        aColor: string;
        iIcon: string;
        iColor: string;
        active: boolean;
        size: number;
        disabled: boolean;
        triggers: string;
        targeter: Targeter;
    };
    /**
     * Обработчик клика мышкой
     * Генерирует событие button-activated
     * @param e событие click
     * @emits button-activated
     */
    handleClick(e: MouseEvent): void;
    /**
     * Обозреватель изменения конфигурации командного хелпера
     * Обновляет конфигурацию командного хелпера
     * @param now новая конфигурация
     * @param before предыдущая конфигурация
     */
    triggersChanged(now: string, before: string): void;
    /**
     * Обозреватель изменения свойства active
     * @param newActive новое значение свойства
     * @param oldActive предыдущее значение свойства
     */
    activeChanged(newActive: boolean, oldActive: boolean): void;
    /**
     * Обозреватель изменения цвета обеих иконок
     * @param acolor новое значение цвета для иконки, соответствующей активному состоянию элемента
     * @param icolor новое значение цвета для иконки, соответствующей неактивному состоянию элемента
     * @param active новое состояние элемента
     */
    propsChanged(acolor: string, icolor: string, active: boolean): void;
    /** Активирует командный хелпер */
    exec(): void;
}
