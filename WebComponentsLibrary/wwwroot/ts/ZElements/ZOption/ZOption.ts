import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { IOption, VisualSize } from "../../Interfaces/interfaces.js";
import { ITargeterReady } from "../../Interfaces/targeting.js";
import { OptionRole, EventType, KeyCode, MenuBehaviourOnClick } from "../../Enums/enums.js";
import { Targeter } from "../../Classes/Targeter.js";
import { ZRipple } from "../ZRipple/ZRipple.js";
import { html, PolymerElement } from '../../../lib/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../../lib/@polymer/polymer/lib/utils/render-status.js';
import { fireCustomEvent } from '../../Utilities/fireCustomEvent.js';
import { getElements } from '../../Utilities/getElements.js';
import { stringToTargetDefinitions } from '../../Utilities/stringToTargetDefinitions.js';
import { getWidth } from '../../Utilities/getWidth.js';
import { getHeight } from '../../Utilities/getHeight.js';
import { getPrevious } from '../../Utilities/getPrevious.js';
import { getNext } from '../../Utilities/getNext.js';
import { ZOverlay } from '../ZOverlay/ZOverlay.js';
import { TargeterMixin } from '../../Mixins/TargeterMixin.js';



const { customElement, property, observe } = Poly;








/**
 * Элемент-опция
 * Может быть использована в меню, подменю, выпадающем списке
 * @customElement
 * @polymer
 */
@customElement('z-option')
export class ZOption extends TargeterMixin(PolymerElement) implements IOption, ITargeterReady
{
  static get template()
  {
    return html`
		<style>
			:host { display: block; position: relative; }
			:host(:not([disabled])) { pointer-events: auto; opacity: 1; }
			:host([disabled]) { pointer-events: none !important; opacity: 0.55; }
			:host(:focus) { outline: none; }
			:host(:hover), :host(:focus), :host([type='sub'][target-showed]) { outline: none; background-color: hsla(0, 0%, 0%, 0.06); }
      :host([h="18"]) { height: 18px; }
      :host([h="20"]) { height: 20px; }
      :host([h="22"]) { height: 22px; }
      :host([h="24"]) { height: 24px; }
      :host([h="26"]) { height: 26px; }
      :host([h="28"]) { height: 28px; }
      :host([h="30"]) { height: 30px; }
      :host([h="32"]) { height: 32px; }
      :host([h="34"]) { height: 34px; }
      :host([h="36"]) { height: 36px; }
      :host([h="38"]) { height: 38px; }
      :host([h="40"]) { height: 40px; }
			:host div { display: grid; align-items: center; grid-template-columns: minmax(min-content, auto) 1fr minmax(min-content, auto) 18px; cursor: pointer; user-select: none; padding: 0 2px; font-size: 13px; height: inherit; }
			:host span { padding: 0 4px; font-size: inherit; }
			:host span:last-of-type { opacity: 0.62; padding-right: 8px; }
			:host([type='simple']) span:last-of-type, :host([type='']) span:last-of-type { grid-column: 3/5; }
			z-icon:first-of-type { padding: 2px; }
			z-icon:last-of-type { grid-column: 4/5; }
			:host([type='toggle']:not([active])) z-icon:last-of-type { visibility: hidden; transform: scale(0,0); transition: var(--z-fast-transition); }
			:host([type='toggle'][active]) z-icon:last-of-type { visibility: visible; transform: scale(1,1); transition: var(--z-fast-transition); }
			:host([type='sub']) z-icon:last-of-type { transform: rotate(-90deg); }
			:host([type='collapser']) div, :host([type='']) div { font-size: inherit !important; }
			:host([type='collapser'][active]) z-icon:last-of-type { transform: rotate(180deg); }
			:host([type='collapser']:not([active])) z-icon:last-of-type { transform: rotate(0deg); }
			:host([type='simple']) z-icon:last-of-type { display: none; }
		</style>
		<div>
			<z-icon name="{{icon}}" color="{{iconColor}}" size='{{iconSize}}'></z-icon>
			<span>{{name}}</span>
			<span hidden$="{{!noCheck}}"><slot></slot></span>
			<z-icon name="{{secIcon}}" color="grey-600" size="18"></z-icon>
		</div>
    <slot name="cnt"></slot>
		<z-ripple color="{{iconColor}}"></z-ripple>`;
  };
  constructor(model?: IOption)
  {
    super();
    if (model)
    {
      this.id = model.id;
      this.name = model.name;
      this.val = model.val;
      this.h = model.h;
      this.icon = model.icon;
      this.iconColor = model.iconColor;
      this.iconSize = model.iconSize;
      this.secIcon = model.secIcon;
      this.href = model.href;
      this.noCheck = model.noCheck;
      this.hideMenu = model.hideMenu;
      this.type = model.type;
      this.active = model.active;
      this.disabled = model.disabled;
      this.data = model.data || null;
      this.triggers = model.triggers;
    }
  };
  connectedCallback()
  {
    super.connectedCallback();
    this.addEventListener('click', ZOption.prototype.handleClick);
    this.addEventListener('keydown', ZOption.prototype.handleKeydown);
    afterNextRender(this, () =>
    {
      setTimeout(() =>
      {
        this.setAttribute('tabindex', '0');
      }, 50);
    });
  };
  disconnectedCallback()
  {
    super.disconnectedCallback();
    this.removeEventListener('click', ZOption.prototype.handleClick);
    this.removeEventListener('keydown', ZOption.prototype.handleKeydown);
  };









