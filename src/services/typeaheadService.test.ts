import Typeahead from '@app/entities/Typeahead'

import TypeaheadService from './typeaheadService'

describe('TypeaheadService', () => {
  const service = new TypeaheadService()
  const maris: Typeahead = {
    name: 'Maris',
    times: 992,
  }
  const marisIncreasedTimes = 993
  const xpto: Typeahead = {
    name: 'Xpto',
    times: 1,
  }
  const typeaheadList: Array<Typeahead> = [xpto, maris]

  it(`valid if ${maris.name} is on top of the list`, () => {
    const response = service.search('mar')
    expect(response[0]).toEqual(maris)
  })

  it(`increment the times value for ${maris.name} and check the new value`, () => {
    const response = service.insert(maris.name)
    expect(response.name).toEqual(maris.name)
    expect(response.times).toEqual(marisIncreasedTimes)
  })

  it(`check if ${xpto.name} does not exist`, () => {
    const response = service.search(xpto.name)
    expect(response.length).toBeLessThan(xpto.times)
  })

  it(`insert ${xpto.name}`, () => {
    const response = service.insert(xpto.name)
    expect(response).toEqual(xpto)
  })

  it(`check if ${maris.name} is first than ${xpto.name}`, () => {
    const response = service.orderByTimes(typeaheadList)
    expect(response[0]).toBe(maris)
    expect(response[1]).toBe(xpto)
  })
})
