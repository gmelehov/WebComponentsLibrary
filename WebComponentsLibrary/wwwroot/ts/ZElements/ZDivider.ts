import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { ZPalette } from '../Classes/ZPalette.js';


const { customElement, property, observe } = Poly;






/**
 * Элемент-разделитель
 * @customElement
 * @polymer
 */
@customElement('z-divider')
export class ZDivider extends PolymerElement
{
  private static get _styleTemplate(): HTMLTemplateElement
  {
    return html`
		<style>
			:host { display: block; overflow: hidden; padding: 0px 0; color: hsla(0, 0%, 0%, 0.1); --my-border-color: currentColor; }
			:host([baseline]) { bottom: 0; left: 0; padding: 0; position: absolute; right: 0; }
			:host([cap]) { left: 0; padding: 0; position: absolute; right: 0; top: 0; }
			:host(.cap) { padding: 7px 0 8px 0; }
			:host([size="1"]) .line { border-top: 1px solid var(--my-border-color); }
			:host([size="2"]) .line { border-top: 2px solid var(--my-border-color); }
		</style>`;
  };
  private static get _htmlTemplate(): HTMLTemplateElement
  {
    return html`<div class="line"></div>`;
  };
  static get template()
  {
    let fullTemplate = html``;
    fullTemplate.content.appendChild(ZDivider._styleTemplate.content);
    fullTemplate.content.appendChild(ZDivider._htmlTemplate.content);
    return fullTemplate;
  };
  constructor()
  {
    super();
  };
  connectedCallback()
  {
    super.connectedCallback();
  };






  /**
   * Толщина разделительной линии
   */
  @property({ reflectToAttribute: true, notify: true })
  size: number = 1;


  /**
   * Цвет разделительной линии
   */
  @property({ reflectToAttribute: true, notify: true, observer: ZDivider.prototype.colorChanged })
  color: string = 'grey-300';


	/** 
	 * Признак выравнивания разделителя по базовой линии
	 * Если true, то разделитель выровнен по базовой линии
	 */
  @property({ reflectToAttribute: true, observer: ZDivider.prototype.baselineChanged })
  baseline: boolean = false;


	/**
	 * Признак выравнивания разделителя по высоте
	 * Если true, то разделитель выровнен по высоте
	 */
  @property({ reflectToAttribute: true, observer: ZDivider.prototype.capChanged })
  cap: boolean = false;











  /**
   * Обозреватель изменения свойства color
   * @param newval новое значение свойства
   * @param oldval предыдущее значение свойства
   */
  colorChanged(newval: string, oldval: string): void
  {
    var hsl = ZPalette.computeHSL(newval, false);
    this.updateStyles({ '--my-border-color': `${hsl}` });
  };


	/**
	 * Обозреватель изменения свойства baseline
	 * @param newVal новое значение свойства
	 * @param oldVal предыдущее значение свойства
	 */
  baselineChanged(newVal: boolean, oldVal: boolean): void
  {
    this.cap = this.cap && !newVal;
  };


	/**
	 * Обозреватель изменения свойства cap
	 * @param newVal новое значение свойства
	 * @param oldVal предыдущее значение свойства
	 */
  capChanged(newVal: boolean, oldVal: boolean): void
  {
    this.baseline = this.baseline && !newVal;
  };
}