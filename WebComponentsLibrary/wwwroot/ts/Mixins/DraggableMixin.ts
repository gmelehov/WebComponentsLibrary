﻿import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { dedupingMixin } from '../../lib/@polymer/polymer/lib/utils/mixin.js';
import { AnyConstructor, IScreenPositions } from '../Interfaces/interfaces.js';
import { GestureEventListeners } from '../../lib/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '../../lib/@polymer/polymer/lib/utils/gestures.js';
import { setStyles } from '../Utilities/setStyles.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { PositionableMixin } from './PositionableMixin.js';


const { customElement, property, observe, computed } = Poly;







/**
 * Добавляет элементу функциональность drag-and-drop
 * @polymer
 * @mixinFunction
 */
export const DraggableMixin = dedupingMixin(<U extends AnyConstructor<PolymerElement>>(base: U) =>
{

  /**
   * @polymer
   * @mixinClass
   * @appliesMixin GestureEventListeners
   * @appliesMixin PositionableMixin
   */
  class DraggableBaseClass extends GestureEventListeners(PositionableMixin(base))
  {
    constructor(...input: any[])
    {
      super();
      Gestures.addListener(this, 'track', this.handleTrack.bind(this));
    };
    connectedCallback()
    {
      super.connectedCallback();
      afterNextRender(this, () =>
      {
        this._createDraggingStyles();
      });
    };
    disconnectedCallback()
    {
      super.disconnectedCallback();
      Gestures.removeListener(this, 'track', this.handleTrack.bind(this));
    };












    /**
     * Обработчик события track.
     * @param e событие track
     */
    handleTrack(e: CustomEvent): void
    {
      let targ = e.target as DraggableBaseClass;
      let state = e.detail.state;
      let srcEvent = e.detail.sourceEvent as Event;

      switch (state)
      {
        case 'start': targ._doHandleStartState(targ); break;
        case 'track': targ._doHandleTrackState(e, targ); break;
        case 'end': targ._doHandleEndState(targ); break;

        default: break;
      };

      if (srcEvent)
      {
        srcEvent.preventDefault && srcEvent.preventDefault();
      };
      e.preventDefault();
      e.stopPropagation();
    };


    /**
     * Обработчик стадии start события track
     * @private
     * @param elem элемент, сгенерировавший событие track
     */
    _doHandleStartState(elem: DraggableBaseClass)
    {
      elem._updatePropsFromStyles();
      elem.setAttribute('dragging', '');
    };


    /**
     * Обработчик стадии track события track
     * @private
     * @param e событие track
     * @param elem элемент, сгенерировавший событие track
     */
    _doHandleTrackState(e: CustomEvent, elem: DraggableBaseClass)
    {
      let left = parseFloat(elem.style.left.split('px')[0]);
      let top = parseFloat(elem.style.top.split('px')[0]);

      let newLeft = left + e.detail.ddx;
      let newTop = top + e.detail.ddy;

      elem.updateTopLeft(newTop, newLeft);
    };


    /**
     * Обработчик стадии end события track
     * @private
     * @param elem элемент, сгенерировавший событие track
     */
    _doHandleEndState(elem: DraggableBaseClass)
    {
      elem.removeAttribute('dragging');
      let _ev = new CustomEvent('move', {
        bubbles: true,
        detail: {
          tile: elem
        }
      });
      Object.defineProperty(_ev, 'composed', { value: true });
      elem.dispatchEvent(_ev);
    };






    _createDraggingStyles()
    {
      let sheet = this.shadowRoot.styleSheets[0] as CSSStyleSheet;
      sheet.addRule(':host([dragging])', 'box-shadow: var(--z-shadow-z6) !important; cursor: move;');
    };


  };



  return DraggableBaseClass;

});