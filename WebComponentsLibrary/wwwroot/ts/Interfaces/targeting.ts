import { RuleChecker } from '../Classes/RuleChecker.js';
import { Targeter } from '../Classes/Targeter.js';






/** Интерфейс элемента-получателя команд */
export interface ITarget
{

	/** элемент-получатель команд */
	target?: string | Node | Element | HTMLElement;

	/** вызываемый метод элемента-получателя команд */
	action?: string;

	/** (опционально) параметры, передаваемые методу при его вызове */
	args?: string;

}






/** Интерфейс для взаимодействия с элементом-получателем команд */
export interface ITargetInteraction extends ITarget
{
	pred?: RuleChecker;
	name?: string;
}





/** Интерфейс для привязки наименований управляющих команд к их исполнителям. Исполнители команды задаются списком элементов, реализующих интерфейс TargetInteraction */
export interface ITargetingMap
{
	[index: string]: Array<ITargetInteraction>;
}




/** Функционал взаимодействия с целевым элементом */
export interface ITargeterReady
{
	/** хелпер для взаимодействия с элементами-получателями команд */
	targeter: Targeter;

	/** строка-конфигуратор командного хелпера */
	triggers: string;

	/**
	 * обозреватель изменения строки-конфигуратора командного хелпера
	 * @param newValue новая строка-конфигуратор
	 * @param oldValue предыдущая строка-конфигуратор
	 */
	triggersChanged(newValue: string, oldValue: string): void;

	/** метод, активирующий командный хелпер */
	exec: () => void;
}
