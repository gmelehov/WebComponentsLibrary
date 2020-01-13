import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { findFirstElement } from '../Utilities/findFirstElement.js';
import { findLastElement } from '../Utilities/findLastElement.js';
import { fireCustomEvent } from '../Utilities/fireCustomEvent.js';
import { EventType } from '../Enums/enums.js';
import { ZExpandable } from './ZExpandable.js';
import { ZCollapser } from './ZCollapser.js';
import { timeOut, animationFrame } from '../../lib/@polymer/polymer/lib/utils/async.js';
import { findParentElement } from '../Utilities/findParentElement.js';
import { ZExpanders } from './ZExpanders.js';


const { customElement, property, observe, computed } = Poly;






/**
 * Раскрывающийся контейнер
 * @customElement
 * @polymer
 */
@customElement('z-expander')
export class ZExpander extends PolymerElement
{
  static get template()
  {
    return html`
    <style>
      :host { display: block; transition: var(--z-transition);  }
      :host > z-paper { height: inherit; }
      :host([opened][popout]:not(:first-of-type):not(:last-of-type)) { margin: 10px 0; }
			:host([opened][popout]:first-of-type) { margin: 0 0 10px 0; }
			:host([opened][popout]:last-of-type) { margin: 10px 0 0 0; }

      :host(:first-of-type) > z-paper { border-radius: 4px 4px 0 0; }
      :host(:last-of-type) > z-paper { border-radius: 0 0 4px 4px; }
    </style>
    <z-paper z="{{z}}" b-color="white">
      <z-collapser name="{{name}}" icon="{{icon}}" icon-size="{{iconSize}}" color="{{color}}" on-click="toggleOpened"></z-collapser>
      <z-expandable><slot></slot></z-expandable>
    </z-paper>`;
  };
  constructor()
  {
    super();
  };
  connectedCallback()
  {
    super.connectedCallback();
  };









  /** Заголовок панели */
  @property({ reflectToAttribute: true, notify: true })
  name: string = '';


  /** Опциональная иконка, отображаемая перед текстом заголовка панели */
  @property({ notify: true })
  icon: string = null;


  /** Размер опциональной иконки, в пикселях */
  @property({ notify: true })
  iconSize: number = null;


  /** Цвет заголовка панели */
  @property({ notify: true })
  color: string = 'grey-600';


  /** Если true, содержимое панели раскрыто. Если false (по умолчанию), содержимое панели закрыто */
  @property({ reflectToAttribute: true, notify: true, observer: ZExpander.prototype.openedChanged })
  opened: boolean = false;


  /** Если true, то открытая панель имеет верхние и нижние отступы. Если false (по умолчанию), то открытая панель не имеет верхних и нижних отступов */
  @property({ reflectToAttribute: true, notify: true })
  popout: boolean = false;


  /** Относительная высота (поднятие) панели над плоскостью */
  @property({ notify: true })
  z: number = 1;


  /**
   * Настройка режима подчеркивания заголовка панели
   * always = заголовок подчеркнут всегда
   * opened = заголовок подчеркнут только при раскрытой панели
   * never = заголовок никогда не подчеркивается
   */
  @property({ reflectToAttribute: true, notify: true })
  underline: 'always' | 'opened' | 'never' = 'opened';









  get details()
  {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      color: this.color,
      opened: this.opened,
      popout: this.popout,
      z: this.z,
      underline: this.underline,
      isFirstOrLast: this.isFirstOrLast
    };
  };


  /** Возвращает true, если эта панель является первым/последним дочерним элементом в своем родительском контейнере */
  get isFirstOrLast()
  {
    return this === findFirstElement(this, x => x.tagName === this.tagName) || this === findLastElement(this, x => x.tagName === this.tagName);
  };


  @computed('underline', 'opened')
  get computeUnderline(): boolean
  {
    return this.underline === 'always' || (this.opened === true && this.underline === 'opened');
  };


  /** Ссылка на внутренний элемент z-collapser */
  get myCollapser()
  {
    return this.shadowRoot.querySelector('z-collapser') as ZCollapser;
  };


  /** Ссылка на внутренний элемент z-expandable */
  get myExpandable()
  {
    return this.shadowRoot.querySelector('z-expandable') as ZExpandable;
  };














  /**
	 * Раскрывает/скрывает содержимое панели
	 * @param ev событие click
	 */
  toggleOpened(ev: MouseEvent): void
  {
    let targ = ev.target as ZCollapser;
    let targParent = findParentElement(targ, 'z-expander') as ZExpander;
    fireCustomEvent(targParent, EventType.expanderToggled, this.details);
  };


  /**
   * Обозреватель изменения свойства opened
   * @param newval новое значение свойства
   * @param oldval предыдущее значение свойства
   */
  openedChanged(newval: boolean, oldval: boolean)
  {
    this.myCollapser.opened = newval;
    this.myExpandable.opened = newval;
    timeOut.run(() => animationFrame.run(() => this.myCollapser.setSubheaderUnderlined(this.computeUnderline)), 250);
  };


  /**  */
  getCollapserHeight()
  {
    return this.myCollapser.offsetHeight;
  };

}