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
const { customElement, property, observe } = Poly;
let ZExpandable = class ZExpandable extends PolymerElement {
    constructor() {
        super();
        this.opened = false;
        this.opened = false;
    }
    static get template() {
        return html `
    <style>
			:host { display: block; overflow: hidden; max-width: 100%; transition: var(--z-transition); }
      :host(:not([opened])) > section { max-height: 0; transition: var(--z-transition); }
      :host([opened]) > section { max-height: 100vh; transition: var(--z-transition); }
		</style>
    <section><slot></slot></section>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    toggle() {
        this.opened = !this.opened;
    }
    ;
};
__decorate([
    property({ notify: true, reflectToAttribute: true }),
    __metadata("design:type", Boolean)
], ZExpandable.prototype, "opened", void 0);
ZExpandable = __decorate([
    customElement('z-expandable'),
    __metadata("design:paramtypes", [])
], ZExpandable);
export { ZExpandable };
