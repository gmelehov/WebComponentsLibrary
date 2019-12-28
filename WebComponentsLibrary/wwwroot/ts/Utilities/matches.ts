




export function matches(node: Node, selector: string): boolean
{
	let matched = node["node"] || node, matcher = matched.matches || matched.msMatchesSelector;
	return !selector || matcher.call(matched, selector);
}