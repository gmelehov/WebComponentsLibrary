import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { OverlayPosition, OptionRole, EventType } from '../Enums/enums.js';
import { VisualSize } from '../Interfaces/interfaces.js';
import { fireCustomEvent } from '../Utilities/fireCustomEvent.js';
import { ZOption } from './ZOption.js';
import { ZOverlay } from './ZOverlay.js';
import { getWidth } from '../Utilities/getWidth.js';
import { alignElement } from '../Utilities/alignElement.js';
import { setStyle } from '../Utilities/setStyle.js';


const { customElement, property, observe } = Poly;






/** Выпадающий список */
@customElement('z-dropdown')
export class ZDropdown extends PolymerElement
{
  static get template()
  {
    return html`
    ${this.styleTemplate}
    ${this.domTemplate}
    `;
  };
  static get styleTemplate()
  {
    return html`
    <style>
			:host { display: block; }
			:host(:focus) { outline: none; }
			:host > div { position: relative; user-select: none; }
			.main { display: flex; align-items: center; position: relative; }
			.main #overlayTrigger { width: 100%; }
			:host .main label { position: absolute; transform: translateY(-160%); transition: var(--z-medium-transition); font-size: 12px; opacity: 0.36; padding-left: 6px; cursor: default; }
			:host([val='']) .main label { position: absolute; transform: translateY(0%); transition: var(--z-medium-transition); opacity: 0.45; padding-left: 6px; font-size: calc(var(--z-default-font-size) * 1px); }
			.underline { width: 100%; }
			.underline .focused { border-top: 2px solid currentColor; color: var(--mat-focused-color, #0091EA); margin-top: -1px; transform: scale(0, 1); transition: transform var(--z-medium-transition); }
			.underline[focused] .focused { transform: scale(1, 1); }
			.underline .default { border-top: 1px solid currentColor; transition: border var(--z-medium-transition); opacity: 0.08; }
			:host([disabled]) .underline .default { border-top: 1px dashed currentColor; }
			.helper { font-size: 11px; opacity: 0.36; padding-left: 6px; cursor: default; }
			.helper:empty { padding-left: 0; }
		</style>
    `;
  };
  static get domTemplate()
  {
    return html`	
		<div>
			<div id="mainDiv" class="main">
				<label for="inp">{{label}}</label>
				<z-option   id="overlayTrigger" 
                    val="{{val}}" 
                    name="{{name}}" 
                    icon="{{icon}}" 
                    icon-color="{{color}}" 
                    icon-size="20" 
                    h="{{optSize}}" 
                    type="dropdown" 
                    disabled="{{disabled}}" 
                    triggers="{{id}} [toggleOverlay]" 
                    on-focus="handleFocused" 
                    on-blur="handleBlurred" 
                    on-option-activated="toggleOverlay">
        </z-option>
				<z-overlay  id="inpSel" 
                    triggers="overlayTrigger" 
                    position="{{overPos}}" 
                    showed="{{showed}}" 
                    size="{{size}}">
					<slot></slot>
				</z-overlay>
			</div>
			<div focused$="{{focused}}" class="underline">
				<div class="default"></div>
				<div class="focused"></div>
			</div>
			<span class="helper">{{descr}}</span>
		</div>`;
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
      this.setAttribute('tabindex', '0');
      this.addEventListener('option-activated', ZDropdown.prototype.handleOptionActivated);
      this.addEventListener('focus', ZDropdown.prototype.handleFocused);
      this.addEventListener('blur', ZDropdown.prototype.handleBlurred);
      let overlay = this.shadowRoot.querySelector('#inpSel') as ZOverlay;
      setTimeout(() =>
      {
        overlay.targeter.items[0].target = this.$.overlayTrigger as ZOption;
        alignElement(overlay, this.$.overlayTrigger as ZOption, this.overPos, false, 0, 0);
        let mainWidth = getWidth(this.$.overlayTrigger);
        setStyle(overlay, 'width', `${mainWidth}px`);
        this.computeName();
      }, 50);
    });
  };







  /** Идентификатор элемента */
  @property({ reflectToAttribute: true, notify: true })
  id: string = '';


  /** Текстовая метка, относящаяся к элементу */
  @property({ reflectToAttribute: true })
  label: string = '';


  /** Наименование выбранной в настоящий момент опции */
  @property({ reflectToAttribute: true, notify: true })
  name: string = '';


  /** Значение выбранной в настоящий момент опции */
  @property({ reflectToAttribute: true, notify: true, observer: ZDropdown.prototype.valChanged })
  val: string = '';


  /** Иконка выбранной в настоящий момент опции */
  @property({ reflectToAttribute: true, notify: true })
  icon: string = '';


  /** Цвет иконки выбранной в настоящий момент опции */
  @property({ reflectToAttribute: true, notify: true })
  color: string = 'grey-500';


  /** Максимальная высота раскрывающегося списка опций (максимальное количество одновременно отображаемых опций в списке выбора) */
  @property({ reflectToAttribute: true, notify: true })
  size: number = 8;


  /** Визуальный размер элементов-опций, содержащихся в элементе dropdown */
  @property({ reflectToAttribute: true, notify: true, observer: ZDropdown.prototype.optSizeChanged })
  optSize: number = 28;


  /** Если true, элемент dropdown недоступен/отключен; если false - элемент доступен/включен */
  @property({ reflectToAttribute: true, notify: true })
  disabled: boolean = false;


  /** Если true, элемент dropdown допускает множественный выбор опций; если false (по умолчанию) - элемент допускает выбор только одной опции из списка */
  @property({ reflectToAttribute: true, notify: true, observer: ZDropdown.prototype.multiChanged })
  multi: boolean = false;


  /** Если true - элемент dropdown получил фокус ввода */
  @property({ reflectToAttribute: true, notify: true })
  focused: boolean = false;


  /** Если true - список опций элемента dropdown открыт; если false - список опций закрыт */
  @property({ notify: true })
  showed: boolean = false;


  /** Краткое описание элемента */
  @property()
  descr: string = '';


  /** Свойство элементов-опций, привязанное к свойству val элемента dropdown */
  @property({ reflectToAttribute: true, notify: true })
  indexAttr: string = 'id';


  /** Свойство элементов-опций, привязанное к свойству val элемента dropdown */
  @property({ reflectToAttribute: true, notify: true })
  overPos: OverlayPosition = OverlayPosition.baseline;










  handleFocused(ev: Event): void
  {
    if (!this.disabled)
      this.focused = true;
  };


  handleBlurred(ev: Event): void
  {
    this.focused = false;
  };


  toggleOverlay()
  {
    if (!this.disabled)
    {
      (this.$.inpSel as ZOverlay).showed = true;
      let selOpt = (this.querySelector(`z-option[${this.indexAttr}='${this.val}']`) as ZOption) || (this.querySelectorAll('z-option')[0] as ZOption);
      if (selOpt) selOpt.focus();
    };
  };


  handleOptionActivated(ev: CustomEvent)
  {
    let targ = ev.target as ZOption;
    if (targ.parentNode === this && targ.id !== 'overlayTrigger')
    {
      if (this.multi)
      {
        let optSelected = [...this.querySelectorAll('z-option[active]:not([type="dropdown"])')] as Array<ZOption>;
        this.val = optSelected.map(m => { return m.val; }).join(', ');
      }
      else
      {
        this.val = targ[this.indexAttr];
        let prevActive = ([...this.querySelectorAll('z-option[active]:not([type="dropdown"])')] as Array<ZOption>).find(f => { return f[this.indexAttr] != this.val; });
        if (prevActive) prevActive.active = false;
      };

      setTimeout(() =>
      {
        this.icon = targ.icon;
        this.color = targ.iconColor;
        this.focused = true;
        (this.$.overlayTrigger as ZOption).focus();
      }, 280);
    };
  };


  valChanged(now: string, before: string): void
  {
    this.computeName();
  };


  computeName(): void
  {
    if (this.multi)
    {
      let optSelected = [...this.querySelectorAll('z-option[active]:not([type="dropdown"])')] as Array<ZOption>;
      this.name = optSelected.map(m => { return m.name; }).join(', ');
    }
    else
    {
      let found = ([...this.querySelectorAll('z-option')] as Array<ZOption>).find(f => { return f[this.indexAttr] == this.val; });
      if (found)
      {
        this.name = found.name;
        found.active = true;
      };
    };
    fireCustomEvent(this, EventType.valueChanged, { id: this.id, name: this.name, value: this.val });
  };


  multiChanged(now: boolean, before: boolean): void
  {
    let options = [...this.querySelectorAll('z-option:not([type="dropdown"])')] as Array<ZOption>;
    if (now)
    {
      let val = this.val.split(/,\s+/);
      options.forEach(f =>
      {
        f.type = OptionRole.toggle;
        if (val.includes(f.val))
          f.active = true;
      });
    }
    else if (before !== undefined)
    {
      options.forEach(f => { f.type = OptionRole.simple; });
    }
  };


	/**
	 * Обозреватель изменения стандартного визуального размера элементов-опций
	 * Применяет новый визуальный размер ко всем элементам-опциям, содержащимся в элементе dropdown
	 * @param now новое значение визуального размера
	 * @param before предыдущее значение визуального размера
	 */
  optSizeChanged(now: number, before: number): void
  {
    if (now)
    {
      let options = [...this.querySelectorAll('z-option')] as Array<ZOption>;
      options.forEach(f => { f.h = now; });
    };
  };

}