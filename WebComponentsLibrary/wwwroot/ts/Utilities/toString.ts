﻿import { baseToString } from "./baseToString.js";







/**
 * Конвертирует значение value в строкое представление
 * Возвращает пустую строку для значений null
 * @param value
 */
export function toString(value: any): string
{
	return value === null ? '' : baseToString(value);
}