export function getAllNext(array, value) {
    let i = Array.from(array).indexOf(value);
    return i >= 0 ? Array.from(array).slice(i + 1) : [];
}
