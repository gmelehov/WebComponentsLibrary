import { EventType } from "../Enums/enums.js";
import { ICustomEventDescriptor } from "../Interfaces/listening.js";
/**
 * Дескриптор пользовательского события
 */
export declare class CustomEventDescriptor implements ICustomEventDescriptor {
    type: EventType | string;
    target: HTMLElement | Element | Node | string;
    action: string;
    fn?: (ev: Event) => void;
    constructor(model: ICustomEventDescriptor);
}
