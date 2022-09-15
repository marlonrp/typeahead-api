import Typeahead from '@app/entities/Typeahead'

export type TreeMap = Map<string, TreeMap | boolean>

export interface ITypeaheadService {
  orderByTimes(data: Array<Typeahead>): Array<Typeahead>
  insert(name: string): Typeahead
  search(str: string): Array<Typeahead>
}

export interface ITypeaheadRepository {
  readonly dictionary: TreeMap
  readonly data: Array<Typeahead>

  populate(): void
  populateDictionary(str: string, index: number, map: TreeMap): void
  getWord(str: string, index: number, map: TreeMap): TreeMap
  getTypeahead(name: string): Typeahead
  setData(map: TreeMap, str: string, data: Array<Typeahead>): void
  insert(name: string): Typeahead
  search(str: string): Array<Typeahead>
}
