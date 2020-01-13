var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZSubheader_1;
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { ZPalette } from '../Classes/ZPalette.js';
const { customElement, property, observe } = Poly;
/**
 * Элемент-подзаголовок
 * @customElement
 * @polymer
 */
let ZSubheader = ZSubheader_1 = class ZSubheader extends PolymerElement {
    constructor() {
        super();
        /** Текст подзаголовка */
        this.label = '';
        /** Опциональная иконка, отображаемая перед текстом подзаголовка */
        this.icon = '';
        /** Визуальные размеры подзаголовка */
        this.size = 18;
        this.weight = 300;
        /** Размер иконки, отображаемой слева от текста подзаголовка */
        this.iconSize = 24;
        /** Высота подзаголовка в пикселях */
        this.h = 36;
        /** Цвет подзаголовка */
        this.color = 'grey-600';
        this.underlined = false;
    }
    static get template() {
        return html `
		<style>
			:host { display: block; user-select: none; }
			div { display: grid; width: 100%; align-items: center; grid-template-columns: auto 1fr; grid-gap: 0 4px; }
			z-divider, ::slotted(*) { grid-column: 1/3; grid-row: 2/2; }
			z-divider[hidden] { opacity: 0; visibility: hidden; padding: 0; transition: var(--z-fast-transition); }
      z-divider(:not([hidden])) { opacity: 1; visibility: visible; padding: initial; transition: var(--z-fast-transition); }
			div > span { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; letter-spacing: -0.2px; }
			z-icon[name=""] + span { grid-column: 1/3; }
      :host([weight="300"]), :host([weight="300"]) ::slotted(*) { font-weight: 300; }
      :host([weight="400"]), :host([weight="400"]) ::slotted(*) { font-weight: 400; }
      :host([weight="500"]), :host([weight="500"]) ::slotted(*) { font-weight: 500; }
      :host([weight="600"]), :host([weight="600"]) ::slotted(*) { font-weight: 600; }
			:host([size="16"]), :host([size="16"]) ::slotted(*) { font-size: 16px; }
      :host([size="18"]), :host([size="18"]) ::slotted(*) { font-size: 18px; }
      :host([size="20"]), :host([size="20"]) ::slotted(*) { font-size: 20px; }
      :host([size="22"]), :host([size="22"]) ::slotted(*) { font-size: 22px; }
      :host([size="24"]), :host([size="24"]) ::slotted(*) { font-size: 24px; }
      :host([size="26"]), :host([size="26"]) ::slotted(*) { font-size: 26px; }
			::slotted(*) { color: inherit; letter-spacing: -0.36px; grid-row: 1/1; padding: 0 4px; }     
			:host([h="24"]) { height: 24px; }
      :host([h="26"]) { height: 26px; }
      :host([h="28"]) { height: 28px; }
      :host([h="30"]) { height: 30px; }
      :host([h="32"]) { height: 32px; }
      :host([h="34"]) { height: 34px; }
      :host([h="36"]) { height: 36px; }
      :host([h="38"]) { height: 38px; }
      :host([h="40"]) { height: 40px; }
      :host([h="42"]) { height: 42px; }
		</style>
		<div>
			<z-icon name="{{icon}}" color="{{color}}" size="{{iconSize}}"></z-icon>
			<span>{{label}}</span>
			<slot></slot>
			<z-divider hidden="{{!underlined}}"></z-divider>
		</div>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    /**
     * Обозреватель изменения цвета подзаголовка
     * @param newVal новое значение цвета
     * @param oldVal предыдущее значение цвета
     */
    colorChanged(newVal, oldVal) {
        this.style.color = ZPalette.computeRGB(newVal, false) || '';
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZSubheader.prototype, "label", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZSubheader.prototype, "icon", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZSubheader.prototype, "size", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZSubheader.prototype, "weight", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZSubheader.prototype, "iconSize", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZSubheader.prototype, "h", void 0);
__decorate([
    property({ notify: true, observer: ZSubheader_1.prototype.colorChanged }),
    __metadata("design:type", String)
], ZSubheader.prototype, "color", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZSubheader.prototype, "underlined", void 0);
ZSubheader = ZSubheader_1 = __decorate([
    customElement('z-subheader'),
    __metadata("design:paramtypes", [])
], ZSubheader);
export { ZSubheader };
