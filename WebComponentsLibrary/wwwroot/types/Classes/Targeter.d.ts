import { ITargetInteraction } from "../Interfaces/targeting.js";
/**
 * Командный хелпер
 * Обеспечивает взаимодействие родительского элемента с элементами-получателями команд
 * Вызывает зарегистрированные методы элементов-получателей команд в безусловном (по умолчанию) и условном режиме
 * В безусловном режиме выполнения вызывает зарегистрированные методы непосредственно
 * В условном режиме выполнения вызывает зарегистрированные методы по результатам проверки выполнения заданных условий
 */
export declare class Targeter {
    isSimple: boolean;
    items: Array<ITargetInteraction>;
    constructor(_items?: Array<ITargetInteraction>, _simple?: boolean);
    get hasDefaultTarget(): boolean;
    get defaultTarget(): HTMLElement;
    get found(): Array<ITargetInteraction>;
    exec(): void;
    removeAll(): void;
    addMany(elems: Array<ITargetInteraction>): void;
}
