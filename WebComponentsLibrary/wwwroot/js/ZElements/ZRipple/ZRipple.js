var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ZRipple_1;
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { afterNextRender } from '../../../lib/@polymer/polymer/lib/utils/render-status.js';
import { microTask, timeOut } from '../../../lib/@polymer/polymer/lib/utils/async.js';
import { getBoundings } from '../../Utilities/getBoundings.js';
import { isVoid } from '../../Utilities/isVoid.js';
import { ZPalette } from '../../Classes/ZPalette.js';
const { customElement, property, observe } = Poly;
/**
 *
 * @customElement
 * @polymer
 */
let ZRipple = ZRipple_1 = class ZRipple extends PolymerElement {
    constructor() {
        super();
        /**
         * При установке в true распространение эффекта ripple будет происходить волнообразно от центра элемента
         * При установке в false (по умолчанию) распространение эффекта ripple будет происходить волнообразно от точки контакта (прикосновения, клика мышкой и т.п.) с элементом
         */
        this.autoCenter = false;
        /**
         * Значение, равное true показывает, что эффект в данный момент визуализируется
         * Значение, равное false (по умолчанию) показывает, что эффект в данный момент не визуализируется
         */
        this.active = false;
        this.pressed = false;
        /**
         * При установке в true отключает эффект
         * При установке в false (по умолчанию) включает эффект
         */
        this.noTap = false;
        /** Цвет элемента */
        this.color = null;
        /** Интенсивность эффекта, применяемого к элементу */
        this.density = 'light';
        /** Timestamp последнего расчета эффекта */
        this.rippleTs = 0;
    }
    static get template() {
        return html `
		<style>
			:host { --ripple-density-pale: 0.06; --ripple-density-light: 0.1; --ripple-density-normal: 0.2; --ripple-density: var(--ripple-density-light); }
			:host { cursor: pointer; border-radius: inherit; bottom: 0; display: block; left: 0; position: absolute; right: 0; top: 0; }
			:host([no-tap]) { pointer-events: none !important; }
			:host([density="pale"]) { --ripple-density: var(--ripple-density-pale); }
			:host([density="light"]) { --ripple-density: var(--ripple-density-light); }
			:host([density="normal"]) { --ripple-density: var(--ripple-density-normal); }
			:host .ripple-ground, :host .ripple-waves { bottom: 0; left: 0; position: absolute; right: 0; top: 0; }
			:host .ripple-ground { background: currentColor; border-radius: inherit; opacity: 0; pointer-events: none !important; transition: opacity 0.47s; }
			:host .ripple-ground.rippling, :host .ripple-ground[active] { opacity: var(--ripple-density); }
			:host .ripple-waves { border-radius: inherit; overflow: hidden; pointer-events: none !important; }
			:host .ripple-waves.rippling, :host .ripple-waves[active] { transform: translate3d(0, 0, 0); }
			:host .ripple-waves * { background: currentColor; border-radius: 50%; opacity: var(--ripple-density); position: absolute; transform: translate(0, 0) scale(0); transition: opacity 0.47s, transform 0.47s; }
			:host .ripple-ground ~ .ripple-waves * { opacity: var(--ripple-density); }
			:host .ripple-waves .smoothing { opacity: 0 !important; transform: scale(1); transition: opacity 0.47s, transform 0.47s; }
		</style>
		<div class="ripple-ground" hidden$="[[autoCenter]]" active$="[[active]]"></div><div class="ripple-waves"></div>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        afterNextRender(this, () => {
            let rippleGround = this.shadowRoot.querySelector('.ripple-ground');
            microTask.run(() => rippleGround ? rippleGround.style.display = '' : null);
            this.addEventListener('click', ZRipple_1.prototype.handleTouch);
        });
    }
    ;
    ready() {
        super.ready();
        let rippleGround = this.shadowRoot.querySelector('.ripple-ground');
        microTask.run(() => rippleGround ? rippleGround.style.display = 'none' : null);
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', ZRipple_1.prototype.handleTouch);
    }
    ;
    /**
     * Обозреватель изменения цвета элемента
     * @param newVal новое значение цвета
     * @param oldVal предыдущее значение цвета
     */
    colorChanged(newVal, oldVal) {
        this.style.color = ZPalette.computeRGB(newVal, false) || null;
    }
    ;
    ripple(startX, startY) {
        if (this.shadowRoot.querySelector('.ripple-waves') === null)
            return;
        let rippleWaves = this.shadowRoot.querySelector('.ripple-waves'), rippleGround = this.shadowRoot.querySelector('.ripple-ground'), wave = rippleWaves.appendChild(document.createElement('div')), boundings = getBoundings(this), centerX = isVoid(startX) || !rippleGround || rippleGround.hasAttribute('hidden'), centerY = isVoid(startY) || !rippleGround || rippleGround.hasAttribute('hidden'), data = {
            radius: 0,
            left: 0,
            top: 0,
            dx: 0,
            dy: 0
        };
        this.rippleTs = Date.now();
        this.classList.add('rippling');
        data.radius = Math.floor(Math.max(boundings.width, boundings.height)) * 1.5;
        data.left = (centerX ? (boundings.width / 2) : Math.max(startX, boundings.left) - Math.min(startX, boundings.left)) - (data.radius / 2);
        data.top = (centerY ? (boundings.height / 2) : Math.max(startY, boundings.top) - Math.min(startY, boundings.top)) - (data.radius / 2);
        data.dx = (boundings.width / 2) - data.left - (data.radius / 2);
        data.dy = (boundings.height / 2) - data.top - (data.radius / 2);
        wave.style.height = `${data.radius}px`;
        wave.style.top = `${data.top}px`;
        wave.style.left = `${data.left}px`;
        wave.style.width = `${data.radius}px`;
        if (rippleGround)
            rippleGround.classList.add('rippling');
        rippleWaves.classList.add('rippling');
        wave.classList.add('rippling');
        requestAnimationFrame(() => __awaiter(this, void 0, void 0, function* () {
            wave.style.transform = `translate(${data.dx}px, ${data.dy}px) scale(1)`;
            if (!this.pressed)
                this.smooth();
        }));
    }
    ;
    smooth(force = false) {
        if (this.shadowRoot.querySelector('.ripple-waves') === null)
            return;
        let rippleWaves = this.shadowRoot.querySelector('.ripple-waves'), rippleGround = this.shadowRoot.querySelector('.ripple-ground'), elapsed = Date.now() - this.rippleTs, wave = rippleWaves.querySelector('.rippling'), last = rippleWaves.querySelectorAll('.rippling').length < 2;
        if (!wave)
            return;
        if (!force && elapsed < 300) {
            timeOut.run(() => __awaiter(this, void 0, void 0, function* () { return this.smooth(true); }), 300 - elapsed);
            return;
        }
        this.pressed = false;
        if (rippleGround && last)
            rippleGround.classList.remove('rippling');
        wave.classList.add('smoothing');
        wave.classList.remove('rippling');
        timeOut.run(() => __awaiter(this, void 0, void 0, function* () {
            rippleWaves.removeChild(wave) && (rippleWaves.children.length || rippleWaves.classList.remove('rippling'));
        }), 650);
        this.classList.remove('rippling');
    }
    ;
    /**
     * Обработчик touch-событий
     * @param event touch-событие
     */
    handleTouch(event) {
        this.pressed = true;
        (this.pressed) ? this.ripple(event.x, event.y) : this.smooth();
        this.pressed = false;
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZRipple.prototype, "autoCenter", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZRipple.prototype, "active", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], ZRipple.prototype, "pressed", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZRipple.prototype, "noTap", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZRipple_1.prototype.colorChanged }),
    __metadata("design:type", String)
], ZRipple.prototype, "color", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZRipple.prototype, "density", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], ZRipple.prototype, "rippleTs", void 0);
ZRipple = ZRipple_1 = __decorate([
    customElement('z-ripple'),
    __metadata("design:paramtypes", [])
], ZRipple);
export { ZRipple };
