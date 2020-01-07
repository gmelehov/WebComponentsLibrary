import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../../lib/@polymer/polymer/lib/utils/render-status.js';
import { OverlayPosition, KeyCode, OptionRole } from '../../Enums/enums.js';
import { ZOption } from '../ZOption/ZOption.js';
import { getHeight } from '../../Utilities/getHeight.js';
import { findTarget } from '../../Utilities/findTarget.js';
import { alignElement } from '../../Utilities/alignElement.js';
import { setStyle } from '../../Utilities/setStyle.js';
import { isBetween } from '../../Utilities/isBetween.js';


const { customElement, property, observe } = Poly;







/** 
 * Меню 
 * @customElement
 * @polymer
 */
@customElement('z-menu')
export class ZMenu extends PolymerElement
{
  static get template()
  {
    return html`
		<style>
			:host { box-sizing: border-box; display: block; opacity: 1; position: fixed; text-align: left; z-index: 10001; padding: 8px 0; background-color: hsl(0, 0%, 100%); width: max-content; transition: var(--z-medium-transition); }
			:host(:not([showed])) { opacity: 0 !important; pointer-events: none !important; visibility: hidden !important; }
			:host .wrapper { background: inherit; border-radius: inherit; box-sizing: border-box; display: block; height: 100%; transform: translate3d(0, 0, 9999px); }
			:host .body { box-sizing: border-box; display: block; height: 100%; overflow-x: hidden; overflow-y: auto; position: relative; background-color: hsl(0, 0%, 100%); }
				:host .body::-webkit-scrollbar { width: 6px; }
				:host .body::-webkit-scrollbar-thumb { background-color: hsla(0, 0%, 0%, 0.22); margin: 0.0vh 6px; }
				:host .body::-webkit-scrollbar-track { margin: 0.0vh 6px; }
				:host .body::-webkit-scrollbar-track-piece { background-color: hsla(0, 0%, 0%, 0.1); }
			::slotted(z-option) { padding: 0 8px; }
		</style>
		<div class="wrapper">
			<div id="theBody" class="body">
				<slot></slot>
			</div>
		</div>`;
  };
  constructor()
  {
    super();
  };
  connectedCallback()
  {
    super.connectedCallback();
    this.handleHide = this.handleHide.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.addEventListener('option-activated', ZMenu.prototype.handleOptionActivated);
  };
  disconnectedCallback()
  {
    super.disconnectedCallback();
    this.removeEventListener('option-activated', ZMenu.prototype.handleOptionActivated);
  };









  @property({ reflectToAttribute: true, notify: true })
  id: string = '';


  @property({ notify: true })
  target: string = '';


  /** box-shadow */
  @property({ notify: true, observer: ZMenu.prototype.zChanged })
  z: number = 10;


  /** максимальная высота элемента, измеряемая в количестве отображаемых опций */
  @property({ reflectToAttribute: true, notify: true, observer: ZMenu.prototype.sizeChanged })
  size: number = 16;


  /** состояние элемента "отображается"/"не отображается" */
  @property({ reflectToAttribute: true, notify: true, observer: ZMenu.prototype.showedChanged })
  showed: boolean = false;


  @property({ reflectToAttribute: true, notify: true })
  overlay: OverlayPosition = OverlayPosition.baseline;


  @property({ reflectToAttribute: true, notify: true })
  hAlign: string = "left";










  /** Позиционирует элемент относительно своего переключателя */
  align(): void
  {
    let item = (this.querySelectorAll('z-option')) ? this.querySelectorAll('z-option')[0] as HTMLElement : null;
    (this.shadowRoot.querySelector('#theBody') as HTMLElement).style.maxHeight = (item && this.size) ? `${getHeight(item) * this.size}px` : ``;
    let target = findTarget(this.target) as HTMLElement;

    alignElement(this, target, this.overlay, false, 0, 0);

    if (this.showed)
    {
      let left = parseInt(this.style.left);
      let top = parseInt(this.style.top);
      setStyle(this, 'left', (left) + 'px');
      setStyle(this, 'top', (top) + 'px');
    };
  };


  /** Скрывает элемент */
  hide(): void
  {
    this.showed = false;
  };


  /** Отображает элемент */
  show(): void
  {
    this.showed = true;
  };


  /** Переключает режим видимости элемента */
  toggle(): void
  {
    this.showed = !this.showed;
    //(this.showed) ? this.hide() : this.show();
  };


  /**
   * 
   * @param now
   * @param before
   */
  zChanged(now: number, before: number): void
  {
    if (isBetween(now, 0, 24))
      this.style.setProperty('box-shadow', `var(--z-shadow-z${now})`);
  };


  /**
   * 
   * @param now
   * @param before
   */
  sizeChanged(now: number, before: number): void
  {
    let item = (this.querySelectorAll('z-option')) ? this.querySelectorAll('z-option')[0] as HTMLElement : null;
    (this.shadowRoot.querySelector('#theBody') as HTMLElement).style.maxHeight = (item && now) ? `${getHeight(item) * now}px` : ``;
  };


  /**
   * 
   * @param now
   * @param before
   */
  showedChanged(now: boolean, before: boolean): void
  {
    this.align();
    if (now)
    {
      window.addEventListener('click', this.handleHide);
      window.addEventListener('keyup', this.handleHide);
      window.addEventListener('resize', this.handleResize);

      let selOpt = this.querySelector('z-option') as ZOption;
      if (selOpt)
      {
        setTimeout(() => { selOpt.focus(); }, 250);
      };
    }
    else
    {
      window.removeEventListener('click', this.handleHide);
      window.removeEventListener('keyup', this.handleHide);
      window.removeEventListener('resize', this.handleResize);

      if (before) (findTarget(this.target) as HTMLElement).focus();
    };
  };



  handleHide(e: Event): void
  {
    console.dir(e);
    console.dir(e.target['parentNode']);
    console.dir(e.target);

    if ((e.target['parentNode'] !== this && e.target['id'] !== this.target) || e['keyCode'] == KeyCode.Escape)
    {
      window.removeEventListener('click', this.handleHide);
      window.removeEventListener('keyup', this.handleHide);
      window.removeEventListener('resize', this.handleResize);

      this.hide();
    };
  };



  handleResize(event: Event): void
  {
    this.align();
  };



  handleOptionActivated(ev: CustomEvent): void
  {
    let targ = ev.target as ZOption;
    if (targ.parentNode === this || targ.parentNode === this.parentNode)
    {
      //if (targ.type !== OptionRole.toggle)
      if (!!targ.hideMenu)
      {
        this.hide();
      };
    };
  };

}
