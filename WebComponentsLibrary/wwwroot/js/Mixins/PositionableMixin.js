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
import { afterNextRender } from '../../lib/@polymer/polymer/lib/utils/render-status.js';
import { setStyles } from '../Utilities/setStyles.js';
import { clamp } from '../Utilities/clamp.js';
const { customElement, property, observe, computed } = Poly;
/**
 * Добавляет элементу возможность управления размерами и позиционированием.
 * Является базовым миксином для DraggableMixin и ResizableMixin.
 * @polymer
 * @mixinFunction
 */
export const PositionableMixin = dedupingMixin((base) => {
    /**
     * @polymer
     * @mixinClass
     */
    class PositionableBaseClass extends base {
        constructor(...input) {
            super();
            /** Минимальная высота элемента, в пикселях */
            this.hmin = 15;
            /** Максимальная высота элемента, в пикселях */
            this.hmax = Infinity;
            /** Минимальная ширина элемента, в пикселях */
            this.wmin = 15;
            /** Максимальная ширина элемента, в пикселях */
            this.wmax = Infinity;
        }
        ;
        connectedCallback() {
            super.connectedCallback();
            afterNextRender(this, () => {
                this._initStylesFromProps();
                this._updateMaxSizesFromViewport();
                window.addEventListener('resize', this.handleWindowResize.bind(this));
            });
        }
        ;
        disconnectedCallback() {
            super.disconnectedCallback();
            window.removeEventListener('resize', this.handleWindowResize.bind(this));
        }
        ;
        /**
         * Обновляет максимальную высоту и максимальную ширину элемента.
         * Метод должен вызываться при начальной отрисовке элемента,
         * а также каждый раз при изменении размеров окна браузера.
         * @private
         */
        _updateMaxSizesFromViewport() {
            if (window) {
                let vportWidth = window.innerWidth;
                let vportHeight = window.innerHeight;
                this.wmax = clamp(this.wmax, this.wmin, vportWidth);
                this.hmax = clamp(this.hmax, this.hmin, vportHeight);
            }
            ;
        }
        ;
        /**
         * Выполняет начальную установку стилей элемента.
         * Значения копируются из соответствующих свойств.
         * @private
         */
        _initStylesFromProps() {
            setStyles(this, {
                'left': `${this.left}px`,
                'top': `${this.top}px`,
                'width': `${clamp(this.width, this.wmin, this.wmax)}px`,
                'height': `${clamp(this.height, this.hmin, this.hmax)}px`
            });
        }
        ;
        /**
         * Копирует текущие значения CSS-свойств left, top, width, height
         * в соответствующие свойства элемента.
         * @private
         */
        _updatePropsFromStyles() {
            this.left = parseFloat(this.style.left.split('px')[0]);
            this.top = parseFloat(this.style.top.split('px')[0]);
            this.width = clamp(parseFloat(this.style.width.split('px')[0]), this.wmin, this.wmax);
            this.height = clamp(parseFloat(this.style.height.split('px')[0]), this.hmin, this.hmax);
        }
        ;
        /**
         * Обновляет смещения элемента по вертикали (от верхнего края браузера)
         * и по горизонтали (от левого края браузера).
         * Метод должен вызываться при перемещении элемента (drag-and-drop).
         * @param top новое значение для смещения элемента по вертикали
         * @param left новое значение для смещения элемента по горизонтали
         */
        updateTopLeft(top, left) {
            this.top = top;
            this.left = left;
            setStyles(this, {
                'left': `${left}px`,
                'top': `${top}px`,
            });
        }
        ;
        /**
         * Обновляет высоту и ширину элемента.
         * Метод должен вызываться при изменении размеров элемента (resize).
         * @param width новое значение для ширины элемента
         * @param height новое значение для высоты элемента
         */
        updateWidthHeight(width, height) {
            this.width = clamp(width, this.wmin, this.wmax);
            this.height = clamp(height, this.hmin, this.hmax);
            setStyles(this, {
                'width': `${clamp(width, this.wmin, this.wmax)}px`,
                'height': `${clamp(height, this.hmin, this.hmax)}px`
            });
        }
        ;
        /**
         * Обработчик события resize, генерируемого при изменении размеров окна браузера.
         * @param e событие resize
         */
        handleWindowResize(e) {
            this._updateMaxSizesFromViewport();
        }
        ;
    }
    __decorate([
        property({ reflectToAttribute: true, notify: true }),
        __metadata("design:type", Number)
    ], PositionableBaseClass.prototype, "left", void 0);
    __decorate([
        property({ reflectToAttribute: true, notify: true }),
        __metadata("design:type", Number)
    ], PositionableBaseClass.prototype, "top", void 0);
    __decorate([
        property({ reflectToAttribute: true, notify: true }),
        __metadata("design:type", Number)
    ], PositionableBaseClass.prototype, "width", void 0);
    __decorate([
        property({ reflectToAttribute: true, notify: true }),
        __metadata("design:type", Number)
    ], PositionableBaseClass.prototype, "height", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], PositionableBaseClass.prototype, "hmin", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], PositionableBaseClass.prototype, "hmax", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], PositionableBaseClass.prototype, "wmin", void 0);
    __decorate([
        property({ notify: true }),
        __metadata("design:type", Number)
    ], PositionableBaseClass.prototype, "wmax", void 0);
    ;
    return PositionableBaseClass;
});
