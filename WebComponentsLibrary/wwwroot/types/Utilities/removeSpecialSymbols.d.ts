import { IInputSanitizerDescriptor } from "../Interfaces/interfaces.js";
/**
 * Удаляет из строки, заданной параметром input, все знаки и символы по шаблону, определенному в объекте-дескрипторе
 * @param input исходная строка
 * @param obj объект-дескриптор, задающий режим очистки пользовательского ввода
 */
export declare function removeSpecialSymbols(input: string, obj: IInputSanitizerDescriptor): string;
