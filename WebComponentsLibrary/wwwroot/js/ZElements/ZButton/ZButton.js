var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZButton_1;
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { Targeter } from '../../Classes/Targeter.js';
import { fireCustomEvent } from '../../Utilities/fireCustomEvent.js';
import { EventType, KeyCode } from '../../Enums/enums.js';
import { stringToTargetDefinitions } from '../../Utilities/stringToTargetDefinitions.js';
import { afterNextRender } from '../../../lib/@polymer/polymer/lib/utils/render-status.js';
import { ZPalette } from '../../Classes/ZPalette.js';
import { getWidth } from '../../Utilities/getWidth.js';
import { getHeight } from '../../Utilities/getHeight.js';
const { customElement, property, observe } = Poly;
let ZButton = ZButton_1 = class ZButton extends PolymerElement {
    constructor() {
        super();
        /** Иконка, отображаемая перед текстом кнопки */
        this.icon = '';
        /** Текст кнопки */
        this.label = '';
        /** Высота кнопки в пикселях */
        this.h = 28;
        /** Визуальные размеры иконки */
        this.iconSize = 24;
        /**
         * Цвет шрифта кнопки
         * Указанный цвет применяется также к иконке, отображаемой перед текстом кнопки и к эффектам элемента z-ripple
         */
        this.color = '';
        /** Если true - кнопка имеет фоновую заливку в 10% от основного своего цвета (цвета шрифта); если false (по умолчанию) - кнопка имеет полностью прозрачный фон */
        this.accented = false;
        /** Если true - кнопка имеет фоновую заливку в 100% от основного своего цвета (цвета шрифта); если false (по умолчанию) - кнопка имеет полностью прозрачный фон */
        this.filled = false;
        this.z = 0;
        /**
         * При установке в true отключает эффект ripple при нажатии кнопки (соответствующее действие при нажатии кнопки выполняется без задержки)
         * При установке в false (по умолчанию) включает эффект ripple при нажатии кнопки (соответствующее действие при нажатии кнопки выполняется с небольшой задержкой)
         */
        this.noTap = false;
        /** Ссылка, переход к которой будет осуществлен после активации элемента */
        this.href = '';
        /**
         * При установке в true элемент не может быть выбран/активирован/задействован
         * При установке в false (по умолчанию) элемент может быть выбран/активирован/задействован
         */
        this.disabled = false;
        /** Строка-конфигуратор командного хелпера */
        this.triggers = '';
        /** Хелпер для взаимодействия с элементами-получателями команд */
        this.targeter = new Targeter();
        this.icon = '';
        this.label = '';
        this.h = 28;
        this.iconSize = 24;
        this.color = '';
        this.disabled = false;
        this.noTap = false;
    }
    static get _styleTemplate() {
        return html `
		<style>
			:host { border-radius: 2px; margin: 3px 0; padding: 0 6px; font-size: 14px; min-width: 36px; text-align: center; position: relative; display: inline-block; cursor: pointer; user-select: none; vertical-align: middle; --curr-color: currentColor; }
			:host(:hover), :host(:focus) { outline: none; }

      :host([h="14"]) { height: 14px; }
      :host([h="16"]) { height: 16px; }
      :host([h="18"]) { height: 18px; }
      :host([h="20"]) { height: 20px; }
      :host([h="22"]) { height: 22px; }
      :host([h="24"]) { height: 24px; }
      :host([h="26"]) { height: 26px; }
      :host([h="28"]) { height: 28px; }
      :host([h="30"]) { height: 30px; }
      :host([h="32"]) { height: 32px; }

			:host([accented]) z-ripple:not(.rippling) { background-color: var(--curr-color); filter: opacity(0.12); }
			:host(:hover:not([disabled]):not([accented])) z-ripple:not(.rippling), :host(:focus:not([disabled]):not([accented])) z-ripple:not(.rippling) { outline: none; background-color: var(--curr-color); filter: opacity(0.16); }
			:host(:hover:not([disabled])[accented]) z-ripple:not(.rippling), :host(:focus:not([disabled])[accented]) z-ripple:not(.rippling) { outline: none; background-color: var(--curr-color); filter: opacity(0.2); }

			:host(:not([disabled])) { pointer-events: auto; opacity: 1; }
			:host([disabled]) { pointer-events: none !important; opacity: 0.45; }
      :host > div > z-icon { padding: 0; }
			.label { padding: 0 3px; color: var(--curr-color); text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
			:host > div { display: flex; align-items: center; height: inherit; line-height: inherit; color: var(--curr-color); user-select: none; justify-content: center; }
		</style>`;
    }
    ;
    static get _htmlTemplate() {
        return html `
		<div>
			<z-icon name="[[icon]]" size="{{iconSize}}" color="{{color}}" disabled="[[disabled]]"></z-icon>
      <div class="label">[[label]]</div>
		</div>
		<z-ripple color="{{color}}" no-tap="{{noTap}}" density="normal"></z-ripple>`;
    }
    ;
    static get template() {
        let fullTemplate = html ``;
        fullTemplate.content.appendChild(ZButton_1._styleTemplate.content);
        fullTemplate.content.appendChild(ZButton_1._htmlTemplate.content);
        return fullTemplate;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', ZButton_1.prototype.handleClick);
        this.addEventListener('keydown', ZButton_1.prototype.handleKeydown);
        afterNextRender(this, () => {
            setTimeout(() => {
                this.colorChanged(this.color, null);
                this.setAttribute('tabindex', '0');
            }, 250);
        });
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', ZButton_1.prototype.handleClick);
        this.removeEventListener('keydown', ZButton_1.prototype.handleKeydown);
    }
    ;
    /** Основные свойства элемента-кнопки */
    get details() {
        return {
            id: this.id,
            label: this.label,
            icon: this.icon,
            iconSize: this.iconSize,
            h: this.h,
            color: this.color,
            disabled: this.disabled,
            noTap: this.noTap,
            triggers: this.triggers,
            targeter: this.targeter
        };
    }
    ;
    /**
     * Обозреватель изменения строки-конфигуратора командного хелпера
     * Обновляет конфигурацию командного хелпера
     * @param now новая строка-конфигуратор
     * @param before предыдущая строка-конфигуратор
     */
    triggersChanged(now, before) {
        if (now !== null && now !== undefined) {
            this.targeter.removeAll();
            setTimeout(() => {
                if (now !== '') {
                    let arr = stringToTargetDefinitions(now);
                    this.targeter.addMany(arr);
                }
                ;
            }, 0);
        }
        ;
    }
    ;
    /**
     * Обозреватель изменения свойства disabled
     * Если новое значение свойства равно true, устанавливает атрибут tabindex="-1"
     * Если новое значение свойства равно false, устанавливает атрибут tabindex="0"
     * @param newVal
     * @param oldVal
     */
    disabledChanged(newVal, oldVal) {
        (newVal) ? this.setAttribute('tabindex', '-1') : this.setAttribute('tabindex', '0');
    }
    ;
    /**
     * Обозреватель изменения цвета элемента
     * @param newVal новое значение цвета
     * @param oldVal предыдущее значение цвета
     */
    colorChanged(newVal, oldVal) {
        let hsl = ZPalette.computeHSL(newVal, false);
        //(this.shadowRoot.querySelector('div') as HTMLDivElement).style.color = hsl || '';
        this.updateStyles({ '--curr-color': `${hsl}` });
    }
    ;
    /**
     * Обработчик клика мышкой
     * Генерирует событие button-activated
     * @param e событие click
     * @emits button-activated
     */
    handleClick(e) {
        let targ = e.target;
        fireCustomEvent(targ, EventType.buttonActivated, targ.details);
        if (!targ.noTap)
            targ.shadowRoot.querySelector('z-ripple').ripple(getWidth(targ) / 2, getHeight(targ) / 2);
        targ.exec();
        targ.gotoHref();
    }
    ;
    /**
     * Обработчик нажатия клавиш Enter и Space на элементе, получившем фокус ввода
     * Генерирует событие button-activated
     * @param e событие keydown
     * @emits button-activated
     */
    handleKeydown(e) {
        let targ = e.target;
        switch (e.keyCode) {
            case KeyCode.Enter:
                fireCustomEvent(targ, EventType.buttonActivated, targ.details);
                if (!targ.noTap)
                    targ.shadowRoot.querySelector('z-ripple').ripple(getWidth(targ) / 2, getHeight(targ) / 2);
                targ.exec();
                targ.gotoHref();
                break;
            case KeyCode.Space:
                fireCustomEvent(targ, EventType.buttonActivated, targ.details);
                if (!targ.noTap)
                    targ.shadowRoot.querySelector('z-ripple').ripple(getWidth(targ) / 2, getHeight(targ) / 2);
                targ.exec();
                targ.gotoHref();
                break;
            default:
                break;
        }
        ;
    }
    ;
    /** Метод, активирующий командный хелпер */
    exec() {
        if (this.triggers && this.targeter && !this.disabled)
            if (this.noTap) {
                this.targeter.exec();
            }
            else {
                setTimeout(() => {
                    this.targeter.exec();
                }, ZButton_1.execDelay);
            }
        ;
    }
    ;
    /** Переходит по ссылке, заданной в свойстве href элемента */
    gotoHref() {
        if (this.href && !this.disabled)
            (ZButton_1.execDelay === 0) ? window.location.href = this.href : setTimeout(() => { window.location.href = this.href; }, ZButton_1.execDelay + 220);
    }
    ;
};
/**
 * Задержка исполнения действий кнопки
 * Используется в случае, если свойство noTap кнопки равно false
 */
ZButton.execDelay = 150;
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZButton.prototype, "icon", void 0);
__decorate([
    property({ reflectToAttribute: true }),
    __metadata("design:type", String)
], ZButton.prototype, "label", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZButton.prototype, "h", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZButton.prototype, "iconSize", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZButton_1.prototype.colorChanged }),
    __metadata("design:type", String)
], ZButton.prototype, "color", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZButton.prototype, "accented", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZButton.prototype, "filled", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZButton.prototype, "z", void 0);
__decorate([
    property({ reflectToAttribute: true }),
    __metadata("design:type", Boolean)
], ZButton.prototype, "noTap", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZButton.prototype, "href", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZButton_1.prototype.disabledChanged }),
    __metadata("design:type", Boolean)
], ZButton.prototype, "disabled", void 0);
__decorate([
    property({ notify: true, observer: ZButton_1.prototype.triggersChanged }),
    __metadata("design:type", String)
], ZButton.prototype, "triggers", void 0);
ZButton = ZButton_1 = __decorate([
    customElement('z-button'),
    __metadata("design:paramtypes", [])
], ZButton);
export { ZButton };
