import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { ZSubheader } from './ZSubheader.js';
import { fireCustomEvent } from '../Utilities/fireCustomEvent.js';
import { EventType } from '../Enums/enums.js';


const { customElement, property, observe } = Poly;








@customElement('z-collapser')
export class ZCollapser extends PolymerElement
{
  static get template()
  {
    return html`
		<style> :host { display: block; } </style>
		<z-subheader  id="mySubheader" 
                  size="{{size}}"
                  weight="{{weight}}"
                  h="{{h}}" 
                  color="{{color}}"
                  icon-size="{{iconSize}}">
			<z-option icon="{{icon}}" 
                icon-size="{{iconSize}}" 
                type="collapser" 
                name="{{name}}" 
                active="{{opened}}" 
                icon-color="{{color}}" 
                h="{{h}}" 
                no-check>
        <slot></slot>
      </z-option>
		</z-subheader>`;
  };
  constructor()
  {
    super();
  };
  connectedCallback()
  {
    super.connectedCallback();
  };









  @property({ reflectToAttribute: true, notify: true })
  name: string = '';


  @property({ reflectToAttribute: true, notify: true, observer: ZCollapser.prototype.openedChanged })
  opened: boolean = false;


  /** Опциональная иконка, отображаемая перед текстом подзаголовка */
  @property({ notify: true })
  icon: string = '';


  /** Относительные размеры основной иконки, отображаемой перед текстом опции */
  @property({ reflectToAttribute: true, notify: true })
  iconSize: number = 20;


  /** Относительные размеры подзаголовка */
  @property({ notify: true })
  size: number = 18;


  @property({ reflectToAttribute: true, notify: true })
  weight: number = 300;


  /** Высота подзаголовка в пикселях */
  @property({ notify: true })
  h: number = 36;


  /** Цвет подзаголовка */
  @property({ notify: true })
  color: string = 'grey-600';






  get details()
  {
    return {
      id: this.id,
      name: this.name,
      opened: this.opened,
      icon: this.icon,
      iconSize: this.iconSize,
      size: this.size,
      h: this.h,
      color: this.color
    };
  };











  openedChanged(newval: boolean, oldval: boolean)
  {
    fireCustomEvent(this, EventType.collapserToggled, this.details);
  };




  setSubheaderUnderlined(val: boolean)
  {
    let subheader = this.$.mySubheader as ZSubheader;
    if (subheader)
      subheader.underlined = !!val;
  };

}