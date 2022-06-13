export class EnumsHelper {
  static getNamesAndValues<T extends number>(e: any) {
    return EnumsHelper.getNames(e).map(n => ({ name: n, value: e[n] as T }));
  }

  static getNames(e: any) {
    return EnumsHelper.getObjValues(e).filter(v => typeof v === 'string') as string[];
  }

  static getValues<T extends number>(e: any) {
    return EnumsHelper.getObjValues(e).filter(v => typeof v === 'number') as T[];
  }

  static getSelectList<T extends number, U>(e: any, stringConverter: (arg: U) => string) {
    const selectList = new Map<T, string>();
    this.getValues(e).forEach(val => selectList.set(val as T, stringConverter(val as unknown as U)));
    return selectList;
  }

  static getSelectListAsArray<T extends number, U>(e: any, stringConverter: (arg: U) => string) {
    return Array.from(this.getSelectList(e, stringConverter), value => ({ value: value[0] as T, presentation: value[1] }));
  }

  private static getObjValues(e: any): (number | string)[] {
    return Object.keys(e).map(k => e[k]);
  }
}
