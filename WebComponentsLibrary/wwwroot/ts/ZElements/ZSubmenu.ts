import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { OverlayPosition } from '../Enums/enums.js';
import { ZOverlay } from './ZOverlay.js';
import { ZOption } from './ZOption.js';
import { alignElement } from '../Utilities/alignElement.js';


const { customElement, property, observe, query } = Poly;






/**
 * Вложенное (подчиненное) меню
 * @customElement
 * @polymer
 */
@customElement('z-submenu')
export class ZSubmenu extends PolymerElement
{
  static get template()
  {
    return html`
		<style> 
			:host { display: block; } 
			:host z-option, :host ::slotted(z-option) { padding: 0 8px; }
		</style>
		<z-option id="opt" type="sub" icon="[[icon]]" name="[[name]]" on-option-activated="handleShow" tabindex="0"></z-option>
		<z-overlay id="olay" position="aside" showed="{{showed}}" triggers="opt" z="8" size="8"><slot></slot></z-overlay>`;
  };
  constructor()
  {
    super();
  };
  connectedCallback()
  {
    super.connectedCallback();
    afterNextRender(this, () =>
    {
      setTimeout(() =>
      {
        this.zolay.targeter.items[0].target = this.zopt;
        alignElement(this.zolay, this.zopt, OverlayPosition.aside, false, 0, 0);
      }, 200);
    });
  };







  /** Основная иконка, отображаемая перед текстом подменю */
  @property({ notify: true })
  icon: string = '';


  /** Отображаемый текст подменю */
  @property({ reflectToAttribute: true, notify: true })
  name: string = '';


  /** состояние элемента "отображается"/"не отображается" */
  @property({ reflectToAttribute: true, notify: true })
  showed: boolean = false;






  get zopt(): ZOption
  {
    return this.shadowRoot.querySelector('#opt') as ZOption;
  };


  
  get zolay(): ZOverlay
  {
    return this.shadowRoot.querySelector('#olay') as ZOverlay;
  };











  /** Позиционирует элемент относительно своего переключателя */
  align(): void
  {
    this.zolay.align();
  };


  /** Скрывает элемент */
  hide(): void
  {
    this.zolay.showed = false;
    this.showed = false;
  };


  /** Отображает элемент */
  show(): void
  {
    this.zolay.showed = true;
    this.showed = true;
    if (this.zopt)
      this.zopt.focus();
  };


  /** Переключает режим видимости элемента */
  toggle(): void
  {
    (this.showed) ? this.hide() : this.show();
  };



  handleShow(ev: CustomEvent): void
  {
    ev.stopPropagation();
    this.show();
  };
}