import { PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
import { ITargeterReady } from '../../Interfaces/targeting.js';
import { Targeter } from '../../Classes/Targeter.js';
export declare class ZButton extends PolymerElement implements ITargeterReady {
    private static get _styleTemplate();
    private static get _htmlTemplate();
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** Иконка, отображаемая перед текстом кнопки */
    icon: string;
    /** Текст кнопки */
    label: string;
    /** Высота кнопки в пикселях */
    h: number;
    /** Визуальные размеры иконки */
    iconSize: number;
    /**
     * Цвет шрифта кнопки
     * Указанный цвет применяется также к иконке, отображаемой перед текстом кнопки и к эффектам элемента z-ripple
     */
    color: string;
    /** Если true - кнопка имеет фоновую заливку в 10% от основного своего цвета (цвета шрифта); если false (по умолчанию) - кнопка имеет полностью прозрачный фон */
    accented: boolean;
    /** Если true - кнопка имеет фоновую заливку в 100% от основного своего цвета (цвета шрифта); если false (по умолчанию) - кнопка имеет полностью прозрачный фон */
    filled: boolean;
    z: number;
    /**
     * При установке в true отключает эффект ripple при нажатии кнопки (соответствующее действие при нажатии кнопки выполняется без задержки)
     * При установке в false (по умолчанию) включает эффект ripple при нажатии кнопки (соответствующее действие при нажатии кнопки выполняется с небольшой задержкой)
     */
    noTap: boolean;
    /** Ссылка, переход к которой будет осуществлен после активации элемента */
    href: string;
    /**
     * При установке в true элемент не может быть выбран/активирован/задействован
     * При установке в false (по умолчанию) элемент может быть выбран/активирован/задействован
     */
    disabled: boolean;
    /** Строка-конфигуратор командного хелпера */
    triggers: string;
    /** Хелпер для взаимодействия с элементами-получателями команд */
    targeter: Targeter;
    /** Основные свойства элемента-кнопки */
    get details(): {
        id: string;
        label: string;
        icon: string;
        iconSize: number;
        h: number;
        color: string;
        disabled: boolean;
        noTap: boolean;
        triggers: string;
        targeter: Targeter;
    };
    /**
     * Обозреватель изменения строки-конфигуратора командного хелпера
     * Обновляет конфигурацию командного хелпера
     * @param now новая строка-конфигуратор
     * @param before предыдущая строка-конфигуратор
     */
    triggersChanged(now: string, before: string): void;
    /**
     * Обозреватель изменения свойства disabled
     * Если новое значение свойства равно true, устанавливает атрибут tabindex="-1"
     * Если новое значение свойства равно false, устанавливает атрибут tabindex="0"
     * @param newVal
     * @param oldVal
     */
    disabledChanged(newVal: boolean, oldVal: boolean): void;
    /**
     * Обозреватель изменения цвета элемента
     * @param newVal новое значение цвета
     * @param oldVal предыдущее значение цвета
     */
    colorChanged(newVal: string, oldVal: string): void;
    /**
     * Обработчик клика мышкой
     * Генерирует событие button-activated
     * @param e событие click
     * @emits button-activated
     */
    handleClick(e: MouseEvent): void;
    /**
     * Обработчик нажатия клавиш Enter и Space на элементе, получившем фокус ввода
     * Генерирует событие button-activated
     * @param e событие keydown
     * @emits button-activated
     */
    handleKeydown(e: KeyboardEvent): void;
    /** Метод, активирующий командный хелпер */
    exec(): void;
    /** Переходит по ссылке, заданной в свойстве href элемента */
    gotoHref(): void;
    /**
     * Задержка исполнения действий кнопки
     * Используется в случае, если свойство noTap кнопки равно false
     */
    static execDelay: number;
}
