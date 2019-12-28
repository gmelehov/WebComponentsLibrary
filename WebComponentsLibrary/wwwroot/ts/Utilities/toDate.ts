import { dateRegexp1, dateRegexp2, dateRegexp3, dateRegexp4 } from "../Enums/consts.js";
import { isString } from './isString.js';
import { convertMonth } from './convertMonth.js';








export function toDate(value: any): Date
{
	let _isString = isString(value);
	let val = value.toString().trim().toLowerCase();
	let isEng = dateRegexp1.test(val) || dateRegexp2.test(val);
	let isRus = dateRegexp3.test(val) || dateRegexp4.test(val);

	let canParse = false;
	let temp = "";
	let year,
		month,
		day;

	if (_isString && isEng)
		temp = (dateRegexp1.test(val)) ? val.replace(dateRegexp1, '$1~~~$3~~~$7') : val.replace(dateRegexp2, '$7~~~$3~~~$1');

	if (_isString && isRus)
		temp = (dateRegexp3.test(val)) ? val.replace(dateRegexp3, '$1~~~$3~~~$7') : val.replace(dateRegexp4, '$7~~~$3~~~$1');

	let dateparts = temp.split(/~~~/);
	let length = (dateparts.length === 3);

	year = (length) ? parseInt(dateparts[0]) : undefined;
	month = (length) ? parseInt(convertMonth(dateparts[1])) - 1 : undefined;
	day = (length) ? parseInt(dateparts[2]) : undefined;

	let date = new Date(year, month, day);

	canParse = (!isNaN(Date.parse(date.toString()))) ? true : false;

	return (canParse) ? date : null;
}