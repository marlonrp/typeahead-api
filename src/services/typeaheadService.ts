import Typeahead from '@app/entities/Typeahead'
import TypeaheadRepository from '@app/repositories/typeaheadRepository'
import { ITypeaheadService } from '@app/src/core/types/Tree'

const repository = new TypeaheadRepository()

const SUGGESTION_NUMBER = parseInt(process.env.SUGGESTION_NUMBER as string) || 10

export default class TypeaheadService implements ITypeaheadService {
  orderByTimes(data: Array<Typeahead>): Array<Typeahead> {
    return data.sort((first, second) => second?.times - first?.times)
  }

  insert(name: string): Typeahead {
    return repository.insert(name)
  }

  search(str: string): Array<Typeahead> {
    const data: Array<Typeahead> = repository.search(str)

    return this.orderByTimes(data).slice(0, SUGGESTION_NUMBER)
  }
}
