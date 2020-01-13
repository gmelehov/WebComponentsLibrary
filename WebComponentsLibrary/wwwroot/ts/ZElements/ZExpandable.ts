import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';


const { customElement, property, observe } = Poly;






@customElement('z-expandable')
export class ZExpandable extends PolymerElement
{
  static get template()
  {
    return html`
    <style>
			:host { display: block; overflow: hidden; max-width: 100%; transition: var(--z-transition); }
      :host(:not([opened])) > section { max-height: 0; transition: var(--z-transition); }
      :host([opened]) > section { max-height: 100vh; transition: var(--z-transition); }
		</style>
    <section><slot></slot></section>`;
  };
  constructor()
  {
    super();
    this.opened = false;
  };
  connectedCallback()
  {
    super.connectedCallback();
  };









  @property({ notify: true, reflectToAttribute: true })
  opened: boolean = false;










  toggle()
  {
    this.opened = !this.opened;
  };

}