export function getPrevious(array, value) {
    let i = Array.from(array).indexOf(value);
    return i >= 0 ? array[i - 1] : undefined;
}
