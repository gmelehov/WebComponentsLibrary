export function willBleedBottom(boundings, margin) {
    return boundings.top + margin.top + boundings.height + margin.bottom > Math.floor(window.innerHeight);
}
