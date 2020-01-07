﻿import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import { ZExpander } from '../ZExpander/ZExpander.js';
import { EventType } from '../../Enums/enums.js';
import { isNil } from '../../Utilities/isNil.js';
import { isBetween } from '../../Utilities/isBetween.js';
import { getAllPrevious } from '../../Utilities/getAllPrevious.js';
import { findParentElement } from '../../Utilities/findParentElement.js';
import { animationFrame, timeOut } from '../../../lib/@polymer/polymer/lib/utils/async.js';
import { setStyle } from '../../Utilities/setStyle.js';
import { getMargin } from '../../Utilities/getMargin.js';
import { removeStyle } from '../../Utilities/removeStyle.js';


const { customElement, property, observe } = Poly;







/**
 * Группа связанных раскрывающихся панелей-аккордеонов
 * @customElement
 * @polymer
 */
@customElement('z-expanders')
export class ZExpanders extends PolymerElement
{
  static get template()
  {
    return html`
		<style> :host { display: block; } </style>
		<slot></slot>`;
  };
  constructor()
  {
    super();
    this.childSelector = 'z-expander';
    this.childEvent = EventType.expanderToggled;
    this.multi = false;
    this.fullHeight = false;
    this.selIndices = null;
    this.selCount = 0;
  };
  connectedCallback()
  {
    super.connectedCallback();
    this.fullHeight = this.hasAttribute('full-height');
    this.multi = this.hasAttribute('multi');
    this.listenMyExpanders();
  };
  disconnectedCallback()
  {
    super.disconnectedCallback();
    this.unlistenMyExpanders();
  };









  /** Возможность раскрытия нескольких дочерних панелей-аккордеонов */
  @property({ reflectToAttribute: true, notify: true, observer: ZExpanders.prototype.multiChanged })
  multi: boolean = false;


  /** Если true, то каждая раскрываемая дочерняя панель-аккордеон будет занимать все доступное ей по высоте место */
  @property({ reflectToAttribute: true, notify: true, observer: ZExpanders.prototype.fullHeightChanged })
  fullHeight: boolean = false;


  /** Индексы раскрытых дочерних панелей-аккордеонов, в одну строку, через пробел */
  @property({ reflectToAttribute: true, notify: true })
  selIndices: string = null;


  /** Текущее количество раскрытых дочерних панелей-аккордеонов */
  @property({ reflectToAttribute: true, notify: true })
  selCount: number = 0;


  /** Селектор, определяющий стандартный дочерний элемент - панель-аккордеон */
  @property({ notify: true })
  childSelector: string = 'z-expander';


  /** Тип всплывающего события, генерируемого дочерними панелями-аккордеонами при их раскрытии/закрытии */
  @property({ notify: true })
  childEvent: EventType = EventType.expanderToggled;








  /** Ссылка на коллекцию дочерних панелей-аккордеонов */
  get expanders()
  {
    return [...this.querySelectorAll(this.childSelector)] as ZExpander[];
  };


  /** Ссылка на коллекцию раскрытых дочерних панелей-аккордеонов */
  get openedChildren()
  {
    return [...this.querySelectorAll(`${this.childSelector}[opened]`)] as ZExpander[];
  };
















  /** Подключает прослушиватель событий от дочерних элементов */
  listenMyExpanders()
  {
    this.addEventListener(this.childEvent, ZExpanders.prototype.handleExpanderToggled);
  };


  /** Отключает прослушиватель событий от дочерних элементов */
  unlistenMyExpanders()
  {
    this.removeEventListener(this.childEvent, ZExpanders.prototype.handleExpanderToggled);
  };


  /**
   * 
   * @param now
   * @param before
   */
  fullHeightChanged(now: boolean, before: boolean): void
  {

  };


  /**
   * 
   * @param ev
   */
  handleExpanderToggled(ev: CustomEvent): void
  {
    this.unlistenMyExpanders();
    let elem = ev.target as ZExpander;
    let state = ev.detail.opened;
    let indx = getAllPrevious(this.querySelectorAll(this.childSelector), elem).length;
    let parent = findParentElement(elem);
    let openedCount = this.getOpenedExceptOne(elem.id).length;

    if (elem.id && parent === this && this.multi === false)
    {
      let othersOpened = this.getOpenedExceptOne(elem.id);
      othersOpened.forEach(f =>
      {
        f.opened = false;
        if (this.fullHeight)
          setStyle(f, 'height', `${f.getCollapserHeight()}px`);
      });
    };
    
    timeOut.run(() => animationFrame.run(() =>
    {
      if (this.multi === false && this.fullHeight)
      {
        if (state === true)
        {
          setStyle(elem, 'height', `${elem.getCollapserHeight()}px`);
        }
        else
        {
          let elemMargins = getMargin(elem);
          let height = this.getFullHeight() - (this.expanders.length - 1) * elem.getCollapserHeight() - elemMargins.bottom - elemMargins.top;
          setStyle(elem, 'height', `${height}px`);
        };
      };
      
      elem.opened = !elem.opened;
      this.computeSelCount();
      this.selIndices = this.multi ? this.getComputedSelIndices() : this.selCount ? indx.toString() : '';
      this.listenMyExpanders();
    }), state === false && openedCount ? 360 : 0);
  };


  /** Закрывает все раскрытые дочерние панели-аккордеоны */
  closeAll()
  {
    this.openedChildren.forEach(c => c.opened = false);
  };


  /**  */
  computeSelCount()
  {
    this.selCount = this.openedChildren.length;
  };


  /** Возвращает список индексов раскрытых в данный момент дочерних панелей-аккордеонов */
  getSelIndicesArray()
  {
    return this.expanders.map((m, i) => { return m.opened ? i : null; }).filter(f => f !== null);
  };


  /**
   * Возвращает коллекцию всех раскрытых дочерних панелей-аккордеонов,
   * за исключением дочерней панели, свойство id которой равно указанному
   * @param id идентификатор раскрытой дочерней панели, которую необходимо исключить из возвращаемой коллекции
   */
  getOpenedExceptOne(id: string)
  {
    return [...this.querySelectorAll(`${this.childSelector}[opened]:not([id="${id}"])`)] as ZExpander[];
  };


  /**  */
  getComputedSelIndices()
  {
    let array = this.getSelIndicesArray();
    return this.multi ? array.join(' ') : array.length ? array[0].toString() : '';
  };


  /**
   * 
   * @param newval
   * @param oldval
   */
  multiChanged(newval: boolean, oldval: boolean)
  {
    if (newval === false)
    {
      this.expanders.forEach(f =>
      {
        setStyle(f, 'height', `${f.getCollapserHeight()}px`);
      });
    }
    else
    {
      this.expanders.forEach(f =>
      {
        removeStyle(f, 'height');
      });
    };
  };


  

  getFullHeight()
  {
    return this.offsetHeight;
  };

}