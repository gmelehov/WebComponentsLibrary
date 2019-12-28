import { pick } from "./pick.js";
export function getBoundings(element) {
    return pick(element.getBoundingClientRect(), ['bottom', 'height', 'left', 'right', 'top', 'width']);
}
