import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { ZBaseElement } from '../ZBaseElement/ZBaseElement.js';
import { afterNextRender } from '../../../lib/@polymer/polymer/lib/utils/render-status.js';
import { isBetween } from '../../Utilities/isBetween.js';
import { ZIconSet } from '../ZIconSet/ZIconSet.js';
import { ZPalette } from '../../Classes/ZPalette.js';


const { customElement, property, observe } = Poly;







/** SVG-иконка Material Icons. */
@customElement('z-icon')
export class ZIcon extends PolymerElement
{
  static get template()
  {
    return html`
    <style>
      :host { display: inline-flex; position: relative; border-radius: 50%; align-items: center; }
      :host([name='']) { width: 0; height: 0; padding: 0; transform: scale(0,0); transition: var(--z-medium-transition); }
      :host(:not([name=''])) { width: initial; height: initial; transform: scale(1,1); transition: var(--z-medium-transition); }
      :host ::slotted(svg) { fill: currentColor; }
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
      :host div { width: 100%; height: 100%; border-radius: 50%; }
    </style>
    <div><slot></slot></div>`;
  };
  constructor()
  {
    super();
    this.name = '';
    this.color = 'grey-600';
  };
  connectedCallback()
  {
    super.connectedCallback();
    afterNextRender(this, () =>
    {
      this.nameChanged(this.name, undefined);
    });
  };







  /** Название иконки */
  @property({ reflectToAttribute: true, notify: true, observer: ZIcon.prototype.nameChanged })
  name: string = '';


  /** Цвет элемента */
  @property({ notify: true, observer: ZIcon.prototype.colorChanged })
  color: string;


  /** Прозрачность элемента */
  @property({ notify: true, observer: ZIcon.prototype.opacityChanged })
  opacity: number = 100;


  /** Относительные размеры иконки */
  @property({ reflectToAttribute: true, notify: true })
  size: number = 24;


  /**  */
  @property({ reflectToAttribute: true, notify: true })
  disabled: boolean = false;








  opacityChanged(newVal: number, oldVal: number): void
  {
    if (isBetween(newVal, 0, 100) && this.shadowRoot.querySelector('div'))
      this.shadowRoot.querySelector('div').style.setProperty('opacity', `var(--z-opacity-${newVal})`);
  };


  /**
	 * Обозреватель изменения свойства name.
	 * 
	 * Запрашивает SVG-элемент с идентификатором, равным новому значению свойства name, 
	 * в репозитории SVG-иконок (элемент z-icon-set). 
	 * 
	 * В случае успешного выполнения запроса удаляет существующий дочерний SVG-элемент 
	 * (если таковой имеется) с идентификатором, равным предыдущему значению свойства name,
	 * затем добавляет полученный SVG-элемент к своему содержимому.
	 * 
	 * 
	 * @param newName новое значение свойства
	 * @param oldName предыдущее значение свойства
	 */
  nameChanged(newName: string, oldName: string): void
  {
    let repo = document.querySelector('z-icon-set') as ZIconSet;
    if (repo && newName !== undefined && newName !== null)
    {
      let _old = [...this.children].find(f => { return f.tagName.toLowerCase() === 'svg'; });
      let _new = repo.prepareSVGClone(newName);

      if (_old !== undefined && _old !== null)
        this.removeChild(_old);

      if (_new)
        this.appendChild(_new);
    };
  };


  colorChanged(newVal: string, oldVal: string): void
  {
    if (this.shadowRoot.querySelector('div'))
      this.shadowRoot.querySelector('div').style.color = ZPalette.computeRGB(newVal, false) || '';
  };
}