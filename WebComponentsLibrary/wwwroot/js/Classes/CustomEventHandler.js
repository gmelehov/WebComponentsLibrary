import { findTarget } from "../Utilities/findTarget.js";
/**
 * Обработчик пользовательских событий
 */
export class CustomEventHandler {
    constructor(_items) {
        this.log = new Array();
        this.items = (_items) ? _items : new Array();
        Object.seal(this);
    }
    ;
    listenObj(obj) {
        this.getEventTypes().forEach(f => { obj.addEventListener(f, this.exec.bind(this)); });
        CustomEventHandler._evTarget = obj;
    }
    ;
    unlistenObj(obj) {
        this.getEventTypes().forEach(f => { obj.removeEventListener(f, this.exec.bind(this)); });
    }
    ;
    getEventTypes() {
        return [...new Set(this.items.map(m => { return m.type; }))];
    }
    ;
    /**
     * Проверяет, зарегистрирован ли хотя бы один обработчик для указанного события
     * @param event пользовательское событие
     */
    hasCallbackForEvent(event) {
        return this.items.some(s => { return s.type === event.type; });
    }
    ;
    exec(event) {
        let targ = event.target;
        let logEntry = {
            timeStamp: event.timeStamp,
            firer: `${targ.nodeName.toLowerCase()}#${targ.id}`,
            type: event.type,
            detail: event.detail,
            targets: [],
            actions: [],
        };
        let found = this.items.filter(f => { return f.type === event.type; });
        return (found) ? found.forEach(descr => {
            let target = findTarget(descr.target);
            let targetSelector = (`${target.id}`) ?
                `${target.nodeName.toLowerCase()}#${target.id}`
                :
                    `${target.nodeName.toLowerCase()}`;
            logEntry.targets.push(targetSelector);
            logEntry.actions.push(descr.action);
            this.log.push(logEntry);
            target[descr.action].call(target, event);
        }) : undefined;
    }
    ;
    /**
     * Добавляет в список новый дескриптор. В случае необходимости запускает новый прослушиватель событий, соответствующий добавляемому дескриптору
     * @param descriptor дескриптор пользовательского события
     */
    add(descriptor) {
        if (this.items.indexOf(descriptor) === -1) {
            let check = this.getEventTypes().find(f => f === descriptor.type) !== undefined;
            if (check === false)
                CustomEventHandler._evTarget.addEventListener(descriptor.type, this.exec.bind(this));
            this.items.push(descriptor);
        }
        ;
    }
    ;
    /**
     * Удаляет дескриптор из списка. В случае необходимости удаляет связанный с дескриптором прослушиватель событий
     * @param indx индекс дескриптора пользовательского события в списке items
     */
    remove(indx) {
        let descriptor = this.items[indx];
        if (descriptor) {
            let count = this.items.filter(f => { return f.type === descriptor.type; }).length;
            if (count === 1)
                CustomEventHandler._evTarget.removeEventListener(descriptor.type, this.exec.bind(this));
            this.items.splice(indx, 1);
        }
        ;
    }
    ;
    /**
     * Удаляет все дескрипторы и связанные прослушиватели событий из списка items
     */
    removeAll() {
        this.getEventTypes().forEach(f => { CustomEventHandler._evTarget.removeEventListener(f, this.exec.bind(this)); });
        let length = this.items.length;
        this.items.splice(0, length - 1);
    }
    ;
}
/** EventTarget по умолчанию */
CustomEventHandler._evTarget = document;
