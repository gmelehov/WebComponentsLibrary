import { CustomEventDescriptor } from "./CustomEventDescriptor.js";
import { ICustomEventLogEntry } from "../Interfaces/listening.js";
import { findTarget } from "../Utilities/findTarget.js";





/**
 * Обработчик пользовательских событий
 */
export class CustomEventHandler
{

	items: Array<CustomEventDescriptor>;
	log: Array<ICustomEventLogEntry>;


	constructor(_items?: Array<CustomEventDescriptor>)
	{
		this.log = new Array<ICustomEventLogEntry>();
		this.items = (_items) ? _items : new Array<CustomEventDescriptor>();
		Object.seal(this);
	};


	listenObj(obj: EventTarget)
	{
		this.getEventTypes().forEach(f => { obj.addEventListener(f, this.exec.bind(this)) });
		CustomEventHandler._evTarget = obj;
	};
	unlistenObj(obj: EventTarget)
	{
		this.getEventTypes().forEach(f => { obj.removeEventListener(f, this.exec.bind(this)) });
	};
	getEventTypes(): Array<string>
	{
		return [...new Set(this.items.map(m => { return m.type }))];
	};


	/**
	 * Проверяет, зарегистрирован ли хотя бы один обработчик для указанного события
	 * @param event пользовательское событие
	 */
	hasCallbackForEvent(event: CustomEvent): boolean
	{
		return this.items.some(s => { return s.type === event.type });
	};


	exec(event: CustomEvent)
	{
		let targ = event.target as HTMLElement;
		let logEntry: ICustomEventLogEntry = {
			timeStamp: event.timeStamp,
			firer: `${targ.nodeName.toLowerCase()}#${targ.id}`,
			type: event.type,
			detail: event.detail,
			targets: [],
			actions: [],
		};
		let found = this.items.filter(f => { return f.type === event.type });
		return (found) ? found.forEach(descr =>
		{
			let target = findTarget(descr.target);
			let targetSelector =
				(`${(target as HTMLElement).id}`) ?
					`${(target as HTMLElement).nodeName.toLowerCase()}#${(target as HTMLElement).id}`
					:
					`${(target as HTMLElement).nodeName.toLowerCase()}`;

			logEntry.targets.push(targetSelector);
			logEntry.actions.push(descr.action);
			this.log.push(logEntry);
			target[descr.action].call(target, event);
		}) : undefined;
	};


	/**
	 * Добавляет в список новый дескриптор. В случае необходимости запускает новый прослушиватель событий, соответствующий добавляемому дескриптору
	 * @param descriptor дескриптор пользовательского события
	 */
	add(descriptor: CustomEventDescriptor): void
	{
		if (this.items.indexOf(descriptor) === -1)
		{
			let check: boolean = this.getEventTypes().find(f => f === descriptor.type) !== undefined;
			if (check === false)
				CustomEventHandler._evTarget.addEventListener(descriptor.type, this.exec.bind(this));

			this.items.push(descriptor);
		};
	};


	/**
	 * Удаляет дескриптор из списка. В случае необходимости удаляет связанный с дескриптором прослушиватель событий
	 * @param indx индекс дескриптора пользовательского события в списке items
	 */
	remove(indx: number): void
	{
		let descriptor: CustomEventDescriptor = this.items[indx];
		if (descriptor)
		{
			let count: number = this.items.filter(f => { return f.type === descriptor.type }).length;
			if (count === 1)
				CustomEventHandler._evTarget.removeEventListener(descriptor.type, this.exec.bind(this));

			this.items.splice(indx, 1);
		};
	};


	/**
	 * Удаляет все дескрипторы и связанные прослушиватели событий из списка items
	 */
	removeAll(): void
	{
		this.getEventTypes().forEach(f => { CustomEventHandler._evTarget.removeEventListener(f, this.exec.bind(this)) });
		let length = this.items.length;
		this.items.splice(0, length - 1);
	};



	/** EventTarget по умолчанию */
	private static _evTarget: EventTarget = document;

}