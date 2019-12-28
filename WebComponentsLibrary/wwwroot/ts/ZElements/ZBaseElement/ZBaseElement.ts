import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { changeElementTemplate } from '../../Utilities/changeElementTemplate.js';
import { getHTMLTemplateFromStrings } from '../../Utilities/getHTMLTemplateFromStrings.js';


const { customElement, property, observe } = Poly;






/** Базовый компонент с поддержкой динамического обновления собственного шаблона */
@customElement('z-base-element')
export class ZBaseElement extends PolymerElement
{
  static get template()
  {
    return html``;
  };
  constructor()
  {
    super();
  };
  connectedCallback()
  {
    super.connectedCallback();
  };






  /** Путь к файлу, содержащему определения стилей для этого компонента. */
  @property({ notify: true })
  stylesSrc: string = '';

  /** Путь к файлу, содержащему HTML-разметку для этого элемента. */
  @property({ notify: true })
  domSrc: string = '';







  @observe('stylesSrc', 'domSrc')
  async updateSelfTemplate(styles?: string, dom?: string)
  {
    const fetchedStyles = styles != null ? (await fetch(this.stylesSrc).then(async response => await response.text()).catch(e => '') || styles) : '';
    const fetchedDom = dom != null ? (await fetch(this.domSrc).then(async response => await response.text()).catch(e => '') || dom) : '';
    let tmpl = getHTMLTemplateFromStrings(['<style>', fetchedStyles, '</style>', fetchedDom]);
    changeElementTemplate(this, tmpl);
  };

}