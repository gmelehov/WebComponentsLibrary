/**
 * Дескриптор пользовательского события
 */
export class CustomEventDescriptor {
    constructor(model) {
        let _temp = Object.assign(Object.create(null), model);
        this.type = _temp.type;
        this.target = _temp.target;
        this.action = _temp.action;
        Object.seal(this);
        _temp = null;
    }
}
