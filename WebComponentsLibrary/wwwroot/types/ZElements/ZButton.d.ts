import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
import { ITargeterReady } from '../Interfaces/targeting.js';
import { Targeter } from '../Classes/Targeter.js';
declare const ZButton_base: {
    new (...input: any[]): {
        /**
         * Кнопка
         * @customElement
         * @polymer
         */
        connectedCallback(): void;
        disabled: boolean;
        noTap: boolean;
        href: string;
        triggers: string;
        targeter: Targeter;
        disabledChanged(newVal: boolean, oldVal: boolean): void;
        triggersChanged(now: string, before: string): void;
        exec(): void;
        gotoHref(): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        click(): void;
        addEventListener<K extends "waiting" | "error" | "abort" | "cancel" | "progress" | "ended" | "change" | "input" | "select" | "fullscreenchange" | "fullscreenerror" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "auxclick" | "blur" | "canplay" | "canplaythrough" | "click" | "close" | "contextmenu" | "cuechange" | "dblclick" | "drag" | "dragend" | "dragenter" | "dragexit" | "dragleave" | "dragover" | "dragstart" | "drop" | "durationchange" | "emptied" | "focus" | "focusin" | "focusout" | "gotpointercapture" | "invalid" | "keydown" | "keypress" | "keyup" | "load" | "loadeddata" | "loadedmetadata" | "loadend" | "loadstart" | "lostpointercapture" | "mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup" | "pause" | "play" | "playing" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "ratechange" | "reset" | "resize" | "scroll" | "securitypolicyviolation" | "seeked" | "seeking" | "selectionchange" | "selectstart" | "stalled" | "submit" | "suspend" | "timeupdate" | "toggle" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "volumechange" | "wheel" | "copy" | "cut" | "paste">(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends "waiting" | "error" | "abort" | "cancel" | "progress" | "ended" | "change" | "input" | "select" | "fullscreenchange" | "fullscreenerror" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "auxclick" | "blur" | "canplay" | "canplaythrough" | "click" | "close" | "contextmenu" | "cuechange" | "dblclick" | "drag" | "dragend" | "dragenter" | "dragexit" | "dragleave" | "dragover" | "dragstart" | "drop" | "durationchange" | "emptied" | "focus" | "focusin" | "focusout" | "gotpointercapture" | "invalid" | "keydown" | "keypress" | "keyup" | "load" | "loadeddata" | "loadedmetadata" | "loadend" | "loadstart" | "lostpointercapture" | "mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup" | "pause" | "play" | "playing" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "ratechange" | "reset" | "resize" | "scroll" | "securitypolicyviolation" | "seeked" | "seeking" | "selectionchange" | "selectstart" | "stalled" | "submit" | "suspend" | "timeupdate" | "toggle" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "volumechange" | "wheel" | "copy" | "cut" | "paste">(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        closest<K_2 extends "object" | "link" | "small" | "sub" | "sup" | "track" | "progress" | "a" | "abbr" | "address" | "applet" | "area" | "article" | "aside" | "audio" | "b" | "base" | "basefont" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "dir" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "font" | "footer" | "form" | "frame" | "frameset" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "main" | "map" | "mark" | "marquee" | "menu" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "slot" | "source" | "span" | "strong" | "style" | "summary" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "u" | "ul" | "var" | "video" | "wbr" | "dom-module">(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends "symbol" | "a" | "script" | "style" | "title" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "svg" | "switch" | "text" | "textPath" | "tspan" | "use" | "view">(selector: K_3): SVGElementTagNameMap[K_3];
        closest<E extends Element = Element>(selector: string): E;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(name: string): Attr;
        getAttributeNodeNS(namespaceURI: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_4 extends "object" | "link" | "small" | "sub" | "sup" | "track" | "progress" | "a" | "abbr" | "address" | "applet" | "area" | "article" | "aside" | "audio" | "b" | "base" | "basefont" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "dir" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "font" | "footer" | "form" | "frame" | "frameset" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "main" | "map" | "mark" | "marquee" | "menu" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "slot" | "source" | "span" | "strong" | "style" | "summary" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "u" | "ul" | "var" | "video" | "wbr" | "dom-module">(qualifiedName: K_4): HTMLCollectionOf<HTMLElementTagNameMap[K_4]>;
        getElementsByTagName<K_5 extends "symbol" | "a" | "script" | "style" | "title" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "svg" | "switch" | "text" | "textPath" | "tspan" | "use" | "view">(qualifiedName: K_5): HTMLCollectionOf<SVGElementTagNameMap[K_5]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(position: InsertPosition, insertedElement: Element): Element;
        insertAdjacentHTML(where: InsertPosition, html: string): void;
        insertAdjacentText(where: InsertPosition, text: string): void;
        matches(selectors: string): boolean;
        msGetRegionContent(): any;
        releasePointerCapture(pointerId: number): void;
        removeAttribute(qualifiedName: string): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttribute(qualifiedName: string, value: string): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly ownerDocument: Document;
        readonly parentElement: HTMLElement;
        readonly parentNode: Node & ParentNode;
        readonly previousSibling: Node;
        textContent: string;
        appendChild<T extends Node>(newChild: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(newChild: T_1, refChild: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(oldChild: T_2): T_2;
        replaceChild<T_3 extends Node>(newChild: Node, oldChild: T_3): T_3;
        readonly ATTRIBUTE_NODE: number;
        readonly CDATA_SECTION_NODE: number;
        readonly COMMENT_NODE: number;
        readonly DOCUMENT_FRAGMENT_NODE: number;
        readonly DOCUMENT_NODE: number;
        readonly DOCUMENT_POSITION_CONTAINED_BY: number;
        readonly DOCUMENT_POSITION_CONTAINS: number;
        readonly DOCUMENT_POSITION_DISCONNECTED: number;
        readonly DOCUMENT_POSITION_FOLLOWING: number;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
        readonly DOCUMENT_POSITION_PRECEDING: number;
        readonly DOCUMENT_TYPE_NODE: number;
        readonly ELEMENT_NODE: number;
        readonly ENTITY_NODE: number;
        readonly ENTITY_REFERENCE_NODE: number;
        readonly NOTATION_NODE: number;
        readonly PROCESSING_INSTRUCTION_NODE: number;
        readonly TEXT_NODE: number;
        dispatchEvent(event: Event): boolean;
        animate(keyframes: PropertyIndexedKeyframes | Keyframe[], options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        remove(): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_6 extends "object" | "link" | "small" | "sub" | "sup" | "track" | "progress" | "a" | "abbr" | "address" | "applet" | "area" | "article" | "aside" | "audio" | "b" | "base" | "basefont" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "dir" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "font" | "footer" | "form" | "frame" | "frameset" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "main" | "map" | "mark" | "marquee" | "menu" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "slot" | "source" | "span" | "strong" | "style" | "summary" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "u" | "ul" | "var" | "video" | "wbr" | "dom-module">(selectors: K_6): HTMLElementTagNameMap[K_6];
        querySelector<K_7 extends "symbol" | "a" | "script" | "style" | "title" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "svg" | "switch" | "text" | "textPath" | "tspan" | "use" | "view">(selectors: K_7): SVGElementTagNameMap[K_7];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_8 extends "object" | "link" | "small" | "sub" | "sup" | "track" | "progress" | "a" | "abbr" | "address" | "applet" | "area" | "article" | "aside" | "audio" | "b" | "base" | "basefont" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "dir" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "font" | "footer" | "form" | "frame" | "frameset" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "main" | "map" | "mark" | "marquee" | "menu" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "slot" | "source" | "span" | "strong" | "style" | "summary" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "u" | "ul" | "var" | "video" | "wbr" | "dom-module">(selectors: K_8): NodeListOf<HTMLElementTagNameMap[K_8]>;
        querySelectorAll<K_9 extends "symbol" | "a" | "script" | "style" | "title" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "svg" | "switch" | "text" | "textPath" | "tspan" | "use" | "view">(selectors: K_9): NodeListOf<SVGElementTagNameMap[K_9]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        oncopy: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        oncut: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        onpaste: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragexit: (this: GlobalEventHandlers, ev: Event) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadend: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: Event) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
        blur(): void;
        focus(options?: FocusOptions): void;
        _template: HTMLTemplateElement;
        _importPath: string;
        rootPath: string;
        importPath: string;
        root: HTMLElement | ShadowRoot | import("../../lib/@polymer/polymer/interfaces.js").StampedTemplate;
        $: {
            [key: string]: Element;
        };
        ready: (() => void) & (() => void) & (() => void);
        _initializeProperties: (() => void) & (() => void) & (() => void) & (() => void) & (() => void);
        _readyClients: (() => void) & (() => void);
        _attachDom(dom: import("../../lib/@polymer/polymer/interfaces.js").StampedTemplate): ShadowRoot;
        updateStyles(properties?: object): void;
        resolveUrl(url: string, base?: string): string;
        readonly PROPERTY_EFFECT_TYPES: {
            [key: string]: string;
        };
        _stampTemplate: ((template: HTMLTemplateElement) => import("../../lib/@polymer/polymer/interfaces.js").StampedTemplate) & ((template: HTMLTemplateElement) => import("../../lib/@polymer/polymer/interfaces.js").StampedTemplate);
        _initializeInstanceProperties: ((props: object) => void) & ((props: object) => void);
        _setProperty: ((property: string, value: any) => void) & ((property: string, value: any) => void);
        _setPendingProperty: ((property: string, value: any, shouldNotify?: boolean) => boolean) & ((property: string, value: any, ext?: boolean) => boolean);
        _invalidateProperties: (() => void) & (() => void);
        _flushProperties: (() => void) & (() => void);
        _propertiesChanged: ((currentProps: object, changedProps: object, oldProps: object) => void) & ((currentProps: object, changedProps: object, oldProps: object) => void);
        _initializeProtoProperties: ((props: object) => void) & ((props: object) => void);
        _addPropertyEffect(property: string, type: string, effect?: object): void;
        _removePropertyEffect(property: string, type: string, effect?: object): void;
        _hasPropertyEffect(property: string, type?: string): boolean;
        _hasReadOnlyEffect(property: string): boolean;
        _hasNotifyEffect(property: string): boolean;
        _hasReflectEffect(property: string): boolean;
        _hasComputedEffect(property: string): boolean;
        _setPendingPropertyOrPath(path: string | (string | number)[], value: any, shouldNotify?: boolean, isPathNotification?: boolean): boolean;
        _setUnmanagedPropertyToNode(node: Node, prop: string, value: any): void;
        _enqueueClient(client: object): void;
        _flushClients(): void;
        setProperties(props: object, setReadOnly?: boolean): void;
        _propagatePropertyChanges(changedProps: object, oldProps: object, hasPaths: boolean): void;
        linkPaths(to: string | (string | number)[], from: string | (string | number)[]): void;
        unlinkPaths(path: string | (string | number)[]): void;
        notifySplices(path: string, splices: any[]): void;
        get(path: string | (string | number)[], root?: object): any;
        set(path: string | (string | number)[], value: any, root?: object): void;
        push(path: string | (string | number)[], ...items: any[]): number;
        pop(path: string | (string | number)[]): any;
        splice(path: string | (string | number)[], start: number, deleteCount?: number, ...items: any[]): any[];
        shift(path: string | (string | number)[]): any;
        unshift(path: string | (string | number)[], ...items: any[]): number;
        notifyPath(path: string, value?: any): void;
        _createReadOnlyProperty(property: string, protectedSetter?: boolean): void;
        _createPropertyObserver(property: string, method: string | ((p0: any, p1: any) => any), dynamicFn?: boolean): void;
        _createMethodObserver(expression: string, dynamicFn?: boolean | object): void;
        _createNotifyingProperty(property: string): void;
        _createReflectedProperty(property: string): void;
        _createComputedProperty(property: string, expression: string, dynamicFn?: boolean | object): void;
        _bindTemplate(template: HTMLTemplateElement, instanceBinding?: boolean): import("../../lib/@polymer/polymer/interfaces.js").TemplateInfo;
        _removeBoundDom(dom: import("../../lib/@polymer/polymer/interfaces.js").StampedTemplate): void;
        _addMethodEventListenerToNode(node: EventTarget, eventName: string, methodName: string, context?: any): Function;
        _addEventListenerToNode(node: EventTarget, eventName: string, handler: (p0: Event) => void): void;
        _removeEventListenerFromNode(node: EventTarget, eventName: string, handler: (p0: Event) => void): void;
        _definePropertyAccessor: ((property: string, readOnly?: boolean) => void) & ((property: string, readOnly?: boolean) => void);
        _serializeValue: ((value: any) => string) & ((value: any) => string);
        _deserializeValue: ((value: string, type?: any) => any) & ((value: string, type?: any) => any);
        _ensureAttribute(attribute: string, value: string): void;
        _hasAccessor(property: string): boolean;
        _isPropertyPending(prop: string): boolean;
        _createPropertyAccessor(property: string, readOnly?: boolean): void;
        _addPropertyToAttributeMap(property: string): void;
        _getProperty(property: string): any;
        _enableProperties(): void;
        _shouldPropertiesChange(currentProps: object, changedProps: object, oldProps: object): boolean;
        _shouldPropertyChange(property: string, value: any, old: any): boolean;
        attributeChangedCallback(name: string, old: string, value: string, namespace: string): void;
        _attributeToProperty(attribute: string, value: string, type?: any): void;
        _propertyToAttribute(property: string, attribute?: string, value?: any): void;
        _valueToNodeAttribute(node: Element, value: any, attribute: string): void;
        disconnectedCallback(): void;
    };
    execDelay: number;
    hrefDelay: number;
} & typeof PolymerElement;
/**
 * Кнопка
 * @customElement
 * @polymer
 */
export declare class ZButton extends ZButton_base implements ITargeterReady {
    private static get _styleTemplate();
    private static get _htmlTemplate();
    static get template(): HTMLTemplateElement;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** Иконка, отображаемая перед текстом кнопки */
    icon: string;
    /** Текст кнопки */
    label: string;
    /** Высота кнопки в пикселях */
    h: number;
    /** Визуальные размеры иконки */
    iconSize: number;
    /**
     * Цвет шрифта кнопки
     * Указанный цвет применяется также к иконке, отображаемой перед текстом кнопки и к эффектам элемента z-ripple
     */
    color: string;
    /** Если true - кнопка имеет фоновую заливку в 10% от основного своего цвета (цвета шрифта); если false (по умолчанию) - кнопка имеет полностью прозрачный фон */
    accented: boolean;
    /** Если true - кнопка имеет фоновую заливку в 100% от основного своего цвета (цвета шрифта); если false (по умолчанию) - кнопка имеет полностью прозрачный фон */
    filled: boolean;
    z: number;
    /** Основные свойства элемента-кнопки */
    get details(): {
        id: string;
        label: string;
        icon: string;
        iconSize: number;
        h: number;
        color: string;
        disabled: boolean;
        noTap: boolean;
        triggers: string;
        targeter: Targeter;
    };
    /**
     * Обозреватель изменения цвета элемента
     * @param newVal новое значение цвета
     * @param oldVal предыдущее значение цвета
     */
    colorChanged(newVal: string, oldVal: string): void;
    /**
     * Обработчик клика мышкой
     * Генерирует событие button-activated
     * @param e событие click
     * @emits button-activated
     */
    handleClick(e: MouseEvent): void;
    /**
     * Обработчик нажатия клавиш Enter и Space на элементе, получившем фокус ввода
     * Генерирует событие button-activated
     * @param e событие keydown
     * @emits button-activated
     */
    handleKeydown(e: KeyboardEvent): void;
}
export {};
