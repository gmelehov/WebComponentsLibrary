var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../../lib/@polymer/polymer/lib/utils/render-status.js';
import { OverlayPosition } from '../../Enums/enums.js';
import { alignElement } from '../../Utilities/alignElement.js';
const { customElement, property, observe, query } = Poly;
/**
 * Вложенное (подчиненное) меню
 * @customElement
 * @polymer
 */
let ZSubmenu = class ZSubmenu extends PolymerElement {
    constructor() {
        super();
        /** Основная иконка, отображаемая перед текстом подменю */
        this.icon = '';
        /** Отображаемый текст подменю */
        this.name = '';
        /** состояние элемента "отображается"/"не отображается" */
        this.showed = false;
    }
    static get template() {
        return html `
		<style> 
			:host { display: block; } 
			:host z-option, :host ::slotted(z-option) { padding: 0 8px; }
		</style>
		<z-option id="opt" type="sub" icon="[[icon]]" name="[[name]]" on-option-activated="handleShow" tabindex="0"></z-option>
		<z-overlay id="olay" position="aside" showed="{{showed}}" triggers="opt" z="8" size="8"><slot></slot></z-overlay>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        afterNextRender(this, () => {
            setTimeout(() => {
                this.zolay.targeter.items[0].target = this.zopt;
                alignElement(this.zolay, this.zopt, OverlayPosition.aside, false, 0, 0);
            }, 200);
        });
    }
    ;
    get zopt() {
        return this.shadowRoot.querySelector('#opt');
    }
    ;
    get zolay() {
        return this.shadowRoot.querySelector('#olay');
    }
    ;
    /** Позиционирует элемент относительно своего переключателя */
    align() {
        this.zolay.align();
    }
    ;
    /** Скрывает элемент */
    hide() {
        this.zolay.showed = false;
        this.showed = false;
    }
    ;
    /** Отображает элемент */
    show() {
        this.zolay.showed = true;
        this.showed = true;
        if (this.zopt)
            this.zopt.focus();
    }
    ;
    /** Переключает режим видимости элемента */
    toggle() {
        (this.showed) ? this.hide() : this.show();
    }
    ;
    handleShow(ev) {
        ev.stopPropagation();
        this.show();
    }
    ;
};
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZSubmenu.prototype, "icon", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZSubmenu.prototype, "name", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZSubmenu.prototype, "showed", void 0);
ZSubmenu = __decorate([
    customElement('z-submenu'),
    __metadata("design:paramtypes", [])
], ZSubmenu);
export { ZSubmenu };
