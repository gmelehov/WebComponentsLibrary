import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { ITargeterReady } from '../Interfaces/targeting.js';
import { Targeter } from '../Classes/Targeter.js';
import { fireCustomEvent } from '../Utilities/fireCustomEvent.js';
import { EventType } from '../Enums/enums.js';
import { TargeterMixin } from '../Mixins/TargeterMixin.js';


const { customElement, property, observe } = Poly;






/**
 * Кнопка-иконка
 * @customElement
 * @polymer
 */
@customElement('z-icon-button')
export class ZIconButton extends TargeterMixin(PolymerElement) implements ITargeterReady
{
  private static get _styleTemplate(): HTMLTemplateElement
  {
    return html`
		<style>			
			:host { display: inline-flex; line-height: 1; border-radius: 50%; vertical-align: middle; }
			:host(:focus) { outline: none; background-color: hsla(0, 0%, 0%, 0.06); }
			:host([disabled]) { pointer-events: none !important; filter: grayscale(100%); color: hsla(0, 0%, 0%, 0.23) !important; opacity: 0.36; }
      :host([size="14"]) { width: 14px; height: 14px; }
      :host([size="16"]) { width: 16px; height: 16px; }
      :host([size="18"]) { width: 18px; height: 18px; }
      :host([size="20"]) { width: 20px; height: 20px; }
      :host([size="22"]) { width: 22px; height: 22px; }
      :host([size="24"]) { width: 24px; height: 24px; }
      :host([size="26"]) { width: 26px; height: 26px; }
      :host([size="28"]) { width: 28px; height: 28px; }
      :host([size="30"]) { width: 30px; height: 30px; }
      :host([size="32"]) { width: 32px; height: 32px; }
      :host([size="34"]) { width: 34px; height: 34px; }
      :host([size="36"]) { width: 36px; height: 36px; }
      :host([size="38"]) { width: 38px; height: 38px; }
      :host([size="40"]) { width: 40px; height: 40px; }
      :host([size="42"]) { width: 42px; height: 42px; }
      :host([size="44"]) { width: 44px; height: 44px; }
      :host([size="46"]) { width: 46px; height: 46px; }
      :host([size="48"]) { width: 48px; height: 48px; }
			:host(:not([disabled])) { pointer-events: auto; opacity: 1; }
			:host div { display: block; cursor: pointer; position: relative; border-radius: 50%; align-items: center; padding: 0; width: 100%; height: 100%; }	
			:host z-icon { position: absolute; left: 0; top: 0; right: 0; bottom: 0; transition: var(--z-half-medium-transition); transform-origin: center center; transition-delay: 0s; }
			:host([active]) z-icon:first-of-type { transform: scale(1,1); }
			:host([active]) z-icon:last-of-type { transform: scale(0,0); }
			:host(:not([active])) z-icon:first-of-type { transform: scale(0,0); }
			:host(:not([active]):not([hide])) z-icon:last-of-type { transform: scale(1,1); }
      :host(:not([active])[hide]) z-icon:last-of-type { transform: scale(0,0); }
		</style>`;
  };
  private static get _htmlTemplate(): HTMLTemplateElement
  {
    return html`
		<div>
			<z-icon name="{{aIcon}}" color="{{aColor}}" size="{{size}}"></z-icon>
			<z-icon name="{{iIcon}}" color="{{iColor}}" size="{{size}}"></z-icon>
			<z-ripple color="{{color}}" density="normal"></z-ripple>
		</div>`;
  };
  static get template()
  {
    let fullTemplate = html``;
    fullTemplate.content.appendChild(ZIconButton._styleTemplate.content);
    fullTemplate.content.appendChild(ZIconButton._htmlTemplate.content);
    return fullTemplate;
  };
  constructor()
  {
    super();
    this.aIcon = '';
    this.aColor = '';
    this.iIcon = '';
    this.iColor = 'grey-600';
    this.color = this.iColor;
  };
  connectedCallback()
  {
    super.connectedCallback();
    this.addEventListener('click', ZIconButton.prototype.handleClick);
  };
  disconnectedCallback()
  {
    super.disconnectedCallback();
    this.removeEventListener('click', ZIconButton.prototype.handleClick);
  };









  @property({ notify: true })
  color: string;


  @property({ notify: true })
  aIcon: string;


  @property({ notify: true })
  aColor: string;


  @property({ reflectToAttribute: true, notify: true })
  iIcon: string;


  @property({ reflectToAttribute: true, notify: true })
  iColor: string;


  /** Состояние элемента "отмечено/не отмечено" */
  @property({ reflectToAttribute: true, notify: true, observer: ZIconButton.prototype.activeChanged })
  active: boolean = false;


  /** Визуальные размеры кнопки */
  @property({ reflectToAttribute: true, notify: true })
  size: number = 24;


  @property({ reflectToAttribute: true, notify: true })
  hide: boolean = false;






  /** Основные свойства элемента */
  get details()
  {
    return {
      id: this.id,
      color: this.color,
      aIcon: this.aIcon,
      aColor: this.aColor,
      iIcon: this.iIcon,
      iColor: this.iColor,
      active: this.active,
      size: this.size,
      disabled: this.disabled,
      href: this.href,
      triggers: this.triggers,
      targeter: this.targeter
    };
  };


















	/**
	 * Обработчик клика мышкой
	 * Генерирует событие button-activated
	 * @param e событие click
	 * @emits button-activated
	 */
  handleClick(e: MouseEvent): void
  {
    let targ = e.target as ZIconButton;

    if (targ.disabled === false)
    {
      fireCustomEvent(targ, EventType.buttonActivated, targ.details);
      if (targ.iIcon !== '' && targ.aIcon !== '')
        targ.active = !targ.active;

      setTimeout(() =>
      {
        targ.exec();
      }, 240);
    };
  };


	/**
	 * Обозреватель изменения свойства active
	 * @param newActive новое значение свойства
	 * @param oldActive предыдущее значение свойства
	 */
  activeChanged(newActive: boolean, oldActive: boolean): void
  {
    if (newActive !== undefined && newActive !== null && !this.disabled)
      this.color = (newActive) ? this.aColor : this.iColor;
  };


	/**
	 * Обозреватель изменения цвета обеих иконок
	 * @param acolor новое значение цвета для иконки, соответствующей активному состоянию элемента
	 * @param icolor новое значение цвета для иконки, соответствующей неактивному состоянию элемента
	 * @param active новое состояние элемента
	 */
  @observe('aColor', 'iColor', 'active')
  propsChanged(acolor: string, icolor: string, active: boolean): void
  {
    this.color = (active) ? acolor : icolor;
  };

}