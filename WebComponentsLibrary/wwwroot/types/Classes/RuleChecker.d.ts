import { IPredicateArgs, Primitive } from "../Interfaces/interfaces.js";
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
export declare class RuleChecker {
    constructor(model: IPredicateArgs);
    /**
     * объект, свойство которого необходимо проверить на соответствие условию
     */
    obj: any;
    /**
     * первый операнд бинарной операции сравнения
     *
     * в случае, если объект задан (не равен null) - название свойства объекта, проверяемого на соответствие условию
     * в случае, если объект не задан (равен null) - непосредственно само значение, проверяемое на соответствие условию
     */
    prop: Primitive;
    /**
     * второй операнд бинарной операции сравнения
     */
    val: Primitive;
    /**
     * функция-предикат, задающая тип бинарного сравнения
     */
    func?: (q: Primitive, w: Primitive) => boolean;
    /**
     * результат бинарной операции сравнения
     */
    get result(): boolean;
}
