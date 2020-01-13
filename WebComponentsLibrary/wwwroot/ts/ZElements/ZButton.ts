import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { ITargeterReady } from '../Interfaces/targeting.js';
import { Targeter } from '../Classes/Targeter.js';
import { fireCustomEvent } from '../Utilities/fireCustomEvent.js';
import { EventType, KeyCode } from '../Enums/enums.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { ZPalette } from '../Classes/ZPalette.js';
import { ZRipple } from './ZRipple.js';
import { getWidth } from '../Utilities/getWidth.js';
import { getHeight } from '../Utilities/getHeight.js';
import { TargeterMixin } from '../Mixins/TargeterMixin.js';
import { DraggableMixin } from '../Mixins/DraggableMixin.js';


const { customElement, property, observe } = Poly;








/**
 * Кнопка
 * @customElement
 * @polymer
 */
@customElement('z-button')
export class ZButton extends TargeterMixin(PolymerElement) implements ITargeterReady
{
  private static get _styleTemplate(): HTMLTemplateElement
  {
    return html`
		<style>
			:host { border-radius: 2px; margin: 3px 0; padding: 0 6px; font-size: 14px; min-width: 36px; text-align: center; position: relative; display: inline-block; cursor: pointer; user-select: none; vertical-align: middle; --curr-color: currentColor; }
			:host(:hover), :host(:focus) { outline: none; }
      :host([h="14"]) { height: 14px; }
      :host([h="16"]) { height: 16px; }
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
      :host([h="42"]) { height: 42px; }
      :host([h="44"]) { height: 44px; }
      :host([h="46"]) { height: 46px; }
      :host([h="48"]) { height: 48px; }

			:host([accented]) z-ripple:not(.rippling) { background-color: var(--curr-color); filter: opacity(0.12); }
			:host(:hover:not([disabled]):not([accented])) z-ripple:not(.rippling), :host(:focus:not([disabled]):not([accented])) z-ripple:not(.rippling) { outline: none; background-color: var(--curr-color); filter: opacity(0.16); }
			:host(:hover:not([disabled])[accented]) z-ripple:not(.rippling), :host(:focus:not([disabled])[accented]) z-ripple:not(.rippling) { outline: none; background-color: var(--curr-color); filter: opacity(0.2); }

			:host(:not([disabled])) { pointer-events: auto; opacity: 1; }
			:host([disabled]) { pointer-events: none !important; opacity: 0.45; }
      :host > div > z-icon { padding: 0; }
			.label { padding: 0 3px; color: var(--curr-color); text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
      .label:empty { padding: 0; }
			:host > div { display: flex; align-items: center; height: inherit; line-height: inherit; color: var(--curr-color); user-select: none; justify-content: center; }
		</style>`;
  };
  private static get _htmlTemplate(): HTMLTemplateElement
  {
    return html`
		<div>
			<z-icon name="[[icon]]" size="{{iconSize}}" color="{{color}}" disabled="[[disabled]]"></z-icon>
      <div class="label">[[label]]</div>
      <slot></slot>
		</div>
		<z-ripple color="{{color}}" no-tap="{{noTap}}" density="normal"></z-ripple>`;
  };
  static get template()
  {
    let fullTemplate = html``;
    fullTemplate.content.appendChild(ZButton._styleTemplate.content);
    fullTemplate.content.appendChild(ZButton._htmlTemplate.content);
    return fullTemplate;
  };
  constructor()
  {
    super();
    this.icon = '';
    this.label = '';
    this.h = 28;
    //this.iconSize = 24;
    this.color = '';
  };
  connectedCallback()
  {
    super.connectedCallback();
    this.addEventListener('click', ZButton.prototype.handleClick);
    this.addEventListener('keydown', ZButton.prototype.handleKeydown);
    afterNextRender(this, () =>
    {
      setTimeout(() =>
      {
        this.colorChanged(this.color, null);
        this.setAttribute('tabindex', '0');
      }, 250);
    });
  };
  disconnectedCallback()
  {
    super.disconnectedCallback();
    this.removeEventListener('click', ZButton.prototype.handleClick);
    this.removeEventListener('keydown', ZButton.prototype.handleKeydown);
  };








