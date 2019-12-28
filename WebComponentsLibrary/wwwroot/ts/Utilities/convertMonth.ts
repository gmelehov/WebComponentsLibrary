


/**
 * Конвертирует полное/сокращенное русское/английское наименование месяца в его двузначный номер
 * Возвращает номер месяца в строковом представлении
 * 
 * @example
 * convertMonth('Январь') ==>> '01'
 * convertMonth('feb') ==>> '02'
 * convertMonth('ДЕК') ==>> '12'
 * convertMonth() ==>> null
 * 
 * @param strMonth исходное наименование месяца
 */
export function convertMonth(strMonth: string): string
{
	strMonth = (strMonth) ?
		strMonth.toLowerCase().substr(0, 3)
		:
		null;

	let dictRus = { "янв": "01", "фев": "02", "мар": "03", "апр": "04", "май": "05", "июн": "06", "июл": "07", "авг": "08", "сен": "09", "окт": "10", "ноя": "11", "дек": "12", };
	let dictEng = { "jan": "01", "feb": "02", "mar": "03", "apr": "04", "may": "05", "jun": "06", "jul": "07", "aug": "08", "sep": "09", "oct": "10", "nov": "11", "dec": "12", };

	return (strMonth) ?
		dictEng[strMonth] ?
			dictEng[strMonth]
			:
			dictRus[strMonth] ?
				dictRus[strMonth]
				:
				strMonth
		:
		strMonth;
}