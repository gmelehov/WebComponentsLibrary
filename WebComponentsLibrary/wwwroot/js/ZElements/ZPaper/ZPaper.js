var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZPaper_1;
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import { ZPalette } from '../../Classes/ZPalette.js';
const { customElement, property, observe } = Poly;
/**
 * Material Paper
 * @customElement
 * @polymer
 */
let ZPaper = ZPaper_1 = class ZPaper extends PolymerElement {
    constructor() {
        super();
        this.padding = 0;
        this.bColor = null;
        this.z = 0;
    }
    static get template() {
        return html `
		<style>
			:host { display: block; }
			:host([padding="0"]) { padding: 0px; }
			:host([padding="2"]) { padding: 2px; }
			:host([padding="4"]) { padding: 4px; }
      :host([padding="6"]) { padding: 6px; }
			:host([padding="8"]) { padding: 8px; }
			:host([padding="10"]) { padding: 10px; }
			:host([padding="12"]) { padding: 12px; }
      :host([padding="14"]) { padding: 14px; }
			:host([padding="16"]) { padding: 16px; }
			:host([padding="18"]) { padding: 18px; }
      :host([padding="20"]) { padding: 20px; }
			:host([padding="24"]) { padding: 24px; }
			:host([z="0"]) { box-shadow: var(--z-shadow-z0); }
			:host([z="1"]) { box-shadow: var(--z-shadow-z1); }
			:host([z="2"]) { box-shadow: var(--z-shadow-z2); }
			:host([z="3"]) { box-shadow: var(--z-shadow-z3); }
			:host([z="4"]) { box-shadow: var(--z-shadow-z4); }
			:host([z="5"]) { box-shadow: var(--z-shadow-z5); }
			:host([z="6"]) { box-shadow: var(--z-shadow-z6); }
			:host([z="7"]) { box-shadow: var(--z-shadow-z7); }
			:host([z="8"]) { box-shadow: var(--z-shadow-z8); }
			:host([z="9"]) { box-shadow: var(--z-shadow-z9); }
			:host([z="10"]) { box-shadow: var(--z-shadow-z10); }
			:host([z="11"]) { box-shadow: var(--z-shadow-z11); }
			:host([z="12"]) { box-shadow: var(--z-shadow-z12); }
			:host([z="13"]) { box-shadow: var(--z-shadow-z13); }
			:host([z="14"]) { box-shadow: var(--z-shadow-z14); }
			:host([z="15"]) { box-shadow: var(--z-shadow-z15); }
			:host([z="16"]) { box-shadow: var(--z-shadow-z16); }
			:host([z="17"]) { box-shadow: var(--z-shadow-z17); }
			:host([z="18"]) { box-shadow: var(--z-shadow-z18); }
			:host([z="19"]) { box-shadow: var(--z-shadow-z19); }
			:host([z="20"]) { box-shadow: var(--z-shadow-z20); }
			:host([z="21"]) { box-shadow: var(--z-shadow-z21); }
			:host([z="22"]) { box-shadow: var(--z-shadow-z22); }
			:host([z="23"]) { box-shadow: var(--z-shadow-z23); }
			:host([z="24"]) { box-shadow: var(--z-shadow-z24); }
		</style>
		<slot></slot>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    bColorChanged(now, before) {
        this.style.backgroundColor = ZPalette.computeRGB(now, false) || '';
    }
    ;
};
__decorate([
    property({ type: Number, reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZPaper.prototype, "padding", void 0);
__decorate([
    property({ type: String, reflectToAttribute: true, notify: true, observer: ZPaper_1.prototype.bColorChanged }),
    __metadata("design:type", String)
], ZPaper.prototype, "bColor", void 0);
__decorate([
    property({ type: Number, reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZPaper.prototype, "z", void 0);
ZPaper = ZPaper_1 = __decorate([
    customElement('z-paper'),
    __metadata("design:paramtypes", [])
], ZPaper);
export { ZPaper };
