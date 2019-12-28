var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PolymerElement, html } from '../../../lib/@polymer/polymer/polymer-element.js';
import * as Poly from '../../../lib/@polymer/decorators/lib/decorators.js';
import { changeElementTemplate } from '../../Utilities/changeElementTemplate.js';
import { getHTMLTemplateFromStrings } from '../../Utilities/getHTMLTemplateFromStrings.js';
const { customElement, property, observe } = Poly;
/** Базовый компонент с поддержкой динамического обновления собственного шаблона */
let ZBaseElement = class ZBaseElement extends PolymerElement {
    constructor() {
        super();
        /** Путь к файлу, содержащему определения стилей для этого компонента. */
        this.stylesSrc = '';
        /** Путь к файлу, содержащему HTML-разметку для этого элемента. */
        this.domSrc = '';
    }
    static get template() {
        return html ``;
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    updateSelfTemplate(styles, dom) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchedStyles = styles != null ? ((yield fetch(this.stylesSrc).then((response) => __awaiter(this, void 0, void 0, function* () { return yield response.text(); })).catch(e => '')) || styles) : '';
            const fetchedDom = dom != null ? ((yield fetch(this.domSrc).then((response) => __awaiter(this, void 0, void 0, function* () { return yield response.text(); })).catch(e => '')) || dom) : '';
            let tmpl = getHTMLTemplateFromStrings(['<style>', fetchedStyles, '</style>', fetchedDom]);
            changeElementTemplate(this, tmpl);
        });
    }
    ;
};
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZBaseElement.prototype, "stylesSrc", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", String)
], ZBaseElement.prototype, "domSrc", void 0);
__decorate([
    observe('stylesSrc', 'domSrc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ZBaseElement.prototype, "updateSelfTemplate", null);
ZBaseElement = __decorate([
    customElement('z-base-element'),
    __metadata("design:paramtypes", [])
], ZBaseElement);
export { ZBaseElement };
