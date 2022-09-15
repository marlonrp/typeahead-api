import { TreeMap, ITypeaheadRepository } from '@app/core/types/Tree'
import Typeahead from '@app/entities/Typeahead'
import jsonData from '@app/names.json'

export default class TypeaheadRepository implements ITypeaheadRepository {
  private _dictionary = new Map()
  private _data: Array<Typeahead> = []

  constructor() {
    this.populate()
  }

  get dictionary() {
    return this._dictionary
  }

  get data() {
    return this._data
  }

  populate() {
    if (!this.data?.length) {
      Object.entries(jsonData).forEach(entry => {
        if (entry?.length) {
          this.data.push({ name: entry[0], times: entry[1] as number })
          this.populateDictionary(entry[0], 0, this.dictionary)
        }
      })
    }
  }

  populateDictionary(str: string, index: number, map: TreeMap) {
    const char = str[index].toLocaleLowerCase()

    if (index === str.length - 1) {
      if (!map.has(char)) {
        map.set(char, new Map([['isWord', true]]))
      } else if (typeof map.get(char) !== 'boolean') {
        const mapObject: TreeMap = map.get(char) as TreeMap
        mapObject.set('isWord', true)
      }
    } else {
      if (!map.has(char)) map.set(char, new Map())
      this.populateDictionary(str, index + 1, map.get(char) as TreeMap)
    }
  }

  getWord(str: string, index: number, map: TreeMap): TreeMap {
    const char = str[index].toLocaleLowerCase()

    if (index === str.length - 1) {
      return map.get(char) as TreeMap
    } else {
      if (!map.has(char)) return {} as TreeMap

      return this.getWord(str, index + 1, map.get(char) as TreeMap)
    }
  }

  getTypeahead(name: string): Typeahead {
    return this.data.find(entry => entry.name.toLocaleLowerCase() === name.toLocaleLowerCase()) || ({} as Typeahead)
  }

  setData(map: TreeMap, str: string, data: Array<Typeahead>) {
    for (const key of map.keys()) {
      const keyMap = map.get(key) as TreeMap

      if (typeof map.get(key) === 'boolean') {
        data.push(this.getTypeahead(str))
      } else {
        const newStr = `${str}${key}`
        this.setData(keyMap, newStr, data)
      }
    }
  }

  insert(name: string): Typeahead {
    let typeahead = this.data.find(typeahead => typeahead.name.toLocaleLowerCase() === name.toLocaleLowerCase())

    if (typeahead) {
      typeahead.times++
    } else {
      typeahead = { name, times: 1 }
      this.data.push(typeahead)
    }

    this.populateDictionary(name, 0, this.dictionary)

    return typeahead
  }

  search(str: string): Array<Typeahead> {
    const result = this.getWord(str, 0, this.dictionary)
    const data: Array<Typeahead> = []

    if (result.size) {
      this.setData(result, str, data)
    }

    return data
  }
}
