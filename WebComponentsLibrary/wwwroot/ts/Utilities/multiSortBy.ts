import { baseMultiSortBy } from './baseMultiSortBy.js';







export function multiSortBy<T>(array: Array<T>, props: Array<string>, directions?: Array<boolean>): Array<T>
{
	if (!directions)
		directions = new Array<boolean>();

	if (directions.length < props.length)
	{
		let dlen = directions.length;
		let plen = props.length;
		for (let i = 0; i < (plen - dlen - 1); i++)
			directions.push(true);
	};

	if (Array.isArray(array) && Array.isArray(props))
		array.sort((a, b) => baseMultiSortBy(a, b, props, directions));

	return array;
}