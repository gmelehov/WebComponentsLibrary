import * as Poly from '../../lib/@polymer/decorators/lib/decorators.js';
import { PolymerElement, html } from '../../lib/@polymer/polymer/polymer-element.js';
import { ZPalette } from '../Classes/ZPalette.js';
import { ResizableMixin } from '../Mixins/ResizableMixin.js';
import { DraggableMixin } from '../Mixins/DraggableMixin.js';


const { customElement, property, observe } = Poly;








@customElement('z-panel')
export class ZPanel extends ResizableMixin(DraggableMixin(PolymerElement))
{























}