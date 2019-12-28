import { FuncPredicate } from "../Interfaces/interfaces.js";
export declare const ifEquals: FuncPredicate;
export declare const AND: (left: FuncPredicate, right: FuncPredicate) => (a: string | number | boolean, b: string | number | boolean) => boolean;
export declare const OR: (left: FuncPredicate, right: FuncPredicate) => (a: string | number | boolean, b: string | number | boolean) => boolean;
/**
 * Предикат ifNotEquals.
 * Возвращает функцию для сравнения двух значений, которая возвращает true,
 * если значение параметра {@link a} НЕ РАВНО значению параметра {@link b}.
 *
 * @param a первое сравниваемое значение.
 * @param b второе сравниваемое значение.
 *
 * @returns {FuncPredicate}
 */
export declare const ifNotEquals: FuncPredicate;
/**
 * Предикат ifGreater.
 * Возвращает функцию для сравнения двух значений, которая возвращает true,
 * если значение параметра {@link a} БОЛЬШЕ значения параметра {@link b}.
 *
 * @param a первое сравниваемое значение.
 * @param b второе сравниваемое значение.
 *
 * @returns {FuncPredicate}
 */
export declare const ifGreater: FuncPredicate;
/**
 * Предикат ifLesser.
 * Возвращает функцию для сравнения двух значений, которая возвращает true,
 * если значение параметра {@link a} МЕНЬШЕ значения параметра {@link b}.
 *
 * @param a первое сравниваемое значение.
 * @param b второе сравниваемое значение.
 *
 * @returns {FuncPredicate}
 */
export declare const ifLesser: FuncPredicate;
/**
 * Предикат ifEqOrGreater.
 * Возвращает функцию для сравнения двух значений, которая возвращает true,
 * если значение параметра {@link a} БОЛЬШЕ ИЛИ РАВНО значения параметра {@link b}.
 *
 * @param a первое сравниваемое значение.
 * @param b второе сравниваемое значение.
 *
 * @returns {FuncPredicate}
 */
export declare const ifEqOrGreater: FuncPredicate;
/**
 * Предикат ifEqOrLesser.
 * Возвращает функцию для сравнения двух значений, которая возвращает true,
 * если значение параметра {@link a} МЕНЬШЕ ИЛИ РАВНО значения параметра {@link b}.
 *
 * @param a первое сравниваемое значение.
 * @param b второе сравниваемое значение.
 *
 * @returns {FuncPredicate}
 */
export declare const ifEqOrLesser: FuncPredicate;
/**
 * Предикат ifMatches.
 * Возвращает функцию для сравнения двух значений, которая возвращает true,
 * если значение параметра {@link b} СООТВЕТСТВУЕТ ШАБЛОНУ, заданному в параметре {@link a}.
 *
 * @param a первое сравниваемое значение.
 * @param b второе сравниваемое значение.
 *
 * @returns {FuncPredicate}
 */
export declare const ifMatches: FuncPredicate;
/**
 * Предикат ifNotMatches.
 * Возвращает функцию для сравнения двух значений, которая возвращает true,
 * если значение параметра {@link b} НЕ СООТВЕТСТВУЕТ ШАБЛОНУ, заданному в параметре {@link a}.
 *
 * @param a первое сравниваемое значение.
 * @param b второе сравниваемое значение.
 *
 * @returns {FuncPredicate}
 */
export declare const ifNotMatches: FuncPredicate;
