import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { dedupingMixin } from '../../lib/@polymer/polymer/lib/utils/mixin.js';
import { AnyConstructor, IScreenPositions } from '../Interfaces/interfaces.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { setStyles } from '../Utilities/setStyles.js';
import { clamp } from '../Utilities/clamp.js';


const { customElement, property, observe, computed } = Poly;







/**
 * Добавляет элементу возможность управления размерами и позиционированием.
 * Является базовым миксином для DraggableMixin и ResizableMixin.
 * @polymer
 * @mixinFunction
 */
export const PositionableMixin = dedupingMixin(<U extends AnyConstructor<PolymerElement>>(base: U) =>
{

  /**
   * @polymer
   * @mixinClass
   */
  class PositionableBaseClass extends base
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
        this._initStylesFromProps();
        this._updateMaxSizesFromViewport();
        window.addEventListener('resize', this.handleWindowResize.bind(this));
      });
    };
    disconnectedCallback()
    {
      super.disconnectedCallback();
      window.removeEventListener('resize', this.handleWindowResize.bind(this));
    };









    /** Расстояние между левым краем окна браузера и левым краем элемента, в пикселях */
    @property({ reflectToAttribute: true, notify: true })
    left: number;


    /** Расстояние между верхним краем окна браузера и верхним краем элемента, в пикселях */
    @property({ reflectToAttribute: true, notify: true })
    top: number;


    /** Ширина элемента, в пикселях */
    @property({ reflectToAttribute: true, notify: true })
    width: number;


    /** Высота элемента, в пикселях */
    @property({ reflectToAttribute: true, notify: true })
    height: number;


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














    /**
     * Обновляет максимальную высоту и максимальную ширину элемента.
     * Метод должен вызываться при начальной отрисовке элемента,
     * а также каждый раз при изменении размеров окна браузера.
     * @private
     */
    _updateMaxSizesFromViewport()
    {
      if (window)
      {
        let vportWidth = window.innerWidth;
        let vportHeight = window.innerHeight;
        this.wmax = clamp(this.wmax, this.wmin, vportWidth);
        this.hmax = clamp(this.hmax, this.hmin, vportHeight);
      };
    };


    /**
     * Выполняет начальную установку стилей элемента.
     * Значения копируются из соответствующих свойств.
     * @private
     */
    _initStylesFromProps()
    {
      setStyles(this, {
        'left': `${this.left}px`,
        'top': `${this.top}px`,
        'width': `${clamp(this.width, this.wmin, this.wmax)}px`,
        'height': `${clamp(this.height, this.hmin, this.hmax)}px`
      });
    };


    /**
     * Копирует текущие значения CSS-свойств left, top, width, height
     * в соответствующие свойства элемента.
     * @private
     */
    _updatePropsFromStyles()
    {
      this.left = parseFloat(this.style.left.split('px')[0]);
      this.top = parseFloat(this.style.top.split('px')[0]);
      this.width = clamp(parseFloat(this.style.width.split('px')[0]), this.wmin, this.wmax);
      this.height = clamp(parseFloat(this.style.height.split('px')[0]), this.hmin, this.hmax);
    };


    /**
     * Обновляет смещения элемента по вертикали (от верхнего края браузера)
     * и по горизонтали (от левого края браузера).
     * Метод должен вызываться при перемещении элемента (drag-and-drop).
     * @param top новое значение для смещения элемента по вертикали
     * @param left новое значение для смещения элемента по горизонтали
     */
    updateTopLeft(top: number, left: number)
    {
      this.top = top;
      this.left = left;
      setStyles(this, {
        'left': `${left}px`,
        'top': `${top}px`,
      });
    };


    /**
     * Обновляет высоту и ширину элемента.
     * Метод должен вызываться при изменении размеров элемента (resize).
     * @param width новое значение для ширины элемента
     * @param height новое значение для высоты элемента
     */
    updateWidthHeight(width: number, height: number)
    {
      this.width = clamp(width, this.wmin, this.wmax);
      this.height = clamp(height, this.hmin, this.hmax);
      setStyles(this, {
        'width': `${clamp(width, this.wmin, this.wmax)}px`,
        'height': `${clamp(height, this.hmin, this.hmax)}px`
      });
    };


    /**
     * Обработчик события resize, генерируемого при изменении размеров окна браузера.
     * @param e событие resize
     */
    handleWindowResize(e: Event)
    {
      this._updateMaxSizesFromViewport();
    };


  };



  return PositionableBaseClass;

});