import { baseMultiSortBy } from './baseMultiSortBy.js';
export function multiSortBy(array, props, directions) {
    if (!directions)
        directions = new Array();
    if (directions.length < props.length) {
        let dlen = directions.length;
        let plen = props.length;
        for (let i = 0; i < (plen - dlen - 1); i++)
            directions.push(true);
    }
    ;
    if (Array.isArray(array) && Array.isArray(props))
        array.sort((a, b) => baseMultiSortBy(a, b, props, directions));
    return array;
}
