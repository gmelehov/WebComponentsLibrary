import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
/**
 * Страница приложения
 * @customElement
 * @polymer
 */
export declare class ZPage extends PolymerElement {
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    showDrawer: boolean;
    get mainElem(): HTMLElement;
    get hdrElem(): HTMLElement;
    toggleDrawer(): void;
    doShowDrawer(): void;
    doHideDrawer(): void;
    handleDrawerMenuClick(e: MouseEvent): void;
    handleMainElemClick(e: MouseEvent): void;
}
