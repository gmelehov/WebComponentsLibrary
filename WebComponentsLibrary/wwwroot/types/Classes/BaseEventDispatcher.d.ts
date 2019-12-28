import { ICustomEventDescriptor } from "../Interfaces/listening.js";
export declare class BaseEventDispatcher extends EventTarget {
    constructor();
    listeners: Array<ICustomEventDescriptor>;
    listenObj(obj: EventTarget): void;
    unlistenObj(obj: EventTarget): void;
    getEventTypes(): Array<string>;
    addListener(descriptor: ICustomEventDescriptor): void;
    removeListener(indx: number): void;
    removeAll(): void;
    exec(ev: Event): void;
    /** EventTarget по умолчанию */
    private static evTarget;
}
