import { isFunction } from "./isFunction.js";
export function parallel(funcs, callback) {
    let cb = callback || function () { }, result = new Array(funcs.length), left = result.length, ended = !left;
    if (ended) {
        cb(null, result);
        return;
    }
    funcs.forEach((func, i) => {
        if (ended || !isFunction(func)) {
            left -= 1;
            result[i] = undefined;
            return;
        }
        ;
        func((error, data) => {
            left -= 1;
            result[i] = data;
            if (ended) {
                return;
            }
            if (error) {
                return cb(ended = error, null);
            }
            if (!left) {
                return cb(null, result);
            }
        });
    });
}
