var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZOverlay_1;
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { OverlayPosition, OptionRole, KeyCode } from "../../Enums/enums.js";
import { Targeter } from "../../Classes/Targeter.js";
import { getHeight } from "../../Utilities/getHeight.js";
import { getWidth } from "../../Utilities/getWidth.js";
import { isBetween } from "../../Utilities/isBetween.js";
import { findTarget } from "../../Utilities/findTarget.js";
import { stringToTargetDefinitions } from "../../Utilities/stringToTargetDefinitions.js";
import { setStyle } from "../../Utilities/setStyle.js";
import { alignElement } from "../../Utilities/alignElement.js";
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import { LegacyElementMixin } from '../../../lib/@polymer/polymer/lib/legacy/legacy-element-mixin.js';
const { customElement, property, observe } = Poly;
/**
 * Условия закрытия оверлея:
 *
 * (1) - нажата клавиша Esc, ИЛИ
 * (2) - активирована опция, переключающая подменю оверлея, ИЛИ
 * (3) - активирована дочерняя опция в оверлее, имеющая свойство hideMenu, равное {@link MenuBehaviourOnClick.hideParent}.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
/**
 *
 * @customElement
 * @polymer
 */
let ZOverlay = ZOverlay_1 = class ZOverlay extends LegacyElementMixin(PolymerElement) {
    constructor() {
        super();
        /** box-shadow */
        this.z = 8;
        /** максимальная высота элемента, измеряемая в количестве отображаемых опций */
        this.size = 8;
        /** признак выравнивания элемента по центру */
        this.autoCenter = false;
        /** выравнивание элемента относительно родительского элемента */
        this.position = OverlayPosition.baseline;
        /** дополнительное смещение элемента по горизонтали, в пикселях */
        this.xBias = 0;
        /** дополнительное смещение элемента по вертикали, в пикселях */
        this.yBias = 0;
        /** состояние элемента "отображается"/"не отображается" */
        this.showed = false;
        this.targeter = new Targeter();
        this.targeter = new Targeter();
    }
    static get template() {
        return html `
		<style>
			:host { box-sizing: border-box; display: block; opacity: 1; position: fixed; text-align: left; z-index: 10001; padding: 8px 0; background-color: hsl(0, 0%, 100%); width: max-content; }
			:host(:not([showed])) { opacity: 0 !important; pointer-events: none !important; visibility: hidden !important; transition: var(--z-medium-transition); }
			:host .wrapper { background: inherit; border-radius: inherit; box-sizing: border-box; display: block; height: 100%; transform: translate3d(0, 0, 9999px); transition: var(--z-medium-transition); }
			:host .body { box-sizing: border-box; display: block; height: 100%; overflow-x: hidden; overflow-y: auto; position: relative; background-color: hsl(0, 0%, 100%); transition: var(--z-medium-transition); }
				:host .body::-webkit-scrollbar { width: 6px; }
				:host .body::-webkit-scrollbar-thumb { background-color: hsla(0, 0%, 0%, 0.22); margin: 0.0vh 6px; }
				:host .body::-webkit-scrollbar-track { margin: 0.0vh 6px; }
				:host .body::-webkit-scrollbar-track-piece { background-color: hsla(0, 0%, 0%, 0.1); }
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
        this.addEventListener('option-activated', ZOverlay_1.prototype.handleOptionActivated);
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('option-activated', ZOverlay_1.prototype.handleOptionActivated);
    }
    ;
    /** Позиционирует элемент относительно своего переключателя */
    align() {
        let item = (this.queryDistributedElements('z-option')) ? this.queryDistributedElements('z-option')[0] : null;
        this.shadowRoot.querySelector('#theBody').style.maxHeight = (item && this.size) ? `${getHeight(item) * this.size}px` : ``;
        this.showed && alignElement(this, this.targeter.defaultTarget, this.position, this.autoCenter, this.xBias, this.yBias);
        if (this.showed) {
            let left = parseInt(this.style.left);
            let top = parseInt(this.style.top);
            setStyle(this, 'left', (left + this.xBias) + 'px');
            setStyle(this, 'top', (top + this.yBias) + 'px');
            if (this.targeter.defaultTarget && this.targeter.defaultTarget.type !== OptionRole.sub)
                setStyle(this, 'width', `${getWidth(this.targeter.defaultTarget)}px`);
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
        (this.showed) ? this.hide() : this.show();
    }
    ;
    /**
     * Обозреватель изменения визуальной высоты подъема элемента
     * @param newVal новое значение
     * @param oldVal предыдущее значение
     */
    zChanged(newVal, oldVal) {
        if (isBetween(newVal, 0, 24)) {
            this.style.setProperty('box-shadow', `var(--z-shadow-z${newVal})`);
        }
        ;
    }
    ;
    /**
     * Обозреватель изменения максимальной высоты прокручиваемой области элемента
     * @param newSize новое значение
     * @param oldSize предыдущее значение
     */
    sizeChanged(newSize, oldSize) {
        let item = (this.queryDistributedElements('z-option')) ? this.queryDistributedElements('z-option')[0] : null;
        this.shadowRoot.querySelector('#theBody').style.maxHeight = (item && newSize) ? `${getHeight(item) * newSize}px` : ``;
    }
    ;
    /**
     * Обозреватель изменения видимости элемента
     * @param newValue новое значение
     * @param oldValue предыдущее значение
     */
    showedChanged(newValue, oldValue) {
        this.align();
        if (newValue) {
            window.addEventListener('click', this.handleHide);
            window.addEventListener('keyup', this.handleHide);
            window.addEventListener('resize', this.handleResize);
            let selOpt = this.querySelector('z-option');
            if (selOpt)
                selOpt.focus();
        }
        else {
            window.removeEventListener('click', this.handleHide);
            window.removeEventListener('keyup', this.handleHide);
            window.removeEventListener('resize', this.handleResize);
            if (oldValue)
                findTarget(this.targeter.items[0].target).focus();
        }
        ;
    }
    ;
    /**
     * Обозреватель изменения типа выравнивания элемента
     * Пересчитывает позиционирование элемента относительно своего переключателя
     * @param now новый тип выравнивания
     * @param before предыдущий тип выравнивания
     */
    positionChanged(now, before) {
        this.align();
    }
    ;
    handleHide(e) {
        if ((e.target['parentNode'] !== this && e['path'][0] !== this.targeter.defaultTarget && e.target['parentNode'] !== this.domHost && e['path'][0].parentNode !== this.domHost) || e['keyCode'] == KeyCode.Escape) {
            window.removeEventListener('click', this.handleHide);
            window.removeEventListener('keyup', this.handleHide);
            window.removeEventListener('resize', this.handleResize);
            setTimeout(() => {
                //e.stopPropagation();
                this.hide();
            }, 220);
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
        if (targ.parentNode === this || targ.parentNode === this.parentNode || targ.parentNode === this.domHost)
            if (targ.hideMenu)
                setTimeout(() => {
                    //ev.stopPropagation();
                    this.hide();
                }, 280);
    }
    ;
    triggersChanged(now, before) {
        if (now !== null && now !== undefined) {
            this.targeter.removeAll();
            setTimeout(() => {
                if (now !== '') {
                    let arr = stringToTargetDefinitions(now);
                    this.targeter.addMany(arr);
                }
                ;
                this.align();
            }, 0);
        }
        ;
    }
    ;
    exec() {
        if (this.triggers && this.targeter)
            this.targeter.exec();
    }
    ;
};
__decorate([
    property({ notify: true, observer: ZOverlay_1.prototype.zChanged }),
    __metadata("design:type", Number)
], ZOverlay.prototype, "z", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZOverlay_1.prototype.sizeChanged }),
    __metadata("design:type", Number)
], ZOverlay.prototype, "size", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", Boolean)
], ZOverlay.prototype, "autoCenter", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ZOverlay.prototype, "position", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], ZOverlay.prototype, "xBias", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], ZOverlay.prototype, "yBias", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZOverlay_1.prototype.showedChanged }),
    __metadata("design:type", Boolean)
], ZOverlay.prototype, "showed", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZOverlay_1.prototype.triggersChanged }),
    __metadata("design:type", String)
], ZOverlay.prototype, "triggers", void 0);
ZOverlay = ZOverlay_1 = __decorate([
    customElement('z-overlay'),
    __metadata("design:paramtypes", [])
], ZOverlay);
export { ZOverlay };
