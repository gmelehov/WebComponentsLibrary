export function willBleedVertically(boundings, margin) {
    return margin.top + boundings.height + margin.bottom > Math.floor(window.innerHeight);
}
