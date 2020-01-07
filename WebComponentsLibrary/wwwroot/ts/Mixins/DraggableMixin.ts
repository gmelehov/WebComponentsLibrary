import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { dedupingMixin } from '../../lib/@polymer/polymer/lib/utils/mixin.js';
import { AnyConstructor, IScreenPositions } from '../Interfaces/interfaces.js';
import { GestureEventListeners } from '../../lib/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '../../lib/@polymer/polymer/lib/utils/gestures.js';
import { setStyles } from '../Utilities/setStyles.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';


const { customElement, property, observe, computed } = Poly;






export const DraggableMixin = dedupingMixin(<U extends AnyConstructor<PolymerElement>>(base: U) =>
{

  class DraggableBaseClass extends GestureEventListeners(base)
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
        this.computeStylesFromAttrs();
      });
    };
    disconnectedCallback()
    {
      super.disconnectedCallback();
      Gestures.removeListener(this, 'track', this.handleTrack.bind(this));
    };










    @property({ reflectToAttribute: true, notify: true })
    col: number = 0;


    @property({ reflectToAttribute: true, notify: true })
    row: number = 0;


    @property({ reflectToAttribute: true, notify: true })
    width: number = 20;


    @property({ reflectToAttribute: true, notify: true })
    height: number = 20;


    @property({ notify: true })
    cellHeight: number = 10;


    @property({ notify: true })
    cellWidth: number = 10;


    @property({ notify: true })
    cellMargin: number = 0;




    pholder: HTMLDivElement;











    /**
     * Обработчик события track.
     * @param e событие track
     */
    handleTrack(e: CustomEvent): void
    {
      let targ = e.target as DraggableBaseClass;
      let state = e.detail.state;
      let srcEvent = e.detail.sourceEvent as Event;

      targ._createPHolder();

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
    };


    /**
     * Обработчик стадии end события track
     * @private
     * @param elem элемент, сгенерировавший событие track
     */
    _doHandleEndState(elem: DraggableBaseClass)
    {
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
    };






    getClosestPosition(x: number, y: number, rows: number = 1, cols: number = 1, floorHalf: boolean = false): IScreenPositions
    {
      let position;
      let colRatio = (x + this.cellMargin / 2) / (this.cellWidth + this.cellMargin);
      let rowRatio = (y + this.cellMargin / 2) / (this.cellHeight + this.cellMargin);

      let colCount = Math.round(window.innerWidth / this.cellWidth);
      let rowCount = Math.round(window.innerHeight / this.cellHeight);

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




    computeStylesFromAttrs()
    {
      setStyles(this, {
        'width': `${+this.getAttribute('width') * this.cellWidth}px`,
        'height': `${+this.getAttribute('height') * this.cellHeight}px`,
        'left': `${+this.getAttribute('col') * this.cellWidth}px`,
        'top': `${+this.getAttribute('row') * this.cellHeight}px`,
      });
    };



    computePHolderStylesFromAttrs()
    {
      setStyles(this.pholder, {
        'width': `${+this.pholder.getAttribute('width') * this.cellWidth}px`,
        'height': `${+this.pholder.getAttribute('height') * this.cellHeight}px`,
        'left': `${+this.pholder.getAttribute('col') * this.cellWidth}px`,
        'top': `${+this.pholder.getAttribute('row') * this.cellHeight}px`,
      });
    };


    /**
     * Создает плейсхолдер, настраивает его стили и размещает его 
     * непосредственно после этого элемента.
     * @private
     */
    _createPHolder()
    {
      if (!this.pholder)
      {
        this.pholder = document.createElement('div');
        setStyles(this.pholder, {
          'position': 'absolute',
          'zIndex': '-1',
          'backgroundColor': 'hsla(0,0%,0%,0.08)',
          'transition': '0.0s ease'
        });
        this.after(this.pholder);
      };
    };



  };


  return DraggableBaseClass;

});