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
import { setStyles } from '../Utilities/setStyles.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { findParentElement } from '../Utilities/findParentElement.js';
const { customElement, property, observe, computed } = Poly;
export const ResizableMixin = dedupingMixin((base) => {
    class ResizableBaseClass extends GestureEventListeners(base) {
        constructor(...input) {
            super();
            /**
             * Набор ресайзеров для управления шириной и высотой элемента
             * @default {String} 'L B BR R' (Left, Bottom, BottomRight, Right)
             */
            this.resizers = 'L B BR R';
            /** Шаг изменения ширины/высоты элемента, в пикселях */
            this.threshold = 5;
            /** Минимальная высота элемента, в пикселях */
            this.hmin = 15;
            /** Максимальная высота элемента, в пикселях */
            this.hmax = Infinity;
            /** Минимальная ширина элемента, в пикселях */
            this.wmin = 15;
            /** Максимальная ширина элемента, в пикселях */
            this.wmax = Infinity;
            //Gestures.addListener(this, 'track', this.handleResize.bind(this));
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
            //Gestures.removeListener(this, 'track', this.handleResize.bind(this));
        }
        ;
        toggleEventListeners() {
            const resizers = [...this.querySelectorAll('span[resize]')] || [];
            resizers.forEach(res => {
                if (!res['_hasResizeListener']) {
                    Gestures.addListener(res, 'track', this.handleResize.bind(this));
                    res['_hasResizeListener'] = true;
                }
                else {
                    //Gestures.removeListener(res, 'track', this.handleResize.bind(this));
                    //res['_hasResizeListener'] = false;
                }
                ;
            });
            if (!this['_hasNativeMoveListener']) {
                this.addEventListener('touchmove', this.safePreventDefault);
                this['_hasNativeMoveListener'] = true;
            }
            else {
                this.removeEventListener('touchmove', this.safePreventDefault);
                this['_hasNativeMoveListener'] = false;
            }
            ;
        }
        ;
        handleResize(e) {
            let targ = findParentElement(e.target, '[resizers]');
            let state = e['detail'].state;
            let srcEvent = e['detail'].sourceEvent;
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
            e.stopPropagation();
            e.preventDefault();
        }
        ;
        _doHandleResizeStart(elem) {
            let styles = window.getComputedStyle(elem);
            setStyles(elem, {
                'left': styles.getPropertyValue('left'),
                'top': styles.getPropertyValue('top'),
                'width': styles.getPropertyValue('width'),
                'height': styles.getPropertyValue('height'),
                'transition': 'none',
                'zIndex': '1'
            });
            elem.setAttribute('dragging', '');
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
            let width = parseFloat(elem.style.width.split('px')[0]);
            let height = parseFloat(elem.style.height.split('px')[0]);
            let newLeft = left + +e['detail'].ddx;
            let newTop = top + +e['detail'].ddy;
            let newWidth = width + (isLeft ? -e['detail'].ddx : +e['detail'].ddx);
            let newHeight = height + (isTop ? -e['detail'].ddy : +e['detail'].ddy);
            let row = top;
            let col = left;
            let cols = width;
            let rows = height;
            let colCount = Math.round(window.innerWidth / elem.threshold);
            let rowCount = Math.round(window.innerHeight / elem.threshold);
            //let position = elem.getClosestPosition(newLeft, newTop, 1, 1, isTop || isLeft);
            let size = elem.getClosestSize(newWidth, newHeight, isLeft ? cols + col : col - colCount, isTop ? rows + row : row - rowCount);
            elem.style.transition = 'none';
            isLeft && newWidth >= elem.threshold && (elem.style.left = `${newLeft}px`);
            isTop && newHeight >= elem.threshold && (elem.style.top = `${newTop}px`);
            isWidth && newWidth >= elem.threshold && (elem.style.width = `${newWidth}px`);
            isHeight && newHeight >= elem.threshold && (elem.style.height = `${newHeight}px`);
        }
        ;
        _doHandleResizeEnd(elem) {
            //setStyles(elem, {
            //  'transition': 'none',
            //  'zIndex': ''
            //});
            elem.removeAttribute('dragging');
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
            sheet.addRule(':host ::slotted([resize])', 'position: absolute; opacity: 0; ');
            sheet.addRule(':host ::slotted([resize]:hover)', 'opacity: 0.7;');
            sheet.addRule(':host ::slotted([resize="BR"])', 'bottom: 0px; right: 0px; width: 12px; cursor: nwse-resize; height: 12px;');
            sheet.addRule(':host ::slotted([resize="BR"])::after', 'content: "┘";');
            sheet.addRule(':host ::slotted([resize="B"])', 'bottom: 0px; left: 25%; right: 25%; text-align: center; cursor: ns-resize; height: 12px;');
            sheet.addRule(':host ::slotted([resize="B"])::after', 'content: "—";');
            sheet.addRule(':host ::slotted([resize="R"])', 'bottom: 0; top: 0; right: 0px; width: 6px; cursor: ew-resize; display: flex; align-items: center;');
            sheet.addRule(':host ::slotted([resize="R"])::after', 'content: "|";');
            sheet.addRule(':host ::slotted([resize="L"])', 'bottom: 0; top: 0; left: 0px; width: 6px; cursor: ew-resize; display: flex; align-items: center; justify-content: flex-end;');
            sheet.addRule(':host ::slotted([resize="L"])::after', 'content: "|";');
        }
        ;
        resizersChanged(newval, oldval) {
            if (!!newval) {
                let resArray = newval.split(/\s/);
                let resizers = [...this.querySelectorAll('[resize]')];
                if (Array.isArray(resArray)) {
                    resizers.forEach(r => r.remove());
                    resArray.forEach(r => {
                        let sp = document.createElement('span');
                        sp.setAttribute('resize', r);
                        sp.slot = 'rsz';
                        this.appendChild(sp);
                        sp.removeAttribute('style');
                    });
                    this.toggleEventListeners();
                }
                ;
            }
            ;
        }
        ;
        getClosestPosition(x, y, rows = 1, cols = 1, floorHalf = false) {
            let position;
            let colRatio = x / this.threshold;
            let rowRatio = y / this.threshold;
            let colCount = Math.round(window.innerWidth / this.threshold);
            let rowCount = Math.round(window.innerHeight / this.threshold);
            if (floorHalf) {
                position = {
                    col: colRatio % 0.5 === 0 ? Math.floor(colRatio) : Math.round(colRatio),
                    row: rowRatio % 0.5 === 0 ? Math.floor(rowRatio) : Math.round(rowRatio)
                };
            }
            else {
                position = {
                    col: Math.round(colRatio),
                    row: Math.round(rowRatio)
                };
            }
            ;
            return {
                col: Math.max(Math.min(position.col, colCount - cols), 0),
                row: Math.max(Math.min(position.row, rowCount - rows), 0)
            };
        }
        ;
        getClosestSize(width, height, maxWidth = window.innerWidth, maxHeight = window.innerHeight) {
            let size = {
                height: Math.round(height / this.threshold),
                width: Math.round(width / this.threshold)
            };
            return {
                width: Math.max(Math.min(size.width, maxWidth), 1),
                height: Math.max(Math.min(size.height, maxHeight), 1),
            };
        }
        ;
    }
    __decorate([
        property({ notify: true, reflectToAttribute: true, observer: ResizableBaseClass.prototype.resizersChanged }),
        __metadata("design:type", String)
    ], ResizableBaseClass.prototype, "resizers", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], ResizableBaseClass.prototype, "threshold", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], ResizableBaseClass.prototype, "hmin", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], ResizableBaseClass.prototype, "hmax", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], ResizableBaseClass.prototype, "wmin", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], ResizableBaseClass.prototype, "wmax", void 0);
    ;
    return ResizableBaseClass;
});
