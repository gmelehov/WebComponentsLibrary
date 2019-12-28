import { trimLeft } from "./trimLeft.js";
import { trimRight } from "./trimRight.js";
/**
 * Удаляет из строки, заданной параметром input, все знаки и символы по шаблону, определенному в объекте-дескрипторе
 * @param input исходная строка
 * @param obj объект-дескриптор, задающий режим очистки пользовательского ввода
 */
export function removeSpecialSymbols(input, obj) {
    let pattern = obj.pattern || /[`'"_~@@#$%^&*=\/|!?.\\+\\:\\;<>(){}\[\]]/g;
    let ret = input.toString().replace(pattern, '');
    if (obj) {
        if (obj.removeDigits === true)
            ret = ret.replace(/\d+/g, '');
        if (obj.removeLatin === true)
            ret = ret.replace(/[A-Za-z]+/g, '');
        if (obj.removeCyr === true)
            ret = ret.replace(/[А-Яа-яЁё]/g, '');
        if (obj.removeCommas === true)
            ret = ret.replace(/,/g, '');
        if (obj.removeHyphens === true)
            ret = ret.replace(/\-/g, '');
        if (obj.reduceSpaces === true)
            ret = ret.replace(/\s+/g, ' ');
        if (obj.trimLeft === true)
            ret = trimLeft(ret);
        if (obj.trimRight === true)
            ret = trimRight(ret);
    }
    ;
    return ret;
}
