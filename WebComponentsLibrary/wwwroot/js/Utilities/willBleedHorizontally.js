export function willBleedHorizontally(boundings, margin) {
    return margin.left + boundings.width + margin.right > Math.floor(window.innerWidth);
}
