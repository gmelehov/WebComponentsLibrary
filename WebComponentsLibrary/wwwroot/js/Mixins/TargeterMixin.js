var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { dedupingMixin } from '../../lib/@polymer/polymer/lib/utils/mixin.js';
import { Targeter } from '../Classes/Targeter.js';
import { stringToTargetDefinitions } from '../Utilities/stringToTargetDefinitions.js';
const { customElement, property, observe, computed } = Poly;
export const TargeterMixin = dedupingMixin((base) => {
    class TargeterBaseClass extends base {
        constructor(...input) {
            super();
            /**
               * При установке в true элемент не может быть выбран/активирован/задействован
               * При установке в false (по умолчанию) элемент может быть выбран/активирован/задействован
               */
            this.disabled = false;
            /**
               * При установке в true отключает эффект ripple при активации элемента (соответствующее действие выполняется без задержки)
               * При установке в false (по умолчанию) включает эффект ripple при активации элемента (соответствующее действие выполняется с небольшой задержкой)
               */
            this.noTap = false;
            /** Ссылка, переход к которой будет осуществлен после активации элемента */
            this.href = '';
            /** Строка-конфигуратор командного хелпера */
            this.triggers = '';
            this.disabled = false;
            this.noTap = false;
            this.href = '';
            this.triggers = '';
            this.targeter = new Targeter();
        }
        ;
        connectedCallback() {
            super.connectedCallback();
        }
        ;
        /**
           * Обозреватель изменения свойства disabled
           * Если новое значение свойства равно true, устанавливает атрибут tabindex="-1"
           * Если новое значение свойства равно false, устанавливает атрибут tabindex="0"
           * @param newVal
           * @param oldVal
           */
        disabledChanged(newVal, oldVal) {
            (newVal) ? this.setAttribute('tabindex', '-1') : this.setAttribute('tabindex', '0');
        }
        ;
        /**
           * Обозреватель изменения строки-конфигуратора командного хелпера
           * Обновляет конфигурацию командного хелпера
           * @param now новая строка-конфигуратор
           * @param before предыдущая строка-конфигуратор
           */
        triggersChanged(now, before) {
            if (now !== null && now !== undefined) {
                this.targeter.removeAll();
                setTimeout(() => {
                    if (now !== '') {
                        this.targeter.addMany(stringToTargetDefinitions(now));
                    }
                    ;
                }, 0);
            }
            ;
        }
        ;
        /** Метод, активирующий командный хелпер */
        exec() {
            if (!!this.triggers && !!this.targeter && !this.disabled)
                if (!!this.noTap) {
                    this.targeter.exec();
                }
                else {
                    setTimeout(() => this.targeter.exec(), TargeterBaseClass.execDelay);
                }
            ;
        }
        ;
        /** Переходит по ссылке, заданной в свойстве href элемента */
        gotoHref() {
            if (this.href && !this.disabled) {
                setTimeout(() => { window.location.href = this.href; }, TargeterBaseClass.hrefDelay);
            }
            ;
        }
        ;
    }
    /** Задержка исполнения действий. */
    TargeterBaseClass.execDelay = 180;
    /** Задержка перехода по ссылке. */
    TargeterBaseClass.hrefDelay = 400;
    __decorate([
        property({ reflectToAttribute: true, notify: true, observer: TargeterBaseClass.prototype.disabledChanged }),
        __metadata("design:type", Boolean)
    ], TargeterBaseClass.prototype, "disabled", void 0);
    __decorate([
        property({ reflectToAttribute: true }),
        __metadata("design:type", Boolean)
    ], TargeterBaseClass.prototype, "noTap", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", String)
    ], TargeterBaseClass.prototype, "href", void 0);
    __decorate([
        property({ notify: true, observer: TargeterBaseClass.prototype.triggersChanged }),
        __metadata("design:type", String)
    ], TargeterBaseClass.prototype, "triggers", void 0);
    ;
    return TargeterBaseClass;
});