  /** Иконка, отображаемая перед текстом кнопки */
  @property({ reflectToAttribute: true, notify: true })
  icon: string = '';


  /** Текст кнопки */
  @property({ reflectToAttribute: true })
  label: string = '';


  /** Высота кнопки в пикселях */
  @property({ reflectToAttribute: true, notify: true })
  h: number = 28;


  /** Визуальные размеры иконки */
  @property({ reflectToAttribute: true, notify: true })
  iconSize: number;


	/**
	 * Цвет шрифта кнопки
	 * Указанный цвет применяется также к иконке, отображаемой перед текстом кнопки и к эффектам элемента z-ripple
	 */
  @property({ reflectToAttribute: true, notify: true, observer: ZButton.prototype.colorChanged })
  color: string = '';


  /** Если true - кнопка имеет фоновую заливку в 10% от основного своего цвета (цвета шрифта); если false (по умолчанию) - кнопка имеет полностью прозрачный фон */
  @property({ reflectToAttribute: true, notify: true })
  accented: boolean = false;


  /** Если true - кнопка имеет фоновую заливку в 100% от основного своего цвета (цвета шрифта); если false (по умолчанию) - кнопка имеет полностью прозрачный фон */
  @property({ reflectToAttribute: true, notify: true })
  filled: boolean = false;


  @property({ reflectToAttribute: true, notify: true })
  z: number = 0;








  /** Основные свойства элемента-кнопки */
  get details()
  {
    return {
      id: this.id,
      label: this.label,
      icon: this.icon,
      iconSize: this.iconSize,
      h: this.h,
      color: this.color,
      disabled: this.disabled,
      noTap: this.noTap,
      triggers: this.triggers,
      targeter: this.targeter
    };
  };













	/**
	 * Обозреватель изменения цвета элемента
	 * @param newVal новое значение цвета
	 * @param oldVal предыдущее значение цвета
	 */
  colorChanged(newVal: string, oldVal: string): void
  {
    let hsl = ZPalette.computeHSL(newVal, false);
    //(this.shadowRoot.querySelector('div') as HTMLDivElement).style.color = hsl || '';
    this.updateStyles({ '--curr-color': `${hsl}` });
  };


	/**
	 * Обработчик клика мышкой
	 * Генерирует событие button-activated
	 * @param e событие click
	 * @emits button-activated
	 */
  handleClick(e: MouseEvent): void
  {
    let targ = e.target as ZButton;
    fireCustomEvent(targ, EventType.buttonActivated, targ.details);
    if (!targ.noTap) (targ.shadowRoot.querySelector('z-ripple') as ZRipple).ripple(getWidth(targ) / 2, getHeight(targ) / 2);
    targ.exec();
    targ.gotoHref();
  };


	/**
	 * Обработчик нажатия клавиш Enter и Space на элементе, получившем фокус ввода
	 * Генерирует событие button-activated
	 * @param e событие keydown
	 * @emits button-activated
	 */
  handleKeydown(e: KeyboardEvent): void
  {
    let targ = e.target as ZButton;

    switch (e.keyCode)
    {
      case KeyCode.Enter:
        fireCustomEvent(targ, EventType.buttonActivated, targ.details);
        if (!targ.noTap) (targ.shadowRoot.querySelector('z-ripple') as ZRipple).ripple(getWidth(targ) / 2, getHeight(targ) / 2);
        targ.exec();
        targ.gotoHref();
        break;

      case KeyCode.Space:
        fireCustomEvent(targ, EventType.buttonActivated, targ.details);
        if (!targ.noTap) (targ.shadowRoot.querySelector('z-ripple') as ZRipple).ripple(getWidth(targ) / 2, getHeight(targ) / 2);
        targ.exec();
        targ.gotoHref();
        break;

      default:
        break;
    };
  };

}