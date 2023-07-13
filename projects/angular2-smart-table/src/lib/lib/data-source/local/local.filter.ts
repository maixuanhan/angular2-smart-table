import {IFilterConfig} from '../data-source';
import {ColumnFilterFunction} from "../../settings";

/**
 * A filter predicate that implements a case-insensitive string inclusion.
 *
 * @param cellValue the cell value to check
 * @param search the search/filter string to check against
 */
export function defaultStringInclusionFilter(cellValue: string, search: string) {
  return cellValue.toLowerCase().includes(search.toLowerCase());
}

/**
 * A filter predicate that implements a case-sensitive equality check.
 *
 * @param cellValue the cell value to check
 * @param search the search/filter string to check against
 */
export function defaultStringEqualsFilter(cellValue: string, search: string) {
  return search === cellValue;
}

export class LocalFilter {
  static filter(data: Array<any>, filterConf: IFilterConfig): Array<any> {
    const filter: ColumnFilterFunction = filterConf.filter ? filterConf.filter : defaultStringInclusionFilter;
    return data.filter((el) => {
      let parts = filterConf.field.split(".");
      let prop = el;
      for (let i = 0; i < parts.length && typeof prop !== 'undefined'; i++) {
        prop = prop[parts[i]];
      }
      return filter.call(null, `${prop ?? ''}`, filterConf.search);
    });
  }
}
