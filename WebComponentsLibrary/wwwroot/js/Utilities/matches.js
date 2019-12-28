export function matches(node, selector) {
    let matched = node["node"] || node, matcher = matched.matches || matched.msMatchesSelector;
    return !selector || matcher.call(matched, selector);
}
