


const funcToString = Function.prototype.toString;





/**
 * Конвертирует функцию в ее исходный код
 * @param func функция для конвертирования
 */
export function toSource(func: Function)
{
	if (func !== null)
	{
		try
		{
			return funcToString.call(func);
		}
		catch (e)
		{

		};
		try
		{
			return (func + '');
		}
		catch (e)
		{

		};
	}
	return '';
}