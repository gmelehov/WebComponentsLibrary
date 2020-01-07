import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { dedupingMixin } from '../../lib/@polymer/polymer/lib/utils/mixin.js';
import { AnyConstructor } from '../Interfaces/interfaces.js';
import { Targeter } from '../Classes/Targeter.js';
import { stringToTargetDefinitions } from '../Utilities/stringToTargetDefinitions.js';


const { customElement, property, observe, computed } = Poly;







export const TargeterMixin = dedupingMixin(<U extends AnyConstructor<PolymerElement>>(base: U) =>
{

  class TargeterBaseClass extends base
  {

    constructor(...input: any[])
    {
      super();
      this.disabled = false;
      this.noTap = false;
      this.href = '';
      this.triggers = '';
      this.targeter = new Targeter();
    };
    connectedCallback()
    {
      super.connectedCallback();
    };







    /**
	   * При установке в true элемент не может быть выбран/активирован/задействован
	   * При установке в false (по умолчанию) элемент может быть выбран/активирован/задействован
	   */
    @property({ reflectToAttribute: true, notify: true, observer: TargeterBaseClass.prototype.disabledChanged })
    disabled: boolean = false;


    /**
	   * При установке в true отключает эффект ripple при активации элемента (соответствующее действие выполняется без задержки)
	   * При установке в false (по умолчанию) включает эффект ripple при активации элемента (соответствующее действие выполняется с небольшой задержкой)
	   */
    @property({ reflectToAttribute: true })
    noTap: boolean = false;


    /** Ссылка, переход к которой будет осуществлен после активации элемента */
    @property({ notify: true })
    href: string = '';


    /** Строка-конфигуратор командного хелпера */
    @property({ notify: true, observer: TargeterBaseClass.prototype.triggersChanged })
    triggers: string = '';


    /** Хелпер для взаимодействия с элементами-получателями команд */
    targeter: Targeter;













    /**
	   * Обозреватель изменения свойства disabled
	   * Если новое значение свойства равно true, устанавливает атрибут tabindex="-1"
	   * Если новое значение свойства равно false, устанавливает атрибут tabindex="0"
	   * @param newVal
	   * @param oldVal
	   */
    disabledChanged(newVal: boolean, oldVal: boolean): void
    {
      (newVal) ? this.setAttribute('tabindex', '-1') : this.setAttribute('tabindex', '0');
    };


    /**
	   * Обозреватель изменения строки-конфигуратора командного хелпера
	   * Обновляет конфигурацию командного хелпера
	   * @param now новая строка-конфигуратор
	   * @param before предыдущая строка-конфигуратор
	   */
    triggersChanged(now: string, before: string): void
    {
      if (now !== null && now !== undefined)
      {
        this.targeter.removeAll();
        setTimeout(() =>
        {
          if (now !== '')
          {
            this.targeter.addMany(stringToTargetDefinitions(now));
          };
        }, 0);
      };
    };


    /** Метод, активирующий командный хелпер */
    exec(): void
    {
      if (!!this.triggers && !!this.targeter && !this.disabled)
        if (!!this.noTap)
        {
          this.targeter.exec();
        }
        else
        {
          setTimeout(() => this.targeter.exec(), TargeterBaseClass.execDelay);
        };
    };


    /** Переходит по ссылке, заданной в свойстве href элемента */
    gotoHref(): void
    {
      if (this.href && !this.disabled)
      {
        setTimeout(() => { window.location.href = this.href; }, TargeterBaseClass.hrefDelay);
      };
    };








    /** Задержка исполнения действий. */
    static execDelay: number = 180;


    /** Задержка перехода по ссылке. */
    static hrefDelay: number = 400;

  };


  return TargeterBaseClass;

});