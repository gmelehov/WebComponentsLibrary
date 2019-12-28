


export function clamp(value: number, min: number, max: number): number
{
	if (value >= min && value <= max)
		return value;

	if (value < min)
		return min;

	if (value > max)
		return max;
}