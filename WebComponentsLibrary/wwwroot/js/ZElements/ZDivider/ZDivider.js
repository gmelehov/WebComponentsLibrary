var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZDivider_1;
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { ZPalette } from '../../Classes/ZPalette.js';
const { customElement, property, observe } = Poly;
/**
 * Элемент-разделитель
 * @customElement
 * @polymer
 */
let ZDivider = ZDivider_1 = class ZDivider extends PolymerElement {
    constructor() {
        super();
        /**
         * Толщина разделительной линии
         */
        this.size = 1;
        /**
         * Цвет разделительной линии
         */
        this.color = 'grey-300';
        /**
         * Признак выравнивания разделителя по базовой линии
         * Если true, то разделитель выровнен по базовой линии
         */
        this.baseline = false;
        /**
         * Признак выравнивания разделителя по высоте
         * Если true, то разделитель выровнен по высоте
         */
        this.cap = false;
    }
    static get _styleTemplate() {
        return html `
		<style>
			:host { display: block; overflow: hidden; padding: 0px 0; color: hsla(0, 0%, 0%, 0.1); --my-border-color: currentColor; }
			:host([baseline]) { bottom: 0; left: 0; padding: 0; position: absolute; right: 0; }
			:host([cap]) { left: 0; padding: 0; position: absolute; right: 0; top: 0; }
			:host(.cap) { padding: 7px 0 8px 0; }
			:host([size="1"]) .line { border-top: 1px solid var(--my-border-color); }
			:host([size="2"]) .line { border-top: 2px solid var(--my-border-color); }
		</style>`;
    }
    ;
    static get _htmlTemplate() {
        return html `<div class="line"></div>`;
    }
    ;
    static get template() {
        let fullTemplate = html ``;
        fullTemplate.content.appendChild(ZDivider_1._styleTemplate.content);
        fullTemplate.content.appendChild(ZDivider_1._htmlTemplate.content);
        return fullTemplate;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    /**
     * Обозреватель изменения свойства color
     * @param newval новое значение свойства
     * @param oldval предыдущее значение свойства
     */
    colorChanged(newval, oldval) {
        var hsl = ZPalette.computeHSL(newval, false);
        this.updateStyles({ '--my-border-color': `${hsl}` });
    }
    ;
    /**
     * Обозреватель изменения свойства baseline
     * @param newVal новое значение свойства
     * @param oldVal предыдущее значение свойства
     */
    baselineChanged(newVal, oldVal) {
        this.cap = this.cap && !newVal;
    }
    ;
    /**
     * Обозреватель изменения свойства cap
     * @param newVal новое значение свойства
     * @param oldVal предыдущее значение свойства
     */
    capChanged(newVal, oldVal) {
        this.baseline = this.baseline && !newVal;
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZDivider.prototype, "size", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZDivider_1.prototype.colorChanged }),
    __metadata("design:type", String)
], ZDivider.prototype, "color", void 0);
__decorate([
    property({ reflectToAttribute: true, observer: ZDivider_1.prototype.baselineChanged }),
    __metadata("design:type", Boolean)
], ZDivider.prototype, "baseline", void 0);
__decorate([
    property({ reflectToAttribute: true, observer: ZDivider_1.prototype.capChanged }),
    __metadata("design:type", Boolean)
], ZDivider.prototype, "cap", void 0);
ZDivider = ZDivider_1 = __decorate([
    customElement('z-divider'),
    __metadata("design:paramtypes", [])
], ZDivider);
export { ZDivider };
