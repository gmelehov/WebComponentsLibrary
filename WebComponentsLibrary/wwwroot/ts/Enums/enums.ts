


/** Скан-коды клавиатурных клавиш */
export enum KeyCode
{
	Backspace = 8,
	Tab = 9,
	Enter = 13,
	Shift = 16,
	Control = 17,
	Alt = 18,
	CapsLock = 20,
	Escape = 27,
	Space = 32,
	PageUp = 33,
	PageDown = 34,
	End = 35,
	Home = 36,
	ArrowLeft = 37,
	ArrowUp = 38,
	ArrowRight = 39,
	ArrowDown = 40,

	Semicolon = 186,
	Colon = 186,
	EqualsSign = 187,
	Plus = 187,
	Comma = 188,
	LessThanSign = 188,
	Minus = 189,
	Underscore = 189,
	Period = 190,
	GreaterThanSign = 190,
	ForwardSlash = 191,
	QuestionMark = 191,
	Backtick = 192,
	Tilde = 192,
	OpeningSquareBracket = 219,
	OpeningCurlyBrace = 219,
	Backslash = 220,
	Pipe = 220,
	ClosingSquareBracket = 221,
	ClosingCurlyBrace = 221,
	SingleQuote = 222,
	DoubleQuote = 222,

	Pause = 19,
	PrintScreen = 44,
	Insert = 45,
	Delete = 46,
	Num0 = 48,
	Num1 = 49,
	Num2 = 50,
	Num3 = 51,
	Num4 = 52,
	Num5 = 53,
	Num6 = 54,
	Num7 = 55,
	Num8 = 56,
	Num9 = 57,
	A = 65,
	B = 66,
	C = 67,
	D = 68,
	E = 69,
	F = 70,
	G = 71,
	H = 72,
	I = 73,
	J = 74,
	K = 75,
	L = 76,
	M = 77,
	N = 78,
	O = 79,
	P = 80,
	Q = 81,
	R = 82,
	S = 83,
	T = 84,
	U = 85,
	V = 86,
	W = 87,
	X = 88,
	Y = 89,
	Z = 90,
	MetaLeft = 91,
	MetaRight = 92,
	ContextMenu = 93,
	Numpad0 = 96,
	Numpad1 = 97,
	Numpad2 = 98,
	Numpad3 = 99,
	Numpad4 = 100,
	Numpad5 = 101,
	Numpad6 = 102,
	Numpad7 = 103,
	Numpad8 = 104,
	Numpad9 = 105,
	NumpadMultiply = 106,
	NumpadAdd = 107,
	NumpadSubtract = 109,
	NumpadDecimal = 110,
	NumpadDivide = 111,
	F1 = 112,
	F2 = 113,
	F3 = 114,
	F4 = 115,
	F5 = 116,
	F6 = 117,
	F7 = 118,
	F8 = 119,
	F9 = 120,
	F10 = 121,
	F11 = 122,
	F12 = 123,
	NumLock = 144,
	ScrollLock = 145
}




/** Названия цветов палитры */
export enum ColorName
{
	red = 'red',
	pink = 'pink',
	deepPurple = 'deep-purple',
	indigo = 'indigo',
	blue = 'blue',
	cyan = 'cyan',
	teal = 'teal',
	green = 'green',
	orange = 'orange',
	deepOrange = 'deep-orange',
	brown = 'brown',
	white = 'white',
	black = 'black'
}





/** Наименования значений для css-свойства justify */
export enum CSSJustify
{

	/** не указано / не установлено */
	unset = 0,

	/** выравнивание по левому краю */
	left = 1,

	/** выравнивание по центру */
	center = 2,

	/** выравнивание по правому краю */
	right = 3

}




/** Наименования типов генерируемых событий */
export enum EventType
{
	hubConnected = "hub-connected",
	hubReceived = "hub-received",
	hubSent = "hub-sent",
	documLoaded = "docum-loaded",
	documSaved = "docum-saved",
	documChanged = "docum-changed",
	documCreated = "docum-created",
	documRemoved = "docum-removed",
	ruleChanged = "rule-changed",
	ruleMutated = "rule-mutated",
	rulesChanged = "rules-changed",
	rulesMutated = "rules-mutated",
	seloptionChanged = "seloption-changed",
	seloptionMutated = "seloption-mutated",
	selectorChanged = "selector-changed",
	selectorMutated = "selector-mutated",
	partBlurred = "part-blurred",
	partFocused = "part-focused",
	partClicked = "part-clicked",
	partSelected = "part-selected",
	partChanged = "part-changed",
	partCreated = "part-created",
	partRemoved = "part-removed",
	partMoved = "part-moved",
	parameterFocused = "parameter-focused",
	parameterChanged = "parameter-changed",
	parameterMutated = "parameter-mutated",
	parameterCreated = "parameter-created",
	parameterRemoved = "parameter-removed",
	articleSelected = "article-selected",
	articleChanged = "article-changed",
	articleCreated = "article-created",
	articleLoaded = "article-loaded",
	articleRemoved = "article-removed",
	articleMoved = "article-moved",
	gridtileExpanded = "gridtile-expanded",
	gridtileCollapsed = "gridtile-collapsed",
	optActivated = "opt-activated",
	optChanged = "opt-changed",
	optCreated = "opt-created",
	optRemoved = "opt-removed",
	optMoved = "opt-moved",
	optionActivated = "option-activated",
	optionChanged = "option-changed",
	optionSelected = "option-selected",
	optionCreated = "option-created",
	optionRemoved = "option-removed",
	optionMoved = "option-moved",
	buttonActivated = "button-activated",
	dialogShown = "dialog-shown",
	dialogHidden = "dialog-hidden",
	listSelected = "list-selected",
	tabSelected = "tab-selected",
	expandpanelSelected = "expandpanel-selected",

