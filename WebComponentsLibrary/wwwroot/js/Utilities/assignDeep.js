import mixin from "./mixin.js";
export function assignDeep(target, ...sources) {
    return mixin({
        deep: true,
        inherited: false,
        sources: sources,
        target: target
    });
}
export default assignDeep;
