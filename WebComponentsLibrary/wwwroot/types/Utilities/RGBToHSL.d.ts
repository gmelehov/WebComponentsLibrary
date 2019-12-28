import { IColorDescriptor } from "../Interfaces/interfaces.js";
/**
 * Конвертирует цвет из формата RGB в формат HSL
 * @param rgb значения исходного цвета в формате RGB
 */
export declare function RGBToHSL(rgb: Array<string | number> | string): IColorDescriptor<number>;
/**
 * Конвертирует цвет, заданный в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ]
 * в массив из трех чисел: [ компонента Red, компонента Green, компонента Blue ].
 *
 * В случае невозможности конвертации возвращает массив из трех чисел: [ -1, -1, -1 ]
 *
 * @param rgb значение цвета в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ]
 */
export declare function HEX2RGBArray(rgb: Array<string | number> | string): number[];
/**
 * Конвертирует цвет, заданный в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ]
 * в объект ColorDescriptor со свойствами:
 * format: 'HSL', (цветовая модель)
 * data: [ Hue, Saturation, Lightness ], (массив из трех чисел, компонентов цветовой модели)
 * css: 'hsl(Hue, Saturation%, Lightness%)' (строка css-свойства, задающая цвет элемента в цветовой модели HSL).
 *
 * Использование функции:
 * var result = RGB2HSL('#A3B84D').css;   // result содержит 'hsl(72, 43%, 51%)'
 *
 * В случае, если конвертация не удалась, возвращает null.
 *
 * @param rgb значение цвета в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ]
 */
export declare function RGB2HSL(rgb: Array<string | number> | string): IColorDescriptor<number>;
/**
 * Конвертирует цвет, заданный в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ]
 * в объект ColorDescriptor со свойствами:
 * format: 'HSL', (цветовая модель)
 * data: [ Hue, Saturation, Lightness ], (массив из трех чисел, компонентов цветовой модели)
 * css: 'hsl(Hue, Saturation%, Lightness%)' (строка css-свойства, задающая цвет элемента в цветовой модели HSL),
 *
 * после чего изменяет значение Lightness на кол-во процентных единиц, указанное в параметре diff:
 * - в случае положительного diff ОСВЕТЛЯЕТ исходный цвет (добавляет яркости), не более чем до 100%;
 * - в случае отрицательного diff ЗАТЕМНЯЕТ исходный цвет (снижает яркость), не менее чем до 0%
 * Параметр diff может быть задан в любом виде, пригодном для конвертации в целое десятичное число посредством parseInt,
 * иначе результат, возвращаемый функцией, будет равен null.
 *
 * Использование функции:
 * var cssColor = RGBChangeLightness('#A3B84D', 0).css;   // cssColor содержит 'hsl(72, 43%, 51%)'
 * var cssColorDarken = RGBChangeLightness('#A3B84D', -20).css;   // cssColorDarken содержит 'hsl(72, 43%, 31%)' - цвет затемнен на 20 проц. пунктов.
 * var cssColorLighten = RGBChangeLightness('#A3B84D', 20).css;   // cssColorLighten содержит 'hsl(72, 43%, 71%)' - цвет осветлен на 20 проц. пунктов.
 *
 * @param rgb значение цвета в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ].
 * @param diff количество процентных пунктов, на которое следует изменить яркость исходного цвета.
 */
export declare function RGBChangeLightness(rgb: Array<string | number> | string, diff: number): IColorDescriptor<number>;
/**
 * Конвертирует цвет, заданный в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ]
 * в объект ColorDescriptor со свойствами:
 * format: 'HSL', (цветовая модель)
 * data: [ Hue, Saturation, Lightness ], (массив из трех чисел, компонентов цветовой модели)
 * css: 'hsl(Hue, Saturation%, Lightness%)' (строка css-свойства, задающая цвет элемента в цветовой модели HSL),
 *
 * после чего изменяет значение Saturation на кол-во процентных единиц, указанное в параметре diff:
 * - в случае положительного diff НАСЫЩАЕТ исходный цвет (добавляет насыщенность), не более чем до 100%;
 * - в случае отрицательного diff ОБЕСЦВЕЧИВАЕТ исходный цвет (снижает насыщенность), не менее чем до 0%
 * Параметр diff может быть задан в любом виде, пригодном для конвертации в целое десятичное число посредством parseInt,
 * иначе результат, возвращаемый функцией, будет равен null.
 *
 * Использование функции:
 * var cssColor = RGBChangeSaturation('#A3B84D', 0).css;   // cssColor содержит 'hsl(72, 43%, 51%)'
 * var cssColorDesaturate = RGBChangeSaturation('#A3B84D', -20).css;   // cssColorDesaturate содержит 'hsl(72, 23%, 51%)' - цвет обесцвечен на 20 проц. пунктов.
 * var cssColorSaturate = RGBChangeSaturation('#A3B84D', 20).css;   // cssColorSaturate содержит 'hsl(72, 63%, 51%)' - цвет насыщен на 20 проц. пунктов.
 *
 * @param rgb значение цвета в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ].
 * @param diff количество процентных пунктов, на которое следует изменить насыщенность исходного цвета.
 */
export declare function RGBChangeSaturation(rgb: Array<string | number> | string, diff: number): IColorDescriptor<number>;
