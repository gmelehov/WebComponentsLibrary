﻿import { Primitive, FuncPredicate } from "../Interfaces/interfaces.js";



export const ifEquals: FuncPredicate = (a: Primitive, b: Primitive) =>
{
	if (!isNaN(parseFloat(a.toString())) && !isNaN(parseFloat(b.toString())))
	{
		return parseFloat(a.toString()) === parseFloat(b.toString());
	}
	else
	{
		return a.valueOf() === b.valueOf();
	};
};







export const AND = (left: FuncPredicate, right: FuncPredicate) =>
{
  return (a: Primitive, b: Primitive) => { return left(a, b) && right(a, b); };
};
export const OR = (left: FuncPredicate, right: FuncPredicate) =>
{
  return (a: Primitive, b: Primitive) => { return left(a, b) || right(a, b); };
};








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
export const ifNotEquals: FuncPredicate = (a: Primitive, b: Primitive) =>
{
	if (!isNaN(parseFloat(a.toString())) && !isNaN(parseFloat(b.toString())))
	{
		return parseFloat(a.toString()) !== parseFloat(b.toString());
	}
	else
	{
		return a.valueOf() !== b.valueOf();
	};
};


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
export const ifGreater: FuncPredicate = (a: Primitive, b: Primitive) =>
{
	if (!isNaN(parseFloat(a.toString())) && !isNaN(parseFloat(b.toString())))
	{
		return parseFloat(b.toString()) > parseFloat(a.toString());
	}
	else
	{
		return false;
	};
};


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
export const ifLesser: FuncPredicate = (a: Primitive, b: Primitive) =>
{
	if (!isNaN(parseFloat(a.toString())) && !isNaN(parseFloat(b.toString())))
	{
		return parseFloat(a.toString()) > parseFloat(b.toString())
	}
	else
	{
		return false;
	};
};


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
export const ifEqOrGreater: FuncPredicate = (a: Primitive, b: Primitive) =>
{
	if (!isNaN(parseFloat(a.toString())) && !isNaN(parseFloat(b.toString())))
	{
		return parseFloat(b.toString()) >= parseFloat(a.toString());
	}
	else
	{
		return false;
	};
};


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
export const ifEqOrLesser: FuncPredicate = (a: Primitive, b: Primitive) =>
{
	if (!isNaN(parseFloat(a.toString())) && !isNaN(parseFloat(b.toString())))
	{
		return parseFloat(a.toString()) >= parseFloat(b.toString())
	}
	else
	{
		return false;
	};
};


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
export const ifMatches: FuncPredicate = (a: Primitive, b: Primitive) =>
{
  let _a = new RegExp(a.toString());
  return _a.test(b.toString());
};


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
export const ifNotMatches: FuncPredicate = (a: Primitive, b: Primitive) =>
{
  let _a = new RegExp(a.toString());
  return !(_a.test(b.toString()));
};