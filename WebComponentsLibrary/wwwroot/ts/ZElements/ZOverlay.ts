import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { ITargeterReady } from "../Interfaces/targeting.js";
import { OverlayPosition, OptionRole, KeyCode } from "../Enums/enums.js";
import { Targeter } from "../Classes/Targeter.js";
import { getHeight } from "../Utilities/getHeight.js";
import { getWidth } from "../Utilities/getWidth.js";
import { ZOption } from "./ZOption.js";
import { isBetween } from "../Utilities/isBetween.js";
import { findTarget } from "../Utilities/findTarget.js";
import { stringToTargetDefinitions } from "../Utilities/stringToTargetDefinitions.js";
import { setStyle } from "../Utilities/setStyle.js";
import { alignElement } from "../Utilities/alignElement.js";
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { LegacyElementMixin } from '../../lib/@polymer/polymer/lib/legacy/legacy-element-mixin.js';


const { customElement, property, observe } = Poly;








/**
 * Условия закрытия оверлея:
 * 
 * (1) - нажата клавиша Esc, ИЛИ
 * (2) - активирована опция, переключающая подменю оверлея, ИЛИ
 * (3) - активирована дочерняя опция в оверлее, имеющая свойство hideMenu, равное {@link MenuBehaviourOnClick.hideParent}. 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */








/**
 * 
 * @customElement
 * @polymer
 */
