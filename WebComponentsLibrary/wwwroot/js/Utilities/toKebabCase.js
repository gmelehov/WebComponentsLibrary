export function toKebabCase(str) {
    let arr1 = str.trim().split(/([A-Z][a-z]*)/).filter(f => { return f !== ''; });
    return arr1.join('-').replace(/\-$/, '').replace(/^\-/, '').toLowerCase();
}
