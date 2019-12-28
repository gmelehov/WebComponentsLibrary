import { findTarget } from "../Utilities/findTarget.js";
export class BaseEventDispatcher extends EventTarget {
    constructor() {
        super();
        this.listeners = [];
    }
    ;
    //emitters: ITypedDictionary<(ev: Event) => void> = {};
    listenObj(obj) {
        this.getEventTypes().forEach(f => { obj.addEventListener(f, this.exec.bind(this)); });
        BaseEventDispatcher.evTarget = obj;
    }
    ;
    unlistenObj(obj) {
        this.getEventTypes().forEach(f => { obj.removeEventListener(f, this.exec.bind(this)); });
    }
    ;
    getEventTypes() {
        return [...new Set(this.listeners.map(m => { return m.type; }))];
    }
    ;
    addListener(descriptor) {
        if (this.listeners.indexOf(descriptor) === -1) {
            let check = this.getEventTypes().find(f => f === descriptor.type) !== undefined;
            if (check === false)
                BaseEventDispatcher.evTarget.addEventListener(descriptor.type, this.exec.bind(this));
            this.listeners.push(descriptor);
        }
        ;
    }
    ;
    removeListener(indx) {
        let descriptor = this.listeners[indx];
        if (descriptor) {
            let count = this.listeners.filter(f => f.type === descriptor.type).length;
            if (count === 1)
                BaseEventDispatcher.evTarget.removeEventListener(descriptor.type, this.exec.bind(this));
            this.listeners.splice(indx, 1);
        }
        ;
    }
    ;
    removeAll() {
        this.getEventTypes().forEach(f => { BaseEventDispatcher.evTarget.removeEventListener(f, this.exec.bind(this)); });
        let length = this.listeners.length;
        this.listeners.splice(0, length - 1);
    }
    ;
    exec(ev) {
        let found = this.listeners.filter(f => f.type === event.type);
        return (found) ? found.forEach(descr => {
            let target = findTarget(descr.target);
            descr.fn.call(target, ev);
        }) : undefined;
    }
    ;
}
/** EventTarget по умолчанию */
BaseEventDispatcher.evTarget = document;
