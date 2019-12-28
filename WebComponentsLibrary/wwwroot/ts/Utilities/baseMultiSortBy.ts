import { isDateLike } from './isDateLike.js';
import { toDate } from './toDate.js';
import { baseSortBy } from './baseSortBy.js';








export function baseMultiSortBy(a: any, b: any, props: Array<string>, directions?: Array<boolean>): number
{
	if (!props || !props.length)
		return;

	if (!directions)
		directions = new Array<boolean>();

	if (directions.length < props.length)
	{
		let dlen = directions.length;
		let plen = props.length;
		for (let i = 0; i < (plen - dlen - 1); i++)
			directions.push(true);
	};

	let _a0 = a[props[0]];
	let _b0 = b[props[0]];
	let ret: number;


	if (isFinite(+_a0) && isFinite(+_b0))
	{
		_a0 = +_a0;
		_b0 = +_b0;
	};

	if (isDateLike(_a0) && isDateLike(_b0))
	{
		_a0 = toDate(_a0);
		_b0 = toDate(_b0);
	};




	if (_a0 > _b0)
		ret = (directions[0]) ? 1 : -1;

	if (_a0 < _b0)
		ret = (directions[0]) ? -1 : 1;

	if (_a0 === _b0)
		ret = 0;

	let len = props.length;

	for (let i = 0; i < len; i++)
	{
		let _a = a[props[i]];
		let _b = b[props[i]];
		if (_a === _b && (i + 1 < len))
			ret = ret || baseSortBy(a, b, props[i + 1], directions[i + 1]);
	};

	return ret;
}