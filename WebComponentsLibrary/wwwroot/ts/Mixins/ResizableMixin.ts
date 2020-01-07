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


const { customElement, property, observe, computed } = Poly;








export const ResizableMixin = dedupingMixin(<U extends AnyConstructor<PolymerElement>>(base: U) =>
{

  class ResizableBaseClass extends GestureEventListeners(base)
  {
    constructor(...input: any[])
    {
      super();
      
      //Gestures.addListener(this, 'track', this.handleResize.bind(this));
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
      //Gestures.removeListener(this, 'track', this.handleResize.bind(this));
    };









    /**
     * Набор ресайзеров для управления шириной и высотой элемента
     * @default {String} 'L B BR R' (Left, Bottom, BottomRight, Right)
     */
    @property({ notify: true, reflectToAttribute: true, observer: ResizableBaseClass.prototype.resizersChanged })
    resizers: string = 'L B BR R';


    /** Шаг изменения ширины/высоты элемента, в пикселях */
    @property({ notify: true })
    threshold: number = 5;


    /** Минимальная высота элемента, в пикселях */
    @property({ notify: true })
    hmin: number = 15;


    /** Максимальная высота элемента, в пикселях */
    @property({ notify: true })
    hmax: number = Infinity;


    /** Минимальная ширина элемента, в пикселях */
    @property({ notify: true })
    wmin: number = 15;


    /** Максимальная ширина элемента, в пикселях */
    @property({ notify: true })
    wmax: number = Infinity;





















    toggleEventListeners()
    {
      const resizers = [...this.querySelectorAll('span[resize]')] as HTMLSpanElement[] || [];
      resizers.forEach(res =>
      {
        if (!res['_hasResizeListener'])
        {
          Gestures.addListener(res, 'track', this.handleResize.bind(this));
          res['_hasResizeListener'] = true;
        }
        else
        {
          //Gestures.removeListener(res, 'track', this.handleResize.bind(this));
          //res['_hasResizeListener'] = false;
        };
      });

      if (!this['_hasNativeMoveListener'])
      {
        this.addEventListener('touchmove', this.safePreventDefault);
        this['_hasNativeMoveListener'] = true;
      }
      else
      {
        this.removeEventListener('touchmove', this.safePreventDefault);
        this['_hasNativeMoveListener'] = false;
      };
    };



    handleResize(e: Event)
    {
      let targ = findParentElement(e.target as HTMLElement, '[resizers]') as ResizableBaseClass;
      let state = e['detail'].state;
      let srcEvent = e['detail'].sourceEvent as Event;
      
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
      e.stopPropagation();
      e.preventDefault();
    };



    _doHandleResizeStart(elem: ResizableBaseClass)
    {
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
    };



    _doHandleResizeTrack(e: Event, elem: ResizableBaseClass)
    {
      let resizeType = (e.target as HTMLElement).getAttribute('resize');
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
      let size = elem.getClosestSize(
        newWidth,
        newHeight,
        isLeft ? cols + col : col - colCount,
        isTop ? rows + row : row - rowCount
      );

      elem.style.transition = 'none';
      isLeft && newWidth >= elem.threshold && (elem.style.left = `${newLeft}px`);
      isTop && newHeight >= elem.threshold && (elem.style.top = `${newTop}px`);
      isWidth && newWidth >= elem.threshold && (elem.style.width = `${newWidth}px`);
      isHeight && newHeight >= elem.threshold && (elem.style.height = `${newHeight}px`);
    };



    _doHandleResizeEnd(elem: ResizableBaseClass)
    {
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
    };




    resizersChanged(newval: string, oldval: string)
    {
      if (!!newval)
      {
        let resArray = newval.split(/\s/);
        let resizers = [...this.querySelectorAll('[resize]')] as Array<HTMLSpanElement>;

        if (Array.isArray(resArray))
        {
          resizers.forEach(r => r.remove());
          resArray.forEach(r =>
          {
            let sp = document.createElement('span');
            sp.setAttribute('resize', r);
            sp.slot = 'rsz';
            this.appendChild(sp);
            sp.removeAttribute('style');
          });
          this.toggleEventListeners();
        };
      };
    };




    getClosestPosition(x: number, y: number, rows: number = 1, cols: number = 1, floorHalf: boolean = false): IScreenPositions
    {
      let position;
      let colRatio = x / this.threshold;
      let rowRatio = y / this.threshold;

      let colCount = Math.round(window.innerWidth / this.threshold);
      let rowCount = Math.round(window.innerHeight / this.threshold);

      if (floorHalf)
      {
        position = {
          col: colRatio % 0.5 === 0 ? Math.floor(colRatio) : Math.round(colRatio),
          row: rowRatio % 0.5 === 0 ? Math.floor(rowRatio) : Math.round(rowRatio)
        };
      }
      else
      {
        position = {
          col: Math.round(colRatio),
          row: Math.round(rowRatio)
        };
      };

      return {
        col: Math.max(Math.min(position.col, colCount - cols), 0),
        row: Math.max(Math.min(position.row, rowCount - rows), 0)
      };
    };



    getClosestSize(width: number, height: number, maxWidth = window.innerWidth, maxHeight = window.innerHeight): IScreenSizes
    {
      let size = {
        height: Math.round(height / this.threshold),
        width: Math.round(width / this.threshold)
      };

      return {
        width: Math.max(Math.min(size.width, maxWidth), 1),
        height: Math.max(Math.min(size.height, maxHeight), 1),
      };
    };








  };


  return ResizableBaseClass;

});