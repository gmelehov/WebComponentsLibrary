export function willBleedRight(boundings, margin) {
    return Math.floor(boundings.left + margin.left + boundings.width + margin.right) >= Math.floor(window.innerWidth);
}
