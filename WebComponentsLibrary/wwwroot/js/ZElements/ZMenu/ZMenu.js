var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZMenu_1;
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import { OverlayPosition, KeyCode } from '../../Enums/enums.js';
import { getHeight } from '../../Utilities/getHeight.js';
import { findTarget } from '../../Utilities/findTarget.js';
import { alignElement } from '../../Utilities/alignElement.js';
import { setStyle } from '../../Utilities/setStyle.js';
import { isBetween } from '../../Utilities/isBetween.js';
const { customElement, property, observe } = Poly;
/**
 * Меню
 * @customElement
 * @polymer
 */
let ZMenu = ZMenu_1 = class ZMenu extends PolymerElement {
    constructor() {
        super();
        this.id = '';
        this.target = '';
        /** box-shadow */
        this.z = 10;
        /** максимальная высота элемента, измеряемая в количестве отображаемых опций */
        this.size = 16;
        /** состояние элемента "отображается"/"не отображается" */
        this.showed = false;
        this.overlay = OverlayPosition.baseline;
        this.hAlign = "left";
    }
    static get template() {
        return html `
		<style>
			:host { box-sizing: border-box; display: block; opacity: 1; position: fixed; text-align: left; z-index: 10001; padding: 8px 0; background-color: hsl(0, 0%, 100%); width: max-content; transition: var(--z-medium-transition); }
			:host(:not([showed])) { opacity: 0 !important; pointer-events: none !important; visibility: hidden !important; }
			:host .wrapper { background: inherit; border-radius: inherit; box-sizing: border-box; display: block; height: 100%; transform: translate3d(0, 0, 9999px); }
			:host .body { box-sizing: border-box; display: block; height: 100%; overflow-x: hidden; overflow-y: auto; position: relative; background-color: hsl(0, 0%, 100%); }
				:host .body::-webkit-scrollbar { width: 6px; }
				:host .body::-webkit-scrollbar-thumb { background-color: hsla(0, 0%, 0%, 0.22); margin: 0.0vh 6px; }
				:host .body::-webkit-scrollbar-track { margin: 0.0vh 6px; }
				:host .body::-webkit-scrollbar-track-piece { background-color: hsla(0, 0%, 0%, 0.1); }
			::slotted(z-option) { padding: 0 8px; }
		</style>
		<div class="wrapper">
			<div id="theBody" class="body">
				<slot></slot>
			</div>
		</div>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        this.handleHide = this.handleHide.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.addEventListener('option-activated', ZMenu_1.prototype.handleOptionActivated);
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('option-activated', ZMenu_1.prototype.handleOptionActivated);
    }
    ;
    /** Позиционирует элемент относительно своего переключателя */
    align() {
        let item = (this.querySelectorAll('z-option')) ? this.querySelectorAll('z-option')[0] : null;
        this.shadowRoot.querySelector('#theBody').style.maxHeight = (item && this.size) ? `${getHeight(item) * this.size}px` : ``;
        let target = findTarget(this.target);
        alignElement(this, target, this.overlay, false, 0, 0);
        if (this.showed) {
            let left = parseInt(this.style.left);
            let top = parseInt(this.style.top);
            setStyle(this, 'left', (left) + 'px');
            setStyle(this, 'top', (top) + 'px');
        }
        ;
    }
    ;
    /** Скрывает элемент */
    hide() {
        this.showed = false;
    }
    ;
    /** Отображает элемент */
    show() {
        this.showed = true;
    }
    ;
    /** Переключает режим видимости элемента */
    toggle() {
        this.showed = !this.showed;
        //(this.showed) ? this.hide() : this.show();
    }
    ;
    /**
     *
     * @param now
     * @param before
     */
    zChanged(now, before) {
        if (isBetween(now, 0, 24))
            this.style.setProperty('box-shadow', `var(--z-shadow-z${now})`);
    }
    ;
    /**
     *
     * @param now
     * @param before
     */
    sizeChanged(now, before) {
        let item = (this.querySelectorAll('z-option')) ? this.querySelectorAll('z-option')[0] : null;
        this.shadowRoot.querySelector('#theBody').style.maxHeight = (item && now) ? `${getHeight(item) * now}px` : ``;
    }
    ;
    /**
     *
     * @param now
     * @param before
     */
    showedChanged(now, before) {
        this.align();
        if (now) {
            window.addEventListener('click', this.handleHide);
            window.addEventListener('keyup', this.handleHide);
            window.addEventListener('resize', this.handleResize);
            let selOpt = this.querySelector('z-option');
            if (selOpt) {
                setTimeout(() => { selOpt.focus(); }, 250);
            }
            ;
        }
        else {
            window.removeEventListener('click', this.handleHide);
            window.removeEventListener('keyup', this.handleHide);
            window.removeEventListener('resize', this.handleResize);
            if (before)
                findTarget(this.target).focus();
        }
        ;
    }
    ;
    handleHide(e) {
        console.dir(e);
        console.dir(e.target['parentNode']);
        console.dir(e.target);
        if ((e.target['parentNode'] !== this && e.target['id'] !== this.target) || e['keyCode'] == KeyCode.Escape) {
            window.removeEventListener('click', this.handleHide);
            window.removeEventListener('keyup', this.handleHide);
            window.removeEventListener('resize', this.handleResize);
            this.hide();
        }
        ;
    }
    ;
    handleResize(event) {
        this.align();
    }
    ;
    handleOptionActivated(ev) {
        let targ = ev.target;
        if (targ.parentNode === this || targ.parentNode === this.parentNode) {
            //if (targ.type !== OptionRole.toggle)
            if (!!targ.hideMenu) {
                this.hide();
            }
            ;
        }
        ;
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZMenu.prototype, "id", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZMenu.prototype, "target", void 0);
__decorate([
    property({ notify: true, observer: ZMenu_1.prototype.zChanged }),
    __metadata("design:type", Number)
], ZMenu.prototype, "z", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZMenu_1.prototype.sizeChanged }),
    __metadata("design:type", Number)
], ZMenu.prototype, "size", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZMenu_1.prototype.showedChanged }),
    __metadata("design:type", Boolean)
], ZMenu.prototype, "showed", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZMenu.prototype, "overlay", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZMenu.prototype, "hAlign", void 0);
ZMenu = ZMenu_1 = __decorate([
    customElement('z-menu'),
    __metadata("design:paramtypes", [])
], ZMenu);
export { ZMenu };
