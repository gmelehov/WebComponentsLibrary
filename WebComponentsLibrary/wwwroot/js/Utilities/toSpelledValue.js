import { SPELLED_NUMBERS, DIGIT_GROUPING_REGEXP, SPELLED_DIGITS, MEASURES_FORMS } from "../Enums/consts.js";
/**
 * Возвращает число прописью
 * @param numb число, которое необходимо представить в виде прописи
 * @param units единица измерения, связанная с заданным числом
 */
export function toSpelledValue(numb, units) {
    let ret = '';
    let tempNum, tempSpelled;
    let str = numb.toString().replace(DIGIT_GROUPING_REGEXP, '$1 ').split(' ').reverse();
    for (let i = str.length - 1; i >= 1; i--) {
        let strLength = str[i].length;
        let lastDigit = parseInt(str[i][strLength - 1]);
        let beforeLastDigit = (strLength > 1) ? parseInt(str[i][strLength - 2]) : -1;
        tempNum = parseInt(str[i]);
        if (tempNum > 0) {
            tempSpelled = toSpelled(tempNum);
            let thousandPower = SPELLED_DIGITS[i][0];
            if ((lastDigit === 2 || lastDigit === 3 || lastDigit === 4) && beforeLastDigit !== 1)
                thousandPower = SPELLED_DIGITS[i][1];
            if ((lastDigit === 0 || lastDigit > 4) || (beforeLastDigit === 1))
                thousandPower = SPELLED_DIGITS[i][2];
            ret += tempSpelled + " " + thousandPower + " ";
        }
        ;
    }
    ;
    tempNum = parseInt(str[0]);
    tempSpelled = (ret) ? toSpelled(tempNum) : toSpelled(tempNum, false);
    ret += tempSpelled;
    if (units)
        ret += " " + MEASURES_FORMS[units][getProperMeasureForm(numb) - 1];
    ret = ret.trim().replace(/(.*)(один )\1(тысяча|копейка|неделя)\1(\s*\w*)/g, '$1одна $3$4').replace(/(.*?)(два )\1(тысячи|копейки|недели)\1(\s*\w*)/g, '$1две $3$4');
    return ret;
}
;
function getProperMeasureForm(numb) {
    let normalized = ("000" + numb.toString()).match(/...$/g)[0];
    let form2Regex = /[1-9]?[0|2-9][2|3|4]$/g;
    let form3Regex = /[0-9](([1][0-9])\1|([0|2-9][0|5-9])\1)$/g;
    if (normalized.match(form2Regex))
        return 2;
    if (normalized.match(form3Regex))
        return 3;
    return 1;
}
;
function toSpelled(numb, _isFemaleGender, _spellZeroValue) {
    let ret = '';
    if (numb < 1000 && numb >= 0) {
        let tempNum1 = Math.floor(numb / 100) * 100;
        let tempNum2 = Math.floor((numb - tempNum1) / 10) * 10;
        let tempNum3 = numb - tempNum1 - tempNum2;
        if (tempNum1 > 0)
            ret += SPELLED_NUMBERS[tempNum1];
        if ((tempNum2 + tempNum3 > 10) && (tempNum2 + tempNum3 < 20)) {
            ret += " " + SPELLED_NUMBERS[tempNum2 + tempNum3];
        }
        else {
            if (tempNum2 > 0)
                ret += " " + SPELLED_NUMBERS[tempNum2];
            if (tempNum3 > 0) {
                switch (tempNum3) {
                    case 1:
                        ret += (_isFemaleGender) ? " одна" : " " + SPELLED_NUMBERS[tempNum3];
                        break;
                    case 2:
                        ret += (_isFemaleGender) ? " две" : " " + SPELLED_NUMBERS[tempNum3];
                        break;
                    default:
                        ret += " " + SPELLED_NUMBERS[tempNum3];
                        break;
                }
                ;
            }
            ;
        }
        ;
        if (tempNum1 + tempNum2 + tempNum3 === 0 && _spellZeroValue)
            ret += SPELLED_NUMBERS[0];
    }
    ;
    return ret.trim();
}
;
