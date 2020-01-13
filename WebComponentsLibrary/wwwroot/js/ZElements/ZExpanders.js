var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZExpanders_1;
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { EventType } from '../Enums/enums.js';
import { getAllPrevious } from '../Utilities/getAllPrevious.js';
import { findParentElement } from '../Utilities/findParentElement.js';
import { animationFrame, timeOut } from '../../lib/@polymer/polymer/lib/utils/async.js';
import { setStyle } from '../Utilities/setStyle.js';
import { getMargin } from '../Utilities/getMargin.js';
import { removeStyle } from '../Utilities/removeStyle.js';
const { customElement, property, observe } = Poly;
/**
 * Группа связанных раскрывающихся панелей-аккордеонов
 * @customElement
 * @polymer
 */
let ZExpanders = ZExpanders_1 = class ZExpanders extends PolymerElement {
    constructor() {
        super();
        /** Возможность раскрытия нескольких дочерних панелей-аккордеонов */
        this.multi = false;
        /** Если true, то каждая раскрываемая дочерняя панель-аккордеон будет занимать все доступное ей по высоте место */
        this.fullHeight = false;
        /** Индексы раскрытых дочерних панелей-аккордеонов, в одну строку, через пробел */
        this.selIndices = null;
        /** Текущее количество раскрытых дочерних панелей-аккордеонов */
        this.selCount = 0;
        /** Селектор, определяющий стандартный дочерний элемент - панель-аккордеон */
        this.childSelector = 'z-expander';
        /** Тип всплывающего события, генерируемого дочерними панелями-аккордеонами при их раскрытии/закрытии */
        this.childEvent = EventType.expanderToggled;
        this.childSelector = 'z-expander';
        this.childEvent = EventType.expanderToggled;
        this.multi = false;
        this.fullHeight = false;
        this.selIndices = null;
        this.selCount = 0;
    }
    static get template() {
        return html `
		<style> 
      :host { display: block; border-radius: 4px; } 
    </style>
		<slot></slot>`;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
        this.fullHeight = this.hasAttribute('full-height');
        this.multi = this.hasAttribute('multi');
        this.listenMyExpanders();
    }
    ;
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unlistenMyExpanders();
    }
    ;
    /** Ссылка на коллекцию дочерних панелей-аккордеонов */
    get expanders() {
        return [...this.querySelectorAll(this.childSelector)];
    }
    ;
    /** Ссылка на коллекцию раскрытых дочерних панелей-аккордеонов */
    get openedChildren() {
        return [...this.querySelectorAll(`${this.childSelector}[opened]`)];
    }
    ;
    /** Подключает прослушиватель событий от дочерних элементов */
    listenMyExpanders() {
        this.addEventListener(this.childEvent, ZExpanders_1.prototype.handleExpanderToggled);
    }
    ;
    /** Отключает прослушиватель событий от дочерних элементов */
    unlistenMyExpanders() {
        this.removeEventListener(this.childEvent, ZExpanders_1.prototype.handleExpanderToggled);
    }
    ;
    /**
     *
     * @param now
     * @param before
     */
    fullHeightChanged(now, before) {
    }
    ;
    /**
     *
     * @param ev
     */
    handleExpanderToggled(ev) {
        this.unlistenMyExpanders();
        let elem = ev.target;
        let state = ev.detail.opened;
        let indx = getAllPrevious(this.querySelectorAll(this.childSelector), elem).length;
        let parent = findParentElement(elem);
        let openedCount = this.getOpenedExceptOne(elem.id).length;
        if (elem.id && parent === this && this.multi === false) {
            let othersOpened = this.getOpenedExceptOne(elem.id);
            othersOpened.forEach(f => {
                f.opened = false;
                if (this.fullHeight)
                    setStyle(f, 'height', `${f.getCollapserHeight()}px`);
            });
        }
        ;
        timeOut.run(() => animationFrame.run(() => {
            if (this.multi === false && this.fullHeight) {
                if (state === true) {
                    setStyle(elem, 'height', `${elem.getCollapserHeight()}px`);
                }
                else {
                    let elemMargins = getMargin(elem);
                    let height = this.getFullHeight() - (this.expanders.length - 1) * elem.getCollapserHeight() - elemMargins.bottom - elemMargins.top;
                    setStyle(elem, 'height', `${height}px`);
                }
                ;
            }
            ;
            elem.opened = !elem.opened;
            this.computeSelCount();
            this.selIndices = this.multi ? this.getComputedSelIndices() : this.selCount ? indx.toString() : '';
            this.listenMyExpanders();
        }), state === false && openedCount ? 360 : 0);
    }
    ;
    /** Закрывает все раскрытые дочерние панели-аккордеоны */
    closeAll() {
        this.openedChildren.forEach(c => c.opened = false);
    }
    ;
    /**  */
    computeSelCount() {
        this.selCount = this.openedChildren.length;
    }
    ;
    /** Возвращает список индексов раскрытых в данный момент дочерних панелей-аккордеонов */
    getSelIndicesArray() {
        return this.expanders.map((m, i) => { return m.opened ? i : null; }).filter(f => f !== null);
    }
    ;
    /**
     * Возвращает коллекцию всех раскрытых дочерних панелей-аккордеонов,
     * за исключением дочерней панели, свойство id которой равно указанному
     * @param id идентификатор раскрытой дочерней панели, которую необходимо исключить из возвращаемой коллекции
     */
    getOpenedExceptOne(id) {
        return [...this.querySelectorAll(`${this.childSelector}[opened]:not([id="${id}"])`)];
    }
    ;
    /**  */
    getComputedSelIndices() {
        let array = this.getSelIndicesArray();
        return this.multi ? array.join(' ') : array.length ? array[0].toString() : '';
    }
    ;
    /**
     *
     * @param newval
     * @param oldval
     */
    multiChanged(newval, oldval) {
        if (newval === false) {
            this.expanders.forEach(f => {
                setStyle(f, 'height', `${f.getCollapserHeight()}px`);
            });
        }
        else {
            this.expanders.forEach(f => {
                removeStyle(f, 'height');
            });
        }
        ;
    }
    ;
    getFullHeight() {
        return this.offsetHeight;
    }
    ;
};
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZExpanders_1.prototype.multiChanged }),
    __metadata("design:type", Boolean)
], ZExpanders.prototype, "multi", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true, observer: ZExpanders_1.prototype.fullHeightChanged }),
    __metadata("design:type", Boolean)
], ZExpanders.prototype, "fullHeight", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", String)
], ZExpanders.prototype, "selIndices", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
    __metadata("design:type", Number)
], ZExpanders.prototype, "selCount", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZExpanders.prototype, "childSelector", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZExpanders.prototype, "childEvent", void 0);
ZExpanders = ZExpanders_1 = __decorate([
    customElement('z-expanders'),
    __metadata("design:paramtypes", [])
], ZExpanders);
export { ZExpanders };
