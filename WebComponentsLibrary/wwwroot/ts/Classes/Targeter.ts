import { ITargetInteraction } from "../Interfaces/targeting.js";
import { findTarget } from "../Utilities/findTarget.js";





/**
 * Командный хелпер
 * Обеспечивает взаимодействие родительского элемента с элементами-получателями команд
 * Вызывает зарегистрированные методы элементов-получателей команд в безусловном (по умолчанию) и условном режиме
 * В безусловном режиме выполнения вызывает зарегистрированные методы непосредственно
 * В условном режиме выполнения вызывает зарегистрированные методы по результатам проверки выполнения заданных условий
 */
export class Targeter
{

	isSimple: boolean = true;
	items: Array<ITargetInteraction>;


	constructor(_items?: Array<ITargetInteraction>, _simple?: boolean)
	{
		this.isSimple = (_simple !== null && _simple !== undefined) ? _simple : true;
		this.items = (_items) ? _items : new Array<ITargetInteraction>();
		Object.seal(this);
	};


	get hasDefaultTarget()
	{
		return (this.items && this.items.length > 0 && findTarget(this.items[0].target) !== null);
	};
	get defaultTarget()
	{
		let item = this.items.find(f => { return (!f.pred) || (f.pred && f.pred.result === true) });
		return (item) ? findTarget(item.target) as HTMLElement : null;
	};
	get found(): Array<ITargetInteraction>
	{
		return this.items.filter(f => { return (!f.pred) || (f.pred && f.pred.result === true) });
	};


	exec()
	{
		return (this.found) ?
			this.found.forEach(it =>
			{
				let targ = findTarget(it.target);
				if (targ && targ[it.action])
					(it.args) ? targ[it.action].call(targ, ...it.args.split(/,\s+/)) : targ[it.action].call(targ);
			})
			:
			undefined;
	};
	removeAll(): void
	{
		let length = this.items.length;
		this.items.splice(0, length - 1);
		this.items = new Array<ITargetInteraction>();
	};
	addMany(elems: Array<ITargetInteraction>): void
	{
		elems.forEach(f => { this.items.push(f) });
	};

}