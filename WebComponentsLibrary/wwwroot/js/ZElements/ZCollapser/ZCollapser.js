var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZCollapser_1;
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import { fireCustomEvent } from '../../Utilities/fireCustomEvent.js';
import { EventType } from '../../Enums/enums.js';
const { customElement, property, observe } = Poly;
let ZCollapser = ZCollapser_1 = class ZCollapser extends PolymerElement {
    constructor() {
        super();
        this.name = '';
        this.opened = false;
        /** Опциональная иконка, отображаемая перед текстом подзаголовка */
        this.icon = '';
        /** Относительные размеры основной иконки, отображаемой перед текстом опции */
        this.iconSize = 20;
        /** Относительные размеры подзаголовка */
        this.size = 18;
        this.weight = 300;
        /** Высота подзаголовка в пикселях */
        this.h = 36;
        /** Цвет подзаголовка */
        this.color = 'grey-600';
    }
    static get template() {
        return html `
		<style> :host { display: block; } </style>
		<z-subheader  id="mySubheader" 
                  size="{{size}}"
                  weight="{{weight}}"
                  h="{{h}}" 
                  color="{{color}}"
                  icon-size="{{iconSize}}">
			<z-option icon="{{icon}}" 
                icon-size="{{iconSize}}" 
                type="collapser" 
                name="{{name}}" 
                active="{{opened}}" 
                icon-color="{{color}}" 
                h="{{h}}" 
                no-check>
        <slot></slot>
      </z-option>
		</z-subheader>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    get details() {
        return {
            id: this.id,
            name: this.name,
            opened: this.opened,
            icon: this.icon,
            iconSize: this.iconSize,
            size: this.size,
            h: this.h,
            color: this.color
        };
    }
    ;
    openedChanged(newval, oldval) {
        fireCustomEvent(this, EventType.collapserToggled, this.details);
    }
    ;
    setSubheaderUnderlined(val) {
        let subheader = this.$.mySubheader;
        if (subheader)
            subheader.underlined = !!val;
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZCollapser.prototype, "name", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZCollapser_1.prototype.openedChanged }),
    __metadata("design:type", Boolean)
], ZCollapser.prototype, "opened", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZCollapser.prototype, "icon", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZCollapser.prototype, "iconSize", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", Number)
], ZCollapser.prototype, "size", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZCollapser.prototype, "weight", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", Number)
], ZCollapser.prototype, "h", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZCollapser.prototype, "color", void 0);
ZCollapser = ZCollapser_1 = __decorate([
    customElement('z-collapser'),
    __metadata("design:paramtypes", [])
], ZCollapser);
export { ZCollapser };