@customElement('z-overlay')
export class ZOverlay extends LegacyElementMixin(PolymerElement) implements ITargeterReady
{
  static get template()
  {
    return html`
		<style>
			:host { box-sizing: border-box; display: block; opacity: 1; position: fixed; text-align: left; z-index: 10001; padding: 8px 0; background-color: hsl(0, 0%, 100%); width: max-content; border-radius: 2px; }
			:host(:not([showed])) { opacity: 0 !important; pointer-events: none !important; visibility: hidden !important; transition: var(--z-medium-transition); }
			:host .wrapper { background: inherit; border-radius: inherit; box-sizing: border-box; display: block; height: 100%; transform: translate3d(0, 0, 9999px); transition: var(--z-medium-transition); }
			:host .body { box-sizing: border-box; display: block; height: 100%; overflow-x: hidden; overflow-y: auto; position: relative; background-color: hsl(0, 0%, 100%); transition: var(--z-medium-transition); }
				:host .body::-webkit-scrollbar { width: 6px; }
				:host .body::-webkit-scrollbar-thumb { background-color: hsla(0, 0%, 0%, 0.22); margin: 0.0vh 6px; }
				:host .body::-webkit-scrollbar-track { margin: 0.0vh 6px; }
				:host .body::-webkit-scrollbar-track-piece { background-color: hsla(0, 0%, 0%, 0.1); }
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
    this.targeter = new Targeter();
  };
  connectedCallback()
  {
    super.connectedCallback();
    this.handleHide = this.handleHide.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.addEventListener('option-activated', ZOverlay.prototype.handleOptionActivated);
  };
  disconnectedCallback()
  {
    super.disconnectedCallback();
    this.removeEventListener('option-activated', ZOverlay.prototype.handleOptionActivated);
  };







  /** box-shadow */
  @property({ notify: true, observer: ZOverlay.prototype.zChanged })
  z: number = 8;


  /** максимальная высота элемента, измеряемая в количестве отображаемых опций */
  @property({ reflectToAttribute: true, notify: true, observer: ZOverlay.prototype.sizeChanged })
  size: number = 8;


  /** признак выравнивания элемента по центру */
  @property({ notify: true })
  autoCenter: boolean = false;


  /** выравнивание элемента относительно родительского элемента */
  @property()
  position: OverlayPosition = OverlayPosition.baseline;


  /** дополнительное смещение элемента по горизонтали, в пикселях */
  @property()
  xBias: number = 0;


  /** дополнительное смещение элемента по вертикали, в пикселях */
  @property()
  yBias: number = 0;


  /** состояние элемента "отображается"/"не отображается" */
  @property({ reflectToAttribute: true, notify: true, observer: ZOverlay.prototype.showedChanged })
  showed: boolean = false;



  @property({ reflectToAttribute: true, notify: true, observer: ZOverlay.prototype.triggersChanged })
  triggers: string;





  targeter: Targeter = new Targeter();










  /** Позиционирует элемент относительно своего переключателя */
  align(): void
  {
    let item = (this.queryDistributedElements('z-option')) ? this.queryDistributedElements('z-option')[0] as HTMLElement : null;
    (this.shadowRoot.querySelector('#theBody') as HTMLElement).style.maxHeight = (item && this.size) ? `${getHeight(item) * this.size}px` : ``;

    this.showed && alignElement(this, this.targeter.defaultTarget, this.position, this.autoCenter, this.xBias, this.yBias);

    if (this.showed)
    {
      let left = parseInt(this.style.left);
      let top = parseInt(this.style.top);
      setStyle(this, 'left', (left + this.xBias) + 'px');
      setStyle(this, 'top', (top + this.yBias) + 'px');
      if (this.targeter.defaultTarget && (this.targeter.defaultTarget as ZOption).type !== OptionRole.sub) setStyle(this, 'width', `${getWidth(this.targeter.defaultTarget)}px`);
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
    (this.showed) ? this.hide() : this.show();
  };


	/**
	 * Обозреватель изменения визуальной высоты подъема элемента
	 * @param newVal новое значение
	 * @param oldVal предыдущее значение
	 */
  zChanged(newVal: number, oldVal: number): void
  {
    if (isBetween(newVal, 0, 24))
    {
      this.style.setProperty('box-shadow', `var(--z-shadow-z${newVal})`);
    };
  };


	/**
	 * Обозреватель изменения максимальной высоты прокручиваемой области элемента
	 * @param newSize новое значение
	 * @param oldSize предыдущее значение
	 */
  sizeChanged(newSize: number, oldSize: number): void
  {
    let item = (this.queryDistributedElements('z-option')) ? this.queryDistributedElements('z-option')[0] as HTMLElement : null;
    (this.shadowRoot.querySelector('#theBody') as HTMLElement).style.maxHeight = (item && newSize) ? `${getHeight(item) * newSize}px` : ``;
  };


	/**
	 * Обозреватель изменения видимости элемента
	 * @param newValue новое значение
	 * @param oldValue предыдущее значение
	 */
  showedChanged(newValue: boolean, oldValue: boolean): void
  {
    this.align();

    if (newValue)
    {
      window.addEventListener('click', this.handleHide);
      window.addEventListener('keyup', this.handleHide);
      window.addEventListener('resize', this.handleResize);

      let selOpt = this.querySelector('z-option') as ZOption;
      if (selOpt)
        selOpt.focus();
    }
    else
    {
      window.removeEventListener('click', this.handleHide);
      window.removeEventListener('keyup', this.handleHide);
      window.removeEventListener('resize', this.handleResize);

      if (oldValue)
        (findTarget(this.targeter.items[0].target) as HTMLElement).focus();
    };
  };


	/**
	 * Обозреватель изменения типа выравнивания элемента
	 * Пересчитывает позиционирование элемента относительно своего переключателя
	 * @param now новый тип выравнивания
	 * @param before предыдущий тип выравнивания
	 */
  positionChanged(now: OverlayPosition, before: OverlayPosition): void
  {
    this.align();
  };



  handleHide(e: Event): void
  {
    if ((e.target['parentNode'] !== this && e['path'][0] !== this.targeter.defaultTarget && e.target['parentNode'] !== this.domHost && e['path'][0].parentNode !== this.domHost) || e['keyCode'] == KeyCode.Escape)
    {
      window.removeEventListener('click', this.handleHide);
      window.removeEventListener('keyup', this.handleHide);
      window.removeEventListener('resize', this.handleResize);

      setTimeout(() =>
      {
        //e.stopPropagation();
        this.hide();
      }, 220);
    };
  };



  handleResize(event: Event): void
  {
    this.align();
  };



  handleOptionActivated(ev: CustomEvent)
  {
    let targ = ev.target as ZOption;
    if (targ.parentNode === this || targ.parentNode === this.parentNode || targ.parentNode === this.domHost)
      if (targ.hideMenu)
        setTimeout(() =>
        {
          //ev.stopPropagation();
          this.hide();
        }, 280);
  };



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
        this.align();
      }, 0);
    };
  };



  exec(): void
  {
    if (this.triggers && this.targeter)
      this.targeter.exec();
  };
}