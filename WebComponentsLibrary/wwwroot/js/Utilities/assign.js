import mixin from "./mixin.js";
export const assign = !!Object.assign ?
    Object.assign
    :
        function (target, ...sources) {
            return mixin({
                deep: false,
                inherited: false,
                sources: sources,
                target: target
            });
        };
export default assign;
