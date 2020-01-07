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
const { customElement, property, observe, computed } = Poly;
export const DraggableMixin = dedupingMixin((base) => {
    class DraggableBaseClass extends GestureEventListeners(base) {
        constructor(...input) {
            super();
            this.col = 0;
            this.row = 0;
            this.width = 20;
            this.height = 20;
            this.cellHeight = 10;
            this.cellWidth = 10;
            this.cellMargin = 0;
            Gestures.addListener(this, 'track', this.handleTrack.bind(this));
        }
        ;
        connectedCallback() {
            super.connectedCallback();
            afterNextRender(this, () => {
                this.computeStylesFromAttrs();
            });
        }
        ;
        disconnectedCallback() {
            super.disconnectedCallback();
            Gestures.removeListener(this, 'track', this.handleTrack.bind(this));
        }
        ;
        /**
         * Обработчик события track.
         * @param e событие track
         */
        handleTrack(e) {
            let targ = e.target;
            let state = e.detail.state;
            let srcEvent = e.detail.sourceEvent;
            targ._createPHolder();
            switch (state) {
                case 'start':
                    targ._doHandleStartState(targ);
                    break;
                case 'track':
                    targ._doHandleTrackState(e, targ);
                    break;
                case 'end':
                    targ._doHandleEndState(targ);
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
        /**
         * Обработчик стадии start события track
         * @private
         * @param elem элемент, сгенерировавший событие track
         */
        _doHandleStartState(elem) {
            let styles = window.getComputedStyle(elem);
            setStyles(elem, {
                'left': styles.getPropertyValue('left'),
                'top': styles.getPropertyValue('top'),
                'transition': 'none',
                'zIndex': '1'
            });
            elem.pholder.setAttribute('width', elem.getAttribute('width'));
            elem.pholder.setAttribute('height', elem.getAttribute('height'));
            elem.pholder.setAttribute('row', elem.getAttribute('row'));
            elem.pholder.setAttribute('col', elem.getAttribute('col'));
            elem.pholder.style.display = 'block';
            elem.setAttribute('dragging', '');
            //elem.computePHolderStylesFromAttrs();
        }
        ;
        /**
         * Обработчик стадии track события track
         * @private
         * @param e событие track
         * @param elem элемент, сгенерировавший событие track
         */
        _doHandleTrackState(e, elem) {
            let left = parseFloat(elem.style.left.split('px')[0]);
            let top = parseFloat(elem.style.top.split('px')[0]);
            let newLeft = left + e.detail.ddx;
            let newTop = top + e.detail.ddy;
            let cols = +elem.getAttribute('width');
            let rows = +elem.getAttribute('height');
            let position = elem.getClosestPosition(newLeft, newTop, rows, cols, true);
            elem.pholder.setAttribute('row', position.row.toString());
            elem.pholder.setAttribute('col', position.col.toString());
            setStyles(elem, {
                'transition': 'none',
                'left': `${newLeft}px`,
                'top': `${newTop}px`
            });
            //elem.computePHolderStylesFromAttrs();
        }
        ;
        /**
         * Обработчик стадии end события track
         * @private
         * @param elem элемент, сгенерировавший событие track
         */
        _doHandleEndState(elem) {
            //elem.computePHolderStylesFromAttrs();
            elem.setAttribute('row', elem.pholder.getAttribute('row'));
            elem.setAttribute('col', elem.pholder.getAttribute('col'));
            setStyles(elem, {
                //'left': '',
                //'top': '',
                'transition': '0.75s ease',
                'zIndex': 'initial'
            });
            elem.pholder.style.display = '';
            elem.removeAttribute('dragging');
            elem.computeStylesFromAttrs();
            elem.pholder.remove();
            elem.pholder = null;
            let _ev = new CustomEvent('move', {
                bubbles: true,
                detail: {
                    tile: elem
                }
            });
            Object.defineProperty(_ev, 'composed', { value: true });
            elem.dispatchEvent(_ev);
        }
        ;
        getClosestPosition(x, y, rows = 1, cols = 1, floorHalf = false) {
            let position;
            let colRatio = (x + this.cellMargin / 2) / (this.cellWidth + this.cellMargin);
            let rowRatio = (y + this.cellMargin / 2) / (this.cellHeight + this.cellMargin);
            let colCount = Math.round(window.innerWidth / this.cellWidth);
            let rowCount = Math.round(window.innerHeight / this.cellHeight);
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
        computeStylesFromAttrs() {
            setStyles(this, {
                'width': `${+this.getAttribute('width') * this.cellWidth}px`,
                'height': `${+this.getAttribute('height') * this.cellHeight}px`,
                'left': `${+this.getAttribute('col') * this.cellWidth}px`,
                'top': `${+this.getAttribute('row') * this.cellHeight}px`,
            });
        }
        ;
        computePHolderStylesFromAttrs() {
            setStyles(this.pholder, {
                'width': `${+this.pholder.getAttribute('width') * this.cellWidth}px`,
                'height': `${+this.pholder.getAttribute('height') * this.cellHeight}px`,
                'left': `${+this.pholder.getAttribute('col') * this.cellWidth}px`,
                'top': `${+this.pholder.getAttribute('row') * this.cellHeight}px`,
            });
        }
        ;
        /**
         * Создает плейсхолдер, настраивает его стили и размещает его
         * непосредственно после этого элемента.
         * @private
         */
        _createPHolder() {
            if (!this.pholder) {
                this.pholder = document.createElement('div');
                setStyles(this.pholder, {
                    'position': 'absolute',
                    'zIndex': '-1',
                    'backgroundColor': 'hsla(0,0%,0%,0.08)',
                    'transition': '0.0s ease'
                });
                this.after(this.pholder);
            }
            ;
        }
        ;
    }
    __decorate([
        property({ reflectToAttribute: true, notify: true }),
        __metadata("design:type", Number)
    ], DraggableBaseClass.prototype, "col", void 0);
    __decorate([
        property({ reflectToAttribute: true, notify: true }),
        __metadata("design:type", Number)
    ], DraggableBaseClass.prototype, "row", void 0);
    __decorate([
        property({ reflectToAttribute: true, notify: true }),
        __metadata("design:type", Number)
    ], DraggableBaseClass.prototype, "width", void 0);
    __decorate([
        property({ reflectToAttribute: true, notify: true }),
        __metadata("design:type", Number)
    ], DraggableBaseClass.prototype, "height", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], DraggableBaseClass.prototype, "cellHeight", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], DraggableBaseClass.prototype, "cellWidth", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], DraggableBaseClass.prototype, "cellMargin", void 0);
    ;
    return DraggableBaseClass;
});
