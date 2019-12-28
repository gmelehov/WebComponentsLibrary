var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZIconButton_1;
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { Targeter } from '../../Classes/Targeter.js';
import { fireCustomEvent } from '../../Utilities/fireCustomEvent.js';
import { EventType } from '../../Enums/enums.js';
import { stringToTargetDefinitions } from '../../Utilities/stringToTargetDefinitions.js';
const { customElement, property, observe } = Poly;
/** Кнопка-иконка */
let ZIconButton = ZIconButton_1 = class ZIconButton extends PolymerElement {
    constructor() {
        super();
        /** Состояние элемента "отмечено/не отмечено" */
        this.active = false;
        /** Конфигурация для командного хелпера */
        this.triggers = '';
        /** Относительные размеры кнопки */
        this.size = 24;
        /**
         * При установке в true элемент не может быть выбран/активирован/задействован
         * При установке в false (по умолчанию) элемент может быть выбран/активирован/задействован
         */
        this.disabled = false;
        this.hide = false;
        this.aIcon = '';
        this.aColor = '';
        this.iIcon = '';
        this.iColor = 'grey-600';
        this.disabled = false;
        this.color = this.iColor;
        this.triggers = '';
        this.targeter = new Targeter();
    }
    static get _styleTemplate() {
        return html `
		<style>			
			:host { display: inline-flex; line-height: 1; border-radius: 50%; vertical-align: middle; }
			:host(:focus) { outline: none; background-color: hsla(0, 0%, 0%, 0.06); }
			:host([disabled]) { pointer-events: none !important; filter: grayscale(100%); color: hsla(0, 0%, 0%, 0.23) !important; opacity: 0.36; }
			:host(:not([disabled])) { pointer-events: auto; opacity: 1; }
			:host div { display: block; cursor: pointer; position: relative; border-radius: 50%; align-items: center; padding: 0; width: 100%; height: 100%; }	
			:host z-icon { position: absolute; left: 0; top: 0; right: 0; bottom: 0; transition: var(--z-half-medium-transition); transform-origin: center center; transition-delay: 0s; }
			:host([active]) z-icon:first-of-type { transform: scale(1,1); }
			:host([active]) z-icon:last-of-type { transform: scale(0,0); }
			:host(:not([active])) z-icon:first-of-type { transform: scale(0,0); }
			:host(:not([active]):not([hide])) z-icon:last-of-type { transform: scale(1,1); }
      :host(:not([active])[hide]) z-icon:last-of-type { transform: scale(0,0); }
		</style>`;
    }
    ;
    static get _htmlTemplate() {
        return html `
		<div size$="[[size]]">
			<z-icon name="{{aIcon}}" color="{{aColor}}" size="{{size}}"></z-icon>
			<z-icon name="{{iIcon}}" color="{{iColor}}" size="{{size}}"></z-icon>
			<z-ripple color="{{color}}" density="normal"></z-ripple>
		</div>`;
    }
    ;
    static get template() {
        let fullTemplate = html ``;
        fullTemplate.content.appendChild(ZIconButton_1._styleTemplate.content);
        fullTemplate.content.appendChild(ZIconButton_1._htmlTemplate.content);
        return fullTemplate;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', ZIconButton_1.prototype.handleClick);
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', ZIconButton_1.prototype.handleClick);
    }
    ;
    /** Основные свойства элемента */
    get details() {
        return {
            id: this.id,
            color: this.color,
            aIcon: this.aIcon,
            aColor: this.aColor,
            iIcon: this.iIcon,
            iColor: this.iColor,
            active: this.active,
            size: this.size,
            disabled: this.disabled,
            triggers: this.triggers,
            targeter: this.targeter
        };
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
        if (targ.disabled === false) {
            fireCustomEvent(targ, EventType.buttonActivated, targ.details);
            if (targ.iIcon !== '' && targ.aIcon !== '')
                targ.active = !targ.active;
            setTimeout(() => {
                targ.exec();
            }, 240);
        }
        ;
    }
    ;
    /**
     * Обозреватель изменения конфигурации командного хелпера
     * Обновляет конфигурацию командного хелпера
     * @param now новая конфигурация
     * @param before предыдущая конфигурация
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
     * Обозреватель изменения свойства active
     * @param newActive новое значение свойства
     * @param oldActive предыдущее значение свойства
     */
    activeChanged(newActive, oldActive) {
        if (newActive !== undefined && newActive !== null && !this.disabled)
            this.color = (newActive) ? this.aColor : this.iColor;
    }
    ;
    /**
     * Обозреватель изменения цвета обеих иконок
     * @param acolor новое значение цвета для иконки, соответствующей активному состоянию элемента
     * @param icolor новое значение цвета для иконки, соответствующей неактивному состоянию элемента
     * @param active новое состояние элемента
     */
    propsChanged(acolor, icolor, active) {
        this.color = (active) ? acolor : icolor;
    }
    ;
    /** Активирует командный хелпер */
    exec() {
        if (this.triggers && this.targeter && this.disabled === false)
            this.targeter.exec();
    }
    ;
};
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZIconButton.prototype, "color", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZIconButton.prototype, "aIcon", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZIconButton.prototype, "aColor", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZIconButton.prototype, "iIcon", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZIconButton.prototype, "iColor", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZIconButton_1.prototype.activeChanged }),
    __metadata("design:type", Boolean)
], ZIconButton.prototype, "active", void 0);
__decorate([
    property({ notify: true, observer: ZIconButton_1.prototype.triggersChanged }),
    __metadata("design:type", String)
], ZIconButton.prototype, "triggers", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZIconButton.prototype, "size", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZIconButton.prototype, "disabled", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZIconButton.prototype, "hide", void 0);
__decorate([
    observe('aColor', 'iColor', 'active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", void 0)
], ZIconButton.prototype, "propsChanged", null);
ZIconButton = ZIconButton_1 = __decorate([
    customElement('z-icon-button'),
    __metadata("design:paramtypes", [])
], ZIconButton);
export { ZIconButton };
