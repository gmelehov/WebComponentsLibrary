import { IColorDescriptor } from "../Interfaces/interfaces.js";
import { isNaN } from "./isNaN.js";




/**
 * Конвертирует цвет из формата RGB в формат HSL
 * @param rgb значения исходного цвета в формате RGB
 */
export function RGBToHSL(rgb: Array<string | number> | string): IColorDescriptor<number>
{
	let r: number, g: number, b: number;

  if (!rgb)
    rgb = [0, 0, 0];

	if (Array.isArray(rgb) && rgb.length > 2)
	{
		r = parseInt(rgb[0].toString());
		g = parseInt(rgb[1].toString());
		b = parseInt(rgb[2].toString());
	};

	if (typeof rgb === 'string')
	{
    //if (rgb.includes('#'))
    if (rgb.startsWith('#'))
		{
			let _rgb = rgb.replace(/#/g, '');
			let _r = _rgb.slice(0, 2);
			let _g = _rgb.slice(2, 4);
			let _b = _rgb.slice(4, 6);

			r = parseInt(_r, 16);
			g = parseInt(_g, 16);
			b = parseInt(_b, 16);
		}
		else
		{
			let arr = rgb.replace(/[Rr][Gg][Bb]/g, '').replace(/[\(\)]/g, '').split(/,\s*/).map(m => { return parseInt(m); });
			if (arr && arr.length > 2)
			{
				r = (!isNaN(arr[0])) ? arr[0] : 0;
				g = (!isNaN(arr[1])) ? arr[1] : 0;
				b = (!isNaN(arr[2])) ? arr[2] : 0;
			};
		};
	};

	r /= 255;
	g /= 255;
	b /= 255;

	let max = Math.max(r, g, b),
		min = Math.min(r, g, b),
		h: number, s: number, l: number = (max + min) / 2;

	if (max === min)
	{
		h = s = 0;
	}
	else
	{
		var d = max - min;
		s = (l > 0.5) ? d / (2 - max - min) : d / (max + min);
		switch (max)
		{
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		};
		h /= 6;
	};

	let _ints = [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];

	let ret: IColorDescriptor<number> = {
		format: 'HSL',
		raw: [h, s, l],
		data: [_ints[0], _ints[1], _ints[2]],
		css: `hsl(${_ints[0]}, ${_ints[1]}%, ${_ints[2]}%)`,
	};

	return ret;
}







/**
 * Конвертирует цвет, заданный в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ]
 * в массив из трех чисел: [ компонента Red, компонента Green, компонента Blue ].
 * 
 * В случае невозможности конвертации возвращает массив из трех чисел: [ -1, -1, -1 ]
 * 
 * @param rgb значение цвета в форматах: #222, #A3B84D, rgb(261, 16, 99), [ '261', '16', '99' ]
 */
export function HEX2RGBArray(rgb: Array<string | number> | string)
{
  let r: number = -1;
  let g: number = -1;
  let b: number = -1;

  /** Если передан массив трех элементов */
  if (Array.isArray(rgb) && rgb.length === 3)
  {
    /** 
     * Приводим элементы массива к целочисленному виду.
     * Если приведение не удалось, записываем в компоненты цвета значение -1.
     */
    r = !isNaN(parseInt(rgb[0].toString())) ? parseInt(rgb[0].toString()) : -1;
    g = !isNaN(parseInt(rgb[1].toString())) ? parseInt(rgb[1].toString()) : -1;
    b = !isNaN(parseInt(rgb[2].toString())) ? parseInt(rgb[2].toString()) : -1;

    return [r, g, b];
  };

  /** Если передана строка */
  if (typeof rgb === 'string')
  {
    /** Если передана строка, начинающаяся с # */
    if (rgb.startsWith('#'))
    {
      let _rgb = rgb.replace(/#/g, '');
      let _r;
      let _g;
      let _b;

      /**
       * Если длина строки после удаления символа # равна 3,
       * разбиваем строку на три части (на три символа), 
       * затем повторяем в каждой части содержащийся в ней символ.
       */
      if (_rgb.length === 3)
      {
        let _r = _rgb.slice(0, 1).repeat(2);
        let _g = _rgb.slice(1, 2).repeat(2);
        let _b = _rgb.slice(2, 3).repeat(2);

        r = !isNaN(parseInt(_r, 16)) ? parseInt(_r, 16) : -1;
        g = !isNaN(parseInt(_g, 16)) ? parseInt(_g, 16) : -1;
        b = !isNaN(parseInt(_b, 16)) ? parseInt(_b, 16) : -1;

        return [r, g, b];
      }
      /**
       * Иначе, если длина строки после удаления символа # равна 6,
       * разбиваем строку на три части (по два символа).
       */
      else if (_rgb.length === 6)
      {
        let _r = _rgb.slice(0, 2);
        let _g = _rgb.slice(2, 4);
        let _b = _rgb.slice(4, 6);

        r = !isNaN(parseInt(_r, 16)) ? parseInt(_r, 16) : -1;
        g = !isNaN(parseInt(_g, 16)) ? parseInt(_g, 16) : -1;
        b = !isNaN(parseInt(_b, 16)) ? parseInt(_b, 16) : -1;

        return [r, g, b];
      }
      else
      {
        //return 'Формат передаваемого HEX не распознан.';
      };

    }
    else
    {
      let arr = rgb.replace(/[Rr][Gg][Bb]/g, '').replace(/[\(\)]/g, '').split(/,\s*/).map(m => { return parseInt(m); });
      if (arr && arr.length > 2)
      {
        r = (!isNaN(arr[0])) ? arr[0] : -1;
        g = (!isNaN(arr[1])) ? arr[1] : -1;
        b = (!isNaN(arr[2])) ? arr[2] : -1;

        return [r, g, b];
      };
      
    };
  };

  return [r, g, b];
}


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
export function RGB2HSL(rgb: Array<string | number> | string)
{
  if (!rgb)
    return null;

  let input = HEX2RGBArray(rgb);

  let r: number = input[0];
  let g: number = input[1];
  let b: number = input[2];

  if (r === -1 || g === -1 || b === -1)
    return null;


  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    h: number, s: number, l: number = (max + min) / 2;

  if (max === min)
  {
    h = s = 0;
  }
  else
  {
    var d = max - min;
    s = (l > 0.5) ? d / (2 - max - min) : d / (max + min);
    switch (max)
    {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    };
    h /= 6;
  };

  let _ints = [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];

  let ret: IColorDescriptor<number> = {
    format: 'HSL',
    raw: [h, s, l],
    data: [_ints[0], _ints[1], _ints[2]],
    css: `hsl(${_ints[0]}, ${_ints[1]}%, ${_ints[2]}%)`
  };

  return ret;
}


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
export function RGBChangeLightness(rgb: Array<string | number> | string, diff: number)
{
  let colorDescr = RGB2HSL(rgb);

  if (isNaN(parseInt(diff.toString())))
    return null;


  if (colorDescr !== null)
  {
    let res = colorDescr.data[2] + parseInt(diff.toString());
    if (res > 100)
      res = 100;
    if (res < 0)
      res = 0;

    colorDescr.raw[2] = res / 100;
    colorDescr.data[2] = res;
    colorDescr.css = `hsl(${colorDescr.data[0]}, ${colorDescr.data[1]}%, ${res}%)`

    return colorDescr;
  }
  else
    return null;
}


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
export function RGBChangeSaturation(rgb: Array<string | number> | string, diff: number)
{
  let colorDescr = RGB2HSL(rgb);

  if (isNaN(parseInt(diff.toString())))
    return null;

  if (colorDescr !== null)
  {
    let res = colorDescr.data[1] + parseInt(diff.toString());
    if (res > 100)
      res = 100;
    if (res < 0)
      res = 0;

    colorDescr.raw[1] = res / 100;
    colorDescr.data[1] = res;
    colorDescr.css = `hsl(${colorDescr.data[0]}, ${res}%, ${colorDescr.data[2]}%)`

    return colorDescr;
  }
  else
    return null;
}

