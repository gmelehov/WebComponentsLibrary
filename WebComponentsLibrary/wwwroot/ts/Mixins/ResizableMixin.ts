import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { dedupingMixin } from '../../lib/@polymer/polymer/lib/utils/mixin.js';
import { AnyConstructor, IScreenPositions, IScreenSizes } from '../Interfaces/interfaces.js';
import { GestureEventListeners } from '../../lib/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '../../lib/@polymer/polymer/lib/utils/gestures.js';
import { setStyles } from '../Utilities/setStyles.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { findParentElement } from '../Utilities/findParentElement.js';
import { getStyle } from '../Utilities/getStyle.js';
import { setStyle } from '../Utilities/setStyle.js';
import { PositionableMixin } from './PositionableMixin.js';
import { clamp } from '../Utilities/clamp.js';


const { customElement, property, observe, computed } = Poly;







/**
 * Добавляет элементу возможность изменения его визуальных размеров
 * @polymer
 * @mixinFunction
 */
export const ResizableMixin = dedupingMixin(<U extends AnyConstructor<PolymerElement>>(base: U) =>
{

  /**
   * @polymer
   * @mixinClass
   * @appliesMixin GestureEventListeners
   * @appliesMixin PositionableMixin
   */
  class ResizableBaseClass extends GestureEventListeners(PositionableMixin(base))
  {
    constructor(...input: any[])
    {
      super();
    };
    connectedCallback()
    {
      super.connectedCallback();
      afterNextRender(this, () =>
      {
        this._createResizersStyles();
        this._createResizersSlot();
      });
    };
    disconnectedCallback()
    {
      super.disconnectedCallback();
    };









    /**
     * Набор ресайзеров для управления шириной и высотой элемента
     * @default {String} 'B BR R' (Bottom, BottomRight, Right)
     */
    @property({ notify: true, reflectToAttribute: true, observer: ResizableBaseClass.prototype.resizersChanged })
    resizers: string = 'B BR R';


    











    toggleEventListeners()
    {
      const resizers = [...this.querySelectorAll('span[resize]')] as HTMLSpanElement[] || [];
      resizers.forEach(res =>
      {
        if (!res['_hasResizeListener'])
        {
          Gestures.addListener(res, 'track', this.handleResize);
          res['_hasResizeListener'] = true;
        };
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
    };



    handleResize(e: CustomEvent)
    {
      let targ = findParentElement(e.target as HTMLElement, '[resizers]') as ResizableBaseClass;
      let state = e.detail.state;
      let srcEvent = e.detail.sourceEvent as Event;
      
      switch (state)
      {
        case 'start': targ._doHandleResizeStart(targ); break;
        case 'track': targ._doHandleResizeTrack(e, targ); break;
        case 'end': targ._doHandleResizeEnd(targ); break;

        default: break;
      };

      if (srcEvent)
      {
        srcEvent.preventDefault && srcEvent.preventDefault();
      };
      e.preventDefault();
      e.stopPropagation();
    };



    _doHandleResizeStart(elem: ResizableBaseClass)
    {
      elem._updatePropsFromStyles();
      elem.setAttribute('resizing', '');
    };



    _doHandleResizeTrack(e: CustomEvent, elem: ResizableBaseClass)
    {
      let resizeType = (e.target as HTMLElement).getAttribute('resize');
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


      if (isLeft && newWidth >= 1)
      {
        elem.style.left = `${newLeft}px`;
        elem.left = newLeft;
      };
      if (isTop && newHeight >= 1)
      {
        elem.style.top = `${newTop}px`;
        elem.top = newTop;
      };
      if (isWidth && newWidth >= 1)
      {
        elem.style.width = `${newWidth}px`;
        elem.width = newWidth;
      };
      if (isHeight && newHeight >= 1)
      {
        elem.style.height = `${newHeight}px`;
        elem.height = newHeight;
      };
    };



    _doHandleResizeEnd(elem: ResizableBaseClass)
    {
      elem.removeAttribute('resizing');
      let _ev = new CustomEvent('resize', {
        bubbles: true,
        detail: {
          tile: elem
        }
      });
      Object.defineProperty(_ev, 'composed', { value: true });
      elem.dispatchEvent(_ev);
    };




    safePreventDefault(event: Event): void
    {
      if (event)
        event.preventDefault && event.preventDefault();
    };





    _createResizersSlot()
    {
      let slot = this.shadowRoot.querySelector('slot[name="rsz"]');
      if (slot === null)
      {
        slot = document.createElement('slot');
        slot.setAttribute('name', 'rsz');
        this.shadowRoot.appendChild(slot);
      };
    };




    _createResizersStyles()
    {
      let sheet = this.shadowRoot.styleSheets[0] as CSSStyleSheet;
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
    };




    resizersChanged(newval: string, oldval: string)
    {
      if (!!newval)
      {
        let resArray = newval.split(/\s/);
        let resizers = [...this.querySelectorAll('[resize]')] as Array<HTMLSpanElement>;
        resizers.forEach(r => r.remove());

        if (Array.isArray(resArray))
        {
          resArray.forEach(r =>
          {
            let sp = document.createElement('span');
            sp.setAttribute('resize', r);
            sp.slot = 'rsz';
            this.appendChild(sp);
            //sp.removeAttribute('style');
          });
        };

        this.toggleEventListeners();
      };
    };

  };




  return ResizableBaseClass;

});