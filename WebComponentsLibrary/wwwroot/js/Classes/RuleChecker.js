import { checkIf } from "../Utilities/checkIf.js";
import { ifEquals } from "../Utilities/logicUtils.js";
/**
 * Элемент-валидатор
 *
 * @example
 *
 * <some-element id="some-id" prop1="someValue" prop2="15" selected></some-element>
 *
 * let elem = document.getElementById('some-id');
 * let checker = new RuleChecker({ obj: elem, prop: 'prop1', val: 'someValue', ifEquals });
 * checker.result ===> true ('someValue' === elem.prop1)
 *
 * checker = new RuleChecker({ obj: elem, prop: 'prop2', val: 21, ifLesser });
 * checker.result ===> false (21 > elem.prop2)
 *
 * checker = new RuleChecker({ obj: elem, prop: 'selected', val: true, ifEquals });
 * checker.result ===> true (true === elem.selected)
 */
export class RuleChecker {
    constructor(model) {
        this.obj = (model.obj) ? model.obj : null;
        this.prop = model.prop;
        this.val = model.val;
        this.func = (model.func) ? model.func : ifEquals;
    }
    ;
    /**
     * результат бинарной операции сравнения
     */
    get result() {
        return checkIf(this.obj, this.prop, this.val, this.func);
    }
    ;
}
