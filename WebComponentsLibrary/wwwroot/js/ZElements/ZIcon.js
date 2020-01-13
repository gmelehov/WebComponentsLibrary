var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZIcon_1;
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { isBetween } from '../Utilities/isBetween.js';
import { ZPalette } from '../Classes/ZPalette.js';
const { customElement, property, observe } = Poly;
/**
 * SVG-иконка Material Icons.
 * @customElement
 * @polymer
 */
let ZIcon = ZIcon_1 = class ZIcon extends PolymerElement {
    constructor() {
        super();
        /** Название иконки */
        this.name = '';
        /** Прозрачность иконки */
        this.opacity = 100;
        /** Признак отключенной/недоступной иконки */
        this.disabled = false;
        this.name = '';
        this.color = 'grey-600';
    }
    static get template() {
        return html `
    <style>
      :host { display: inline-flex; position: relative; border-radius: 50%; align-items: center; }
      :host([name='']) { width: 0; height: 0; padding: 0; transform: scale(0,0); transition: var(--z-medium-transition); }
      :host(:not([name=''])) { width: initial; height: initial; transform: scale(1,1); transition: var(--z-medium-transition); }
      :host ::slotted(svg) { fill: currentColor; }
      :host([size=""]) { width: 0px; height: 0px; }
      :host([size="14"]) { width: 14px; height: 14px; }
      :host([size="16"]) { width: 16px; height: 16px; }
      :host([size="18"]) { width: 18px; height: 18px; }
      :host([size="20"]) { width: 20px; height: 20px; }
      :host([size="22"]) { width: 22px; height: 22px; }
      :host([size="24"]) { width: 24px; height: 24px; }
      :host([size="26"]) { width: 26px; height: 26px; }
      :host([size="28"]) { width: 28px; height: 28px; }
      :host([size="30"]) { width: 30px; height: 30px; }
      :host([size="32"]) { width: 32px; height: 32px; }
      :host([size="34"]) { width: 34px; height: 34px; }
      :host([size="36"]) { width: 36px; height: 36px; }
      :host([size="38"]) { width: 38px; height: 38px; }
      :host([size="40"]) { width: 40px; height: 40px; }
      :host([size="42"]) { width: 42px; height: 42px; }
      :host([size="44"]) { width: 44px; height: 44px; }
      :host([size="46"]) { width: 46px; height: 46px; }
      :host([size="48"]) { width: 48px; height: 48px; }
      :host div { width: 100%; height: 100%; border-radius: 50%; }
    </style>
    <div><slot></slot></div>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        afterNextRender(this, () => {
            this.nameChanged(this.name, undefined);
        });
    }
    ;
    /** Ссылка на внутренний html-элемент div */
    get innerDiv() {
        return this.shadowRoot.querySelector('div');
    }
    ;
    opacityChanged(newVal, oldVal) {
        if (isBetween(newVal, 0, 100) && this.shadowRoot.querySelector('div'))
            this.shadowRoot.querySelector('div').style.setProperty('opacity', `var(--z-opacity-${newVal})`);
    }
    ;
    /**
       * Обозреватель изменения свойства name.
       *
       * Запрашивает SVG-элемент с идентификатором, равным новому значению свойства name,
       * в репозитории SVG-иконок (элемент z-icon-set).
       *
       * В случае успешного выполнения запроса удаляет существующий дочерний SVG-элемент
       * (если таковой имеется) с идентификатором, равным предыдущему значению свойства name,
       * затем добавляет полученный SVG-элемент к своему содержимому.
       *
       *
       * @param newName новое значение свойства
       * @param oldName предыдущее значение свойства
       */
    nameChanged(newName, oldName) {
        let repo = document.querySelector('z-icon-set');
        if (repo && newName !== undefined && newName !== null) {
            let _old = [...this.children].find(f => { return f.tagName.toLowerCase() === 'svg'; });
            let _new = repo.prepareSVGClone(newName);
            if (_old !== undefined && _old !== null)
                this.removeChild(_old);
            if (_new)
                this.appendChild(_new);
        }
        ;
    }
    ;
    colorChanged(newVal, oldVal) {
        if (this.innerDiv)
            this.innerDiv.style.color = ZPalette.computeRGB(newVal, false) || '';
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZIcon_1.prototype.nameChanged }),
    __metadata("design:type", String)
], ZIcon.prototype, "name", void 0);
__decorate([
    property({ notify: true, observer: ZIcon_1.prototype.colorChanged }),
    __metadata("design:type", String)
], ZIcon.prototype, "color", void 0);
__decorate([
    property({ notify: true, observer: ZIcon_1.prototype.opacityChanged }),
    __metadata("design:type", Number)
], ZIcon.prototype, "opacity", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZIcon.prototype, "size", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZIcon.prototype, "disabled", void 0);
ZIcon = ZIcon_1 = __decorate([
    customElement('z-icon'),
    __metadata("design:paramtypes", [])
], ZIcon);
export { ZIcon };
