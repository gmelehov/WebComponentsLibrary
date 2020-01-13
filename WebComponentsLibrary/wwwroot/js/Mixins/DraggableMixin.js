import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { dedupingMixin } from '../../lib/@polymer/polymer/lib/utils/mixin.js';
import { GestureEventListeners } from '../../lib/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '../../lib/@polymer/polymer/lib/utils/gestures.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { PositionableMixin } from './PositionableMixin.js';
const { customElement, property, observe, computed } = Poly;
/**
 * Добавляет элементу функциональность drag-and-drop
 * @polymer
 * @mixinFunction
 */
export const DraggableMixin = dedupingMixin((base) => {
    /**
     * @polymer
     * @mixinClass
     * @appliesMixin GestureEventListeners
     * @appliesMixin PositionableMixin
     */
    class DraggableBaseClass extends GestureEventListeners(PositionableMixin(base)) {
        constructor(...input) {
            super();
            Gestures.addListener(this, 'track', this.handleTrack.bind(this));
        }
        ;
        connectedCallback() {
            super.connectedCallback();
            afterNextRender(this, () => {
                this._createDraggingStyles();
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
            elem._updatePropsFromStyles();
            elem.setAttribute('dragging', '');
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
            elem.updateTopLeft(newTop, newLeft);
        }
        ;
        /**
         * Обработчик стадии end события track
         * @private
         * @param elem элемент, сгенерировавший событие track
         */
        _doHandleEndState(elem) {
            elem.removeAttribute('dragging');
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
        _createDraggingStyles() {
            let sheet = this.shadowRoot.styleSheets[0];
            sheet.addRule(':host([dragging])', 'box-shadow: var(--z-shadow-z6) !important; cursor: move;');
        }
        ;
    }
    ;
    return DraggableBaseClass;
});
