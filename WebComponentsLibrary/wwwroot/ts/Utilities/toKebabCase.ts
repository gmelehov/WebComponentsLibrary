



export function toKebabCase(str: string): string
{
	let arr1 = str.trim().split(/([A-Z][a-z]*)/).filter(f => { return f !== '' });
	return arr1.join('-').replace(/\-$/, '').replace(/^\-/, '').toLowerCase();
}