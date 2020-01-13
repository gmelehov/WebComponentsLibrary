var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZExpander_1;
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { findFirstElement } from '../Utilities/findFirstElement.js';
import { findLastElement } from '../Utilities/findLastElement.js';
import { fireCustomEvent } from '../Utilities/fireCustomEvent.js';
import { EventType } from '../Enums/enums.js';
import { timeOut, animationFrame } from '../../lib/@polymer/polymer/lib/utils/async.js';
import { findParentElement } from '../Utilities/findParentElement.js';
const { customElement, property, observe, computed } = Poly;
/**
 * Раскрывающийся контейнер
 * @customElement
 * @polymer
 */
let ZExpander = ZExpander_1 = class ZExpander extends PolymerElement {
    constructor() {
        super();
        /** Заголовок панели */
        this.name = '';
        /** Опциональная иконка, отображаемая перед текстом заголовка панели */
        this.icon = null;
        /** Размер опциональной иконки, в пикселях */
        this.iconSize = null;
        /** Цвет заголовка панели */
        this.color = 'grey-600';
        /** Если true, содержимое панели раскрыто. Если false (по умолчанию), содержимое панели закрыто */
        this.opened = false;
        /** Если true, то открытая панель имеет верхние и нижние отступы. Если false (по умолчанию), то открытая панель не имеет верхних и нижних отступов */
        this.popout = false;
        /** Относительная высота (поднятие) панели над плоскостью */
        this.z = 1;
        /**
         * Настройка режима подчеркивания заголовка панели
         * always = заголовок подчеркнут всегда
         * opened = заголовок подчеркнут только при раскрытой панели
         * never = заголовок никогда не подчеркивается
         */
        this.underline = 'opened';
    }
    static get template() {
        return html `
    <style>
      :host { display: block; transition: var(--z-transition);  }
      :host > z-paper { height: inherit; }
      :host([opened][popout]:not(:first-of-type):not(:last-of-type)) { margin: 10px 0; }
			:host([opened][popout]:first-of-type) { margin: 0 0 10px 0; }
			:host([opened][popout]:last-of-type) { margin: 10px 0 0 0; }

      :host(:first-of-type) > z-paper { border-radius: 4px 4px 0 0; }
      :host(:last-of-type) > z-paper { border-radius: 0 0 4px 4px; }
    </style>
    <z-paper z="{{z}}" b-color="white">
      <z-collapser name="{{name}}" icon="{{icon}}" icon-size="{{iconSize}}" color="{{color}}" on-click="toggleOpened"></z-collapser>
      <z-expandable><slot></slot></z-expandable>
    </z-paper>`;
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
            icon: this.icon,
            color: this.color,
            opened: this.opened,
            popout: this.popout,
            z: this.z,
            underline: this.underline,
            isFirstOrLast: this.isFirstOrLast
        };
    }
    ;
    /** Возвращает true, если эта панель является первым/последним дочерним элементом в своем родительском контейнере */
    get isFirstOrLast() {
        return this === findFirstElement(this, x => x.tagName === this.tagName) || this === findLastElement(this, x => x.tagName === this.tagName);
    }
    ;
    get computeUnderline() {
        return this.underline === 'always' || (this.opened === true && this.underline === 'opened');
    }
    ;
    /** Ссылка на внутренний элемент z-collapser */
    get myCollapser() {
        return this.shadowRoot.querySelector('z-collapser');
    }
    ;
    /** Ссылка на внутренний элемент z-expandable */
    get myExpandable() {
        return this.shadowRoot.querySelector('z-expandable');
    }
    ;
    /**
       * Раскрывает/скрывает содержимое панели
       * @param ev событие click
       */
    toggleOpened(ev) {
        let targ = ev.target;
        let targParent = findParentElement(targ, 'z-expander');
        fireCustomEvent(targParent, EventType.expanderToggled, this.details);
    }
    ;
    /**
     * Обозреватель изменения свойства opened
     * @param newval новое значение свойства
     * @param oldval предыдущее значение свойства
     */
    openedChanged(newval, oldval) {
        this.myCollapser.opened = newval;
        this.myExpandable.opened = newval;
        timeOut.run(() => animationFrame.run(() => this.myCollapser.setSubheaderUnderlined(this.computeUnderline)), 250);
    }
    ;
    /**  */
    getCollapserHeight() {
        return this.myCollapser.offsetHeight;
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZExpander.prototype, "name", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZExpander.prototype, "icon", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", Number)
], ZExpander.prototype, "iconSize", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZExpander.prototype, "color", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZExpander_1.prototype.openedChanged }),
    __metadata("design:type", Boolean)
], ZExpander.prototype, "opened", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Boolean)
], ZExpander.prototype, "popout", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", Number)
], ZExpander.prototype, "z", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZExpander.prototype, "underline", void 0);
__decorate([
    computed('underline', 'opened'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ZExpander.prototype, "computeUnderline", null);
ZExpander = ZExpander_1 = __decorate([
    customElement('z-expander'),
    __metadata("design:paramtypes", [])
], ZExpander);
export { ZExpander };
