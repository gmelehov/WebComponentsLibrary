/** Базовые числительные */
export declare const SPELLED_NUMBERS: {
    [0]: string;
    [1]: string;
    [2]: string;
    [3]: string;
    [4]: string;
    [5]: string;
    [6]: string;
    [7]: string;
    [8]: string;
    [9]: string;
    [10]: string;
    [11]: string;
    [12]: string;
    [13]: string;
    [14]: string;
    [15]: string;
    [16]: string;
    [17]: string;
    [18]: string;
    [19]: string;
    [20]: string;
    [30]: string;
    [40]: string;
    [50]: string;
    [60]: string;
    [70]: string;
    [80]: string;
    [90]: string;
    [100]: string;
    [200]: string;
    [300]: string;
    [400]: string;
    [500]: string;
    [600]: string;
    [700]: string;
    [800]: string;
    [900]: string;
};
/** Наименования степеней тысячи */
export declare const SPELLED_DIGITS: {
    0: string[];
    1: string[];
    2: string[];
    3: string[];
    4: string[];
    5: string[];
    6: string[];
    7: string[];
};
/** Наименования денежных и временнЫх единиц измерения */
export declare const MEASURES_FORMS: {
    "рубль": string[];
    "копейка": string[];
    "секунда": string[];
    "минута": string[];
    "час": string[];
    "день": string[];
    "неделя": string[];
    "месяц": string[];
    "год": string[];
};
/**
 * Регулярное выражение для разбивки числа на группы разрядов
 * @example `11222333`.replace(/(\d)(?=((\d{3})+)(\D|$))/g, '$1 ') ===> `11 222 333`
 */
export declare const DIGIT_GROUPING_REGEXP: RegExp;
/** Регулярное выражение для поиска русских мужских отчеств */
export declare const MALE_MIDNAMES_STRING = "\\S+(?:([\u0432\u043A\u043C\u0442\u044C]\u0438\u0447))$";
/** Регулярное выражение для поиска русских женских отчеств */
export declare const FEMALE_MIDNAMES_STRING = "\\S+(?:([\u0432\u0447\u0448]\u043D\u0430))$";
/** Регулярное выражение для поиска всех русских отчеств */
export declare const ALL_MIDNAMES_STRING = "\\S+(?:([\u0432\u043A\u043C\u0442\u044C]\u0438\u0447)|([\u0432\u0447\u0448]\u043D\u0430))$";
/** Регулярное выражение для отсева всех русских отчеств */
export declare const ALL_NAMES_STRING = "\\S+(?<!([\u0432\u043A\u043C\u0442\u044C]\u0438\u0447)|([\u0432\u0447\u0448]\u043D\u0430))$";
/** Регулярное выражение для формирования подсказок по списку должностей */
export declare const POSITIONS_REGEXP: RegExp;
export declare const monthNamesRusRegexp: RegExp;
export declare const monthNamesEngRegexp: RegExp;
export declare const dateRegexp1: RegExp;
export declare const dateRegexp2: RegExp;
/** Дата в формате ГГГГ-ММ-ДД или ГГГГ-МММ-ДД */
export declare const dateRegexp3: RegExp;
/** Дата в формате ДД-ММ-ГГГГ или ДД-МММ-ГГГГ */
export declare const dateRegexp4: RegExp;
