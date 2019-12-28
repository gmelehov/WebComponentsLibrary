/**
 * Проверяет, является ли значение value "похожим на объект"
 * Значение является "похожим на объект", если оно не равно null, а его typeof === "object"
 * @param value проверяемое значение
 */
export function isObjectLike(value) {
    return !!value && typeof value === 'object';
}
