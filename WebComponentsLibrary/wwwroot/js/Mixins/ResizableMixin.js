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
import { dedupingMixin } from '../../lib/@polymer/polymer/lib/utils/mixin.js';
import { GestureEventListeners } from '../../lib/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '../../lib/@polymer/polymer/lib/utils/gestures.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { findParentElement } from '../Utilities/findParentElement.js';
import { PositionableMixin } from './PositionableMixin.js';
import { clamp } from '../Utilities/clamp.js';
const { customElement, property, observe, computed } = Poly;
/**
 * Добавляет элементу возможность изменения его визуальных размеров
 * @polymer
 * @mixinFunction
 */
export const ResizableMixin = dedupingMixin((base) => {
    /**
     * @polymer
     * @mixinClass
     * @appliesMixin GestureEventListeners
     * @appliesMixin PositionableMixin
     */
    class ResizableBaseClass extends GestureEventListeners(PositionableMixin(base)) {
        constructor(...input) {
            super();
            /**
             * Набор ресайзеров для управления шириной и высотой элемента
             * @default {String} 'B BR R' (Bottom, BottomRight, Right)
             */
            this.resizers = 'B BR R';
        }
        ;
        connectedCallback() {
            super.connectedCallback();
            afterNextRender(this, () => {
                this._createResizersStyles();
                this._createResizersSlot();
            });
        }
        ;
        disconnectedCallback() {
            super.disconnectedCallback();
        }
        ;
        toggleEventListeners() {
            const resizers = [...this.querySelectorAll('span[resize]')] || [];
            resizers.forEach(res => {
                if (!res['_hasResizeListener']) {
                    Gestures.addListener(res, 'track', this.handleResize);
                    res['_hasResizeListener'] = true;
                }
                ;
            });
            //if (!this['_hasNativeMoveListener'])
            //{
            //  this.addEventListener('touchmove', this.safePreventDefault);
            //  this['_hasNativeMoveListener'] = true;
            //}
            //else
            //{
            //  this.removeEventListener('touchmove', this.safePreventDefault);
            //  this['_hasNativeMoveListener'] = false;
            //};
        }
        ;
        handleResize(e) {
            let targ = findParentElement(e.target, '[resizers]');
            let state = e.detail.state;
            let srcEvent = e.detail.sourceEvent;
            switch (state) {
                case 'start':
                    targ._doHandleResizeStart(targ);
                    break;
                case 'track':
                    targ._doHandleResizeTrack(e, targ);
                    break;
                case 'end':
                    targ._doHandleResizeEnd(targ);
                    break;
                default: break;
            }
            ;
            if (srcEvent) {
                srcEvent.preventDefault && srcEvent.preventDefault();
            }
            ;
            e.preventDefault();
            e.stopPropagation();
        }
        ;
        _doHandleResizeStart(elem) {
            elem._updatePropsFromStyles();
            elem.setAttribute('resizing', '');
        }
        ;
        _doHandleResizeTrack(e, elem) {
            let resizeType = e.target.getAttribute('resize');
            let isTop = ['T', 'TR', 'TL'].some(s => { return s == resizeType; });
            let isLeft = ['L', 'TL', 'BL'].some(s => { return s == resizeType; });
            let isWidth = ['L', 'R', 'BR', 'BL', 'TR', 'TL'].some(s => { return s == resizeType; });
            let isHeight = ['T', 'B', 'TR', 'BR', 'BL', 'TL'].some(s => { return s == resizeType; });
            let left = parseFloat(elem.style.left.split('px')[0]);
            let top = parseFloat(elem.style.top.split('px')[0]);
            let width = clamp(parseFloat(elem.style.width.split('px')[0]), elem.wmin, elem.wmax);
            let height = clamp(parseFloat(elem.style.height.split('px')[0]), elem.hmin, elem.hmax);
            let newLeft = left + e.detail.ddx;
            let newTop = top + e.detail.ddy;
            let newWidth = width + (isLeft ? -e.detail.ddx : e.detail.ddx);
            let newHeight = height + (isTop ? -e.detail.ddy : e.detail.ddy);
            if (isLeft && newWidth >= 1) {
                elem.style.left = `${newLeft}px`;
                elem.left = newLeft;
            }
            ;
            if (isTop && newHeight >= 1) {
                elem.style.top = `${newTop}px`;
                elem.top = newTop;
            }
            ;
            if (isWidth && newWidth >= 1) {
                elem.style.width = `${newWidth}px`;
                elem.width = newWidth;
            }
            ;
            if (isHeight && newHeight >= 1) {
                elem.style.height = `${newHeight}px`;
                elem.height = newHeight;
            }
            ;
        }
        ;
        _doHandleResizeEnd(elem) {
            elem.removeAttribute('resizing');
            let _ev = new CustomEvent('resize', {
                bubbles: true,
                detail: {
                    tile: elem
                }
            });
            Object.defineProperty(_ev, 'composed', { value: true });
            elem.dispatchEvent(_ev);
        }
        ;
        safePreventDefault(event) {
            if (event)
                event.preventDefault && event.preventDefault();
        }
        ;
        _createResizersSlot() {
            let slot = this.shadowRoot.querySelector('slot[name="rsz"]');
            if (slot === null) {
                slot = document.createElement('slot');
                slot.setAttribute('name', 'rsz');
                this.shadowRoot.appendChild(slot);
            }
            ;
        }
        ;
        _createResizersStyles() {
            let sheet = this.shadowRoot.styleSheets[0];
            sheet.addRule(':host([resizing])', 'box-shadow: var(--z-shadow-z6) !important;');
            sheet.addRule('::slotted([resize])', 'position: absolute; opacity: 0; z-index: 10000; ');
            sheet.addRule('::slotted([resize]:hover)', 'opacity: 0.7; background-color: hsla(0, 0%, 0%, 0.15);');
            sheet.addRule('::slotted([resize="BR"])', 'bottom: 0px; right: 0px; width: 6px; cursor: nwse-resize; height: 6px;');
            //sheet.addRule('::slotted([resize="BR"])::after', 'content: "┘";');
            sheet.addRule('::slotted([resize="B"])', 'bottom: 0px; left: 0%; right: 6px; text-align: center; cursor: ns-resize; height: 6px;');
            //sheet.addRule('::slotted([resize="B"])::after', 'content: "—";');
            sheet.addRule('::slotted([resize="R"])', 'bottom: 6px; top: 0; right: 0px; width: 6px; cursor: ew-resize; display: flex; align-items: center;');
            //sheet.addRule('::slotted([resize="R"])::after', 'content: "|";');
            sheet.addRule('::slotted([resize="L"])', 'bottom: 0; top: 0; left: 0px; width: 6px; cursor: ew-resize; display: flex; align-items: center; justify-content: flex-end;');
            //sheet.addRule('::slotted([resize="L"])::after', 'content: "|";');
        }
        ;
        resizersChanged(newval, oldval) {
            if (!!newval) {
                let resArray = newval.split(/\s/);
                let resizers = [...this.querySelectorAll('[resize]')];
                resizers.forEach(r => r.remove());
                if (Array.isArray(resArray)) {
                    resArray.forEach(r => {
                        let sp = document.createElement('span');
                        sp.setAttribute('resize', r);
                        sp.slot = 'rsz';
                        this.appendChild(sp);
                        //sp.removeAttribute('style');
                    });
                }
                ;
                this.toggleEventListeners();
            }
            ;
        }
        ;
    }
    __decorate([
        property({ notify: true, reflectToAttribute: true, observer: ResizableBaseClass.prototype.resizersChanged }),
        __metadata("design:type", String)
    ], ResizableBaseClass.prototype, "resizers", void 0);
    ;
    return ResizableBaseClass;
});
