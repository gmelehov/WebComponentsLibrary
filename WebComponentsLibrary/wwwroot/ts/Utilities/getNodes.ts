import { LegacyElementMixin } from 'lib/@polymer/polymer/lib/legacy/legacy-element-mixin.js';





export function getNodes(node: HTMLSlotElement | LegacyElementMixin | Node): Array<Node>
{
	return Array.from((node as HTMLSlotElement).assignedNodes ? (node as HTMLSlotElement).assignedNodes({ flatten: true }) : ((node as LegacyElementMixin).getEffectiveChildNodes ? (node as LegacyElementMixin).getEffectiveChildNodes() : (node as Node).childNodes));
}