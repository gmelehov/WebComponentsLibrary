import { EventSubType, Gender, KeyCode, OptionRole } from "../Enums/enums.js";





export type AnyFunction<A = any> = (...input: any[]) => A;

export type AnyConstructor<A = object> = new (...input: any[]) => A;

export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;







declare interface CustomEventInit
{
	composed?: boolean;
}





/** Интерфейс элемента, имеющего идентификатор */
export interface IId
{
	/** идентификатор элемента */
	id: string;
}




/** Интерфейс элемента, имеющего идентификатор и значение */
export interface ISimpleItem extends IId
{
	/** значение элемента */
	val: any;
}




export interface IVal<T>
{
	val: T;
}




/** Интерфейс элемента, имеющего порядковый номер */
export interface IOrdered
{
	/** порядковый номер элемента */
	order: number;
}




/** Интерфейс элемента, имеющего наименование */
export interface INamed
{
	/** наименование элемента */
	name: string;
}




/** Интерфейс элемента, имеющего текстовое описание	*/
export interface IDescripted
{
	/** описание элемента */
	descr: string;
}




/** Интерфейс элемента, имеющего свойство 'тип' */
export interface ITyped
{
	/** тип элемента */
	type: any;
}




/** Интерфейс строго типизированного элемента */
export interface IStronglyTyped<T>
{
	/** тип элемента */
	type: T;
}




/** Интерфейс элемента, имеющего два состояния: active = true и active = false */
export interface IActivated
{
	/**  */
	active: boolean;
}




export interface IData
{
	data: any;
}










/** Интерфейс словаря с текстовыми ключами и значениями любого типа */
export interface IDictionary
{
	/** коллекция ключ-значение */
	[index: string]: any;
}




/** Интерфейс словаря с текстовыми ключами и строго типизированными значениями */
export interface ITypedDictionary<V>
{
	/** коллекция ключ-строго типизированное значение */
	[index: string]: V;
}




export interface Pair<K, V>
{
	key: K;
	value: V;
}









/** Интерфейс перехода конечного автомата из одного состояния в другой */
export interface IStateMachineTransition
{
	/** название перехода */
	name: string;
	/** начальное состояние */
	from: EventSubType | [EventSubType] | null;
	/** конечное состояние */
	to: EventSubType;
	/** опциональный коллбэк, который необходимо вызвать после завершения перехода */
	callback: (...args: any[]) => void;
}




/** Интерфейс описания переходов конечного автомата */
export interface IStateMachine
{
	/** состояние конечного автомата при его создании */
	init: EventSubType;
	/** список переходов между состояниями конечного автомата */
	transitions: Array<IStateMachineTransition>;
}





export interface IKeyboardEventHandler
{
	keydown?: ITypedDictionary<IKeyboardEventDescriptor>;
	keyup?: ITypedDictionary<IKeyboardEventDescriptor>;
	keypress?: ITypedDictionary<IKeyboardEventDescriptor>;
}





export interface IKeyboardEventDescriptor
{
	key: KeyCode;
	altKey?: boolean;
	ctrlKey?: boolean;
	metaKey?: boolean;
	shiftKey?: boolean;
	callback: (event: KeyboardEvent) => void;
}

















export type Primitive = string | number | boolean;

export type FuncPredicate = (a: Primitive, b: Primitive) => boolean;






export interface IPredicateArgs
{
	obj?: any;
	prop: Primitive;
	val: Primitive;
	func?: (q: Primitive, w: Primitive) => boolean;
}





export interface IComplexRuleTester
{

	mustMatch: Array<string>;

	mustNotMatch?: Array<string>;
}











/** Модель данных для передачи в шаблон элемента dom-repeat */
export interface IDomRepeatModel
{
	/**  */
	items: string;
	/**  */
	id?: string;
	/**  */
	as?: string;
	/**  */
	indexAs?: string;
	/**  */
	itemsIndexAs?: string;
	/**  */
	sort?: string;
	/**  */
	filter?: string;
	/**  */
	observe?: string;
}





export interface IPersonDataParseObject
{
	IsSurname: boolean;
	IsName: boolean;
	Gender: Gender;
}







export type PersonDataPart = 'имя' | 'отчество' | 'фамилия';




export interface IPersonDataPart extends IVal<string>
{
	part: PersonDataPart;
	gender: Gender;
}

export interface IPersonData
{
	name: string;
	midname: string;
	surname: string;
	gender: Gender;
}

export type GrammarPart = 'adjective' | 'noun' | 'supplement';









/** Возможные состояния элемента od-grid-tile */
export type GridTileStates = EventSubType.created | EventSubType.collapsed | EventSubType.expanded | EventSubType.minimized | EventSubType.maximized;

/** Псевдоним типа для метрики элемента od-grid-tile */
export type GridTileMetrics = IScreenPositions & IScreenSizes;






/** Интерфейс параметров сетки элемента the-grid */
export interface ITheGridBaseModel
{
	colCount: number;
	rowCount: number;
	cellMargin: number;
	cellHeight: number;
	cellWidth: number;
}











/** Интерфейс объекта, настраивающего режим очистки пользовательского ввода в input-элементах */
export interface IInputSanitizerDescriptor
{

	pattern?: RegExp;