  /** Идентификатор элемента */
  @property({ reflectToAttribute: true, notify: true })
  id: string = '';


  /** Отображаемый текст опции */
  @property({ reflectToAttribute: true, notify: true })
  name: string = '';


  /** Значение опции */
  @property({ reflectToAttribute: true, notify: true })
  val: string = '';


  /** Высота элемента в пикселях */
  @property({ reflectToAttribute: true, notify: true })
  h: number = 28;


  /** Основная иконка, отображаемая перед текстом опции */
  @property({ notify: true })
  icon: string = '';


	/**
	 * Цвет основной иконки, отображаемой перед текстом опции
	 * Указанный цвет применяется также к эффектам элемента z-ripple
	 */
  @property({ reflectToAttribute: true, notify: true })
  iconColor: string = 'grey-500';


  /** Размеры основной иконки, отображаемой перед текстом опции */
  @property({ reflectToAttribute: true, notify: true })
  iconSize: number = null;


  /** Дополнительная иконка, отображаемая после текста опции */
  @property()
  secIcon: string = '';


  @property({ reflectToAttribute: true, notify: true })
  noCheck: boolean = false;


  /** 
   * Закрывать родительское меню после клика на этом элементе
   * В случае true, меню будет закрыто даже если свойство type элемента равно toggle
   */
  @property({ reflectToAttribute: true, notify: true })
  hideMenu: MenuBehaviourOnClick = MenuBehaviourOnClick.keepAll;


  /** Тип опции, зависящий от контекста ее использования */
  @property({ reflectToAttribute: true, notify: true, observer: ZOption.prototype.typeChanged })
  type: OptionRole;


  /** Состояние опции "отмечено/не отмечено" для опции с ролью {@link OptionRole.toggle} */
  @property({ reflectToAttribute: true, notify: true, observer: ZOption.prototype.activeChanged })
  active: boolean = false;


  /** Набор данных, связанных с элементом */
  @property({ notify: true })
  data: any = null;







  /** Основные свойства элемента-опции */
  get details(): IOption
  {
    return {
      id: this.id,
      name: this.name,
      val: this.val,
      h: this.h,
      icon: this.icon,
      iconColor: this.iconColor,
      iconSize: this.iconSize,
      secIcon: this.secIcon,
      href: this.href,
      noCheck: this.noCheck,
      hideMenu: this.hideMenu,
      type: this.type,
      active: this.active,
      disabled: this.disabled,
      data: this.data,
      triggers: this.triggers
    };
  };















	/**
	 * Обработчик клика мышкой
	 * Генерирует событие option-activated
	 * @param e событие click
	 * @emits option-activated
	 */
  handleClick(e: Event): void
  {
    let targ = e.target as ZOption;
    targ._doActivateOption();
  };


	/**
	 * Обработчик нажатия управляющих клавиш на элементе, получившем фокус ввода
	 * Генерирует событие option-activated
	 * @param e событие keydown
	 * @emits option-activated
	 */
  handleKeydown(e: KeyboardEvent): void
  {
    let targ = e.target as ZOption;
    let siblings;

    switch (e.keyCode)
    {

      case KeyCode.Enter:
      case KeyCode.Space:
        targ._doActivateOption();
        break;


      case KeyCode.ArrowDown:
      case KeyCode.ArrowUp:
        targ._doSelectSibling(e);
        break;


      case KeyCode.ArrowRight:
        if (targ.type === OptionRole.sub)
        {
          targ._doActivateOption();
        };
        break;


      case KeyCode.ArrowLeft:
        if (targ.type === OptionRole.sub)
        {
          targ.ripple();
          let overlay = ((targ.parentNode as HTMLElement).querySelector('z-overlay') as ZOverlay);
          if (overlay && overlay.showed) overlay.showed = false;
        };
        break;


      default: break;
    };
  };


	/**
	 * Обозреватель изменения роли элемента-опции
	 * @param newType новое значение роли
	 * @param oldType предыдущее значение роли
	 */
  typeChanged(newType: OptionRole, oldType: OptionRole): void
  {
    switch (newType)
    {
      case OptionRole.simple: this.secIcon = ''; break;
      case OptionRole.toggle: this.secIcon = (this.noCheck) ? '' : 'check'; break;
      case OptionRole.sub: this.secIcon = 'arrow-drop-down'; break;
      case OptionRole.dropdown: this.secIcon = 'arrow-drop-down'; break;
      case OptionRole.collapser: this.secIcon = 'keyboard-arrow-up'; break;

      default: this.secIcon = ''; break;
    };
  };


