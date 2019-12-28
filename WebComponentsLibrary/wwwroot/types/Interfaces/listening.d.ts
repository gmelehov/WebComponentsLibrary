import { ITarget } from "./targeting.js";
import { IStronglyTyped, IDictionary } from "./interfaces.js";
import { EventType } from "../Enums/enums.js";
import { CustomEventHandler } from "../Classes/CustomEventHandler.js";
/** Интерфейс дескриптора события */
export interface ICustomEventDescriptor extends ITarget, IStronglyTyped<EventType | string> {
    fn?: (ev: Event) => void;
}
export interface ICustomEventLogEntry {
    timeStamp: number;
    firer: string;
    type: EventType | string;
    detail?: IDictionary;
    targets: Array<string>;
    actions: Array<string>;
}
/**  */
export interface IEvent extends CustomEvent {
    /**  */
    detail: IDictionary;
}
export interface IListenerReady {
    /** event-хелпер для отслеживания событий */
    handler: CustomEventHandler;
    /** строка-конфигуратор event-хелпера */
    listensFor: string;
    /**
     * обозреватель изменения строки-конфигуратора event-хелпера
     * @param newValue новая строка-конфигуратор
     * @param oldValue предыдущая строка-конфигуратор
     */
    listensForChanged(newValue: string, oldValue: string): void;
    /** метод, активирующий event-хелпер */
    invoke(): void;
}