  valueChanged = "value-changed",

	surnamegrammarChanged = "surnamegrammar-changed",
	surnamegrammarCreated = "surnamegrammar-created",
	personnameChanged = "personname-changed",


	ironAjaxPresend = "iron-ajax-presend",
	ironAjaxRequest = "iron-ajax-request",
	ironAjaxResponse = "iron-ajax-response",
	ironAjaxError = "iron-ajax-error",

}




/** Наименования подтипов генерируемых событий */
export enum EventSubType
{

	/** элемент активирован по клику мышкой, либо по нажатию клавиш Enter/Space */
	activated = "activated",
	/** элемент потерял фокус ввода */
	blurred = "blurred",
	/** элемент получил фокус ввода */
	focused = "focused",
	/** на элементе кликнули мышкой */
	clicked = "clicked",
	/** элемент изменил состояние "выбран/выделен" */
	selected = "selected",
	/** значение элемента изменилось */
	changed = "changed",
	/** элемент изменил статус своего подключения */
	connected = "connected",
	/** элемент загружен */
	loaded = "loaded",
	/** элемент сохранен */
	saved = "saved",
	/** структура элемента изменилась / список элементов изменился */
	mutated = "mutated",
	/** элемент свернут */
	collapsed = "collapsed",
	/** элемент развернут */
	expanded = "expanded",
	/** элемент минимизирован */
	minimized = "minimized",
	/** элемент максимизирован */
	maximized = "maximized",
	/** элемент получен */
	received = "received",
	/** элемент отправлен */
	sent = "sent",
	/** элемент найден */
	found = "found",
	/** элемент изменил размеры */
	resized = "resized",
	/** элемент создан */
	created = "created",
	/** элемент удален */
	removed = "removed",
	/** элемент скрыт */
	hidden = "hidden",
	/** элемент показан */
	shown = "shown",
	/** элемент сдвинут */
	moved = "moved",
	/** не указано */
	none = "none",
}




/** Грамматические падежи */
export enum GCase
{
	/** именительный */
	nom = 0,
	/** родительный */
	gen = 1,
	/** дательный */
	dat = 2,
	/** винительный */
	acc = 3,
	/** творительный */
	ins = 4,
	/** предложный */
	loc = 5
}




/** Грамматический род / пол человека */
export enum Gender
{
	/** не указано */
	No = "No",
	/** мужской */
	M = "M",
	/** женский */
	F = "F"
}




/** Наименования предикатов для вычисления правил */
export enum RulePredicate
{
	Undef = "Undef",
	IfEquals = "IfEquals",
	IfNotEquals = "IfNotEquals",
	IfGreater = "IfGreater",
	IfEqOrGreater = "IfEqOrGreater",
	IfLesser = "IfLesser",
	IfEqOrLesser = "IfEqOrLesser",
	IfMatches = "IfMatches",
	IfNotMatches = "IfNotMatches",
	IfEqOrShorter = "IfEqOrShorter",
	IfEqOrLonger = "IfEqOrLonger",
	IfIncludes = "IfIncludes",
	IfNotIncludes = "IfNotIncludes",
	IfStartsWith = "IfStartsWith",
	IfNotStartsWith = "IfNotStartsWith",
	IfEndsWith = "IfEndsWith",
	IfNotEndsWith = "IfNotEndsWith",
	IfEmpty = "IfEmpty",
	IfNotEmpty = "IfNotEmpty",
}




/** Типы логических операций */
export enum LogicOper
{
	None = 'None',
	And = 'And',
	Or = 'Or'
}




/** Наименования ролей для элемента-опции */
export enum OptionRole
{

	/**
	 * простая опция
	 * отображение основной иконки перед своим текстом
	 */
	simple = 'simple',

	/**
	 * опция-отметка
	 * отображение дополнительной иконки, обозначающей текущее состояние опции "выбрано/не выбрано"
	 * дополнительная иконка отображается после основного текста
	 * взаимоисключающие роли: {@link ODOptionRole.sub}, {@link ODOptionRole.dropdown}
	 */
	toggle = 'toggle',

	/**
	 * опция-переключатель вложенного меню
	 * отображение дополнительной иконки (стрелка вправо) для вызова вложенного меню
	 * дополнительная иконка отображается после основного текста
	 * взаимоисключающие роли: {@link ODOptionRole.toggle}, {@link ODOptionRole.dropdown}
	 */
	sub = 'sub',

	/**
	 * опция-переключатель выпадающего списка
	 * отображение дополнительной иконки (стрелка вниз) для раскрытия выпадающего списка
	 * дополнительная иконка отображается после основного текста
	 * взаимоисключающие роли: {@link ODOptionRole.toggle}, {@link ODOptionRole.sub}
	 */
	dropdown = 'dropdown',


	collapser = 'collapser',

}




/** Варианты выравнивания элемента overlay относительно родительского элемента */
export enum OverlayPosition
{

	/** сбоку от родительского элемента */
	aside = 'aside',

	/** непосредственно под родительским элементом */
	baseline = 'baseline',

	/** над родительским элементом */
	over = 'over',

}