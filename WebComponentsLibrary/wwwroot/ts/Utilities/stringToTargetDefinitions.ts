import { ITargetInteraction } from "../Interfaces/targeting.js";
import { findTarget } from "./findTarget.js";






export function stringToTargetDefinitions(str: string): Array<ITargetInteraction>
{
	let ret: Array<ITargetInteraction> = [];
	if (str)
	{
		/** разбиваем исходную строку по разделителям - точке с запятой */
		let _arr1 = str.split(/;\s*/);

		/** перебираем все полученные непустые части исходной строки */
		_arr1.filter(f => f !== '').forEach(a =>
		{
			let res = [];
			let _temp, _arr3;

			/** подготавливаем объект TargetInteraction */
			let trg: ITargetInteraction = {
				target: null,
				action: null,
				args: '',
			};

			/** разбиваем каждую часть на ИмяОбъекта и НаименованиеМетода(ПараметрыВызова) */
			//let _arr2 = a.replace(/^(.+)\s*\[(.*)\]$/g, '$1~~~$2').split(/~~~/);
			let _arr2 = a.replace(/^(.+)\.(.*)$/g, '$1~~~$2').split(/~~~/);

			/** первая часть - объект-получатель команды */
			let _target = _arr2[0].trim();
			trg.target = findTarget(_target) || _target;

			/** если найдена вторая часть - наименование метода */
			if (_arr2[1])
			{
				/** разбиваем каждую часть на НаименованиеМетода и ПараметрыВызова */
				_temp = _arr2[1].replace(/^(.+)\((.*)\)$/g, '$1~~~$2').split(/~~~/);

				/** если найдена первая часть - метод */
				trg.action = (_temp[0]) ? _temp[0].trim() : null;

				/** если найдена вторая часть - параметры метода */
				trg.args = (_temp[1]) ? _temp[1].trim() : '';
			};
			ret.push(trg);
		});
	};
	return ret;
}