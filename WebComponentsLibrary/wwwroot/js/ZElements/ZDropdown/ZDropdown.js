var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZDropdown_1;
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../../lib/@polymer/polymer/lib/utils/render-status.js';
import { OverlayPosition, OptionRole, EventType } from '../../Enums/enums.js';
import { fireCustomEvent } from '../../Utilities/fireCustomEvent.js';
import { getWidth } from '../../Utilities/getWidth.js';
import { alignElement } from '../../Utilities/alignElement.js';
import { setStyle } from '../../Utilities/setStyle.js';
const { customElement, property, observe } = Poly;
/** Выпадающий список */
let ZDropdown = ZDropdown_1 = class ZDropdown extends PolymerElement {
    constructor() {
        super();
        /** Идентификатор элемента */
        this.id = '';
        /** Текстовая метка, относящаяся к элементу */
        this.label = '';
        /** Наименование выбранной в настоящий момент опции */
        this.name = '';
        /** Значение выбранной в настоящий момент опции */
        this.val = '';
        /** Иконка выбранной в настоящий момент опции */
        this.icon = '';
        /** Цвет иконки выбранной в настоящий момент опции */
        this.color = 'grey-500';
        /** Максимальная высота раскрывающегося списка опций (максимальное количество одновременно отображаемых опций в списке выбора) */
        this.size = 8;
        /** Визуальный размер элементов-опций, содержащихся в элементе dropdown */
        this.optSize = 28;
        /** Если true, элемент dropdown недоступен/отключен; если false - элемент доступен/включен */
        this.disabled = false;
        /** Если true, элемент dropdown допускает множественный выбор опций; если false (по умолчанию) - элемент допускает выбор только одной опции из списка */
        this.multi = false;
        /** Если true - элемент dropdown получил фокус ввода */
        this.focused = false;
        /** Если true - список опций элемента dropdown открыт; если false - список опций закрыт */
        this.showed = false;
        /** Краткое описание элемента */
        this.descr = '';
        /** Свойство элементов-опций, привязанное к свойству val элемента dropdown */
        this.indexAttr = 'id';
        /** Свойство элементов-опций, привязанное к свойству val элемента dropdown */
        this.overPos = OverlayPosition.baseline;
    }
    static get template() {
        return html `
    ${this.styleTemplate}
    ${this.domTemplate}
    `;
    }
    ;
    static get styleTemplate() {
        return html `
    <style>
			:host { display: block; }
			:host(:focus) { outline: none; }
			:host > div { position: relative; user-select: none; }
			.main { display: flex; align-items: center; position: relative; }
			.main #overlayTrigger { width: 100%; }
			:host .main label { position: absolute; transform: translateY(-160%); transition: var(--z-medium-transition); font-size: 12px; opacity: 0.36; padding-left: 6px; cursor: default; }
			:host([val='']) .main label { position: absolute; transform: translateY(0%); transition: var(--z-medium-transition); opacity: 0.45; padding-left: 6px; font-size: calc(var(--z-default-font-size) * 1px); }
			.underline { width: 100%; }
			.underline .focused { border-top: 2px solid currentColor; color: var(--mat-focused-color, #0091EA); margin-top: -1px; transform: scale(0, 1); transition: transform var(--z-medium-transition); }
			.underline[focused] .focused { transform: scale(1, 1); }
			.underline .default { border-top: 1px solid currentColor; transition: border var(--z-medium-transition); opacity: 0.08; }
			:host([disabled]) .underline .default { border-top: 1px dashed currentColor; }
			.helper { font-size: 11px; opacity: 0.36; padding-left: 6px; cursor: default; }
			.helper:empty { padding-left: 0; }
		</style>
    `;
    }
    ;
    static get domTemplate() {
        return html `	
		<div>
			<div id="mainDiv" class="main">
				<label for="inp">{{label}}</label>
				<z-option   id="overlayTrigger" 
                    val="{{val}}" 
                    name="{{name}}" 
                    icon="{{icon}}" 
                    icon-color="{{color}}" 
                    icon-size="20" 
                    h="{{optSize}}" 
                    type="dropdown" 
                    disabled="{{disabled}}" 
                    triggers="{{id}} [toggleOverlay]" 
                    on-focus="handleFocused" 
                    on-blur="handleBlurred" 
                    on-option-activated="toggleOverlay">
        </z-option>
				<z-overlay  id="inpSel" 
                    triggers="overlayTrigger" 
                    position="{{overPos}}" 
                    showed="{{showed}}" 
                    size="{{size}}">
					<slot></slot>
				</z-overlay>
			</div>
			<div focused$="{{focused}}" class="underline">
				<div class="default"></div>
				<div class="focused"></div>
			</div>
			<span class="helper">{{descr}}</span>
		</div>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        afterNextRender(this, () => {
            this.setAttribute('tabindex', '0');
            this.addEventListener('option-activated', ZDropdown_1.prototype.handleOptionActivated);
            this.addEventListener('focus', ZDropdown_1.prototype.handleFocused);
            this.addEventListener('blur', ZDropdown_1.prototype.handleBlurred);
            let overlay = this.shadowRoot.querySelector('#inpSel');
            setTimeout(() => {
                overlay.targeter.items[0].target = this.$.overlayTrigger;
                alignElement(overlay, this.$.overlayTrigger, this.overPos, false, 0, 0);
                let mainWidth = getWidth(this.$.overlayTrigger);
                setStyle(overlay, 'width', `${mainWidth}px`);
                this.computeName();
            }, 50);
        });
    }
    ;
    handleFocused(ev) {
        if (!this.disabled)
            this.focused = true;
    }
    ;
    handleBlurred(ev) {
        this.focused = false;
    }
    ;
    toggleOverlay() {
        if (!this.disabled) {
            this.$.inpSel.showed = true;
            let selOpt = this.querySelector(`z-option[${this.indexAttr}='${this.val}']`) || this.querySelectorAll('z-option')[0];
            if (selOpt)
                selOpt.focus();
        }
        ;
    }
    ;
    handleOptionActivated(ev) {
        let targ = ev.target;
        if (targ.parentNode === this && targ.id !== 'overlayTrigger') {
            if (this.multi) {
                let optSelected = [...this.querySelectorAll('z-option[active]:not([type="dropdown"])')];
                this.val = optSelected.map(m => { return m.val; }).join(', ');
            }
            else {
                this.val = targ[this.indexAttr];
                let prevActive = [...this.querySelectorAll('z-option[active]:not([type="dropdown"])')].find(f => { return f[this.indexAttr] != this.val; });
                if (prevActive)
                    prevActive.active = false;
            }
            ;
            setTimeout(() => {
                this.icon = targ.icon;
                this.color = targ.iconColor;
                this.focused = true;
                this.$.overlayTrigger.focus();
            }, 280);
        }
        ;
    }
    ;
    valChanged(now, before) {
        this.computeName();
    }
    ;
    computeName() {
        if (this.multi) {
            let optSelected = [...this.querySelectorAll('z-option[active]:not([type="dropdown"])')];
            this.name = optSelected.map(m => { return m.name; }).join(', ');
        }
        else {
            let found = [...this.querySelectorAll('z-option')].find(f => { return f[this.indexAttr] == this.val; });
            if (found) {
                this.name = found.name;
                found.active = true;
            }
            ;
        }
        ;
        fireCustomEvent(this, EventType.valueChanged, { id: this.id, name: this.name, value: this.val });
    }
    ;
    multiChanged(now, before) {
        let options = [...this.querySelectorAll('z-option:not([type="dropdown"])')];
        if (now) {
            let val = this.val.split(/,\s+/);
            options.forEach(f => {
                f.type = OptionRole.toggle;
                if (val.includes(f.val))
                    f.active = true;
            });
        }
        else if (before !== undefined) {
            options.forEach(f => { f.type = OptionRole.simple; });
        }
    }
    ;
    /**
     * Обозреватель изменения стандартного визуального размера элементов-опций
     * Применяет новый визуальный размер ко всем элементам-опциям, содержащимся в элементе dropdown
     * @param now новое значение визуального размера
     * @param before предыдущее значение визуального размера
     */
    optSizeChanged(now, before) {
        if (now) {
            let options = [...this.querySelectorAll('z-option')];
            options.forEach(f => { f.h = now; });
        }
        ;
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZDropdown.prototype, "id", void 0);
__decorate([
    property({ reflectToAttribute: true }),
    __metadata("design:type", String)
], ZDropdown.prototype, "label", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZDropdown.prototype, "name", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZDropdown_1.prototype.valChanged }),
    __metadata("design:type", String)
], ZDropdown.prototype, "val", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZDropdown.prototype, "icon", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZDropdown.prototype, "color", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZDropdown.prototype, "size", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZDropdown_1.prototype.optSizeChanged }),
    __metadata("design:type", Number)
], ZDropdown.prototype, "optSize", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZDropdown.prototype, "disabled", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZDropdown_1.prototype.multiChanged }),
    __metadata("design:type", Boolean)
], ZDropdown.prototype, "multi", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZDropdown.prototype, "focused", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", Boolean)
], ZDropdown.prototype, "showed", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ZDropdown.prototype, "descr", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZDropdown.prototype, "indexAttr", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZDropdown.prototype, "overPos", void 0);
ZDropdown = ZDropdown_1 = __decorate([
    customElement('z-dropdown'),
    __metadata("design:paramtypes", [])
], ZDropdown);
export { ZDropdown };
