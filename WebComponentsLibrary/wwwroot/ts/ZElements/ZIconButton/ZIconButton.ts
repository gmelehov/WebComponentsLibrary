import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { ITargeterReady } from '../../Interfaces/targeting.js';
import { Targeter } from '../../Classes/Targeter.js';
import { fireCustomEvent } from '../../Utilities/fireCustomEvent.js';
import { EventType } from '../../Enums/enums.js';
import { stringToTargetDefinitions } from '../../Utilities/stringToTargetDefinitions.js';



const { customElement, property, observe } = Poly;






/** Кнопка-иконка */
@customElement('z-icon-button')
export class ZIconButton extends PolymerElement implements ITargeterReady
{
  private static get _styleTemplate(): HTMLTemplateElement
  {
    return html`
		<style>			
			:host { display: inline-flex; line-height: 1; border-radius: 50%; vertical-align: middle; }
			:host(:focus) { outline: none; background-color: hsla(0, 0%, 0%, 0.06); }
			:host([disabled]) { pointer-events: none !important; filter: grayscale(100%); color: hsla(0, 0%, 0%, 0.23) !important; opacity: 0.36; }
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
		<div size$="[[size]]">
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
    this.disabled = false;
    this.color = this.iColor;
    this.triggers = '';
    this.targeter = new Targeter();
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

  /** Конфигурация для командного хелпера */
  @property({ notify: true, observer: ZIconButton.prototype.triggersChanged })
  triggers: string = '';

  /** Относительные размеры кнопки */
  @property({ reflectToAttribute: true, notify: true })
  size: number = 24;

	/**
	 * При установке в true элемент не может быть выбран/активирован/задействован
	 * При установке в false (по умолчанию) элемент может быть выбран/активирован/задействован
	 */
  @property({ reflectToAttribute: true, notify: true })
  disabled: boolean = false;


  @property({ reflectToAttribute: true, notify: true })
  hide: boolean = false;


  /** Командный хелпер для взаимодействия с целевыми элементами */
  targeter: Targeter;



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
	 * Обозреватель изменения конфигурации командного хелпера
	 * Обновляет конфигурацию командного хелпера
	 * @param now новая конфигурация
	 * @param before предыдущая конфигурация
	 */
  triggersChanged(now: string, before: string): void
  {
    if (now !== null && now !== undefined)
    {
      this.targeter.removeAll();
      setTimeout(() =>
      {
        if (now !== '')
        {
          let arr = stringToTargetDefinitions(now);
          this.targeter.addMany(arr);
        };
      }, 0);
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


  /** Активирует командный хелпер */
  exec(): void
  {
    if (this.triggers && this.targeter && this.disabled === false)
      this.targeter.exec();
  };
}