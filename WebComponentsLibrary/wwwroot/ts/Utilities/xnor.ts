



/**
 * Логический оператор XNOR.
 * 
 * @param a первый операнд
 * @param b второй операнд
 * @returns {Boolean}
 */
export function xnor(a: any, b: any): boolean
{
	return Boolean(a) === Boolean(b);
}