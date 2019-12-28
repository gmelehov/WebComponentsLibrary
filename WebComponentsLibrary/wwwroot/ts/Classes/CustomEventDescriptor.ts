import { EventType } from "../Enums/enums.js";
import { ICustomEventDescriptor } from "../Interfaces/listening.js";




/** 
 * Дескриптор пользовательского события
 */
export class CustomEventDescriptor implements ICustomEventDescriptor
{

	type: EventType | string;
	target: HTMLElement | Element | Node | string;
	action: string;
	fn?: (ev: Event) => void;


	constructor(model: ICustomEventDescriptor)
	{
		let _temp: ICustomEventDescriptor = Object.assign(Object.create(null), model);
		this.type = _temp.type;
		this.target = _temp.target;
		this.action = _temp.action;
		Object.seal(this);
		_temp = null;
	}

}