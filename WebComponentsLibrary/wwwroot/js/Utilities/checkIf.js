import { ifEquals } from "./logicUtils.js";
export const checkIf = (el, prop, val, func) => {
    if (!func)
        func = ifEquals;
    if (el && el[prop.toString()]) {
        return func(el[prop.toString()], val) === true;
    }
    else if (!el || !(el[prop.toString()])) {
        return func(prop, val) === true;
    }
    else {
        return false;
    }
    ;
};
