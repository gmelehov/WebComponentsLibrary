var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZOption_1;
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { OptionRole, EventType, KeyCode, MenuBehaviourOnClick } from "../Enums/enums.js";
import { html, PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { fireCustomEvent } from '../Utilities/fireCustomEvent.js';
import { getElements } from '../Utilities/getElements.js';
import { getWidth } from '../Utilities/getWidth.js';
import { getHeight } from '../Utilities/getHeight.js';
import { getPrevious } from '../Utilities/getPrevious.js';
import { getNext } from '../Utilities/getNext.js';
import { TargeterMixin } from '../Mixins/TargeterMixin.js';
const { customElement, property, observe } = Poly;
/**
 * Элемент-опция
 * Может быть использована в меню, подменю, выпадающем списке
 * @customElement
 * @polymer
 */
let ZOption = ZOption_1 = class ZOption extends TargeterMixin(PolymerElement) {
    constructor(model) {
        super();
        /** Идентификатор элемента */
        this.id = '';
        /** Отображаемый текст опции */
        this.name = '';
        /** Значение опции */
        this.val = '';
        /** Высота элемента в пикселях */
        this.h = 28;
        /** Основная иконка, отображаемая перед текстом опции */
        this.icon = '';
        /**
         * Цвет основной иконки, отображаемой перед текстом опции
         * Указанный цвет применяется также к эффектам элемента z-ripple
         */
        this.iconColor = 'grey-500';
        /** Размеры основной иконки, отображаемой перед текстом опции */
        this.iconSize = null;
        /** Дополнительная иконка, отображаемая после текста опции */
        this.secIcon = '';
        this.noCheck = false;
        /**
         * Закрывать родительское меню после клика на этом элементе
         * В случае true, меню будет закрыто даже если свойство type элемента равно toggle
         */
        this.hideMenu = MenuBehaviourOnClick.keepAll;
        /** Состояние опции "отмечено/не отмечено" для опции с ролью {@link OptionRole.toggle} */
        this.active = false;
        /** Набор данных, связанных с элементом */
        this.data = null;
        if (model) {
            this.id = model.id;
            this.name = model.name;
            this.val = model.val;
            this.h = model.h;
            this.icon = model.icon;
            this.iconColor = model.iconColor;
            this.iconSize = model.iconSize;
            this.secIcon = model.secIcon;
            this.href = model.href;
            this.noCheck = model.noCheck;
            this.hideMenu = model.hideMenu;
            this.type = model.type;
            this.active = model.active;
            this.disabled = model.disabled;
            this.data = model.data || null;
            this.triggers = model.triggers;
        }
    }
    static get template() {
        return html `
		<style>
			:host { display: block; position: relative; }
			:host(:not([disabled])) { pointer-events: auto; opacity: 1; }
			:host([disabled]) { pointer-events: none !important; opacity: 0.55; }
			:host(:focus) { outline: none; }
			:host(:hover), :host(:focus), :host([type='sub'][target-showed]) { outline: none; background-color: hsla(0, 0%, 0%, 0.06); }
      :host([h="18"]) { height: 18px; }
      :host([h="20"]) { height: 20px; }
      :host([h="22"]) { height: 22px; }
      :host([h="24"]) { height: 24px; }
      :host([h="26"]) { height: 26px; }
      :host([h="28"]) { height: 28px; }
      :host([h="30"]) { height: 30px; }
      :host([h="32"]) { height: 32px; }
      :host([h="34"]) { height: 34px; }
      :host([h="36"]) { height: 36px; }
      :host([h="38"]) { height: 38px; }
      :host([h="40"]) { height: 40px; }
			:host div { display: grid; align-items: center; grid-template-columns: minmax(min-content, auto) 1fr minmax(min-content, auto) 18px; cursor: pointer; user-select: none; padding: 0 2px; font-size: 13px; height: inherit; }
			:host span { padding: 0 4px; font-size: inherit; }
			:host span:last-of-type { opacity: 0.62; padding-right: 8px; }
			:host([type='simple']) span:last-of-type, :host([type='']) span:last-of-type { grid-column: 3/5; }
			z-icon:first-of-type { padding: 2px; }
			z-icon:last-of-type { grid-column: 4/5; }
			:host([type='toggle']:not([active])) z-icon:last-of-type { visibility: hidden; transform: scale(0,0); transition: var(--z-fast-transition); }
			:host([type='toggle'][active]) z-icon:last-of-type { visibility: visible; transform: scale(1,1); transition: var(--z-fast-transition); }
			:host([type='sub']) z-icon:last-of-type { transform: rotate(-90deg); }
			:host([type='collapser']) div, :host([type='']) div { font-size: inherit !important; }
			:host([type='collapser'][active]) z-icon:last-of-type { transform: rotate(180deg); }
			:host([type='collapser']:not([active])) z-icon:last-of-type { transform: rotate(0deg); }
			:host([type='simple']) z-icon:last-of-type { display: none; }
		</style>
		<div>
			<z-icon name="{{icon}}" color="{{iconColor}}" size='{{iconSize}}'></z-icon>
			<span>{{name}}</span>
			<span hidden$="{{!noCheck}}"><slot></slot></span>
			<z-icon name="{{secIcon}}" color="grey-600" size="18"></z-icon>
		</div>
    <slot name="cnt"></slot>
		<z-ripple color="{{iconColor}}" density="pale"></z-ripple>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', ZOption_1.prototype.handleClick);
        this.addEventListener('keydown', ZOption_1.prototype.handleKeydown);
        afterNextRender(this, () => {
            setTimeout(() => {
                this.setAttribute('tabindex', '0');
            }, 50);
        });
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', ZOption_1.prototype.handleClick);
        this.removeEventListener('keydown', ZOption_1.prototype.handleKeydown);
    }
    ;
    /** Основные свойства элемента-опции */
    get details() {
        return {
            id: this.id,
            name: this.name,
            val: this.val,
            h: this.h,
            icon: this.icon,
            iconColor: this.iconColor,
            iconSize: this.iconSize,
            secIcon: this.secIcon,
            href: this.href,
            noCheck: this.noCheck,
            hideMenu: this.hideMenu,
            type: this.type,
            active: this.active,
            disabled: this.disabled,
            data: this.data,
            triggers: this.triggers
        };
    }
    ;
    /**
     * Обработчик клика мышкой
     * Генерирует событие option-activated
     * @param e событие click
     * @emits option-activated
     */
    handleClick(e) {
        let targ = e.target;
        targ._doActivateOption();
    }
    ;
    /**
     * Обработчик нажатия управляющих клавиш на элементе, получившем фокус ввода
     * Генерирует событие option-activated
     * @param e событие keydown
     * @emits option-activated
     */
    handleKeydown(e) {
        let targ = e.target;
        let siblings;
        switch (e.keyCode) {
            case KeyCode.Enter:
            case KeyCode.Space:
                targ._doActivateOption();
                break;
            case KeyCode.ArrowDown:
            case KeyCode.ArrowUp:
                targ._doSelectSibling(e);
                break;
            case KeyCode.ArrowRight:
                if (targ.type === OptionRole.sub) {
                    targ._doActivateOption();
                }
                ;
                break;
            case KeyCode.ArrowLeft:
                if (targ.type === OptionRole.sub) {
                    targ.ripple();
                    let overlay = targ.parentNode.querySelector('z-overlay');
                    if (overlay && overlay.showed)
                        overlay.showed = false;
                }
                ;
                break;
            default: break;
        }
        ;
    }
    ;
    /**
     * Обозреватель изменения роли элемента-опции
     * @param newType новое значение роли
     * @param oldType предыдущее значение роли
     */
    typeChanged(newType, oldType) {
        switch (newType) {
            case OptionRole.simple:
                this.secIcon = '';
                break;
            case OptionRole.toggle:
                this.secIcon = (this.noCheck) ? '' : 'check';
                break;
            case OptionRole.sub:
                this.secIcon = 'arrow-drop-down';
                break;
            case OptionRole.dropdown:
                this.secIcon = 'arrow-drop-down';
                break;
            case OptionRole.collapser:
                this.secIcon = 'keyboard-arrow-up';
                break;
            default:
                this.secIcon = '';
                break;
        }
        ;
    }
    ;
    /**
     * Обозреватель изменения свойства active
     * Если элемент выбран (active === true), генерирует событие option-selected
     * @param newActive новое значение свойства
     * @param oldActive предыдущее значение свойства
     * @emits option-selected
     */
    activeChanged(newActive, oldActive) {
        if (newActive)
            (ZOption_1.execDelay === 0) ? fireCustomEvent(this, EventType.optionSelected, this.details) : setTimeout(() => { fireCustomEvent(this, EventType.optionSelected, this.details); }, ZOption_1.execDelay);
    }
    ;
    activate(doRipple) {
        let _active = this.active;
        if (!this.disabled) {
            if (!_active && doRipple)
                this.ripple();
            this.active = !_active;
            (ZOption_1.execDelay === 0) ? fireCustomEvent(this, EventType.optionActivated, this.details) : setTimeout(() => { fireCustomEvent(this, EventType.optionActivated, this.details); }, ZOption_1.execDelay);
        }
        ;
    }
    ;
    valNameChanged(val, name) {
        if (val && (name === '' || name === undefined))
            this.name = val;
    }
    ;
    /** Анимация взаимодействия с элементом */
    ripple() {
        this.shadowRoot.querySelector('z-ripple').ripple(getWidth(this) / 2, getHeight(this) / 2);
    }
    ;
    _doActivateOption() {
        this.ripple();
        setTimeout(() => { fireCustomEvent(this, EventType.optionActivated, this.details); }, ZOption_1.execDelay);
        if (this.type === OptionRole.toggle || this.type === OptionRole.collapser)
            this.active = !this.active;
        if (this.type === OptionRole.simple || this.type === OptionRole.dropdown)
            this.exec();
        if (this.href && !this.disabled)
            this.gotoHref();
    }
    ;
    _doSelectSibling(e) {
        e.preventDefault();
        let siblings = getElements(this.parentNode, '[tabindex="0"]');
        let sibling;
        switch (e.keyCode) {
            case KeyCode.ArrowDown:
                sibling = getNext(siblings, this);
                break;
            case KeyCode.ArrowUp:
                sibling = getPrevious(siblings, this);
                break;
            default: break;
        }
        ;
        if (!!sibling) {
            sibling.focus();
            sibling.scrollIntoView();
        }
        ;
    }
    ;
    _doFireActivated() {
        (ZOption_1.execDelay === 0) ? fireCustomEvent(this, EventType.optionActivated, this.details) : setTimeout(() => { fireCustomEvent(this, EventType.optionActivated, this.details); }, ZOption_1.execDelay);
    }
    ;
    _doFireSelected() {
        (ZOption_1.execDelay === 0) ? fireCustomEvent(this, EventType.optionSelected, this.details) : setTimeout(() => { fireCustomEvent(this, EventType.optionSelected, this.details); }, ZOption_1.execDelay);
    }
    ;
    _doTargeterExecute() {
        (ZOption_1.execDelay === 0) ? this.targeter.exec() : setTimeout(() => { this.targeter.exec(); }, ZOption_1.execDelay);
    }
    ;
    _doHrefNavigate() {
        (ZOption_1.execDelay === 0) ? window.location.href = this.href : setTimeout(() => { window.location.href = this.href; }, ZOption_1.execDelay + 230);
    }
    ;
    /**
     * Проверяет эквивалентность двух элементов-опций
     * Возвращает true, если:
     * - существуют оба элемента-опции
     * - у каждого элемента-опции существует свойство-объект details
     * - количество свойств у каждого из объектов details соответствующих элементов-опций - одинаковое
     * - значения свойств объектов details соответствующих элементов-опций полностью совпадают друг с другом
     *
     * Возвращает false в случае невыполнения любого из указанных требований
     *
     * @param opt1 первый сравниваемый элемент-опция
     * @param opt2 второй сравниваемый элемент-опция
     */
    static isEqualOptions(opt1, opt2) {
        let checkExist = opt1 && opt2;
        let checkDetails = opt1.details && opt2.details;
        let checkDetailsItems = Object.values(opt1.details).length === Object.values(opt2.details).length;
        if (!checkExist || !checkDetails || !checkDetailsItems)
            return false;
        let checkEquality = false;
        if (checkExist && checkDetails) {
            checkEquality = true;
            let d1 = opt1.details;
            let d2 = opt2.details;
            if (d1.id !== d2.id)
                return false;
            Object.keys(d1).forEach(k => { checkEquality = checkEquality && (d1[k] === d2[k]) ? true : false; });
        }
        return checkEquality;
    }
    ;
    static isEqualDetails(det1, det2) {
        let checkDetails = (det1 && det2) ? true : false;
        let checkDetailsItems = (Object.values(det1).length === Object.values(det2).length) ? true : false;
        if (!checkDetails || !checkDetailsItems)
            return false;
        let checkEquality = false;
        if (checkDetails) {
            checkEquality = true;
            if (det1.id !== det2.id)
                return false;
            Object.keys(det1).forEach(k => { checkEquality = checkEquality && (det1[k] === det2[k]) ? true : false; });
        }
        ;
        return checkEquality;
    }
    ;
    static create(model) {
        return new ZOption_1(model);
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZOption.prototype, "id", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZOption.prototype, "name", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZOption.prototype, "val", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZOption.prototype, "h", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZOption.prototype, "icon", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZOption.prototype, "iconColor", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZOption.prototype, "iconSize", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ZOption.prototype, "secIcon", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZOption.prototype, "noCheck", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZOption.prototype, "hideMenu", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZOption_1.prototype.typeChanged }),
    __metadata("design:type", String)
], ZOption.prototype, "type", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZOption_1.prototype.activeChanged }),
    __metadata("design:type", Boolean)
], ZOption.prototype, "active", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", Object)
], ZOption.prototype, "data", void 0);
__decorate([
    observe('val', 'name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ZOption.prototype, "valNameChanged", null);
ZOption = ZOption_1 = __decorate([
    customElement('z-option'),
    __metadata("design:paramtypes", [Object])
], ZOption);
export { ZOption };
