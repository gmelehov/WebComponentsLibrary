var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { timeOut, animationFrame } from '../../lib/@polymer/polymer/lib/utils/async.js';
const { customElement, property, observe } = Poly;
/**
 * Страница приложения
 * @customElement
 * @polymer
 */
let ZPage = class ZPage extends PolymerElement {
    constructor() {
        super();
        this.showDrawer = false;
    }
    static get template() {
        return html `
    <style>
      :host { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100vh; }
      :host { display: grid; grid-template-rows: 5vh 95vh }
      :host > header { grid-row: 1/2; height: 5vh; box-shadow: var(--z-shadow-z4); z-index: 990; transition: all 500ms cubic-bezier(.67,0.03,.34,1.04); padding: 0 0.75vw; display: flex; align-items: center; background-color: hsl(142, 50%, 32%) !important; }
      :host > main { grid-row: 2/3; height: 95vh; width: 100%; overflow-y: auto; overflow-x: hidden; transition: all 500ms cubic-bezier(.67,0.03,.34,1.04); }
      :host > aside { position: absolute; top: 0; bottom: 0; width: 25vw; z-index: 1000; background-color: hsl(0, 0%, 100%); box-shadow: var(--z-shadow-z12); transition: all 500ms cubic-bezier(.67,0.03,.34,1.04); }
      :host([show-drawer]) > aside { left: 0; }
      :host(:not([show-drawer])) > aside { left: -25vw; }
      :host([show-drawer]) > main, :host([show-drawer]) > header { background-color: hsla(0, 0%, 0%, 0.3); filter: saturate(0.8) opacity(0.5) contrast(0.5); }
    </style>
    <header>
      <z-icon-button size="24" i-color="white" i-icon="menu" on-click="handleDrawerMenuClick"></z-icon-button>
      <slot name="hdr"></slot>
    </header>
    <main><slot></slot></main>
    <aside>
      <slot name="drw"></slot>
    </aside>
    `;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        afterNextRender(this, () => {
            this.mainElem.addEventListener('click', this.handleMainElemClick.bind(this));
        });
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
        this.mainElem.removeEventListener('click', this.handleMainElemClick.bind(this));
    }
    ;
    get mainElem() {
        return this.shadowRoot.querySelector('main');
    }
    ;
    get hdrElem() {
        return this.shadowRoot.querySelector('header');
    }
    ;
    toggleDrawer() {
        this.showDrawer = !this.showDrawer;
    }
    ;
    doShowDrawer() {
        this.showDrawer = true;
    }
    ;
    doHideDrawer() {
        this.showDrawer = false;
    }
    ;
    handleDrawerMenuClick(e) {
        timeOut.run(() => animationFrame.run(() => this.doShowDrawer()), 280);
    }
    ;
    handleMainElemClick(e) {
        this.doHideDrawer();
    }
    ;
};
__decorate([
    property({ notify: true, reflectToAttribute: true }),
    __metadata("design:type", Boolean)
], ZPage.prototype, "showDrawer", void 0);
ZPage = __decorate([
    customElement('z-page'),
    __metadata("design:paramtypes", [])
], ZPage);
export { ZPage };