	/** удалять все цифры из поля ввода (0-9) */
	removeDigits: boolean;

	/** удалять все латинские буквы из поля ввода (A-Za-z) */
	removeLatin: boolean;

	/** удалять все кириллические буквы из поля ввода (А-Яа-яЁё) */
	removeCyr: boolean;

	/** удалять все дефисы из поля ввода (-) */
	removeHyphens: boolean;

	/** удалять все запятые из поля ввода (,) */
	removeCommas: boolean;

	/** сжимать все лишние пробелы в поле ввода (заменять два и более идущих подряд пробела на один) */
	reduceSpaces: boolean;

	/** удалять все начальные пробелы из поля ввода */
	trimLeft: boolean;

	/** удалять все конечные пробелы из поля ввода */
	trimRight: boolean;
}





export type InputType = 'date' | 'text' | 'number' | 'month' | 'week' | 'password';

/** Градации интенсивности эффекта ripple при взаимодействии с элементом */
export type RippleDensity = 'pale' | 'light' | 'normal';

/** Относительные визуальные размеры элемента */
export type VisualSize = '0' | 'xxs' | 'xs' | 's' | 'n' | 'l' | 'xl' | 'xxl';





export interface IOption extends ISimpleItem, INamed, IStronglyTyped<OptionRole>
{
	size: VisualSize;
	icon: string;
	iconColor: string;
	iconSize: VisualSize;
	secIcon: string;
	noCheck: boolean;
	active: boolean;
	disabled: boolean;
	data: any;
}








export type ResizerType = 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left';




/** Интерфейс размеров и положений блочной модели CSS */
export interface ICSSBoundings extends ICSSBlockDimensions, IScreenSizes
{

}




/** Интерфейс размеров блочной модели CSS */
export interface ICSSBlockDimensions
{
	/** положение относительно нижнего края контейнера */
	bottom: number;
	/** положение относительно левого края контейнера */
	left: number;
	/** положение относительно правого края контейнера */
	right: number;
	/** положение относительно верхнего края контейнера */
	top: number;
}




/** Интерфейс положений в сеточной модели */
export interface IScreenPositions
{
	/** номер строки */
	row: number;
	/** номер столбца */
	col: number;
}




/** Интерфейс размеров в сеточной модели */
export interface IScreenSizes
{
	/** ширина */
	width: number;
	/** высота */
	height: number;
}




/** Интерфейс дескриптора цвета */
export interface IColorDescriptor<T extends string | number>
{
	/**
	 * формат представления цвета (RGB или HSL)
	 */
	format: 'RGB' | 'HSL';

	/**
	 * базовые значения цветовых компонентов
	 */
	raw?: [T, T, T];

	/**
	 * выходные значения цветовых компонентов
	 */
	data: [T, T, T];

	/**
	 * CSS-значение цвета
	 * Для RGB: rgb(r, g, b);
	 * Для HSL: hsl(h, s%, l%);
	 */
  css: string;

  getCSS?: (...args: any[]) => string;
}







export type HTTPMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type XHRResponseType = 'text' | 'xml' | 'json' | 'arraybuffer' | 'blob' | 'document';







export interface ITableSorterDescriptor
{
	index: number;
	sortAsc: boolean;
}




export interface ITableHeader extends IId, INamed, ITableSorterDescriptor
{
	disabled: boolean;
}




export interface ITableTotal
{
	data: Array<any>;
}




export interface ITableRow extends IId, ITableTotal
{
	active: boolean;
}






export interface IDataGridColumn
{
	id: string;
	name: string;
	index: number;
	sortable: boolean;
	sortAsc: boolean;
	hide: boolean;
	width: number;
	rows: Array<any>;
}







export interface IMetadataDescriptor
{
	owner: 'object' | 'property';
	ownerName?: string;
	metaKey: string;
	metaValue: any;
}












/** 
 * Интерфейс визуального компонента-контейнера, управляющего своими размерами 
 * и раскладкой дочерних компонентов внутри себя
 */
export interface IZContainer
{

  /** Собственная визуальная метрика контейнера (размеры/положение на экране) */
  boundings: ICSSBoundings;
  /** Собственная padding-метрика контейнера */
  padding: ICSSBlockDimensions;
  /** Собственная margin-метрика контейнера */
  margin: ICSSBlockDimensions;
  /** Относительный "вес" этого контейнера, используемый при расчете его размеров из родительского контейнера */
  fr?: number;
  /** Тип раскладки дочерних компонентов внутри этого контейнера */
  layout: 'fit' | 'vbox' | 'hbox' | 'areas' | 'grid';
  /** Размер границы (в пикселях) между внутренними регионами/областями этого контейнера */
  gap: number;
  /** Возможность горизонтального скроллинга внутри этого контейнера */
  overX: boolean;
  /** Возможность вертикального скроллинга внутри этого контейнера */
  overY: boolean;


  /** Коллекция вложенных дочерних компонентов */
  items: any[],

}










/** Модель данных для передачи в шаблон Polymer-элемента dom-repeat */
export interface IPolymerDomRepeatModel
{
	items: string;
	id?: string;
	as?: string;
	indexAs?: string;
	itemsIndexAs?: string;
	sort?: string;
	filter?: string;
	observe?: string;
}