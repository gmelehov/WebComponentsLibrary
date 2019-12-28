/**
 * Читает HTML-содержимое из массива строк,
 * создает на их основе HTML-шаблон и возвращает в качестве результата
 *
 * @param array массив строк, содержащий HTML-содержимое в виде простого текста
 * @returns {HTMLTemplateElement}
 */
export function getHTMLTemplateFromStrings(array) {
    let result = document.createElement('template');
    result.innerHTML = array.join('');
    return result;
}