	/**
	 * Обозреватель изменения свойства active
	 * Если элемент выбран (active === true), генерирует событие option-selected
	 * @param newActive новое значение свойства
	 * @param oldActive предыдущее значение свойства
	 * @emits option-selected
	 */
  activeChanged(newActive: boolean, oldActive: boolean): void
  {
    if (newActive)
      (ZOption.execDelay === 0) ? fireCustomEvent(this, EventType.optionSelected, this.details) : setTimeout(() => { fireCustomEvent(this, EventType.optionSelected, this.details); }, ZOption.execDelay);
  };



  activate(doRipple?: boolean): void
  {
    let _active = this.active;
    if (!this.disabled)
    {
      if (!_active && doRipple)
        this.ripple();

      this.active = !_active;
      (ZOption.execDelay === 0) ? fireCustomEvent(this, EventType.optionActivated, this.details) : setTimeout(() => { fireCustomEvent(this, EventType.optionActivated, this.details); }, ZOption.execDelay);
    };
  };



  @observe('val', 'name')
  valNameChanged(val: string, name: string): void
  {
    if (val && (name === '' || name === undefined))
      this.name = val;
  };


  /** Анимация взаимодействия с элементом */
  ripple(): void
  {
    (this.shadowRoot.querySelector('z-ripple') as ZRipple).ripple(getWidth(this) / 2, getHeight(this) / 2);
  };












  _doActivateOption()
  {
    this.ripple();
    setTimeout(() => { fireCustomEvent(this, EventType.optionActivated, this.details); }, ZOption.execDelay);

    if (this.type === OptionRole.toggle || this.type === OptionRole.collapser) this.active = !this.active;

    if (this.type === OptionRole.simple || this.type === OptionRole.dropdown) this.exec();

    if (this.href && !this.disabled) this.gotoHref();
  };



  _doSelectSibling(e: KeyboardEvent)
  {
    e.preventDefault();
    let siblings = getElements(this.parentNode, '[tabindex="0"]');
    let sibling: ZOption;

    switch (e.keyCode)
    {
      case KeyCode.ArrowDown: sibling = getNext(siblings, this as ZOption) as ZOption; break;
      case KeyCode.ArrowUp: sibling = getPrevious(siblings, this as ZOption) as ZOption; break;

      default: break;
    };

    if (!!sibling)
    {
      sibling.focus();
      sibling.scrollIntoView();
    };
  };





  _doFireActivated()
  {
    (ZOption.execDelay === 0) ? fireCustomEvent(this, EventType.optionActivated, this.details) : setTimeout(() => { fireCustomEvent(this, EventType.optionActivated, this.details); }, ZOption.execDelay);
  };


  _doFireSelected()
  {
    (ZOption.execDelay === 0) ? fireCustomEvent(this, EventType.optionSelected, this.details) : setTimeout(() => { fireCustomEvent(this, EventType.optionSelected, this.details); }, ZOption.execDelay);
  };


  _doTargeterExecute()
  {
    (ZOption.execDelay === 0) ? this.targeter.exec() : setTimeout(() => { this.targeter.exec(); }, ZOption.execDelay);
  };


  _doHrefNavigate()
  {
    (ZOption.execDelay === 0) ? window.location.href = this.href : setTimeout(() => { window.location.href = this.href; }, ZOption.execDelay + 230);
  };












	/**
	 * Проверяет эквивалентность двух элементов-опций
	 * Возвращает true, если:
	 * - существуют оба элемента-опции
	 * - у каждого элемента-опции существует свойство-объект details
	 * - количество свойств у каждого из объектов details соответствующих элементов-опций - одинаковое
	 * - значения свойств объектов details соответствующих элементов-опций полностью совпадают друг с другом
	 * 
	 * Возвращает false в случае невыполнения любого из указанных требований
	 * 
	 * @param opt1 первый сравниваемый элемент-опция
	 * @param opt2 второй сравниваемый элемент-опция
	 */
  static isEqualOptions(opt1: ZOption, opt2: ZOption): boolean
  {
    let checkExist = opt1 && opt2;
    let checkDetails = opt1.details && opt2.details;
    let checkDetailsItems = Object.values(opt1.details).length === Object.values(opt2.details).length;


    if (!checkExist || !checkDetails || !checkDetailsItems)
      return false;

    let checkEquality = false;

    if (checkExist && checkDetails)
    {
      checkEquality = true;
      let d1 = opt1.details;
      let d2 = opt2.details;

      if (d1.id !== d2.id)
        return false;

      Object.keys(d1).forEach(k => { checkEquality = checkEquality && (d1[k] === d2[k]) ? true : false; });
    }

    return checkEquality;
  };


  static isEqualDetails(det1: IOption, det2: IOption)
  {
    let checkDetails = (det1 && det2) ? true : false;
    let checkDetailsItems = (Object.values(det1).length === Object.values(det2).length) ? true : false;

    if (!checkDetails || !checkDetailsItems)
      return false;

    let checkEquality: boolean = false;

    if (checkDetails)
    {
      checkEquality = true;

      if (det1.id !== det2.id)
        return false;

      Object.keys(det1).forEach(k => { checkEquality = checkEquality && (det1[k] === det2[k]) ? true : false; });
    };

    return checkEquality;
  };


  static create(model: IOption): ZOption
  {
    return new ZOption(model);
  };
}