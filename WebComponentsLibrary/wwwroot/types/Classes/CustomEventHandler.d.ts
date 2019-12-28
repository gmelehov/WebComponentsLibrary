import { CustomEventDescriptor } from "./CustomEventDescriptor.js";
import { ICustomEventLogEntry } from "../Interfaces/listening.js";
/**
 * Обработчик пользовательских событий
 */
export declare class CustomEventHandler {
    items: Array<CustomEventDescriptor>;
    log: Array<ICustomEventLogEntry>;
    constructor(_items?: Array<CustomEventDescriptor>);
    listenObj(obj: EventTarget): void;
    unlistenObj(obj: EventTarget): void;
    getEventTypes(): Array<string>;
    /**
     * Проверяет, зарегистрирован ли хотя бы один обработчик для указанного события
     * @param event пользовательское событие
     */
    hasCallbackForEvent(event: CustomEvent): boolean;
    exec(event: CustomEvent): void;
    /**
     * Добавляет в список новый дескриптор. В случае необходимости запускает новый прослушиватель событий, соответствующий добавляемому дескриптору
     * @param descriptor дескриптор пользовательского события
     */
    add(descriptor: CustomEventDescriptor): void;
    /**
     * Удаляет дескриптор из списка. В случае необходимости удаляет связанный с дескриптором прослушиватель событий
     * @param indx индекс дескриптора пользовательского события в списке items
     */
    remove(indx: number): void;
    /**
     * Удаляет все дескрипторы и связанные прослушиватели событий из списка items
     */
    removeAll(): void;
    /** EventTarget по умолчанию */
    private static _evTarget;
}
