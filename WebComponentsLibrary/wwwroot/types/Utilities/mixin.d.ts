export default function mixin<T extends {}, U extends {}>(kwArgs: MixinArgs<T, U>): T & U;
export declare function copyArray<T>(array: Array<T>, inherited: boolean): Array<T>;
export interface MixinArgs<T extends {}, U extends {}> {
    deep: boolean;
    inherited: boolean;
    sources: Array<U>;
    target: T;
}
