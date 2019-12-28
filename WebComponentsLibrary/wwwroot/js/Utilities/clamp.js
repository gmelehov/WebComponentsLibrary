export function clamp(value, min, max) {
    if (value >= min && value <= max)
        return value;
    if (value < min)
        return min;
    if (value > max)
        return max;
}
