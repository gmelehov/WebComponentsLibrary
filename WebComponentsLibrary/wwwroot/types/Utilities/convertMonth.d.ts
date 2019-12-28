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
export declare function convertMonth(strMonth: string): string;
